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
    fetch(`${BACKEND_URL}/get-razorpay-key`)
      .then((res) => res.json())
      .then((data) => setRazorpayKey(data.key))
      .catch(() => toast.error("Failed to load Razorpay key"));
  }, [BACKEND_URL]);

  if (!event || !formData) {
    return (
      <p className="text-center mt-10 text-red-600 font-semibold text-lg">
        No payment data found.
      </p>
    );
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
    doc.text("Thank You for Participating!", 105, startY + 10, null, null, "center");

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
        theme: { color: "#3B82F6" }, // Blue theme
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
    <div
      className="min-h-screen px-4 py-16 flex justify-center items-start"
      style={{
        backgroundColor: "#0f172a", // dark background (tailwind slate-900)
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated subtle purple glow overlay */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-20%",
          width: "140%",
          height: "140%",
          background:
            "radial-gradient(circle at center, rgba(139,92,246,0.3), transparent 70%)",
          animation: "pulseGlow 10s ease-in-out infinite",
          filter: "blur(100px)",
          zIndex: 0,
        }}
      />
      <style>
        {`
          @keyframes pulseGlow {
            0%, 100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.1);
            }
          }
        `}
      </style>

      <div
        className="max-w-md w-full bg-[#111827] rounded-3xl p-10
          shadow-none transition-all duration-500
          opacity-0 animate-fade-in-up text-blue-400 -translate-y-12 relative z-10
          border border-blue-900
          hover:border-transparent hover:shadow-[0_0_0_2.5px_rgba(255,105,180,0.3)]
          "
      >
        <h2 className="text-3xl font-extrabold mb-6 tracking-tight text-blue-400 text-center">
          {paymentSuccess
            ? "Thank you for participating!"
            : `Pay for ${event.title}`}
        </h2>

        {!paymentSuccess && (
          <p className="text-lg mb-8 text-center text-blue-300">
            Amount:{" "}
            <span className="font-semibold text-blue-400 text-xl">₹1</span>
          </p>
        )}

        {!paymentSuccess ? (
          <button
            onClick={handlePayment}
            disabled={!razorpayKey}
            className={`w-full px-6 py-3 rounded-xl font-semibold text-lg transition
              bg-blue-600 text-white
              hover:bg-blue-900 hover:text-white
              disabled:bg-gray-700 disabled:cursor-not-allowed`}
          >
            {razorpayKey ? "Pay with Razorpay" : "Loading..."}
          </button>
        ) : (
          <div className="flex flex-col items-center gap-4 mt-8">
            <button
              onClick={() => navigate("/")}
              className="w-48 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold transition"
            >
              Go to Home
            </button>
            <button
              onClick={downloadReceipt}
              className="w-48 px-6 py-3 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-semibold transition"
            >
              Download Receipt
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
