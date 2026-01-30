import { useParams, useNavigate } from "react-router-dom";

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // Industry-level tracking data structure
  const trackingSteps = [
    { status: "Order Placed", date: "Jan 28, 2026", time: "10:30 AM", desc: "Your order has been received by the seller.", completed: true },
    { status: "Packed", date: "Jan 28, 2026", time: "04:45 PM", desc: "Item has been inspected and packed.", completed: true },
    { status: "Shipped", date: "Jan 29, 2026", time: "09:00 AM", desc: "Carrier has picked up the package. In transit to Hub.", completed: true },
    { status: "Out for Delivery", date: "Expected Today", time: "---", desc: "Courier partner is nearby your location.", completed: false },
    { status: "Delivered", date: "Expected Today", time: "by 9 PM", desc: "Package will be handed to you or left at security.", completed: false },
  ];

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        
        {/* TOP NAVIGATION */}
        <button className="btn btn-link text-decoration-none text-muted p-0 mb-4" onClick={() => navigate(-1)}>
          ← Back to My Orders
        </button>

        <div className="row g-4">
          
          {/* LEFT COLUMN: TRACKING PROGRESS */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <div>
                    <h4 className="fw-bold mb-1">Track Your Shipment</h4>
                    <p className="text-muted small mb-0">Order ID: <span className="text-dark fw-bold">{orderId}</span></p>
                  </div>
                  <div className="text-end d-none d-md-block">
                    <span className="badge bg-primary-subtle text-primary px-3 py-2">
                      Carrier: BlueDart Express
                    </span>
                  </div>
                </div>

                {/* THE STEPPER (Industry UI) */}
                <div className="tracking-wrapper">
                  {trackingSteps.map((step, index) => (
                    <div key={index} className={`tracking-item ${step.completed ? 'active' : ''}`}>
                      <div className="tracking-icon shadow-sm">
                        {step.completed ? "✓" : index + 1}
                      </div>
                      <div className="tracking-content pb-5 ps-4">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className={`fw-bold mb-1 ${step.completed ? 'text-dark' : 'text-muted'}`}>
                              {step.status}
                            </h6>
                            <p className="small text-muted mb-0 pe-5">{step.desc}</p>
                          </div>
                          <div className="text-end" style={{ minWidth: '100px' }}>
                            <p className="small fw-bold mb-0">{step.date}</p>
                            <p className="x-small text-muted" style={{fontSize: '0.7rem'}}>{step.time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DELIVERY INFO & SUPPORT */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <h6 className="fw-bold mb-3">Delivery Address</h6>
                <p className="small text-muted mb-0">
                  <strong className="text-dark">John Doe</strong><br />
                  123, Solar Enclave, Green Valley Road<br />
                  Bangalore, Karnataka - 560001<br />
                  Phone: +91 98765 43210
                </p>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 bg-primary text-white">
              <div className="card-body p-4 text-center">
                <h6 className="fw-bold mb-2">Need Help?</h6>
                <p className="small opacity-75 mb-3">Facing issues with your delivery or tracking status?</p>
                <button className="btn btn-light btn-sm w-100 fw-bold py-2">Contact Support</button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CUSTOM CSS FOR STEPPER */}
      <style>{`
        .tracking-wrapper {
          position: relative;
        }
        .tracking-item {
          display: flex;
          position: relative;
        }
        .tracking-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f8f9fa;
          color: #adb5bd;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
          z-index: 2;
          border: 2px solid #fff;
        }
        .tracking-item.active .tracking-icon {
          background: #0d6efd;
          color: #fff;
        }
        .tracking-content {
          border-left: 2px solid #e9ecef;
          margin-left: -17px;
          flex-grow: 1;
        }
        .tracking-item.active .tracking-content {
          border-left: 2px solid #0d6efd;
        }
        .tracking-item:last-child .tracking-content {
          border-left: 2px solid transparent;
        }
        .bg-primary-subtle { background-color: #e7f1ff !important; }
      `}</style>
    </div>
  );
};

export default OrderTracking;