// ScopeForm.tsx
import React, { useEffect, useState } from "react";
import { createScope, getScopeById, updateScope } from "./api/scopeApi";
import { Scope } from "./types/scope";
import { useParams } from "react-router-dom";

interface ScopeFromProps {
  onSubmitSuccess?: () => void;
  onCancel?: () => void;
  initialScope?: Scope;
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
    StartIPv4Address: initialScope?.StartIpv4Address || '',
    EndIPv4Address: initialScope?.EndIPv4Address || '',
    Active: initialScope?.Active || '',
    DateModified: initialScope?.DateModified || new Date().toISOString(),
    ModifiedBy: initialScope?.ModifiedBy || 'currentUser',
  });

  const { id } = useParams();
  const isEdit = !!id || !!initialScope;

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
        StartIPv4Address: initialScope.StartIpv4Address,
        EndIPv4Address: initialScope.EndIPv4Address,
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
    const payload = {
      ...form,
      DateModified: new Date().toISOString()
    };

    try {
      if (isEdit) {
        const scopeId = id || initialScope?.Name;
        if (scopeId) {
          await updateScope(scopeId, payload);
        }
      } else {
        await createScope(payload)
      }

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleReset = () => {
    of (initialScope) {
    setForm({
      Name: initialScope.Name,
      Description: initialScope.Description,
      Subnet: initialScope.Subnet,
      SubnetMask: initialScope.SubnetMask,
      StartIPv4Address: initialScope.StartIpv4Address,
      EndIPv4Address: initialScope.EndIPv4Address,
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
        <input
          name="Name"
          value={form.Name}
          onChange={handleInputChange}
          placeholder="Scope Name"
          required
          className="w-full border border-gray-300 rounded-md p-2"
          />
        <textarea
          name="Description"
          value={form.Description}
          onChange={handleInputChange}
          placeholder="Description"
          className="w-full border border-gray-300 rounded-md p-2"
          />
        <div className="grid grid-cols-2 gap-4">
          <input 
            name="Subnet"
            value={form.Subnet}
            onChange={handleInputChange}
            placeholder="Subnet (e.g. 192.168.1.0)"
            required
            className="w-full border border-gray-300 rounded-md p-2"
            />
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
