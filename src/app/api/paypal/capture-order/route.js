import axios from "axios";
import { NextResponse } from "next/server";

const PAYPAL_API_URL = "https://api-m.paypal.com";
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

const getPayPalAccessToken = async () => {
  const response = await axios.post(
    `${PAYPAL_API_URL}/v1/oauth2/token`,
    new URLSearchParams({ grant_type: "client_credentials" }),
    {
      headers: {
        Accept: "application/json",
        "Accept-Language": "en_US",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: PAYPAL_CLIENT_ID,
        password: PAYPAL_CLIENT_SECRET,
      },
    }
  );
  return response.data.access_token;
};
console.log("Client ID: capture order", PAYPAL_CLIENT_ID);
console.log("Client Secret: capture order", PAYPAL_CLIENT_SECRET);
export async function POST(req) {
  try {
    const { orderId } = await req.json();
    const accessToken = await getPayPalAccessToken();

    const response = await axios.post(
      `${PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Here you can update the order status in your database after capturing the payment
    // For example, updateOrderStatus(orderId, response.data.status);

    return NextResponse.json({ status: response.data.status });
  } catch (error) {
    console.error("Error capturing PayPal order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
