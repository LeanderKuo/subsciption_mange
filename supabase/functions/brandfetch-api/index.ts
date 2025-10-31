// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

// Brandfetch API Response Interface (更新為正確的結構)
interface BrandfetchBrand {
  name?: string;
  domain?: string;
  logos?: Array<{
    src?: string;
    type?: string;
    theme?: string;
    formats?: Array<{
      src?: string;
      format?: string;
      background?: string;
    }>;
  }>;
  images?: Array<{
    src?: string;
    type?: string;
  }>;
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
    const { brand } = await req.json();

    if (!brand) {
      return new Response(
        JSON.stringify({ error: 'Brand name or domain is required' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const apiKey = Deno.env.get('BRANDFETCH_API_KEY');
    if (!apiKey) {
      console.error('BRANDFETCH_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Brandfetch API not configured' }),
        { status: 500, headers: corsHeaders }
      );
    }

    // 使用正確的 Brandfetch API endpoint
    const brandIdentifier = encodeURIComponent(brand);
    const apiUrl = `https://api.brandfetch.io/v2/brands/${brandIdentifier}`;

    console.log(`Fetching brand data for: ${brand}`);

    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
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

    // 處理 404 - 品牌未找到
    if (response.status === 404) {
      console.log(`Brand not found: ${brand}`);
      return new Response(
        JSON.stringify({ iconUrl: null, error: 'Brand not found' }),
        { status: 200, headers: corsHeaders }
      );
    }

    // 處理其他錯誤
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

    // 優先順序：icon > logo > 第一個可用的 logo
    let iconUrl: string | null = null;

    if (data.logos && Array.isArray(data.logos)) {
      // 1. 嘗試找 icon 類型
      const iconLogo = data.logos.find(l => l.type === 'icon');
      if (iconLogo?.src) {
        iconUrl = iconLogo.src;
      } else if (iconLogo?.formats && iconLogo.formats.length > 0) {
        // 優先使用 SVG 格式
        const svgFormat = iconLogo.formats.find(f => f.format === 'svg');
        iconUrl = svgFormat?.src || iconLogo.formats[0]?.src || null;
      }

      // 2. 如果沒有 icon，嘗試找 logo 類型
      if (!iconUrl) {
        const logo = data.logos.find(l => l.type === 'logo');
        if (logo?.src) {
          iconUrl = logo.src;
        } else if (logo?.formats && logo.formats.length > 0) {
          const svgFormat = logo.formats.find(f => f.format === 'svg');
          iconUrl = svgFormat?.src || logo.formats[0]?.src || null;
        }
      }

      // 3. 使用第一個可用的 logo
      if (!iconUrl && data.logos.length > 0) {
        const firstLogo = data.logos[0];
        if (firstLogo.src) {
          iconUrl = firstLogo.src;
        } else if (firstLogo.formats && firstLogo.formats.length > 0) {
          iconUrl = firstLogo.formats[0]?.src || null;
        }
      }
    }

    console.log(`Successfully fetched brand data for ${brand}, iconUrl: ${iconUrl ? 'found' : 'not found'}`);

    return new Response(
      JSON.stringify({
        iconUrl,
        name: data.name,
        domain: data.domain
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
