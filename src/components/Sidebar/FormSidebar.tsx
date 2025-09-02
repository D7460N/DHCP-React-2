import { X } from "lucide-react";
import React from "react";

interface FormSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FormSidebar: React.FC<FormSidebarProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="w-1/4 space-y-6">
      <div className='bg-white darkLbg-zinc-900 broder-zinc-200 dark:border-zinc-800 border rounde-lg shadow-sm relative -p-6'>
        <div className="absolute top-3 right-3 pb-6">
          <button 
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 p-1 rounded-full"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default FormSidebar;
