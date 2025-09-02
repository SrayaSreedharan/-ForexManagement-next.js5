// app/api/reconcile/save/route.js
import { supabase } from '../../../lib/supabaseClient';

export async function POST(req) {
  try {
    // fetch purchase_requests joined with inventory
    const { data, error } = await supabase
      .from("purchase_requests")
      .select(`
        id,
        item_id,
        quantity,
        price,
        inventory:inventory!inner ( id, price )
      `);

    if (error) {
      console.error("Supabase error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    const inserts = data.map((pr) => ({
      item_id: pr.item_id,
      purchase_id: pr.id,
      inventory_id: pr.inventory.id,
      purchase_quantity: pr.quantity,
      purchase_price: pr.price,
      inventory_price: pr.inventory.price,
    }));

    const { data: inserted, error: insertError } = await supabase
      .from("reconciliation")
      .insert(inserts);

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(JSON.stringify({ error: insertError.message }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({ message: "Reconciliation saved", rows: inserted }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Handler error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
