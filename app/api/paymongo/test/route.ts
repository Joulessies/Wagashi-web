import { NextRequest, NextResponse } from "next/server";

const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY;

export async function GET(request: NextRequest) {
  try {
    console.log("Testing PayMongo API connection...");
    console.log("Secret key length:", PAYMONGO_SECRET_KEY.length);

    if (!PAYMONGO_SECRET_KEY) {
      return NextResponse.json(
        { error: "PayMongo secret key not configured" },
        { status: 500 }
      );
    }

    // Test API connection by fetching payment methods
    const response = await fetch(
      "https://api.paymongo.com/v1/payment_methods",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            PAYMONGO_SECRET_KEY + ":"
          ).toString("base64")}`,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("PayMongo API test failed:", result);
      return NextResponse.json(
        {
          error: "PayMongo API test failed",
          details: result.errors || result.message,
        },
        { status: response.status }
      );
    }

    console.log("PayMongo API test successful");

    return NextResponse.json({
      success: true,
      message: "PayMongo API connection successful",
      data: result,
    });
  } catch (error) {
    console.error("Error testing PayMongo API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
