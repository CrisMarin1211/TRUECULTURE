import './style.css';
import { useRef } from 'react';
import html2canvas from 'html2canvas';

type PurchaseDetailModalProps = {
  image: string;
  title: string;
  text: string;
  location: string;
  date: string;
  name: string;
  time: string;
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
  barcodeCode,
  onClose,
}: PurchaseDetailModalProps) => {
  const barcodeUrl = `https://quickchart.io/barcode?text=${encodeURIComponent(barcodeCode)}&format=png&type=code128`;

  const modalRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (modalRef.current) {
      const canvas = await html2canvas(modalRef.current, { useCORS: true });
      const link = document.createElement('a');
      link.download = 'mi-ticket.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container" ref={modalRef}>
        <div className="modal-left">
          <img src={image} alt={title} />
        </div>
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
            <img src={barcodeUrl} alt="barcode" />
            <p className="barcode-code">{barcodeCode}</p>
          </div>
          <button className="download-btn" onClick={handleDownload}>
            Download Ticket
          </button>
        </div>
        <div>Hacer una reseña</div>
      </div>
    </div>
  );
};

export default PurchaseDetailModal;
