import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";

export const Payment = () => {
  const location = useLocation();
  const { event, formData } = location.state || {};
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [uploadedScreenshot, setUploadedScreenshot] = useState(null);
  const receiptRef = useRef();

  if (!event || !formData) {
    return <p className="text-center mt-10">No payment data found.</p>;
  }

  const qrImageUrl =
    "https://media.licdn.com/dms/image/v2/D4D22AQExj539MOOSoQ/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1715233337237?e=2147483647&v=beta&t=Hj0ywev9p55jABZrDxgBVB5a6sYiJ1OxgbrgMnynD2c";
  const logoUrl = "https://engg.dypvp.edu.in/images/DIT-logo-new-second-2.png";
  const amount = 500;

  const handlePaymentComplete = () => {
    setPaymentCompleted(true);
  };

  const handleScreenshotUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedScreenshot(url);
      toast.success("Payment screenshot uploaded successfully!"); // Only toast here
    }
  };

  const handleDownloadReceipt = async () => {
    if (receiptRef.current) {
      const canvas = await html2canvas(receiptRef.current, { scale: 2 });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${event.title}_PaymentReceipt.png`;
      link.click();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Payment for {event.title}</h2>
      <p className="text-lg mb-4">
        Course Price: <strong>₹{amount}</strong>
      </p>

      {!paymentCompleted ? (
        <>
          <img
            src={qrImageUrl}
            alt="Payment QR"
            className="mx-auto w-48 h-48 object-contain border rounded-lg"
          />
          <p className="mt-2 text-gray-600">Scan this QR to pay via UPI</p>

          <button
            onClick={handlePaymentComplete}
            className="mt-6 px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Payment Done
          </button>
        </>
      ) : (
        <>
          {/* Receipt */}
          <div
            ref={receiptRef}
            className="p-4 bg-gray-50 border rounded-lg mt-4 text-left"
          >
            <div className="text-center mb-4">
              <img src={logoUrl} alt="College Logo" className="mx-auto w-24 h-auto" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Payment Receipt</h3>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Course:</strong> {event.title}</p>
            <p><strong>Amount:</strong> ₹{amount}</p>

            <div className="mt-4 text-center">
              <p className="mb-2 font-medium">Payment QR Code:</p>
              <img
                src={qrImageUrl}
                alt="Payment QR"
                className="mx-auto w-32 h-32 border rounded-lg"
              />
            </div>

            {uploadedScreenshot && (
              <div className="mt-4 text-center">
                <p className="mb-2 font-medium">Uploaded Payment Screenshot:</p>
                <img
                  src={uploadedScreenshot}
                  alt="Uploaded Payment"
                  className="mx-auto w-48 h-48 border rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Upload screenshot */}
          <div className="mt-6">
            <label className="block mb-2 font-medium">
              Upload your payment screenshot:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleScreenshotUpload}
              className="mb-4"
            />
          </div>

          {/* Download only after screenshot uploaded */}
          {uploadedScreenshot && (
            <button
              onClick={handleDownloadReceipt}
              className="mt-4 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Download Complete Receipt
            </button>
          )}
        </>
      )}
    </div>
  );
};
