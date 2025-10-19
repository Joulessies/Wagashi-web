import { NextRequest, NextResponse } from "next/server";

const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      type,
      amount,
      currency = "PHP",
      redirect,
      billing,
      statement_descriptor,
    } = body;

    if (!PAYMONGO_SECRET_KEY) {
      return NextResponse.json(
        { error: "PayMongo secret key not configured" },
        { status: 500 }
      );
    }

    if (!type) {
      return NextResponse.json({ error: "Type is required" }, { status: 400 });
    }

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Valid amount is required" },
        { status: 400 }
      );
    }

    const invalidTypeMsg = "Type must be one of: gcash, grab_pay, paymaya";
    if (type === "gcash" || type === "grab_pay" || type === "paymaya") {
      // Valid type
    } else {
      return NextResponse.json({ error: invalidTypeMsg }, { status: 400 });
    }

    const sourceData: any = {
      type,
      amount: Math.round(amount * 100), // Convert to centavos
      currency: currency.toUpperCase(),
      redirect: {
        success:
          redirect?.success || `${process.env.NEXTAUTH_URL}/payment/success`,
        failed:
          redirect?.failed || `${process.env.NEXTAUTH_URL}/payment/failed`,
      },
    };

    if (billing) {
      sourceData.billing = billing;
    }

    if (statement_descriptor) {
      sourceData.statement_descriptor = statement_descriptor;
    }

    console.log("Creating PayMongo source with data:", sourceData);

    const response = await fetch("https://api.paymongo.com/v1/sources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(PAYMONGO_SECRET_KEY + ":").toString(
          "base64"
        )}`,
      },
      body: JSON.stringify({ data: { attributes: sourceData } }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("PayMongo API error:", result);
      return NextResponse.json(
        {
          error: "Failed to create payment source",
          details: result.errors || result.message,
        },
        { status: response.status }
      );
    }

    console.log("PayMongo source created successfully:", result.data.id);

    return NextResponse.json({
      success: true,
      source: result.data,
    });
  } catch (error) {
    console.error("Error creating PayMongo source:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
