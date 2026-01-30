
// import { useCart } from "../context/CartContext";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const { cart } = useCart();
//   const navigate = useNavigate();

//   const [coupon, setCoupon] = useState("");
//   const [couponActive, setCouponActive] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [installerCost, setInstallerCost] = useState(0);

//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [notes, setNotes] = useState("");

//   /* ================= CALCULATIONS ================= */
//   const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
//   const discount =
//     couponActive && coupon === "SAVE30" ? subtotal * 0.3 : 0;

//   const total = subtotal + installerCost - discount;

//   /* ================= PROMO TIMER ================= */
//   useEffect(() => {
//     if (!couponActive) return;

//     if (timeLeft <= 0) {
//       setCouponActive(false);
//       setCoupon("");
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((t) => t - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [couponActive, timeLeft]);

//   /* ================= APPLY COUPON ================= */
//   const applyCoupon = () => {
//     if (coupon === "SAVE30") {
//       setCouponActive(true);
//       setTimeLeft(300);
//     }
//   };

//   /* ================= TIME FORMAT ================= */
//   const formatTime = () => {
//     const min = Math.floor(timeLeft / 60);
//     const sec = timeLeft % 60;
//     return `${min}:${sec < 10 ? "0" : ""}${sec}`;
//   };

//   /* ================= DELIVERY WINDOW ================= */
//   const expectedDelivery = deliveryDate
//     ? new Date(
//         new Date(deliveryDate).getTime() + 3 * 24 * 60 * 60 * 1000
//       ).toDateString()
//     : null;

//   return (
//     <div className="container py-5 cart-page">

//       <h2 className="fw-bold mb-4 text-center">Your Cart</h2>

//       {cart.length === 0 && (
//         <p className="text-muted text-center">Your cart is empty</p>
//       )}

//       {/* CART ITEMS */}
//       {cart.map((item) => (
//         <div key={item.id} className="card mb-3">
//           <div className="card-body d-flex align-items-center gap-4">
//             <img src={item.img} alt={item.name} width="80" />
//             <div className="flex-grow-1">
//               <h5>{item.name}</h5>
//               <p className="mb-0">Qty: {item.qty}</p>
//             </div>
//             <h5 className="text-success">
//               ₹ {item.price * item.qty}
//             </h5>
//           </div>
//         </div>
//       ))}

//       {/* DELIVERY DATE */}
//       <div className="mt-4">
//         <label className="form-label fw-semibold">
//           Select Delivery Date
//         </label>
//         <input
//           type="date"
//           className="form-control"
//           value={deliveryDate}
//           min={new Date().toISOString().split("T")[0]}
//           onChange={(e) => setDeliveryDate(e.target.value)}
//         />
//         {expectedDelivery && (
//           <small className="text-muted">
//             Expected delivery by <b>{expectedDelivery}</b>
//           </small>
//         )}
//       </div>

//       {/* INSTALLATION */}
//       <div className="mt-4">
//         <label className="form-label fw-semibold">
//           Installation Service
//         </label>
//         <select
//           className="form-select"
//           onChange={(e) => setInstallerCost(Number(e.target.value))}
//         >
//           <option value={0}>Self Installation (₹0)</option>
//           <option value={60000}>
//             Professional Installation (₹75,000)
//           </option>
//         </select>
//       </div>

//       {/* PROMO */}
//       <div className="mt-4">
//         <label className="form-label fw-semibold">Promo Code</label>
//         <div className="input-group">
//           <input
//             value={coupon}
//             onChange={(e) => setCoupon(e.target.value)}
//             className="form-control"
//             placeholder="Enter promo code"
//           />
//           <button className="btn btn-success" onClick={applyCoupon}>
//             Apply
//           </button>
//         </div>

//         {couponActive && (
//           <p className="text-success mt-2">
//             Promo valid for: {formatTime()}
//           </p>
//         )}
//       </div>

//       {/* RETURN POLICY */}
//       <div className="card mt-4">
//         <div className="card-body">
//           <h5 className="fw-bold">Return & Replacement Policy</h5>
//           <ul className="mb-0">
//             <li>✅ 7 days replacement available</li>
//             <li>✅ Defective products eligible for free return</li>
//             <li>❌ No return after 7 days of delivery</li>
//           </ul>
//         </div>
//       </div>

