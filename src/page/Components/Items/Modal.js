import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Modal = ({ isOpen, onClose, item }) => {
  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ backgroundColor: '#D9D9D9', borderRadius: '24px' }}>
          <div className="modal-body p-4">
            {/* Close button */}
            <button 
              type="button" 
              className="btn-close position-absolute top-0 end-0 m-3" 
              onClick={onClose}
              aria-label="Close"
            />

            {item && (
              <>
                <div className="d-flex align-items-start gap-3 mb-3">
                  {/* Icon container */}
                  <div 
                    className="p-3" 
                    style={{
                      backgroundColor: '#FFD700',
                      borderRadius: '16px',
                      width: '20vw',
                      height: '20vw',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img
                      src={item.image}
                      alt="Icon"
                      className="img-fluid"
                    />
                  </div>

                  {/* Title */}
                  <h5 style={{
                    marginTop: "3vw",
                    fontSize: "6vw"
                  }}>{item.name}</h5>
                </div>

                {/* Description */}
                <p className="text-secondary"
                style={{
                  fontSize: "4vw",
                  textAlign: "justify",
                  maxHeight: "76vw",
                  overflow: "auto",
                  scrollbarWidth: "none"
                }}>{item.description}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;