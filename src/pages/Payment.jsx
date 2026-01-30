import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState(null);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const data =
      state || JSON.parse(localStorage.getItem("checkoutData"));

    if (!data || !data.total) {
      navigate("/cart", { replace: true });
      return;
    }

    setCheckoutData(data);
  }, [state, navigate]);

  /* ================= LOAD RAZORPAY ================= */
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  if (!checkoutData) return null;

  /* ================= PAY ================= */
  const payNow = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: "rzp_test_S0cfplCvzKC0nm",
      amount: checkoutData.total * 100,
      currency: "INR",
      name: "SkyVolt Energy",
      description: "Renewable Plant Installation",

      handler: response => {
        localStorage.removeItem("checkoutData");

        navigate("/order-success", {
          replace: true,
          state: {
            paymentId: response.razorpay_payment_id,
            order: checkoutData,
          },
        });
      },

      prefill: {
        name: checkoutData.address?.name || "Customer",
        contact:
          checkoutData.address?.mobile || "",
      },

      theme: { color: "#6f42c1" },

      method: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true,
      },
    };

    new window.Razorpay(options).open();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center checkout-page">
      <div className="card checkout-card text-center shadow">
        <div className="card-body p-4">
          <h2 className="fw-bold mb-3">Payment</h2>

          <p className="fs-5 mb-4">
            Total Payable:
            <span className="fw-bold text-success ms-2">
              ₹ {checkoutData.total}
            </span>
          </p>

          <button
            onClick={payNow}
            className="btn btn-purple w-100 py-3 mb-3"
          >
            Pay with UPI / QR / Card
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="btn btn-outline-secondary w-100"
          >
            ⬅ Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
