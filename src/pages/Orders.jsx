import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();

  // Mocking professional data structure
  const orders = [
    {
      id: "ORD-9928374",
      date: "28 Jan 2026",
      status: "Delivered",
      total: 120000,
      itemCount: 2,
      imageUrl: "https://via.placeholder.com/80", // Replace with real product image
      productName: "Premium Solar Panel - 400W",
    }
  ];

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        
        {/* HEADER & FILTERS */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
          <h3 className="fw-bold mb-3 mb-md-0">My Orders</h3>
          
          <div className="d-flex gap-2">
            <div className="input-group input-group-sm shadow-sm" style={{ maxWidth: '300px' }}>
              <span className="input-group-text bg-white border-end-0">
                🔍
              </span>
              <input type="text" className="form-control border-start-0 ps-0" placeholder="Search orders..." />
            </div>
          </div>
        </div>

        {/* ORDER LIST */}
        <div className="row">
          <div className="col-12">
            {orders.map((order) => (
              <div key={order.id} className="card border-0 shadow-sm mb-4 rounded-3 overflow-hidden">
                
                {/* CARD TOP BAR */}
                <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center px-4">
                  <div className="d-flex gap-4">
                    <div>
                      <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Order Placed</small>
                      <span className="small fw-semibold">{order.date}</span>
                    </div>
                    <div>
                      <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Total</small>
                      <span className="small fw-semibold">₹ {order.total.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-end">
                    <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Order # {order.id}</small>
                    <span className="text-primary small fw-bold cursor-pointer">View Details</span>
                  </div>
                </div>

                {/* CARD BODY */}
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    
                    {/* PRODUCT IMAGE & INFO */}
                    <div className="col-md-6 d-flex align-items-center mb-3 mb-md-0">
                      <img 
                        src={order.imageUrl} 
                        alt="Product" 
                        className="rounded border" 
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
                      />
                      <div className="ms-3">
                        <h6 className="fw-bold mb-1">{order.productName}</h6>
                        <p className="small text-muted mb-0">And {order.itemCount - 1} other items</p>
                        <div className="mt-2">
                           <span className="badge bg-success-subtle text-success border border-success-subtle">
                             ● {order.status}
                           </span>
                        </div>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="col-md-6">
                      <div className="d-flex flex-column flex-md-row gap-2 justify-content-md-end">
                        <button 
                          className="btn btn-primary px-4 fw-bold shadow-sm"
                          onClick={() => navigate(`/order-tracking/${order.id}`)}
                        >
                          Track Package
                        </button>
                        <button 
                          className="btn btn-white border px-4 fw-bold text-dark shadow-sm"
                          onClick={() => navigate(`/return/${order.id}`)}
                        >
                          Return / Replace
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FOOTER STRIP */}
                <div className="bg-light p-3 px-4 border-top">
                   <small className="text-muted">
                     <span className="fw-bold text-dark">Note:</span> If you face any issues with this delivery, please contact our 24/7 support.
                   </small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EMPTY STATE (Mock) */}
        {orders.length === 0 && (
          <div className="text-center py-5">
            <h5 className="text-muted">No orders found.</h5>
            <button className="btn btn-primary mt-3" onClick={() => navigate("/products")}>
              Start Shopping
            </button>
          </div>
        )}
      </div>

      <style>{`
        .bg-success-subtle { background-color: #e8f5e9 !important; }
        .text-success { color: #2e7d32 !important; }
        .btn-white:hover { background-color: #f8f9fa; }
        .cursor-pointer { cursor: pointer; }
        .rounded-3 { border-radius: 0.75rem !important; }
      `}</style>
    </div>
  );
};

export default Orders;