//       {/* CUSTOMER NOTES */}
//       <div className="mt-4">
//         <label className="form-label fw-semibold">
//           Special Instructions
//         </label>
//         <textarea
//           className="form-control"
//           rows="3"
//           placeholder="Any delivery or installation instructions..."
//           value={notes}
//           onChange={(e) => setNotes(e.target.value)}
//         />
//       </div>

//       {/* SUMMARY */}
//       <div className="card mt-4">
//         <div className="card-body">
//           <div className="d-flex justify-content-between">
//             <span>Subtotal</span>
//             <span>₹ {subtotal}</span>
//           </div>
//           <div className="d-flex justify-content-between">
//             <span>Installation</span>
//             <span>₹ {installerCost}</span>
//           </div>
//           <div className="d-flex justify-content-between text-success">
//             <span>Discount</span>
//             <span>- ₹ {discount}</span>
//           </div>
//           <hr />
//           <div className="d-flex justify-content-between fw-bold fs-5">
//             <span>Total</span>
//             <span>₹ {total}</span>
//           </div>
//         </div>
//       </div>

//       {/* ACTIONS */}
//       <div className="d-flex gap-3 mt-4">
//         <button
//           className="btn btn-secondary flex-fill"
//           onClick={() => navigate("/products")}
//         >
//           ⬅ Back
//         </button>

//         <button
//           className="btn btn-primary flex-fill"
//           onClick={() =>
//             navigate("/checkout", {
//               state: {
//                 total,
//                 deliveryDate,
//                 notes,
//                 returnPolicy: "7 Days Replacement",
//               },
//             })
//           }
//         >
//           Proceed to Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cart;

// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// const Cart = () => {
//   const { cart } = useCart();
//   const navigate = useNavigate();

//   /* ================= PROMO ================= */
//   const [promo, setPromo] = useState("");
//   const [promoActive, setPromoActive] = useState(false);
//   const [promoTime, setPromoTime] = useState(0);

//   /* ================= INSTALLATION ================= */
//   const [installSelected, setInstallSelected] = useState(true);

//   /* ================= PRICE ================= */
//   const subtotal = cart.reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   );

//   const installationCost = installSelected
//     ? cart.reduce(
//         (sum, item) =>
//           item.installationRequired
//             ? sum + (item.installationCost || 0)
//             : sum,
//         0
//       )
//     : 0;

//   const discount =
//     promoActive && promo === "SAVE30"
//       ? subtotal * 0.3
//       : 0;

//   const total = subtotal + installationCost - discount;

//   /* ================= DELIVERY CALC ================= */
//   const maxDeliveryDays = Math.max(
//     ...cart.map(item => {
//       const days = item.deliveryTime?.match(/\d+/g);
//       return days ? Number(days[1] || days[0]) : 5;
//     }),
//     0
//   );

//   const deliveryDate = new Date();
//   deliveryDate.setDate(deliveryDate.getDate() + maxDeliveryDays);

//   /* ================= PROMO TIMER ================= */
//   useEffect(() => {
//     if (!promoActive) return;

//     if (promoTime <= 0) {
//       setPromoActive(false);
//       setPromo("");
//       return;
//     }

//     const timer = setInterval(() => {
//       setPromoTime(t => t - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [promoActive, promoTime]);

//   const applyPromo = () => {
//     if (promo === "SAVE30") {
//       setPromoActive(true);
//       setPromoTime(300);
//     }
//   };

//   const formatTime = () => {
//     const m = Math.floor(promoTime / 60);
//     const s = promoTime % 60;
//     return `${m}:${s < 10 ? "0" : ""}${s}`;
//   };

//   /* ================= RETURN POLICY ================= */
//   const isReturnable = cart.some(
//     item => item.returnPolicy?.returnable
//   );

//   return (
//     <div className="container py-5">

//       <h2 className="fw-bold text-center mb-4">
//         Review Your Order
//       </h2>

//       {/* CART ITEMS */}
//       {cart.map(item => (
//         <div key={item.id} className="card mb-3">
//           <div className="card-body d-flex gap-4">
//             <img
//               src={item.images[0]}
//               width="80"
//               alt={item.name}
//             />

