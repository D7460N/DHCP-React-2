import React, { useState } from 'react';

interface ControlPanelProps {
  onVpcChange: (vpc: string) => void;
  onProviderChange: (provider: string) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ onVpcChange, onProviderChange }) => {
  const [selectedVpc, setSelectedVpc] = useState<string>('');
  const [selectedProvider, setSelectedProvider] = useState<string>('aws');

  const cloudProviders = [
    { value: 'aws', label: 'aws' },
    { value: 'azure', label: 'Azure' },
    { value: 'gcp', label: 'Google Cloud Platform' }
  ];
  const vpcs = [
    { value: 'vpc-1', label: 'VPC 1' },
    { value: 'vpc-2', label: 'VPC 2' },
    { value: 'vpc-3', label: 'VPC 3' }
  ];

  const handleVpcChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVpc(e.target.value);
    onVpcChange(e.target.value);
  };

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvider(e.target.value);
    onProviderChange(e.target.value);
  };

  return (
    <div className="p-6">
      <h3 className="text-md font-semibold mb-2">Dashboard Controls</h3>
      <p className="mb-6">Select cloud provider and VPC to filter dashboard data.</p>
      <div className="space-y-6">
        <select
          className="w-full bg-white border border-gray-300 rounded-md p-2"
          name="cloudProvider"
          required
          onChange={handleProviderChange}
          value={selectedProvider}
          >
          <option value="">Select Cloud Provider</option>
          {cloudProviders.map(provider => (
            <option key={provider.value} value={provider.value}>
              {provider.label}
            </option>
          ))}
        </select>
        <select
          className="w-full bg-white border border-gray-300 rounded-md p-2"
          name="vpc"
          required
          onChange={handleVpcChange}
          value={selectedVpc}
          >
          <option value="">Select VPC</option>
          {vpcs.map(vpc => (
            <option key={vpc.value} value={vpc.value}>
              {vpc.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
