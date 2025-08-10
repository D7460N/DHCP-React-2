import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';

interface EC2Instance {
  instanceId: string;
  instanceType: string;
  state: string;
  privateIpAddress: string;
  name: string;
  platform: string;
  launchTime: string;
}

export const EC2InstancesTable: React.FC = () => {
  const [instances, setInstances] = useState<EC2Instance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchInstances = async () => {
      try {
  const response = await axios.get('http://localhost:5110/instances');
        setInstances(response.data);
      } catch (err) {
        setError('Failed to fetch EC2 instances');
        console.error('Error fetching instances:', err);
      } finally {
        setIsLoading(false);
      }
    };

  fetchInstances();
  }, []);

  if (isLoading) return <div>Loading instances...</div>;
  if (error) return <div>Error:</div>;
  if (instances.length === 0) return <div>No instances found</div>;

  return (
    <div className="p-6">
      <h3 className="text-md font-semibold mb-2">Resource Overview</h3>
      <p className="mb-6"> Track and assess your cloud infrastructure components and their current state.</p>
      <table className="min-w-full">
        <thead className="border-b">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Instance ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              State
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Private IP
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Platform
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {instances.map((instance) => (
            <tr key={instance.instanceId}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {instance.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {instance.instanceId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <span
                  className={`px-3 py-1 inline-flex items-center gap-1 text-xs font-medium rounded-full ${
                    instance.state === 'running' ? 'bg-green-100 text-green-700' :
                    instance.state === 'stopped' ? 'bg-gray-100 text-gray-700' :
                    'bg-gray-100 text-gray-700'
                  }`}
                  >
                  {instance.state === 'running' && (
                    <span className="w-1 h-1 rounded-full bg-green-600"></span>
                  )}
                  {instance.state === 'stopped' && (
                    <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                  )}
                  {instance.state.charAt(0).toUpperCase() + instance.state.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {instance.privateIpAddress}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {instance.platform}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};
