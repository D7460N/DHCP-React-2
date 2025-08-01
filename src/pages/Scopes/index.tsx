import { useState } from "react";
import ScopeList from "./ScopeList";
import ScopeForm from "./ScopeForm";
import ScopeTips from "./ScopeTips";
import { X } from "lucide-react";
import { useScopes } from "./hooks/useScopes";
import { deleteScope, getScopeById } from "./api/scopeApi";
import { Scope } from "./types/scope";

const ScopeContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedScope, setSelectedScope] = useState<Scope | null>(null);
  const { scopes, isLoading, refreshScopes, error } = useScopes();

  const handleDelete = async (id: string) => {
    try {
      await deleteScope(id);
      await refreshScopes();
    } catch (error) {
      console.error("Error deleting scope:", error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      // Fetch the scope to edit
      const scopeToEdit = await getScopeById(id);
      setSelectedScope(scopeToEdit);
      setIsSidebarOpen(true);
    } catch (error) {
      console.error("Error fetching scope for edit:", error);
    }
  };

  const handleFormSubmitSuccess = () => {
    refreshScopes();
    setIsSidebarOpen(false);
    setSelectedScope(null); // Clear selected scopoe after submission
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedScope(null); // Clear selected scopoe when closing sidebar
  };

  const handleAddNewScope = () => {
    setSelectedScope(null); // Clear any selected scopoe
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
