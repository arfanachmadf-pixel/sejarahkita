import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  try {
    const store = getStore("sejarahku-db");

    if (req.method === "POST") {
      const data = await req.json();
      await store.setJSON("global_app_state", data);
      return new Response(JSON.stringify({ status: "success" }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      const data = await store.get("global_app_state", { type: "json" });
      return new Response(JSON.stringify(data || {}), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};