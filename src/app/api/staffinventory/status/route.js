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
    .update({ status })   
    .eq("id", id)        
    .select();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
