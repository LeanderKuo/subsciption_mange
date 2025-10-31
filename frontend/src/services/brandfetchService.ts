import { supabase } from "./supabaseClient";

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
