import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(
    product.images[0]
  );

  if (!product) {
    return <h4 className="text-center">Product not found</h4>;
  }

  const discountPercent = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100
  );

  return (
    <div className="container py-4">
      <div className="row">

        {/* ================= IMAGES ================= */}
        <div className="col-md-5">
          <img
            src={selectedImage}
            className="img-fluid rounded mb-3"
            alt={product.name}
          />

          <div className="d-flex">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                width="70"
                height="70"
                className={`me-2 rounded border ${
                  selectedImage === img ? "border-primary" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* ================= DETAILS ================= */}
        <div className="col-md-7">
          <h3 className="fw-bold">{product.name}</h3>
          <p className="text-muted">{product.description}</p>

          {/* ================= PRICE ================= */}
          <div className="mb-3">
            <h4 className="text-success d-inline me-2">
              ₹ {product.price}
            </h4>
            <span className="text-muted text-decoration-line-through">
              ₹ {product.mrp}
            </span>
            <span className="badge bg-success ms-2">
              {discountPercent}% OFF
            </span>
          </div>

          {/* ================= RATINGS ================= */}
          <p>
            ⭐ {product.rating} / 5
            <span className="text-muted">
              {" "}({product.reviews} reviews)
            </span>
          </p>

          {/* ================= DELIVERY ================= */}
          <p>
            <b>Delivery:</b>{" "}
            <span className="text-success">
              {product.deliveryTime}
            </span>
          </p>

          {/* ================= INSTALLATION ================= */}
          {product.installationCost > 0 && (
            <p>
              <b>Installation:</b>{" "}
              ₹ {product.installationCost} (optional)
            </p>
          )}

          {/* ================= WARRANTY & RETURN ================= */}
          <p><b>Warranty:</b> {product.warranty}</p>
          <p>
            <b>Return Policy:</b>{" "}
            {product.returnDays
              ? `${product.returnDays} days replacement`
              : "Non-returnable"}
          </p>

          {/* ================= STOCK ================= */}
          <p>
            <b>Availability:</b>{" "}
            {product.stock > 0 ? (
              <span className="text-success">In Stock</span>
            ) : (
              <span className="text-danger">Out of Stock</span>
            )}
          </p>

          {/* ================= ACTIONS ================= */}
          <div className="mt-4">
            <button
              className="btn btn-success me-2"
              disabled={product.stock === 0}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

            <button
              className="btn btn-primary"
              disabled={product.stock === 0}
              onClick={() => {
                addToCart(product);
                navigate("/cart");
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ================= SPECIFICATIONS ================= */}
      <div className="row mt-5">
        <div className="col-md-12">
          <h5 className="fw-bold">Specifications</h5>
          <ul className="list-group">
            {product.specifications.map((spec, index) => (
              <li key={index} className="list-group-item">
                {spec}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ================= HIGHLIGHTS ================= */}
      <div className="row mt-4">
        <div className="col-md-12">
          <h5 className="fw-bold">Product Highlights</h5>
          <ul>
            {product.highlights.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
