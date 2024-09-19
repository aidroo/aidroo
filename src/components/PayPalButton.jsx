"use client";

import { loadScript } from "@paypal/paypal-js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PayPalButton({ amount }) {
  const router = useRouter();
  useEffect(() => {
    // Load PayPal script
    const paypalScript = loadScript({
      "client-id":
        "AbPIoLdiQSgysc-5-EYEDClClsoLPDz4yX5yK5vr5wSy1WEX8fcU72qsDTST5QbPCoDxg0V8dQgV3hhQ",
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
                router.push("/success");
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

// import axios from "axios";
// import { useEffect, useState } from "react";

// const PayPalButton = ({ amount }) => {
//   const [paypalLoaded, setPaypalLoaded] = useState(false);

//   // Load PayPal SDK dynamically
//   useEffect(() => {
//     if (paypalLoaded) return; // Avoid multiple loads

//     const loadPayPalScript = async () => {
//       const script = document.createElement("script");
//       script.src = `https://www.paypal.com/sdk/js?client-id=AbPIoLdiQSgysc-5-EYEDClClsoLPDz4yX5yK5vr5wSy1WEX8fcU72qsDTST5QbPCoDxg0V8dQgV3hhQ`;
//       script.onload = () => setPaypalLoaded(true);
//       document.body.appendChild(script);
//     };

//     loadPayPalScript();
//   }, [paypalLoaded]);

//   const createOrder = async () => {
//     try {
//       const response = await axios.post("/api/paypal/create-order", {
//         amount,
//       });
//       return response.data.id;
//     } catch (error) {
//       console.error("Error creating PayPal order:", error);
//       throw error;
//     }
//   };

//   const onApprove = async (data) => {
//     try {
//       const response = await axios.post("/api/paypal/capture-order", {
//         orderId: data.orderID,
//       });
//       if (response.data.status === "COMPLETED") {
//         alert("Payment Successful!");
//         // Redirect or update UI accordingly
//       }
//     } catch (error) {
//       console.error("Error capturing PayPal order:", error);
//       alert("Payment failed");
//     }
//   };

//   useEffect(() => {
//     if (paypalLoaded && window.paypal) {
//       window.paypal
//         .Buttons({
//           createOrder: () => createOrder(),
//           onApprove: (data) => onApprove(data),
//         })
//         .render("#paypal-button-container");
//     }
//   }, [paypalLoaded]);

//   return (
//     <div>
//       <div id="paypal-button-container"></div>
//     </div>
//   );
// };

// export default PayPalButton;
