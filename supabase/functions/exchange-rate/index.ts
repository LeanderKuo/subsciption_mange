// ExchangeRate API Edge Function with daily caching
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

const EXCHANGERATE_API_KEY = 'f518f5cb637cc17af15f5740'
const EXCHANGERATE_BASE_URL = 'https://v6.exchangerate-api.com/v6'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
}

interface ExchangeRateResponse {
  result: string
  base_code: string
  conversion_rates: Record<string, number>
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { targetCurrency, baseCurrency = 'USD' } = await req.json()

    if (!targetCurrency) {
      return new Response(
        JSON.stringify({ error: 'Target currency is required' }),
        { status: 400, headers: corsHeaders }
      )
    }

    // Initialize Supabase client with service role
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const today = new Date().toISOString().split('T')[0]

    // Check if rate exists in cache for today
    const { data: cachedRate, error: cacheError } = await supabaseClient
      .from('exchange_rates')
      .select('rate')
      .eq('base_currency', baseCurrency)
      .eq('target_currency', targetCurrency)
      .eq('fetched_date', today)
      .single()

    if (cachedRate && !cacheError) {
      console.log(`Cache HIT for ${baseCurrency} -> ${targetCurrency}`)
      return new Response(
        JSON.stringify({
          rate: cachedRate.rate,
          base: baseCurrency,
          target: targetCurrency,
          cached: true,
          date: today
        }),
        { status: 200, headers: corsHeaders }
      )
    }

    // Cache MISS - fetch from ExchangeRate API
    console.log(`Cache MISS for ${baseCurrency} -> ${targetCurrency}, fetching from API...`)

    const apiUrl = `${EXCHANGERATE_BASE_URL}/${EXCHANGERATE_API_KEY}/latest/${baseCurrency}`
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`ExchangeRate API error: ${response.status}`)
    }

    const data: ExchangeRateResponse = await response.json()

    if (data.result !== 'success') {
      throw new Error('ExchangeRate API returned error')
    }

    const rate = data.conversion_rates[targetCurrency]

    if (!rate) {
      return new Response(
        JSON.stringify({ error: `Currency ${targetCurrency} not found` }),
        { status: 404, headers: corsHeaders }
      )
    }

    // Save to cache
    const { error: insertError } = await supabaseClient
      .from('exchange_rates')
      .insert({
        base_currency: baseCurrency,
        target_currency: targetCurrency,
        rate: rate,
        fetched_date: today
      })

    if (insertError) {
      console.error('Failed to cache exchange rate:', insertError)
    } else {
      console.log(`Cached ${baseCurrency} -> ${targetCurrency} = ${rate}`)
    }

    return new Response(
      JSON.stringify({
        rate: rate,
        base: baseCurrency,
        target: targetCurrency,
        cached: false,
        date: today
      }),
      { status: 200, headers: corsHeaders }
    )

  } catch (error) {
    console.error('Exchange rate function error:', error)
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: corsHeaders }
    )
  }
})
