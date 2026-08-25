const ROBOFLOW_WORKFLOW_URL =
  "https://serverless.roboflow.com/jeromees-workspace/workflows/ipis-pest-detection-vipis-pest-detection-1-rfdetr-small-t1-logic";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods":
    "POST, OPTIONS",
};

Deno.serve(async (req) => {
  // Handle browser preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({
          error: "Method not allowed",
        }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Read request body
    const body = await req.json();

    const imageUrl = body?.imageUrl;

    if (
      !imageUrl ||
      typeof imageUrl !== "string"
    ) {
      return new Response(
        JSON.stringify({
          error: "imageUrl is required",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Get secret Roboflow API key
    const roboflowApiKey =
      Deno.env.get("ROBOFLOW_API_KEY");

    if (!roboflowApiKey) {
      console.error(
        "ROBOFLOW_API_KEY is not configured."
      );

      return new Response(
        JSON.stringify({
          error:
            "Roboflow API key is not configured.",
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Call Roboflow Workflow
    const roboflowResponse = await fetch(
      ROBOFLOW_WORKFLOW_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: roboflowApiKey,
          inputs: {
            image: {
              type: "url",
              value: imageUrl,
            },
          },
        }),
      }
    );

    const roboflowResult =
      await roboflowResponse.json();

    console.log(
      "Roboflow response:",
      JSON.stringify(roboflowResult)
    );

    if (!roboflowResponse.ok) {
      console.error(
        "Roboflow API error:",
        roboflowResult
      );

      return new Response(
        JSON.stringify({
          error:
            "Roboflow request failed.",
          details: roboflowResult,
        }),
        {
          status: roboflowResponse.status,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Return Roboflow response to React
    return new Response(
      JSON.stringify(roboflowResult),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "Roboflow Edge Function error:",
      error
    );

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Unexpected server error.",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});