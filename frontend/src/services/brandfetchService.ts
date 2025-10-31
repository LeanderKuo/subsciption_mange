import { supabase } from "./supabaseClient";

export interface BrandfetchSuggestion {
  id: string;
  brandId: string;
  name: string;
  domain: string;
  iconUrl?: string;
  claimed?: boolean;
  verified?: boolean;
}

// Check whether Brandfetch integration is available
export const isBrandfetchConfigured = (): boolean => {
  return true; // Supabase Edge Function is always available
};

// Search for brands (used by autocomplete)
export const searchBrandfetch = async (
  query: string,
  limit: number = 5,
  signal?: AbortSignal
): Promise<BrandfetchSuggestion[]> => {
  try {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const { data, error } = await supabase.functions.invoke("brand-search", {
      body: { query: query.trim() },
    });

    if (error) {
      console.error("Error invoking brand-search function:", error);
      throw error;
    }

    const results = data?.results || [];
    return results.slice(0, limit).map((result: any) => ({
      id: result.brandId || result.domain,
      brandId: result.brandId,
      name: result.name,
      domain: result.domain,
      iconUrl: result.icon,
      claimed: result.claimed,
      verified: result.verified,
    }));
  } catch (error) {
    if (signal?.aborted) {
      throw new Error("AbortError");
    }
    console.error("Failed to search brands:", error);
    throw error;
  }
};

// Fetch brand icon for a given brand
export const fetchBrandIcon = async (brand: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase.functions.invoke("brandfetch-api", {
      body: { brand },
    });

    if (error) {
      console.error("Error invoking brandfetch function:", error);
      return null;
    }

    return data?.iconUrl || null;
  } catch (error) {
    console.error("Failed to fetch brand icon:", error);
    return null;
  }
};
