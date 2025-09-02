import { useState } from "react";
import ScopeList from "./ScopeList";
import ScopeForm from "./ScopeForm";
import ScopeTips from "./ScopeTips";
import { X } from "lucide-react";
import { useScopes } from "./hooks/useScopes";
import { deleteScope, getScopeById } from "./api/scopeApi";
import { Scope } from "./types/scope";
import { useConfirmation } from "../../components/Confirmation";

const ScopeContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedScope, setSelectedScope] = useState<Scope | null>(null);
  const { scopes, isLoading, refreshScopes, error } = useScopes();
  const { showConfirmation, showSuccess, showError } = useConfirmation();

  const handleDelete = async (id: string) => {
    const scope = scopes.find(s => s.Name === id);
    const confirmed = await showConfirmation({
      type: 'warning',
      title: 'Delete Scope',
      message: `Delete scope "${scope?.Name || id}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });

    if (confirmed) {
      try {
        await deleteScope(id);
        await refreshScopes();
        showSuccess('Scope deleted successfully');
      } catch (error: any) {
        showError(`Failed to delete scope: ${error.message}`, 'Delete Error');
      }
    }
  };

  const handleEdit = async (id: string) => {
    try {
      // Fetch the scope to edit
      const scopeToEdit = await getScopeById(id);
      setSelectedScope(scopeToEdit);
      setIsSidebarOpen(true);
    } catch (error: any) {
      showError(`Failed to load scope for editing: ${error.message}`, 'Load Error');
    }
  };

  const handleFormSubmitSuccess = () => {
    refreshScopes();
    setIsSidebarOpen(false);
    setSelectedScope(null); // Clear selected scope after submission
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedScope(null); // Clear selected scope when closing sidebar
  };

  const handleAddNewScope = () => {
    setSelectedScope(null); // Clear any selected scope
    setIsSidebarOpen(true); // Open sidebar with empty form
  };

  return (
    <div className="flex gap-6">
      {/* Main content area */}
      <div className={`flex-1 space-y-6 ${!isSidebarOpen ? 'w-full' : ''}`}>
        {/* Scope list table with Add button inside */}
        <div>
          <ScopeList
            scopes={scopes}
            isLoading={isLoading}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onAddNew={handleAddNewScope}
          />
        </div>
      </div>

      {/* Right sidebar */}
      {isSidebarOpen ? (
        <div className="w-1/4 space-y-6">
          <div className='bg-white border rounded-lg shadow-sm relative p-6'>
            {/* Close button as X in top right */}
            <div className="absolute top-3 right-3 pb-6">
              <button
                onClick={handleCloseSidebar}
                className="bg-gray-100 hover:bg-gray-200 p-1 rounded-full"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            {/* Scope Form */}
            <ScopeForm
              initialScope={selectedScope || undefined}
              onSubmitSuccess={handleFormSubmitSuccess}
              onCancel={handleCloseSidebar}
            />
          </div>
        </div>
      ) : (
        <div className="w-1/4 space-y-6">
          {/* Scope Tips */}
          <div className='bg-white border rounded-lg shadow-sm'>
            <ScopeTips />
          </div>
        </div>
      )}
    </div>
  );
};

export default ScopeContent;
