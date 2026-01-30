import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const ReturnRequest = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState("");
  const [type, setType] = useState(""); // Refund or Replacement

  const reasons = [
    "Product is defective or not working",
    "Received wrong item",
    "Item was damaged during transit",
    "Quality not as expected",
    "Parts or accessories missing"
  ];

  const handleSubmit = () => {
    alert("Return Request Submitted Successfully!");
    navigate("/orders");
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            
            {/* PROGRESS BAR */}
            <div className="d-flex justify-content-between mb-4 px-5 position-relative">
              <div className={`text-center z-1 ${step >= 1 ? 'text-primary' : 'text-muted'}`}>
                <div className={`rounded-circle border mx-auto mb-2 d-flex align-items-center justify-content-center ${step >= 1 ? 'bg-primary text-white border-primary' : 'bg-white'}`} style={{width:'30px', height:'30px'}}>1</div>
                <small className="fw-bold">Reason</small>
              </div>
              <div className={`text-center z-1 ${step >= 2 ? 'text-primary' : 'text-muted'}`}>
                <div className={`rounded-circle border mx-auto mb-2 d-flex align-items-center justify-content-center ${step >= 2 ? 'bg-primary text-white border-primary' : 'bg-white'}`} style={{width:'30px', height:'30px'}}>2</div>
                <small className="fw-bold">Resolution</small>
              </div>
              <div className={`text-center z-1 ${step >= 3 ? 'text-primary' : 'text-muted'}`}>
                <div className={`rounded-circle border mx-auto mb-2 d-flex align-items-center justify-content-center ${step >= 3 ? 'bg-primary text-white border-primary' : 'bg-white'}`} style={{width:'30px', height:'30px'}}>3</div>
                <small className="fw-bold">Confirm</small>
              </div>
              <div className="position-absolute top-0 mt-3 start-0 w-100 border-top" style={{zIndex:0}}></div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-header bg-white p-4 border-bottom">
                <h4 className="fw-bold mb-1">Return / Replace Items</h4>
                <p className="text-muted small mb-0">Order Reference: <strong>{orderId}</strong></p>
              </div>

              <div className="card-body p-4">
                
                {/* STEP 1: SELECT REASON */}
                {step === 1 && (
                  <div>
                    <h6 className="fw-bold mb-3">Why are you returning this?</h6>
                    <div className="list-group mb-4">
                      {reasons.map((r, i) => (
                        <label key={i} className={`list-group-item list-group-item-action d-flex align-items-center p-3 border rounded-3 mb-2 cursor-pointer ${reason === r ? 'border-primary bg-primary-subtle' : ''}`}>
                          <input 
                            type="radio" 
                            name="reason" 
                            className="form-check-input me-3" 
                            onChange={() => setReason(r)}
                            checked={reason === r}
                          />
                          <span className="small fw-semibold">{r}</span>
                        </label>
                      ))}
                    </div>
                    
                    <h6 className="fw-bold mb-3">Add Photos (Required for damage)</h6>
                    <div className="border-dashed rounded-3 p-4 text-center mb-4 bg-light">
                      <p className="text-muted small mb-2">Upload images showing the issue</p>
                      <button className="btn btn-sm btn-outline-secondary px-4">Choose Files</button>
                    </div>

                    <button className="btn btn-primary w-100 py-3 fw-bold" disabled={!reason} onClick={() => setStep(2)}>
                      Continue
                    </button>
                  </div>
                )}

                {/* STEP 2: RESOLUTION TYPE */}
                {step === 2 && (
                  <div>
                    <h6 className="fw-bold mb-3">How would you like to proceed?</h6>
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <div className={`card h-100 cursor-pointer border-2 ${type === 'refund' ? 'border-primary' : ''}`} onClick={() => setType('refund')}>
                          <div className="card-body text-center p-4">
                            <span className="fs-2">💰</span>
                            <h6 className="fw-bold mt-2">Full Refund</h6>
                            <p className="x-small text-muted mb-0">Amount will be credited to original payment mode within 5-7 days.</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className={`card h-100 cursor-pointer border-2 ${type === 'replace' ? 'border-primary' : ''}`} onClick={() => setType('replace')}>
                          <div className="card-body text-center p-4">
                            <span className="fs-2">🔄</span>
                            <h6 className="fw-bold mt-2">Replacement</h6>
                            <p className="x-small text-muted mb-0">We will deliver a fresh unit and pick up the current one.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn btn-light flex-grow-1 py-3 fw-bold" onClick={() => setStep(1)}>Back</button>
                      <button className="btn btn-primary flex-grow-2 w-100 py-3 fw-bold" disabled={!type} onClick={() => setStep(3)}>Continue</button>
                    </div>
                  </div>
                )}

                {/* STEP 3: CONFIRMATION */}
                {step === 3 && (
                  <div className="text-center py-4">
                    <div className="mb-4">
                       <span className="display-4 text-warning">⚠️</span>
                    </div>
                    <h5 className="fw-bold">Ready to submit?</h5>
                    <p className="text-muted small px-md-5">
                      Once submitted, our technician may call you for a remote inspection. Please keep the original packaging ready for pickup.
                    </p>
                    <div className="bg-light p-3 rounded-3 mb-4 text-start small">
                      <div className="mb-1"><strong>Reason:</strong> {reason}</div>
                      <div><strong>Type:</strong> {type === 'refund' ? 'Full Refund' : 'Replacement'}</div>
                    </div>
                    <button className="btn btn-danger w-100 py-3 fw-bold shadow-sm" onClick={handleSubmit}>
                      Submit Return Request
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cursor-pointer { cursor: pointer; }
        .bg-primary-subtle { background-color: #eef6ff !important; }
        .border-dashed { border: 2px dashed #dee2e6; }
        .flex-grow-2 { flex-grow: 2; }
      `}</style>
    </div>
  );
};

export default ReturnRequest;