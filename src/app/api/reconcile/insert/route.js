import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";

export async function POST(req) {
  try {
    const body = await req.json();
    const { purchaseRequestId, invoiceAmount, reconciledBy } = body;

    if (!purchaseRequestId || !invoiceAmount) {
      return NextResponse.json(
        { error: "purchaseRequestId and invoiceAmount are required" },
        { status: 400 }
      );
    }

    // 1️⃣ fetch requested amount from purchase_requests
    const { data: pr, error: prError } = await supabase
      .from("purchase_requests")
      .select("quantity")
      .eq("id", purchaseRequestId)
      .single();

    if (prError || !pr) {
      return NextResponse.json(
        { error: "Purchase request not found" },
        { status: 404 }
      );
    }

    const requestedAmount = pr.quantity;

    // 2️⃣ determine reconciliation status
    const status =
      Number(invoiceAmount) === Number(requestedAmount)
        ? "Matched"
        : "Mismatch";

    // 3️⃣ insert into reconciliations
    const { data, error } = await supabase
      .from("reconciliations")
      .insert([
        {
          purchase_request_id: purchaseRequestId,
          requested_amount: requestedAmount,
          invoice_amount: invoiceAmount,
          status,
          reconciled_by: reconciledBy,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ reconciliation: data }, { status: 201 });
  } catch (err) {
    console.error("Insert reconciliation failed:", err.message || err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
