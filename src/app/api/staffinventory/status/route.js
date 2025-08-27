import { supabase } from '../../../lib/supabaseClient';

export async function PUT(req) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return new Response(
        JSON.stringify({ error: "ID and status are required." }),
        { status: 400 }
      );
    }

   const { data, error } = await supabase
  .from("purchase_requests")
  .update({ status })   // must match DB column exactly
  .eq("id", id)         // must match primary key column name
  .select();


    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }

    // ✅ Always return JSON
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
