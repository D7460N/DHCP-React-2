import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Scope } from "./types/scope";

type Props = {
  scopes: Scope[];
  isLoading?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onAddNew?: () => void; // Add this prop
};

// Create a type that adapts Scope to have an id property
type ScopeWithId = Scope & { id: string };

const ScopeList: React.FC<Props> = ({
  scopes,
  isLoading = false,
  onDelete,
  onEdit,
  onAddNew
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Convert scopes to have an id property
  const scopesWithId: ScopeWithId[] = scopes.map(scope => ({
    ...scope,
    id: scope.Name // Use Name as the id
  }));

  const toggleMenu = (scopeId: string) => {
    setActiveMenu(activeMenu === scopeId ? null : scopeId);
  };

  const renderActions = (_: string, scope: ScopeWithId) => (
    <div className="relative">
      <button
        onClick={() => toggleMenu(scope.Name)}
        className="hover:bg-gray-100 p-2 rounded-full"
      >
        <MoreVertical className="h-5 w-5 text-gray-500" />
      </button>
    {activeMenu === scope.Name && (
      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
        <div className="py-1" role="menu" aria-orientation="vertical">
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {
              if (onEdit) onEdit(scope.Name);
              setActiveMenu(null);
            }}
            >
            Edit
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            onClick={() => {
              if (onDelete) onDelete(scope.Name);
              setActiveMenu(null);
            }}
            >
            Delete
          </button>
        </div>
      </div>
      )}
  </div>
);

// Custom header with "Add New Scope" button
const customHeader = (
  <div className="flex justify-between items-center">
    <div>
      <h3 className="text-md font-semibold">Current Scopes</h3>
      <p className="text-sm text-gray-500">These scopes represent the currently active DHCP configurations across your network infrastructure.</p>
    </div>
    {onAddNew && (
    <button
      onClick={onAddNew}
      className="bg-primary/50 text-sky-800 px-4 py-2 rounded-lg"
      >
      Add New Scope
    </button>
    )}
  </div>
);

return scopesWithId.length > 0 ? (
  <div className="bg-white border rounded-lg shadow-sm p-6">
    {customHeader}
    <div className="mt-4">
      <table className="min-w-full">
        <thead className="border-b">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subnet</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Range</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {scopesWithId.map((scope) => (
            <tr key={scope.id} className="border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{scope.Name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{scope.Description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{scope.Subnet}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{`${scope.StartIPv4Address} - ${scope.EndIPv4Address}`}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{scope.Active ? 'Active' : 'Inactive'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{renderActions(scope.id, scope)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
) : (
    <div className="bg-white border rounded-lg shadow-sm p-6">
      {customHeader}
      <div className="text-center text-gray-500 py-8">
        No scopes found. Add a scope to get started.
      </div>
    </div>
  );
};

export default ScopeList;
