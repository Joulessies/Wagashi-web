import { NextRequest, NextResponse } from "next/server";

const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { payment_intent_id, payment_method_id, return_url } = body;

    if (!PAYMONGO_SECRET_KEY) {
      return NextResponse.json(
        { error: "PayMongo secret key not configured" },
        { status: 500 }
      );
    }

    if (!payment_intent_id || !payment_method_id) {
      return NextResponse.json(
        { error: "Payment intent ID and payment method ID are required" },
        { status: 400 }
      );
    }

    const attachData = {
      payment_intent: payment_intent_id,
      payment_method: payment_method_id,
    };

    if (return_url) {
      attachData.return_url = return_url;
    }

    console.log("Attaching PayMongo payment method with data:", attachData);

    const response = await fetch(
      "https://api.paymongo.com/v1/payment_intents/attach",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            PAYMONGO_SECRET_KEY + ":"
          ).toString("base64")}`,
        },
        body: JSON.stringify({ data: { attributes: attachData } }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("PayMongo API error:", result);
      return NextResponse.json(
        {
          error: "Failed to attach payment method",
          details: result.errors || result.message,
        },
        { status: response.status }
      );
    }

    console.log("PayMongo payment method attached successfully");

    return NextResponse.json({
      success: true,
      payment_intent: result.data,
    });
  } catch (error) {
    console.error("Error attaching PayMongo payment method:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
