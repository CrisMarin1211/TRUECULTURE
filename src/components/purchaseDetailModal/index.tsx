import './style.css';

type PurchaseDetailModalProps = {
  image: string;
  title: string;
  text: string;
  location: string;
  date: string;
  name: string;
  time: string;
  barcodeImage: string;
  barcodeCode: string;
  onClose: () => void;
};

const PurchaseDetailModal = ({
  image,
  title,
  text,
  location,
  date,
  name,
  time,
  barcodeImage,
  barcodeCode,
  onClose,
}: PurchaseDetailModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Columna izquierda */}
        <div className="modal-left">
          <img src={image} alt={title} />
        </div>

        {/* Columna derecha */}
        <div className="modal-right">
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
          <h2 className="modal-title">{title}</h2>
          <p className="modal-text">{text}</p>

          <div className="modal-info">
            <div>
              <span className="info-title">Location</span>
              <span className="info-value">{location}</span>
            </div>
            <div>
              <span className="info-title">Date</span>
              <span className="info-value">{date}</span>
            </div>
            <div>
              <span className="info-title">Name</span>
              <span className="info-value">{name}</span>
            </div>
            <div>
              <span className="info-title">Time</span>
              <span className="info-value">{time}</span>
            </div>
          </div>

          <div className="barcode-section">
            <img src={barcodeImage} alt="barcode" />
            <p className="barcode-code">{barcodeCode}</p>
          </div>

          <button className="download-btn">Download Ticket</button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetailModal;
