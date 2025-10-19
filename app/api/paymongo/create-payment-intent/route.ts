import { NextRequest, NextResponse } from "next/server";

const PAYMONGO_SECRET_KEY =
  process.env.PAYMONGO_SECRET_KEY;

export async function POST(request: NextRequest) {
  console.log("=== PayMongo Payment Intent Creation Started ===");

  try {
    const body = await request.json();
    const {
      amount,
      currency = "PHP",
      payment_method_allowed = ["card", "paymaya", "gcash", "grab_pay"],
      payment_method_options,
      description,
      statement_descriptor,
      metadata,
    } = body;

    if (!PAYMONGO_SECRET_KEY) {
      console.error("PayMongo secret key not configured");
      return NextResponse.json(
        { error: "PayMongo secret key not configured" },
        { status: 500 }
      );
    }

    if (!amount || amount <= 0) {
      console.error("Invalid amount:", amount);
      return NextResponse.json(
        { error: "Valid amount is required" },
        { status: 400 }
      );
    }

    const paymentIntentData: any = {
      amount: Math.round(amount * 100), // Convert to centavos
      currency: currency.toUpperCase(),
      payment_method_allowed,
    };

    if (payment_method_options) {
      paymentIntentData.payment_method_options = payment_method_options;
    }

    if (description) {
      paymentIntentData.description = description;
    }

    if (statement_descriptor) {
      paymentIntentData.statement_descriptor = statement_descriptor;
    }

    if (metadata) {
      paymentIntentData.metadata = metadata;
    }

    console.log("Creating PayMongo payment intent with data:", paymentIntentData);

    const response = await fetch("https://api.paymongo.com/v1/payment_intents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(PAYMONGO_SECRET_KEY + ":").toString("base64")}`,
      },
      body: JSON.stringify({ data: { attributes: paymentIntentData } }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("PayMongo API error:", result);
      return NextResponse.json(
        {
          error: "Failed to create payment intent",
          details: result.errors || result.message,
        },
        { status: response.status }
      );
    }

    console.log("PayMongo payment intent created successfully:", result.data.id);

    return NextResponse.json({
      success: true,
      payment_intent: result.data,
    });
  } catch (error) {
    console.error("Error creating PayMongo payment intent:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