//             <div className="flex-grow-1">
//               <h5>{item.name}</h5>
//               <p className="mb-1">Qty: {item.qty}</p>
//               <p className="text-muted mb-0">
//                 Delivery: {item.deliveryTime}
//               </p>
//             </div>

//             <h5 className="text-success">
//               ₹ {item.price * item.qty}
//             </h5>
//           </div>
//         </div>
//       ))}

//       {/* DELIVERY */}
//       <div className="card mt-4">
//         <div className="card-body">
//           <h5 className="fw-bold">Delivery</h5>
//           <p>
//             Estimated delivery by:
//             <b> {deliveryDate.toDateString()}</b>
//           </p>
//           <p className="text-muted mb-0">
//             Delivery date is auto-calculated based on product type.
//           </p>
//         </div>
//       </div>

//       {/* INSTALLATION */}
//       <div className="card mt-4">
//         <div className="card-body">
//           <h5 className="fw-bold">Installation Service</h5>

//           <div className="form-check">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               checked={installSelected}
//               onChange={() =>
//                 setInstallSelected(!installSelected)
//               }
//             />
//             <label className="form-check-label">
//               Professional Installation
//             </label>
//           </div>

//           {installSelected && (
//             <p className="text-muted mt-2">
//               Installation Cost: ₹ {installationCost}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* PROMO */}
//       <div className="card mt-4">
//         <div className="card-body">
//           <h5 className="fw-bold">Promo Code</h5>

//           <div className="input-group">
//             <input
//               value={promo}
//               onChange={(e) => setPromo(e.target.value)}
//               className="form-control"
//               placeholder="Enter promo code"
//             />
//             <button
//               className="btn btn-success"
//               onClick={applyPromo}
//             >
//               Apply
//             </button>
//           </div>

//           {promoActive && (
//             <p className="text-success mt-2">
//               Promo valid for: {formatTime()}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* RETURN POLICY */}
//       <div className="card mt-4">
//         <div className="card-body">
//           <h5 className="fw-bold">Return / Replacement</h5>

//           {cart.map(item => (
//             <p key={item.id} className="mb-1">
//               <b>{item.name}:</b>{" "}
//               {item.returnPolicy?.replacement
//                 ? `${item.returnPolicy.days} days replacement`
//                 : "Non-returnable"}
//             </p>
//           ))}

//           {!isReturnable && (
//             <p className="text-danger mt-2">
//               ⚠ This order is non-returnable
//             </p>
//           )}
//         </div>
//       </div>

//       {/* SUMMARY */}
//       <div className="card mt-4">
//         <div className="card-body">
//           <div className="d-flex justify-content-between">
//             <span>Subtotal</span>
//             <span>₹ {subtotal}</span>
//           </div>

//           <div className="d-flex justify-content-between">
//             <span>Installation</span>
//             <span>₹ {installationCost}</span>
//           </div>

//           <div className="d-flex justify-content-between text-success">
//             <span>Discount</span>
//             <span>- ₹ {discount}</span>
//           </div>

//           <hr />

//           <div className="d-flex justify-content-between fw-bold fs-5">
//             <span>Total</span>
//             <span>₹ {total}</span>
//           </div>
//         </div>
//       </div>

//       {/* ACTION */}
//       <button
//         className="btn btn-primary w-100 mt-4"
//         disabled={cart.length === 0}
//         onClick={() =>
//           navigate("/checkout", {
//             state: {
//               total,
//               deliveryDate,
//               installationCost,
//               discount,
//             },
//           })
//         }
//       >
//         Confirm & Continue
//       </button>

//     </div>
//   );
// };

// export default Cart;



