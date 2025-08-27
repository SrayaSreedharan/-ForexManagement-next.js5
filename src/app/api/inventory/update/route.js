import { supabase } from '../../../lib/supabaseClient';

export async function PUT(req) {
  try {
    const body = await req.json();
    const { sku, name, description, category, stock, min, price, supplier, warehouse } = body;

    if (!sku) {
      return new Response(JSON.stringify({ error: "SKU is required" }), { status: 400 });
    }

    const { data, error } = await supabase
      .from("inventory_items")
      .update({ name, description, category, stock, min, price, supplier, warehouse })
      .eq("sku", sku)
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err) {
    console.error("Update error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
