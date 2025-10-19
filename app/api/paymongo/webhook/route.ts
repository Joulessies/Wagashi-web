import { NextRequest, NextResponse } from "next/server";

const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const signature = request.headers.get("paymongo-signature");

    if (!PAYMONGO_SECRET_KEY) {
      console.error("PayMongo secret key not configured");
      return NextResponse.json(
        { error: "PayMongo secret key not configured" },
        { status: 500 }
      );
    }

    if (!signature) {
      console.error("Missing PayMongo signature");
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Verify webhook signature (simplified - in production, use proper signature verification)
    console.log("Received PayMongo webhook:", body);

    const { data } = body;
    const { type, attributes } = data;

    console.log("Webhook event type:", type);
    console.log("Webhook attributes:", attributes);

    // Handle different webhook events
    switch (type) {
      case "payment_intent.succeeded":
        console.log("Payment succeeded:", attributes.id);
        // Handle successful payment
        // Update your database, send confirmation email, etc.
        break;

      case "payment_intent.payment_failed":
        console.log("Payment failed:", attributes.id);
        // Handle failed payment
        // Update your database, send failure notification, etc.
        break;

      case "source.chargeable":
        console.log("Source chargeable:", attributes.id);
        // Handle chargeable source
        // Create payment intent and process payment
        break;

      default:
        console.log("Unhandled webhook event type:", type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing PayMongo webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
