import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompliancePolicy from '../../types/Policy';
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-lg font-semibold-mb-4">Confirm Deletion</h2>
        <p> Are you sure you want to delete this policy</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={ onClose }
            className='mt-4 py-2 border-gray-300 rounded hover:bg-gray-300'>
            Cancel
          </button>
          <button
            onClick={ onConfirm }
            className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
