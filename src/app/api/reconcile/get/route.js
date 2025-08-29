import { supabase } from '../../../lib/supabaseClient';
import { NextResponse } from "next/server";

export async function GET() {
  try {
   
    const { data, error } = await supabase
      .from("reconciliations")
      .select(`
        id,
        requested_amount,
        invoice_amount,
        status,
        reconciled_by,
        created_at,
        purchase_requests (
          id,
          item,
          quantity,
          reason
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ reconciliations: data }, { status: 200 });
  } catch (err) {
    console.error(" GET /api/reconcile/get error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
