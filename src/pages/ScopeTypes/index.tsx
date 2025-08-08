import { useState } from "react";
import { EC2InstancesTable } from "../../components/EC2InstancesTable/EC2InstancesTable";
import { ActivityFeed } from "../../components/ActivityFeed/ActivityFeed";

const ScopeTypesContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex gap-6">
      {/* Main content area */}
      <div className={`flex-1 space-y-6 ${!isSidebarOpen ? 'w-full' : ''}`}>
      {/* Sidebar toggle buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className={`px-4 py-2 rounded-lg border ${
            isSidebarOpen ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
          >
            Open
          </button>
        </div>

        <div className='bg-white border rounded-lg shadow-sm'>
          <EC2InstancesTable />
        </div>
      </div>

      {/* Right sidebar */}
      {isSidebarOpen && (
        <div className="w-1/4 space-y-6">
          <div className='bg-white border rounded-lg shadow-sm'>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className={`px-4 py-2 rounded-lg border ${
                !isSidebarOpen ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
            >
              Close
            </button>
              <ActivityFeed />
            </div>

        </div>
      )}
    </div>
  );
};

export default ScopeTypesContent;
