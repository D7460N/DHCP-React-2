// ScopeForm.tsx
import React, { useEffect, useState } from "react";
import { createScope, getScopeById, updateScope } from "./api/scopeApi";
import { Scope } from "./types/scope";
import { useParams } from "react-router-dom";
import { getServers } from "../admin/Servers/api/serverApi";
import { getScopeTypes } from "../admin/ScopeTypes/api/scopeTypeApi";
import { useNotification } from "../../components/Notification";

interface ScopeFormProps {
  onSubmitSuccess?: () => void;
  onCancel?: () => void;
  initialScope?: Scope;
}

interface DropdownItem {
  id: string;
  name: string;
}

export const ScopeForm: React.FC<ScopeFormProps> = ({
  onSubmitSuccess,
  onCancel,
  initialScope
}) => {
  const [form, setForm] = useState<Scope>({
    Name: initialScope?.Name || '',
    Description: initialScope?.Description || '',
    Subnet: initialScope?.Subnet || '',
    SubnetMask: initialScope?.SubnetMask || '',
    StartIPv4Address: initialScope?.StartIPv4Address || '',
    EndIPv4Address: initialScope?.EndIPv4Address || '',
    DHCPServer: initialScope?.DHCPServer || '',
    ScopeType: initialScope?.ScopeType || '',
    Delay: initialScope?.Delay || 0,
    LeaseDuration: initialScope?.LeaseDuration || 30,
    PrimaryRouter: initialScope?.PrimaryRouter || '',
    SecondaryRouter: initialScope?.SecondaryRouter || '',
    Active: initialScope?.Active || true,
    DateModified: initialScope?.DateModified || new Date().toISOString(),
    ModifiedBy: initialScope?.ModifiedBy || 'currentUser',
  });

  const { id } = useParams();
  const isEdit = !!id || !!initialScope;
  const { showNotification, showSuccess, showError } = useNotification();
  const [scopeTypes, setScopeTypes] = useState<DropdownItem[]>([]);
  const [dhcpServers, setdhcpServers] = useState<DropdownItem[]>([]);

  // Fetch initial dropdown data
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [serverTypesData, scopeTypesData] = await Promise.all([
          getServers(),
          getScopeTypes()
        ]);
        const serversList: DropdownItem[] = serverTypesData.map(serverType => ({
          id: serverType.ipv4Address,
          name: serverType.ipv4Address + " ("+serverType.fqdn+")"
        }));
        const scopeTypesList: DropdownItem[] = scopeTypesData.map(scopeType => ({
          id: scopeType.name,
          name: scopeType.name
        }));

        setScopeTypes(scopeTypesList);
        setDHCPServers(serversList);

      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      } finally {
        // setIsLoading(false);
      }
    };
    fetchDropdownData();
  }, []);
  
  // Fetch scope for editing if not provided as prop
  useEffect(() => {
    if (isEdit && !initialScope && id) {
      getScopeById(id).then((data) => {
        setForm({ ...data });
      });
    }
  }, [isEdit, id, initialScope]);

  // Effect to update form when initialScope changes
  useEffect(() => {
    if (initialScope) {
      setForm({
        Name: initialScope.Name,
        Description: initialScope.Description,
        Subnet: initialScope.Subnet,
        SubnetMask: initialScope.SubnetMask,
        StartIPv4Address: initialScope.StartIPv4Address,
        EndIPv4Address: initialScope.EndIPv4Address,
        DHCPServer: initialScope.DHCPServer,
        ScopeType: initialScope.ScopeType,
        Delay: initialScope.Delay,
        LeaseDuration: initialScope.LeaseDuration,
        PrimaryRouter: initialScope.PrimaryRouter,
        SecondaryRouter: initialScope.SecondaryRouter,
        Active: initialScope.Active,
        DateModified: initialScope.DateModified,
        ModifiedBy: initialScope.ModifiedBy,
      });
    }
  }, [initialScope]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: name === 'Active' ? value === 'true' : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const action = isEdit ? 'update' : 'create';
    const confirmed = await showNotification({
      type: 'confirm',
      title: isEdit ? 'Update Scope' : 'Create Scope',
      message: isEdit
        ? `Save changes to scope "${form.Name}"?` : `Create new scope "${form.Name}"?`,
      confirmText: isEdit ? 'Save Changes' : 'Create Scope',
      cancelText: 'Cancel'
    });

    if (!confirmed) return;

    const payload = {
      ...form,
      DateModified: new Date().toISOString()
    };

    try {
      if (isEdit) {
        const scopeId = id || initialScope?.Name;
        if (scopeId) {
          await updateScope(scopeId, payload);
          showSuccess('Scope updated successfully');
        }
      } else {
        await createScope(payload);
        showSuccess('Scope created successfully');
      }

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error: any) {
      const operation = isEdit ? 'update' : 'create';
      showError(`Failed to ${operation} scope: ${error.message}`, `${operation.charAt(0).toUpperCase() + operation.slice(1)} Error`);
      console.error(error);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleReset = () => {
    if (initialScope) {
      setForm({
        Name: initialScope.Name,
        Description: initialScope.Description,
        Subnet: initialScope.Subnet,
        SubnetMask: initialScope.SubnetMask,
        StartIPv4Address: initialScope.StartIPv4Address,
        EndIPv4Address: initialScope.EndIPv4Address,
        DHCPServer: initialScope.DHCPServer,
        ScopeType: initialScope.ScopeType,
        Delay: initialScope.Delay,
        LeaseDuration: initialScope.LeaseDuration,
        PrimaryRouter: initialScope.PrimaryRouter,
        SecondaryRouter: initialScope.SecondaryRouter,
        Active: initialScope.Active,
        DateModified: initialScope.DateModified,
        ModifiedBy: initialScope.ModifiedBy,
      });
    } else {
      setForm({
        Name: '',
        Description: '',
        Subnet: '',
        SubnetMask: '',
        StartIPv4Address: '',
        EndIPv4Address: '',
        DHCPServer: '',
        ScopeType: '',
        Delay: 0,
        LeaseDuration: 30,
        PrimaryRouter: '',
        SecondaryRouter: '',
        Active: true,
        DateModified: new Date().toISOString(),
        ModifiedBy: 'currentUser',
      });
    }
  };

  return (
    <div>
      <h3 className="text-md font-semibold mb-2">{isEdit ? "Update" : "Create"} Scope</h3>
      <p className="mb-6">
        Scopes define IP address ranges for DHCP servers to allocate to clients in a subnet.
        Enter the details of the scope.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            name="Name"
            value={form.Name}
            onChange={handleInputChange}
            placeholder="Scope Name"
            required
            className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block  text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="Description"
              value={form.Description}
              onChange={handleInputChange}
              placeholder="Description"
              className="w-full border border-gray-300 rounded-md p-2"
              />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                name="Subnet"
                value={form.Subnet}
                onChange={handleInputChange}
                placeholder="Subnet (e.g. 192.168.1.0)"
                required
                className="w-full border border-gray-300 rounded-md p-2"
                />
            </div>
            <div>
              <input
                name="SubnetMask"
                value={form.SubnetMask}
                onChange={handleInputChange}
                placeholder="Subnet Mask (e.g. 255.255.255.0)"
                required
                className="w-full border border-gray-300 rounded-md p-2"
                />
            </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="StartIPv4Address"
            value={form.StartIPv4Address}
            onChange={handleInputChange}
            placeholder="Start IP Address"
            required
            className="w-full border border-gray-300 rounded-md p-2"
            />
          <input
            name="EndIPv4Address"
            value={form.EndIPv4Address}
            onChange={handleInputChange}
            placeholder="End IP Address"
            required
            className="w-full border border-gray-300 rounded-md p-2"
            />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="Active"
            value={form.Active ? 'true' : 'false'}
            onChange={handleInputChange}
            className="w-full bg-white border border-gray-300 rounded-md p-2"
            >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <div className="flex gap-4 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
            Reset
          </button>
          <button
            type="submit"
            className="flex-1 bg-primary/50 text-sky-800 px-4 py-2 rounded-md hover:bg-sky-800 hover:text-white transition-colors duration-200"
            >
            {isEdit ? "Update" : "Create"} Scope
          </button>
        </div>
      </form>
  </div>
  );
};

export default ScopeForm;
