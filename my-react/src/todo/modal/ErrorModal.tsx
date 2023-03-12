import ReactDOM from 'react-dom';
import styles from './ErrorModal.module.scss';

interface Props {
  title: string,
  message: string,
  onConfirm: () => void
}

function Backdrop({ onConfirm }: { onConfirm: () => void }) {
  return <div className={styles.backdrop} onClick={onConfirm}></div>;
}

function ModalOverlay({ title, message, onConfirm }: Props) {
  return (
    <div className={styles.modal}>
      <h2>{title}</h2>
      <p>{message}</p>
      <button onClick={onConfirm}>Okay</button>
    </div>
  );
}

function ErrorModal({ title, message, onConfirm }: Props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={onConfirm}/>,
        document.querySelector('body')!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay title={title} message={message} onConfirm={onConfirm}/>,
        document.querySelector('body')!
      )}
    </>
  );
}

export default ErrorModal;
