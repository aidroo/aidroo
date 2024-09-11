"use client";

import { loadScript } from "@paypal/paypal-js";
import { useEffect } from "react";

export default function PayPalButton({ amount }) {
  useEffect(() => {
    // Load PayPal script
    const paypalScript = loadScript({
      "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
      currency: "USD",
    });

    paypalScript
      .then((paypal) => {
        if (!paypal || !window.paypal) {
          console.error("PayPal SDK not available.");
          return;
        }

        // Render PayPal Buttons
        window.paypal
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
                // Handle success, such as updating order status
              });
            },
            onError: (err) => {
              console.error("PayPal Button Error:", err);
              alert("An error occurred during the transaction.");
            },
          })
          .render("#paypal-button-container");
      })
      .catch((error) => {
        console.error("Failed to load PayPal script:", error);
      });

    // Cleanup PayPal buttons on component unmount
    return () => {
      const buttonContainer = document.getElementById(
        "paypal-button-container"
      );
      if (buttonContainer) {
        buttonContainer.innerHTML = "";
      }
    };
  }, [amount]);

  return <div id="paypal-button-container"></div>;
}
