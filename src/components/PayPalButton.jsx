"use client";
import { loadScript } from "@paypal/paypal-js";
import { useEffect } from "react";

export default function PayPalButton({ amount }) {
  useEffect(() => {
    loadScript({
      "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
      currency: "USD",
    }).then((paypal) => {
      paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount, // Pass the amount dynamically
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              alert(
                `Transaction completed by ${details.payer.name.given_name}`
              );
              // Handle success
            });
          },
          onError: (err) => {
            console.error(err);
            // Handle errors
          },
        })
        .render("#paypal-button-container");
    });
  }, [amount]);

  return <div id="paypal-button-container"></div>;
}
