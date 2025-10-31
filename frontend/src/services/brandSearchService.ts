import { supabase } from "./supabaseClient";

export interface BrandSearchResult {
  brandId: string;
  name: string;
  domain: string;
  icon?: string;
  claimed?: boolean;
  verified?: boolean;
}

export const searchBrands = async (query: string): Promise<BrandSearchResult[]> => {
  try {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const { data, error } = await supabase.functions.invoke("brand-search", {
      body: { query: query.trim() },
    });

    if (error) {
      console.error("Error invoking brand-search function:", error);
      return [];
    }

    return data?.results || [];
  } catch (error) {
    console.error("Failed to search brands:", error);
    return [];
  }
};
