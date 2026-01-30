// const OrderSuccess = () => {
//   return (
//     <div className="container py-5 text-center">
//       <h2 className="text-success">Order Placed Successfully 🎉</h2>
//       <p>You will receive delivery in 3–5 days</p>
//     </div>
//   );
// };

// export default OrderSuccess;
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState, useRef } from "react";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [orderId, setOrderId] = useState("");
  const hasExecuted = useRef(false); // The safety lock

  useEffect(() => {
    // Prevent the loop: Only run this block once
    if (hasExecuted.current) return;

    // 1. Handle Order ID
    let savedId = localStorage.getItem("lastOrderId");
    if (!savedId) {
      savedId = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
      localStorage.setItem("lastOrderId", savedId);
    }
    setOrderId(savedId);

    // 2. Clear Cart and lock the execution
    clearCart();
    hasExecuted.current = true;
  }, [clearCart]);

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-7 col-lg-5">
            
            {/* MAIN SUCCESS CARD */}
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="card-body p-0">
                
                {/* TOP BRANDING SECTION */}
                <div className="bg-success p-5 text-center text-white position-relative">
                  <div className="mb-3">
                    <div className="bg-white text-success rounded-circle d-inline-flex align-items-center justify-content-center shadow-lg" 
                         style={{ width: "70px", height: "70px" }}>
                      <span style={{ fontSize: "2.5rem" }}>✓</span>
                    </div>
                  </div>
                  <h3 className="fw-bold mb-1">Payment Successful!</h3>
                  <p className="opacity-75 mb-0 small">Transaction ID: {orderId}</p>
                  
                  {/* Decorative Circles */}
                  <div className="position-absolute top-0 start-0 m-2 opacity-25">● ● ●</div>
                </div>

                {/* DETAILS SECTION */}
                <div className="p-4 bg-white">
                  <div className="mb-4">
                    <h6 className="fw-bold text-uppercase small text-muted mb-3">Order Details</h6>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Status</span>
                      <span className="badge bg-success-subtle text-success">Confirmed</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Estimated Delivery</span>
                      <span className="fw-bold">04 Feb - 06 Feb</span>
                    </div>
                  </div>

                  <hr className="border-dashed" />

                  {/* STEPPER TRACKER */}
                  <div className="py-3">
                    <div className="d-flex justify-content-between small text-center px-2">
                      <div className="text-success fw-bold">
                        <div className="bg-success text-white rounded-circle mx-auto mb-1" style={{width:"20px", height:"20px", fontSize:"12px"}}>1</div>
                        Placed
                      </div>
                      <div className="text-muted">
                        <div className="bg-light border rounded-circle mx-auto mb-1" style={{width:"20px", height:"20px", fontSize:"12px"}}>2</div>
                        Packed
                      </div>
                      <div className="text-muted">
                        <div className="bg-light border rounded-circle mx-auto mb-1" style={{width:"20px", height:"20px", fontSize:"12px"}}>3</div>
                        Shipped
                      </div>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="mt-4">
                    <button 
                      className="btn btn-dark w-100 py-3 fw-bold rounded-3 mb-3"
                      onClick={() => navigate("/orders")}
                    >
                      Track Your Package
                    </button>
                    <button 
                      className="btn btn-outline-secondary w-100 py-2 fw-bold border-0"
                      onClick={() => {
                        localStorage.removeItem("lastOrderId"); // Clear ID for next order
                        navigate("/products");
                      }}
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* TRUST FOOTER */}
            <div className="text-center mt-4">
              <p className="text-muted small">
                An invoice has been sent to your email. <br />
                Questions? <span className="text-primary fw-bold cursor-pointer">Chat with Support</span>
              </p>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .border-dashed { border-top: 2px dashed #dee2e6; }
        .rounded-4 { border-radius: 1.25rem !important; }
        .bg-success { background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%) !important; }
        .shadow-lg { box-shadow: 0 1rem 3rem rgba(0,0,0,.1) !important; }
      `}</style>
    </div>
  );
};

export default OrderSuccess;