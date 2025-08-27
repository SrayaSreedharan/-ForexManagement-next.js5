import { supabase } from '../../../lib/supabaseClient';

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { sku } = body;

    if (!sku) {
      return new Response(JSON.stringify({ error: "SKU is required" }), { status: 400 });
    }

    const { data, error } = await supabase
      .from("inventory_items")
      .delete()
      .eq("sku", sku);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ data, message: "Item deleted successfully" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Unexpected server error" }), { status: 500 });
  }
}
