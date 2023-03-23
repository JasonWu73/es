import styles from './Modal.module.scss';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, onClose }: Props) {
  return (
    <>
      {createPortal(
        <Backdrop onClose={onClose}/>,
        document.body
      )}
      {createPortal(
        <ModalOverlay onClose={onClose}>{children}</ModalOverlay>,
        document.body
      )}
    </>
  );
}

function ModalOverlay({ children }: Props) {
  return (
    <div className={styles.modal}>
      {children}
    </div>
  );
}

function Backdrop({ onClose }: Props) {
  return (
    <div className={styles.backdrop} onClick={onClose}></div>
  );
}

interface Props {
  children?: ReactNode,
  onClose: () => void
}