import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Cart = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const INSTALLATION_FEE = 75000; // Fixed Professional Cost

  /* ================= STATE ================= */
  const [promo, setPromo] = useState("");
  const [promoActive, setPromoActive] = useState(false);
  const [installSelected, setInstallSelected] = useState(false); // Default to false

  /* ================= PRICE CALCULATIONS ================= */
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  
  // Adds 75,000 only if the toggle is selected
  const activeInstallationCost = installSelected ? INSTALLATION_FEE : 0;

  const discount = promoActive && promo === "SAVE30" ? subtotal * 0.3 : 0;
  const total = subtotal + activeInstallationCost - discount;

  /* ================= DELIVERY CALC ================= */
  const maxDeliveryDays = Math.max(
    ...cart.map(item => {
      const days = item.deliveryTime?.match(/\d+/g);
      return days ? Number(days[1] || days[0]) : 5;
    }),
    0
  );

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + maxDeliveryDays);

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row g-4">
          
          {/* LEFT: Product List & Services */}
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold mb-0">Shopping Cart</h3>
              <span className="text-muted">{cart.length} Items Selected</span>
            </div>

            {/* PRODUCT CARDS */}
            {cart.map((item) => (
              <div key={item.id} className="card border-0 shadow-sm mb-3">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center">
                    <img
                      src={item.images[0]}
                      className="rounded border"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                      alt={item.name}
                    />
                    <div className="ms-4 flex-grow-1">
                      <h5 className="fw-bold mb-1">{item.name}</h5>
                      <p className="text-muted small mb-2">Quantity: {item.qty}</p>
                      <div className="d-flex align-items-center gap-3">
                        <span className="text-success fw-bold fs-5">₹ {item.price.toLocaleString("en-IN")}</span>
                        <span className="badge bg-light text-dark border">Free Delivery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* PROFESSIONAL SERVICE CARD (The Industry Standard Toggle) */}
            <div className="card border-0 shadow-sm mt-4 overflow-hidden" style={{ borderLeft: "5px solid #0d6efd" }}>
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="fw-bold mb-1 text-primary">
                      Professional Installation Service
                    </h5>
                    <p className="text-muted mb-0 small">
                      Our certified engineers will handle the setup and testing at your site.
                    </p>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold fs-5 mb-1">₹ {INSTALLATION_FEE.toLocaleString("en-IN")}</div>
                    <div className="form-check form-switch d-flex justify-content-end">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="installToggle"
                        style={{ width: "2.5em", height: "1.25em", cursor: "pointer" }}
                        checked={installSelected}
                        onChange={() => setInstallSelected(!installSelected)}
                      />
                    </div>
                  </div>
                </div>
                {installSelected && (
                  <div className="alert alert-primary mt-3 mb-0 py-2 small">
                    ✓ Professional service added to your order
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary (Sticky) */}
          <div className="col-lg-4">
            <div className="sticky-top" style={{ top: "2rem" }}>
              <div className="card border-0 shadow-sm p-3 mb-3">
                <div className="card-body">
                  <h5 className="fw-bold mb-4">Order Summary</h5>
                  
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Bag Total</span>
                    <span>₹ {subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Installation Fee</span>
                    <span className={installSelected ? "text-dark" : "text-muted"}>
                      {installSelected ? `+ ₹ ${INSTALLATION_FEE.toLocaleString("en-IN")}` : "₹ 0"}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between mb-3 text-success">
                    <span>Delivery Charges</span>
                    <span className="fw-bold">FREE</span>
                  </div>

                  {discount > 0 && (
                    <div className="d-flex justify-content-between mb-3 text-danger">
                      <span>Discount (30%)</span>
                      <span>- ₹ {discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <hr />

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <span className="fw-bold fs-5">Total Amount</span>
                    <span className="fw-bold fs-4 text-primary">₹ {total.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="card bg-light border-0 mb-4">
                    <div className="card-body py-2 px-3">
                      <small className="text-muted d-block">Estimated Delivery By:</small>
                      <strong className="small">{deliveryDate.toDateString()}</strong>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary w-100 py-3 fw-bold shadow"
                    disabled={cart.length === 0}
                    onClick={() => navigate("/checkout", { state: { total } })}
                  >
                    CONFIRM ORDER
                  </button>

                  <div className="mt-4 text-center">
                    <p className="text-muted x-small" style={{ fontSize: "0.75rem" }}>
                      Safe and Secure Payments. 100% Authentic products.
                    </p>
                  </div>
                </div>
              </div>

              {/* Promo Section */}
              <div className="card border-0 shadow-sm p-3">
                <div className="card-body">
                  <p className="fw-bold small mb-2">Apply Coupon</p>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Try SAVE30"
                      value={promo}
                      onChange={(e) => setPromo(e.target.value)}
                    />
                    <button 
                      className="btn btn-dark" 
                      onClick={() => {
                        if(promo === "SAVE30") setPromoActive(true);
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;