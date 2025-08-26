import { supabase } from '../../../lib/supabaseClient';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, sku, description, category, stock, min, price, supplier, warehouse } = body;

    if (!name || !sku || !category) {
      return new Response(
        JSON.stringify({ error: 'Name, SKU, and Category are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { data, error } = await supabase
      .from('inventory_items')
      .insert([{ name, sku, description, category, stock, min, price, supplier, warehouse }])
      .select()
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
