import styles from './ErrorModal.module.scss';

interface Props {
  title: string,
  message: string,
  onClose: () => void
}

function ErrorModal({ title, message, onClose }: Props) {
  return (
    <>
      <div className={styles.backdrop}></div>
      <div className={styles.modal}>
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose}>Okay</button>
      </div>
    </>
  );
}

export default ErrorModal;
