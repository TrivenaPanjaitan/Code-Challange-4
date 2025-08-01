'use client';

import { Dispatch, SetStateAction } from 'react';

interface Props {
  message: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
}

export default function ErrorModal({ message, show, setShow, onClose }: Props) {
  if (!show) return null;

  const handleClose = () => {
    setShow(false);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded shadow text-center w-80">
        <h2 className="text-red-600 font-semibold text-xl mb-2">Error</h2>
        <p className="mb-4 text-gray-700 dark:text-white">{message}</p>
        <button
          onClick={handleClose}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
