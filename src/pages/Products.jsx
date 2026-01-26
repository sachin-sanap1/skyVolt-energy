import { useState } from "react";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { addItem, removeItem, cart } = useCart();
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);

  const getQty = (id) =>
    cart.find((p) => p.id === id)?.qty || 0;

  const handleAdd = (product) => {
    addItem(product);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div className="container py-5 position-relative">

      {/* 🔔 TOAST */}
      {toast && (
        <div className="toast-custom">
          ✅ Item added successfully
        </div>
      )}

      {/* TITLE */}
      <h2 className="text-center mb-5 fw-bold">
        Installation Products
      </h2>

      {/* PRODUCTS GRID */}
      <div className="row g-4">
        {products.map((p) => (
          <div key={p.id} className="col-sm-6 col-md-4">
            <div className="card product-card h-100 text-center">
              
              {/* IMAGE */}
              <div className="product-image">
                <img src={p.img} alt={p.name} />
              </div>

              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="price">₹ {p.price}</p>

                {/* ADD / REMOVE */}
                <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
                  <button
                    className="btn btn-danger btn-circle"
                    onClick={() => removeItem(p.id)}
                  >
                    −
                  </button>

                  <span className="fw-bold fs-5">
                    {getQty(p.id)}
                  </span>

                  <button
                    className="btn btn-success btn-circle"
                    onClick={() => handleAdd(p)}
                  >
                    +
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ACTION BUTTONS */}
      <div className="d-flex justify-content-center gap-4 mt-5">
        <button
          className="btn btn-secondary px-4 py-2"
          onClick={() => navigate(-1)}
        >
          ⬅ Back
        </button>

        <button
          className="btn btn-primary px-4 py-2"
          onClick={() => navigate("/cart")}
        >
          Go To Cart
        </button>
      </div>
    </div>
  );
};

export default Products;
