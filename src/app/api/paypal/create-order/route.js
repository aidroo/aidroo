import axios from "axios";
import { NextResponse } from "next/server";

const PAYPAL_API_URL = "https://api-m.paypal.com";
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

const getPayPalAccessToken = async () => {
  try {
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
  } catch (error) {
    console.error("Error getting PayPal access token:", error);
    throw new Error("Failed to retrieve PayPal access token");
  }
};

export async function POST(req) {
  try {
    const { amount } = await req.json();

    // Save user data to your database if needed
    // For example: saveUserData(name, address);
    console.log("Client ID: create order", PAYPAL_CLIENT_ID);
    console.log("Client Secret: create order", PAYPAL_CLIENT_SECRET);

    const accessToken = await getPayPalAccessToken();
    console.log("Access Token:", accessToken);

    const response = await axios.post(
      `${PAYPAL_API_URL}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [{ amount: { value: amount.toString() } }],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({ id: response.data.id });
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
