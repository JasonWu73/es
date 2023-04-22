import React from 'react';

export default function Button({ children, type = 'default', onClick, className }: {
  children: React.ReactNode;
  type?: 'default' | 'primary' | 'danger';
  onClick?: () => void;
  className?: string;
}) {
  let styles = `border rounded p-1 ${className} `;

  switch (type) {
    case 'default': {
      styles += 'bg-white text-black hover:bg-gray-100';
      break;
    }
    case 'primary': {
      styles += 'bg-blue-500 text-white hover:bg-blue-600 ';
      break;
    }
    case 'danger': {
      styles += 'bg-red-500 text-white hover:bg-red-600 ';
      break;
    }
  }

  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
