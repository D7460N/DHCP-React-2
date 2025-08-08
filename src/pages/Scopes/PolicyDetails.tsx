import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteScope, getScopeById } from "./api/scopeApi";
import { Scope } from "./types/scope";
import { ActivityFeed } from "../../components/ActivityFeed/ActivityFeed";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";

export default function ScopeDetails() {
  const {id} = useParams();
  const [scope, setScope] = useState<Scope | null>(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getScopeById(id).then(setScope);
    }
  }, [id]);

  const handleDelete = async () => {
    if (!scope) return;
    await deleteScope(id as string);
    navigate("/scopes");
  };

  const handleEdit = async () => {
    if (!scope) return;
    navigate(`/scopes/edit/${id}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{scope?.Name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="font-medium">{scope?.Description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Subnet</p>
                <p className="font-medium">{scope?.Subnet}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Subnet Mask</p>
                <p className="font-medium">{scope?.SubnetMask}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start IP Address</p>
                <p className="font-medium">{scope?.StartIPv4Address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">End IP Address</p>
                <p className="font-medium">{scope?.EndIPv4Address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">{scope?.Active ? 'Active' : 'Inactive'}</p>
              </div>
            </div>
          </div>
        );
      case 'Remediation':
        return (
          <p>This section provides details about the remediation actions for this scope.</p>
        );
      case 'Resources':
        return (
          <p>This section provides details about resources using this scope. </p>
        );
      default:
        return null;
    }
  };

  if (!scope) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='md:col-span-2 bg-white border rounded-lg shadow-sm p-6'>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md font-semibold mb-2">Scope Details</h3>

            <div className="space-x-2">
              <button className="border border-red-300 text-red-500 px-3 py-1 rounded text-sm" onClick={() => setShowConfirmation(true)}>Delete Scope</button>
              <button className="border border-gray-300 px-3 py-1 rounded text-sm" onClick={() => handleEdit()}>Edit</button>
            </div>
          </div>
          <p className="mb-6">Scopes define IP address ranges for DHCP servers to allocate to clients in the subnet.</p>
          <div className="space-y-4"></div>
          <div className="flex space-x-4 border-b border-gray-200 mb-4">
            {['Overview', 'Remediation', 'Resources'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-t-lg ${activeTab === tab ? 'bg-primary/50 text-sky-800' : 'text-gray-500'}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="text-sm text-gray-700">
            {renderTabContent()}
          </div>
          <div className='bg-white border rounded-lg shadow-sm'>
            <ActivityFeed />
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='md:col-span-2 bg-white border rounded-lg shadow-sm p-6'>
            <h3 className="text-md font-semibold mb-2">IP Address Usage</h3>
            <p className="mb-6">These IP addresses are currently allocated within this scope</p>
            <div className="text-sm mb-4">
              <p>IP Range: {scope.StartIPv4Address} - {scope.EndIPv4Address}</p>
              <p>Total addresses: {calculateTotalAddresses(scope.StartIPv4Address, scope.EndIPv4Address)}</p>
            </div>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostname</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MAC Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample IP usage data, would be replaced with actual data */}
                <td className="px-6 py-2">{scope.StartIPv4Address}</td>
                <td className="px-6 py-2">device-01.example.com</td>
                <td className="px-6 py-2">00:1A:2B:3C:4D:5E</td>
                <td className="px-6 py-2">Allocated</td>
              </tbody>
            </table>
          </div>
          <div className='bg-white border rounded-lg shadow-sm p-6'>
            <h3 className="text-md font-semibold mb-2">Similar Scopes</h3>
            <p className="mb-6">Other scopes with similar configurations</p>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subnet</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-6 py-2">{scope.Name !== 'location01-scope' ? 'location01-scope' : 'location02-scope'}</td>
                  <td className="px-6 py-2">{scope.Subnet !== '198.18.0.0' ? '198.18.0.0' : '198.18.1.0'}</td>
                  <td className="px-6 py-2">Active</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <DeleteConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleDelete}
        />
    </div>
  );
}

function calculateTotalAddresses(start: string, end: string): number {
  // Simple implementation, in a real app you'd want to properly parse the IPs
  const startParts = start.split('.').map(Number);
  const endParts = end.split('.').map(Number);

  const startNum = (startParts[0] << 24) | (startParts[1] << 16) | (startParts[2] << 8) | (startParts[3]);
  const endNum = (endParts[0] << 24) | (endParts[1] << 16) | (endParts[2] << 8) | (endParts[3]);

  return endNum - startNum + 1;
}
