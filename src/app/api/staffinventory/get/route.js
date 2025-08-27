import { supabase } from '../../../lib/supabaseClient';
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("purchase_requests")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data); // always return valid JSON
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
