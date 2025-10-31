// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

// Brandfetch Search API Response Interface
interface BrandfetchSearchResult {
  name: string;
  domain: string;
  brandId?: string;
  icon?: string;
  claimed?: boolean;
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Search query is required' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const searchApiKey = Deno.env.get('BRANDFETCH_SEARCH_API_KEY');
    if (!searchApiKey) {
      console.error('BRANDFETCH_SEARCH_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Brand search API not configured' }),
        { status: 500, headers: corsHeaders }
      );
    }

    // 使用 Brandfetch Search API
    const searchQuery = encodeURIComponent(query);
    const apiUrl = `https://api.brandfetch.io/v2/search/${searchQuery}`;

    console.log(`Searching brands for query: ${query}`);

    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${searchApiKey}`,
        'Accept': 'application/json',
      },
    });

    // 處理 rate limit
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

    // 處理錯誤
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Brandfetch Search API error ${response.status}:`, errorText);
      return new Response(
        JSON.stringify({
          error: `Brandfetch Search API error: ${response.status}`,
          detail: errorText
        }),
        { status: response.status, headers: corsHeaders }
      );
    }

    const data: BrandfetchSearchResult[] = await response.json();

    console.log(`Successfully searched brands for "${query}", found ${data.length} results`);

    // 返回搜尋結果（限制最多 10 個）
    return new Response(
      JSON.stringify({
        results: data.slice(0, 10),
        count: data.length
      }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('Unexpected error in brand-search function:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});
