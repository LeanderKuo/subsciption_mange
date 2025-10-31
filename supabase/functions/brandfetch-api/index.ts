// Brandfetch API with monthly caching
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

interface BrandfetchBrand {
  name?: string;
  domain?: string;
  logos?: Array<{
    src?: string;
    type?: string;
    formats?: Array<{
      src?: string;
      format?: string;
    }>;
  }>;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { brand } = await req.json();

    if (!brand) {
      return new Response(
        JSON.stringify({ error: 'Brand name or domain is required' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Initialize Supabase client with service role
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const now = new Date()
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    const domain = brand.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '')

    // Check cache first - using fetched_month for monthly caching
    const { data: cachedBrand, error: cacheError } = await supabaseClient
      .from('brands_cache')
      .select('*')
      .eq('domain', domain)
      .eq('fetched_month', currentMonth)
      .single()

    if (cachedBrand && !cacheError) {
      console.log(`Brand cache HIT for: ${domain}`)
      return new Response(
        JSON.stringify({
          iconUrl: cachedBrand.icon_url,
          name: cachedBrand.brand_name,
          domain: cachedBrand.domain,
          cached: true
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    // Cache MISS - fetch from Brandfetch API
    console.log(`Brand cache MISS for: ${domain}, fetching from API...`)

    const apiKey = Deno.env.get('BRANDFETCH_API_KEY');
    if (!apiKey) {
      console.error('BRANDFETCH_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Brandfetch API not configured' }),
        { status: 500, headers: corsHeaders }
      );
    }

    const brandIdentifier = encodeURIComponent(brand);
    const apiUrl = `https://api.brandfetch.io/v2/brands/${brandIdentifier}`;

    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      },
    });

    // Handle rate limit
    if (response.status === 429) {
      const quotaHeader = response.headers.get('x-api-key-quota');
      const usageHeader = response.headers.get('x-api-key-approximate-usage');
      console.warn(`Rate limit exceeded. Quota: ${quotaHeader}, Usage: ${usageHeader}`);

      return new Response(
        JSON.stringify({
          error: 'Rate limit exceeded',
          quota: quotaHeader,
          usage: usageHeader
        }),
        { status: 429, headers: corsHeaders }
      );
    }

    // Handle 404
    if (response.status === 404) {
      console.log(`Brand not found: ${brand}`);
      // Cache the "not found" result too
      await supabaseClient
        .from('brands_cache')
        .upsert({
          domain: domain,
          brand_name: null,
          icon_url: null,
          brand_id: null,
          fetched_month: currentMonth
        }, { onConflict: 'domain' })

      return new Response(
        JSON.stringify({ iconUrl: null, name: null, domain: domain }),
        { status: 200, headers: corsHeaders }
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Brandfetch API error ${response.status}:`, errorText);
      return new Response(
        JSON.stringify({
          error: `Brandfetch API error: ${response.status}`,
          detail: errorText
        }),
        { status: response.status, headers: corsHeaders }
      );
    }

    const data: BrandfetchBrand = await response.json();

    // Extract icon URL
    let iconUrl: string | null = null;

    if (data.logos && Array.isArray(data.logos)) {
      const iconLogo = data.logos.find(l => l.type === 'icon');
      if (iconLogo?.src) {
        iconUrl = iconLogo.src;
      } else if (iconLogo?.formats && iconLogo.formats.length > 0) {
        const svgFormat = iconLogo.formats.find(f => f.format === 'svg');
        iconUrl = svgFormat?.src || iconLogo.formats[0]?.src || null;
      }

      if (!iconUrl) {
        const logo = data.logos.find(l => l.type === 'logo');
        if (logo?.src) {
          iconUrl = logo.src;
        } else if (logo?.formats && logo.formats.length > 0) {
          const svgFormat = logo.formats.find(f => f.format === 'svg');
          iconUrl = svgFormat?.src || logo.formats[0]?.src || null;
        }
      }

      if (!iconUrl && data.logos.length > 0) {
        const firstLogo = data.logos[0];
        if (firstLogo.src) {
          iconUrl = firstLogo.src;
        } else if (firstLogo.formats && firstLogo.formats.length > 0) {
          iconUrl = firstLogo.formats[0]?.src || null;
        }
      }
    }

    // Save to cache with monthly update
    const { error: insertError } = await supabaseClient
      .from('brands_cache')
      .upsert({
        domain: domain,
        brand_name: data.name || null,
        icon_url: iconUrl,
        brand_id: null,
        fetched_month: currentMonth
      }, { onConflict: 'domain' })

    if (insertError) {
      console.error('Failed to cache brand:', insertError)
    } else {
      console.log(`Cached brand: ${domain} for month ${currentMonth}`)
    }

    return new Response(
      JSON.stringify({
        iconUrl,
        name: data.name,
        domain: data.domain,
        cached: false
      }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('Unexpected error in brandfetch-api function:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});
