import { supabase } from "../../../lib/supabaseClient";

export async function GET() {
  try {
    // 1. Fetch purchase requests (ensure 'price' column exists in schema)
    const { data: purchases, error: purchaseError } = await supabase
      .from("purchase_requests")
      .select("id, item, quantity, price"); // <-- add 'price' column in DB if missing

    if (purchaseError) {
      console.error("Purchase fetch error:", purchaseError);
      return new Response(JSON.stringify({ error: purchaseError.message }), { status: 500 });
    }

    // 2. Fetch inventory items
    const { data: inventory, error: inventoryError } = await supabase
      .from("inventory_items")
      .select("id, name, price");

    if (inventoryError) {
      console.error("Inventory fetch error:", inventoryError);
      return new Response(JSON.stringify({ error: inventoryError.message }), { status: 500 });
    }

    // 3. Merge by item name
    const reconciliation = purchases.map((pr) => {
      const inv = inventory.find((i) => i.name === pr.item);
      return {
        purchase_id: pr.id,
        item_name: pr.item,
        purchase_quantity: pr.quantity,
        purchase_price: pr.price ?? null,
        inventory_price: inv?.price ?? null,
        // ✅ Flip subtraction to show positive when inventory is higher
        price_difference:
          inv && pr.price != null ? inv.price - pr.price : null,
      };
    });

    return new Response(JSON.stringify(reconciliation), { status: 200 });
  } catch (err) {
    console.error("Handler error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
