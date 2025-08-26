import React, { createContext, useContext, useState, useCallback } from 'react';
import { ConfirmationDialogue } from './ConfirmationDialogue';
import { ConfirmationOptions, ConfirmationContextType } from './types';

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(undefined);

interface ConfirmationProviderProps {
  children: React.ReactNode;
}

export const ConfirmationProvider: React.FC<ConfirmationProviderProps> = ({ children }) => {
  const [dialogueState, setDialogueState] = useState<{
    isOpen: boolean;
    options: ConfirmationOptions | null;
    resolve: ((value: boolean) => void) | null;
  }>({
    isOpen: false,
    options: null,
    resolve: null,
  });

  const showConfirmation = useCallback((options: ConfirmationOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setDialogueState({
        isOpen: true,
        options,
        resolve,
      });
    });
  }, []);

  const showSuccess = useCallback((message: string, title: string = 'Success') => {
    showConfirmation({
      type: 'success',
      title,
      message,
      confirmText: 'OK',
    });
  }, [showConfirmation]);

  const showError = useCallback((message: string, title: string = 'Error') => {
    showConfirmation({
      type: 'error',
      title,
      message,
      confirmText: 'OK',
    });
  }, [showConfirmation]);

  const showInfo = useCallback((message: string, title: string = 'Information') => {
    showConfirmation({
      type: 'info',
      title,
      message,
      confirmText: 'OK',
    });
  }, [showConfirmation]);

  const handleConfirm = useCallback(async () => {
    if (dialogueState.options?.onConfirm) {
      await dialogueState.options.onConfirm();
    }
    
    if (dialogueState.resolve) {
      dialogueState.resolve(true);
    }
    
    setDialogueState({
      isOpen: false,
      options: null,
      resolve: null,
    });
  }, [dialogueState]);

  const handleCancel = useCallback(() => {
    if (dialogueState.options?.onCancel) {
      dialogueState.options.onCancel();
    }
    
    if (dialogueState.resolve) {
      dialogueState.resolve(false);
    }
    
    setDialogueState({
      isOpen: false,
      options: null,
      resolve: null,
    });
  }, [dialogueState]);

  const contextValue: ConfirmationContextType = {
    showConfirmation,
    showSuccess,
    showError,
    showInfo,
  };

  return (
    <ConfirmationContext.Provider value={contextValue}>
      {children}
      {dialogueState.options && (
        <ConfirmationDialogue
          isOpen={dialogueState.isOpen}
          type={dialogueState.options.type}
          title={dialogueState.options.title}
          message={dialogueState.options.message}
          confirmText={dialogueState.options.confirmText}
          cancelText={dialogueState.options.cancelText}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </ConfirmationContext.Provider>
  );
};

export const useConfirmation = (): ConfirmationContextType => {
  const context = useContext(ConfirmationContext);
  if (context === undefined) {
    throw new Error('useConfirmation must be used within a ConfirmationProvider');
  }
  return context;
};