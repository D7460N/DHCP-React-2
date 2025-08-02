// ScopeTips.tsx
import React from 'react';

const ScopeTips: React.FC = () => {
  return (
    <div className="p-6">
      <h3 className="text-md font-semibold mb-4">DHCP Scope Tips</h3>
      <div className="space-y-3 text-sm text-gray-700">
        <div>
          <h4 className="font-medium">Subnet Planning</h4>
          <p>Ensure your stubnet matches your network design and doesn't overlap with other networks.</p>
        </div>
        <div>
          <h4 className="font-medium">Ip Range</h4>
          <p>Reserve IPs outside the DHCP scope for static assignments (servers, printers, etc.)</p>
        </div>
        <div>
          <h4 className="font-medium">Lease Duration</h4>
          <p>Consider the number of clients and how frequently they change when setting lease times.</p>
        </div>
        <div>
          <h4 className="font-medium">Scope Options</h4>
          <p>Configure options like DNS servers, default gateway, and domain name for clients.</p>
        </div>
      </div>
    </div>
  );
};

export default ScopeTips;
