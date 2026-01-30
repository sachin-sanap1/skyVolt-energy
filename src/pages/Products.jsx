// import { useState } from "react";
// import products from "../data/products";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// const Products = () => {
//   const { addItem, removeItem, cart } = useCart();
//   const navigate = useNavigate();
//   const [toast, setToast] = useState(false);

//   const getQty = (id) =>
//     cart.find((p) => p.id === id)?.qty || 0;

//   const handleAdd = (product) => {
//     addItem(product);
//     setToast(true);
//     setTimeout(() => setToast(false), 3000);
//   };

//   return (
//     <div className="container py-5 position-relative">

//       {/* 🔔 TOAST */}
//       {toast && (
//         <div className="toast-custom">
//           ✅ Item added successfully
//         </div>
//       )}

//       {/* TITLE */}
//       <h2 className="text-center mb-5 fw-bold">
//         Installation Products
//       </h2>

//       {/* PRODUCTS GRID */}
//       <div className="row g-4">
//         {products.map((p) => (
//           <div key={p.id} className="col-sm-6 col-md-4">
//             <div className="card product-card h-100 text-center">
              
//               {/* IMAGE */}
//               <div className="product-image">
//                 <img src={p.img} alt={p.name} />
//               </div>

//               <div className="card-body">
//                 <h5 className="card-title">{p.name}</h5>
//                 <p className="price">₹ {p.price}</p>

//                 {/* ADD / REMOVE */}
//                 <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
//                   <button
//                     className="btn btn-danger btn-circle"
//                     onClick={() => removeItem(p.id)}
//                   >
//                     −
//                   </button>

//                   <span className="fw-bold fs-5">
//                     {getQty(p.id)}
//                   </span>

//                   <button
//                     className="btn btn-success btn-circle"
//                     onClick={() => handleAdd(p)}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ACTION BUTTONS */}
//       <div className="d-flex justify-content-center gap-4 mt-5">
//         <button
//           className="btn btn-secondary px-4 py-2"
//           onClick={() => navigate(-1)}
//         >
//           ⬅ Back
//         </button>

//         <button
//           className="btn btn-primary px-4 py-2"
//           onClick={() => navigate("/cart")}
//         >
//           Go To Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Products;



import { useState } from "react";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";



const Products = () => {
  const { addItem, removeItem, cart } = useCart();
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);

  const getQty = (id) => cart.find((p) => p.id === id)?.qty || 0;

  const handleAdd = (product) => {
    addItem(product);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };


  return (
    <div className="bg-light min-vh-100 py-5">
      {/* 🔔 TOAST */}
      <div 
        className={`fixed-top mt-5 d-flex justify-content-center transition-all ${toast ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ zIndex: 1050, transition: '0.3s' }}
      >
        <div className="bg-dark text-white px-4 py-2 rounded-pill shadow-lg small">
          🛒 Item added to cart successfully!
        </div>
      </div>

      <div className="container">
        {/* HEADER SECTION */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5">
          <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-1 small">
                <li className="breadcrumb-item"><a href="/" className="text-decoration-none text-muted">Home</a></li>
                <li className="breadcrumb-item active text-dark fw-bold">Renewable Energy</li>
              </ol>
            </nav>
            <h2 className="fw-bold mb-0 display-6">Sustainable Power Solutions</h2>
          </div>
          <button className="btn btn-outline-primary fw-bold px-4 mt-3 mt-md-0 shadow-sm" onClick={() => navigate("/cart")}>
            Cart ({cart.length})
          </button>
        </div>

        {/* PRODUCTS GRID */}
        <div className="row g-4">
          {products.map((p) => {
            const qty = getQty(p.id);
            const mrp = p.price + 5000;

            return (
              <div key={p.id} className="col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 border-0 shadow-sm product-card-hover">
                  
                  <div className="position-absolute top-0 start-0 m-2 z-1">
                    <span className="badge bg-danger">20% OFF</span>
                  </div>

                  {/* Wrapper for image logic in CSS */}
                  <div className="product-image-container">
                    <img src={p.images[0]} alt={p.name} />
                  </div>

                  <div className="card-body p-3 d-flex flex-column">
                    <p className="text-muted small mb-1 fw-semibold text-uppercase" style={{letterSpacing: '0.5px'}}>{p.brand}</p>
                    <h6 className="card-title fw-bold mb-2">
                      {p.name}
                    </h6>
                    
                    <div className="d-flex align-items-center gap-1 mb-2">
                      <span className="text-warning small">★★★★☆</span>
                      <span className="text-muted small" style={{fontSize: '0.75rem'}}>(4.2)</span>
                    </div>

                    <div className="mt-auto">
                      <div className="d-flex align-items-baseline gap-2">
                        <h5 className="text-primary fw-bold mb-0">₹{p.price.toLocaleString()}</h5>
                        <span className="text-muted small text-decoration-line-through">₹{mrp.toLocaleString()}</span>
                      </div>

                      <p className="text-success small fw-bold mt-1 mb-3">
                        Free Delivery
                      </p>

                      {qty === 0 ? (
                        <button className="btn btn-primary w-100 py-2 shadow-sm" onClick={() => handleAdd(p)}>
                          Add to Cart
                        </button>
                      ) : (
                        <div className="d-flex align-items-center justify-content-between quantity-toggle py-1 px-1">
                          <button className="btn-qty-action fw-bold" onClick={() => removeItem(p.id)}>−</button>
                          <span className="fw-bold px-2">{qty}</span>
                          <button className="btn-qty-action fw-bold text-primary" onClick={() => handleAdd(p)}>+</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;