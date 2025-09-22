import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";

export const Payment = () => {
  useEffect(() => {
    document.title = "Eventopia"; // Browser tab title
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const { event, formData } = location.state || {};
  const [razorpayKey, setRazorpayKey] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [receiptDetails, setReceiptDetails] = useState(null);

  const amount = 1 * 100; // in paise
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    // Fetch Razorpay key from backend (works locally or on deployed backend)
    fetch(`${BACKEND_URL}/get-razorpay-key`)
      .then((res) => res.json())
      .then((data) => setRazorpayKey(data.key))
      .catch(() => toast.error("Failed to load Razorpay key"));
  }, [BACKEND_URL]);

  if (!event || !formData) {
    return <p className="text-center mt-10">No payment data found.</p>;
  }

  const loadRazorpayScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const generateReceipt = (details) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor("#333");
    doc.text("DYPDPU Event Receipt", 105, 20, null, null, "center");

    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    doc.setFontSize(12);
    doc.setTextColor("#000");

    const info = [
      ["Name", details.name],
      ["Email", details.email],
      ["Phone", details.phone],
      ["Event", details.eventTitle],
      ["Amount Paid", `₹${details.amount}`],
      ["Payment ID", details.paymentId],
      ["Order ID", details.orderId],
      ["Date", new Date().toLocaleString()],
    ];

    let startY = 35;
    info.forEach(([label, value]) => {
      doc.setFont(undefined, "bold");
      doc.text(`${label}:`, 20, startY);
      doc.setFont(undefined, "normal");
      doc.text(`${value}`, 70, startY);
      startY += 10;
    });

    doc.setFontSize(10);
    doc.setTextColor("#555");
    doc.text("Thank you for your payment!", 105, startY + 10, null, null, "center");

    doc.save(`Receipt_${details.name}.pdf`);
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      toast.error("Razorpay SDK failed to load. Check your connection.");
      return;
    }

    try {
      const orderResponse = await fetch(`${BACKEND_URL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const { order } = await orderResponse.json();

      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: "DY Patil Engineering",
        description: `Payment for ${event.title}`,
        order_id: order.id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        handler: async function (response) {
          const verifyResponse = await fetch(`${BACKEND_URL}/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const verifyResult = await verifyResponse.json();

          if (verifyResult.valid) {
            toast.success("Payment successful! 🎉");

            const details = {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              eventTitle: event.title,
              amount: order.amount / 100,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            };

            setReceiptDetails(details);
            setPaymentSuccess(true);
          } else {
            toast.error("Payment verification failed!");
          }
        },
        theme: { color: "#3399cc" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment initiation failed.");
    }
  };

  const downloadReceipt = () => {
    if (receiptDetails) generateReceipt(receiptDetails);
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Pay for {event.title}</h2>
      <p className="text-lg mb-6">Amount: <strong>₹1</strong></p>

      {!paymentSuccess && (
        <button
          onClick={handlePayment}
          className="px-6 py-3 w-full bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          disabled={!razorpayKey}
        >
          {razorpayKey ? "Pay with Razorpay" : "Loading..."}
        </button>
      )}

      {paymentSuccess && (
        <div className="flex flex-col items-center gap-4 mt-6">
          <button
            onClick={() => navigate("/")}
            className="w-48 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Home
          </button>
          <button
            onClick={downloadReceipt}
            className="w-48 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
          >
            Download Receipt
          </button>
        </div>
      )}
    </div>
  );
};
