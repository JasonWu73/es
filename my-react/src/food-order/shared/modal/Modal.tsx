import styles from './Modal.module.scss';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children }: Props) {
  return (
    <>
      {createPortal(
        <Backdrop/>,
        document.body
      )}
      {createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
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

function Backdrop() {
  return (
    <div className={styles.backdrop}></div>
  );
}

interface Props {
  children: ReactNode;
}
