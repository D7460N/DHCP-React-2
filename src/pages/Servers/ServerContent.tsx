import { useState } from "react";
import { GenericResourceTable } from "../../components/GenericResourceTable/GenericResourceTable";
import { getServers } from "../../api/servers";

// Define the OptionType interface to match your API response
interface Server {
  IPv4Address: string;
  FQDN: string;
  ServerType: string;
  DateModified: string;
  ModifiedBy: string;
}

// Adapt the API response to match the expected interface for the table
// GenericResourcTable expect an id field
interface TableServer {
  id: string;
  ipv4Address: string;
  fqdn: string;
  serverType: string;
  dateModified: string;
  modifiedBy: string;
}

const Servers: React.FC = () => {
  const [servers, setServers] = useState<TableServer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchServers = async () => {
    try {
      const data = await getServers();

      // Transform the API data to match our table format
      const transformedData = data.map((server: Server) => ({
        ipv4Address: server.IPv4Address,
        fqdn: server.FQDN,
        serverType: server.ServerType,
        dateModified: server.DateModified,
        modifiedBy: server.ModifiedBy
      }));

      setServers(transformedData);
    } catch (err) {
      setError('Failed to fetch servers. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  fetchOptionTypes();
}, []);
  
  // Define columns for the table
  const columns = [
    {
      header: 'Server IPv4 Address',
      accessor: 'ipv4Address' as const,
    },
    {
      header: 'Server FQDN',
      accessor: 'fqdn' as const,
    },
    {
      header: 'Server Type',
      accessor: 'serverType' as const,
    },
    }
      header: 'Date Modified',
      accessor: 'dateModified' as const,
      render: (value: string) => {
        const date = new Date(value);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
      }
    },
    {
      header: 'Modified By',
      accessor: 'modifiedBy' as const,
    }
  ];

  if (isLoading) {
    return <div className="text-center p-4">Loading servers...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong classNme="font-bold">Error!</strong>
        <span classNme="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (optionTypes.length === 0) {
    return <div className="text-center p-4">No servers found.</div>;
  }

  return (
    <div className="container mx-auto py-4">
      <GenericResourceTable<TableServer>
        title="Servers"
        description="List of all servers in the system"
        data={optionTypes}
        columns={columns}
        resourceName="servers"
      />
    </div>
  );
};

export default Servers;
