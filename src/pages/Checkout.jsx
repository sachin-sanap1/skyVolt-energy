// import { useLocation, useNavigate } from "react-router-dom";

// const Checkout = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   if (!state?.total) {
//     return (
//       <div className="container py-5 text-center">
//         <p className="text-danger fw-semibold">
//           Invalid payment session. Please go back to cart.
//         </p>
//         <button
//           onClick={() => navigate("/cart")}
//           className="btn btn-primary mt-3"
//         >
//           Go to Cart
//         </button>
//       </div>
//     );
//   }

//   const payNow = () => {
//     const options = {
//       key: "rzp_test_S0cfplCvzKC0nm",
//       amount: state.total * 100,
//       currency: "INR",
//       name: "SkyVolt Energy",
//       description: "Renewable Plant Installation",

//       handler: function (response) {
//         alert("Payment Successful ✅");
//         console.log(response);
//       },

//       method: {
//         upi: true,
//         card: true,
//         netbanking: true,
//         wallet: true,
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center checkout-page">
//       <div className="card checkout-card text-center">
//         <div className="card-body p-4">

//           <h2 className="fw-bold mb-3">Payment</h2>

//           <p className="fs-5 mb-4">
//             Total Payable:
//             <span className="fw-bold text-success ms-2">
//               ₹ {state.total}
//             </span>
//           </p>

//           <button
//             onClick={payNow}
//             className="btn btn-purple w-100 py-3 mb-3"
//           >
//             Pay with UPI / QR
//           </button>

//           <button
//             onClick={() => navigate("/cart")}
//             className="btn btn-outline-secondary w-100"
//           >
//             ⬅ Back to Cart
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;


import { useCart } from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    total = 0,
    deliveryDate,
    installationCost = 0,
    discount = 0,
  } = location.state || {};

  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "",
    addressLine: "",
    landmark: "",
  });

  const [policyAccepted, setPolicyAccepted] = useState(false);

  const isServiceable = address.pincode.length === 6;

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const data = await res.json();
        const addr = data.address;
        setAddress({
          ...address,
          pincode: addr.postcode || "",
          city: addr.city || addr.town || addr.village || "",
          state: addr.state || "",
          addressLine: data.display_name || "",
        });
      } catch {
        alert("Unable to fetch address");
      }
    });
  };

  const handleProceed = () => {
    if (!address.name || !address.mobile || !isServiceable) {
      alert("Please complete the address details correctly.");
      return;
    }
    const checkoutData = { cart, address, total, deliveryDate, installationCost, discount };
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    navigate("/payment", { state: checkoutData });
  };

  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* 1. PROGRESS STEPPER */}
      <div className="bg-white border-bottom py-3 mb-4 sticky-top">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="text-muted small fw-bold">CART</div>
          <div className="mx-3 border-top" style={{ width: "40px" }}></div>
          <div className="text-primary small fw-bold">ADDRESS</div>
          <div className="mx-3 border-top" style={{ width: "40px" }}></div>
          <div className="text-muted small fw-bold">PAYMENT</div>
        </div>
      </div>

      <div className="container">
        <div className="row g-4">
          {/* LEFT: ADDRESS FORM */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0">Contact Details</h5>
                  <button className="btn btn-sm btn-outline-primary" onClick={handleUseCurrentLocation}>
                    <i className="bi bi-geo-alt"></i> Auto-fill Location
                  </button>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small text-muted">Full Name</label>
                    <input 
                      className="form-control form-control-lg fs-6" 
                      value={address.name}
                      onChange={(e) => setAddress({...address, name: e.target.value})}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small text-muted">Mobile Number</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">+91</span>
                      <input 
                        className="form-control form-control-lg fs-6" 
                        value={address.mobile}
                        onChange={(e) => setAddress({...address, mobile: e.target.value})}
                      />
                    </div>
                  </div>

                  <h5 className="fw-bold mt-4 mb-2">Address Details</h5>
                  
                  <div className="col-md-4">
                    <label className="form-label small text-muted">Pincode</label>
                    <input 
                      className={`form-control ${address.pincode && (isServiceable ? "is-valid" : "is-invalid")}`}
                      value={address.pincode}
                      onChange={(e) => setAddress({...address, pincode: e.target.value})}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small text-muted">City</label>
                    <input className="form-control" value={address.city} readOnly bg-light />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small text-muted">State</label>
                    <input className="form-control" value={address.state} readOnly bg-light />
                  </div>

                  <div className="col-12">
                    <label className="form-label small text-muted">House No. / Building / Street</label>
                    <textarea 
                      className="form-control" 
                      rows="2"
                      value={address.addressLine}
                      onChange={(e) => setAddress({...address, addressLine: e.target.value})}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* POLICY CARD */}
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h6 className="fw-bold mb-3">Order Policies</h6>
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={policyAccepted}
                    onChange={() => setPolicyAccepted(!policyAccepted)}
                    id="policy"
                  />
                  <label className="form-check-label small text-muted" htmlFor="policy">
                    I confirm that all items in my cart are eligible for delivery to my location and I agree to the terms of service.
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: SUMMARY STICKY */}
          <div className="col-lg-4">
            <div className="sticky-top" style={{ top: "100px" }}>
              <div className="card border-0 shadow-sm mb-3">
                <div className="card-body">
                  <h6 className="fw-bold mb-3">Price Details ({cart.length} Items)</h6>
                  <div className="d-flex justify-content-between mb-2 small">
                    <span>Total MRP</span>
                    <span>₹{total + discount - installationCost}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2 small text-success">
                    <span>Discount</span>
                    <span>- ₹{discount}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2 small">
                    <span>Installation</span>
                    <span>₹{installationCost}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2 small">
                    <span>Delivery Charges</span>
                    <span className="text-success">FREE</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                    <span>Total Amount</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>

                  <button 
                    className="btn btn-primary w-100 py-3 fw-bold shadow"
                    disabled={!policyAccepted || !isServiceable}
                    onClick={handleProceed}
                  >
                    CONTINUE TO PAYMENT
                  </button>
                </div>
              </div>
              
              <div className="bg-white p-3 rounded border text-center">
                 <p className="mb-0 x-small text-muted" style={{fontSize: "0.7rem"}}>
                   🔒 Secure checkout with SSL encryption
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;