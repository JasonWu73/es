import styles from './ErrorModal.module.scss';
import { createPortal } from 'react-dom';

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

export default function ErrorModal(
  { title, message, onConfirm }: Props
) {
  return (
    <>
      {createPortal(
        <Backdrop onConfirm={onConfirm}/>,
        document.querySelector('body')!
      )}
      {createPortal(
        <ModalOverlay
          title={title}
          message={message}
          onConfirm={onConfirm}
        />,
        document.querySelector('body')!
      )}
    </>
  );
}
