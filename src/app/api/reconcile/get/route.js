import { supabase } from '../../../lib/supabaseClient';
import { NextResponse } from "next/server";

export async function GET() {
  try {
   
    const { data, error } = await supabase
      .from("purchase_requests")
      .select(`
        id,
        item,
        quantity,
        reason,
        created_at,
        inventory_items!inner(
          price
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    
    const reconciliations = data.map((rec) => {
      const inventoryPrice = rec.inventory_items?.[0]?.price || 0;
      const requestedAmount = inventoryPrice * rec.quantity;

     
      const invoiceAmount = rec.invoice_amount || 0;

     
      const status =
        invoiceAmount === 0
          ? "Pending"
          : invoiceAmount === requestedAmount
          ? "Matched"
          : "Mismatch";

      return {
        id: rec.id,
        purchase_requests: {
          id: rec.id,
          item: rec.item,
          quantity: rec.quantity,
          price: inventoryPrice, 
          reason: rec.reason,
        },
        requested_amount: requestedAmount,
        invoice_amount: invoiceAmount,
        status,
        reconciled_by: rec.reconciled_by || null,
        created_at: rec.created_at,
      };
    });

    return NextResponse.json({ reconciliations }, { status: 200 });

  } catch (err) {
    console.error(" GET /api/staffinventory/get error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
