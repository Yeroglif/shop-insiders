import ReactDom from 'react-dom';

type LayoutProps = {
  children: React.ReactNode;
  handleCloseModal?: () => void;
  isAuthorized?: boolean;
};

export default function Modal({ children, handleCloseModal }: LayoutProps) {
  const portalElement = document.getElementById('portal');

  if (!portalElement) return null; // If portal doesn't exist, return null

  return ReactDom.createPortal(
    <div className="modal-container">
      <button onClick={handleCloseModal} className="modal-underlay" />
      <div className="modal-content">{children}</div>
    </div>,
    portalElement
  );
}
