import { NextRequest, NextResponse } from "next/server";

const PAYMONGO_SECRET_KEY =
  process.env.PAYMONGO_SECRET_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cardNumber, expMonth, expYear, cvc, billing } = body;

    if (!PAYMONGO_SECRET_KEY) {
      return NextResponse.json(
        { error: "PayMongo secret key not configured" },
        { status: 500 }
      );
    }

    if (!cardNumber || !expMonth || !expYear || !cvc) {
      return NextResponse.json(
        { error: "Card details are required" },
        { status: 400 }
      );
    }

    const cardData = {
      number: cardNumber,
      exp_month: parseInt(expMonth),
      exp_year: parseInt(expYear),
      cvc: cvc,
    };

    const paymentMethodData: any = {
      type: "card",
      details: {
        card_number: cardData.number,
        exp_month: cardData.exp_month,
        exp_year: cardData.exp_year,
        cvc: cardData.cvc,
      },
    };

    if (billing) {
      paymentMethodData.billing = billing;
    }

    console.log("Creating PayMongo payment method with data:", paymentMethodData);

    const response = await fetch("https://api.paymongo.com/v1/payment_methods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(PAYMONGO_SECRET_KEY + ":").toString("base64")}`,
      },
      body: JSON.stringify({ data: { attributes: paymentMethodData } }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("PayMongo API error:", result);
      return NextResponse.json(
        {
          error: "Failed to create payment method",
          details: result.errors || result.message,
        },
        { status: response.status }
      );
    }

    console.log("PayMongo payment method created successfully:", result.data.id);

    return NextResponse.json({
      success: true,
      payment_method: result.data,
    });
  } catch (error) {
    console.error("Error creating PayMongo payment method:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}