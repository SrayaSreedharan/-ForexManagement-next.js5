import { supabase } from '../../../lib/supabaseClient';

export async function POST(req) {
  try {
    const { item, category, supplier, quantity, price, reason } = await req.json();

    if (!item || !quantity || !price) {
      return new Response(
        JSON.stringify({ error: "Item, quantity, and price are required." }),
        { status: 400 }
      );
    }

    const qty = Number(quantity);
    const unitPrice = Number(price);

    if (isNaN(qty) || qty <= 0) {
      return new Response(
        JSON.stringify({ error: "Quantity must be a positive number." }),
        { status: 400 }
      );
    }

    if (isNaN(unitPrice) || unitPrice <= 0) {
      return new Response(
        JSON.stringify({ error: "Price must be a positive number." }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("purchase_requests")
      .insert([
        {
          item,
          category,
          supplier,
          quantity: qty,
          price: unitPrice, // ✅ store price
          reason,
          status: "pending",
        },
      ])
      .select();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err) {
    console.error("POST /staffinventory/request error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
