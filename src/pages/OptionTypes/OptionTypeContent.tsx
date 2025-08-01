import { useState } from "react";
import { EC2InstancesTable } from "../../components/EC2InstancesTable/EC2InstancesTable";
import { getOptionTypes } from "../../api/optionTypes";

// Define the OptionType interface to match your API response
interface OptionType {
  OptionId: number;
  Name: string;
  Value: string;
  Global: boolean;
  DateCreated: string;
  CreateBy: string;
}

// Adapt the API response to match the expected interface for the table
// GenericResourcTable expect an id field
interface TableOptionType {
  id: string;
  optionName: string;
  optionValue: string;
  scope: string;
  dateCreated: string;
  createBy: string;
}

const OptionTypes: React.FC = () => {
  const [optionTypes, setOptionTypes] = useState<TableOptionType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchOptionTypes = async () => {
    try {
      const data = await getOptionTypes();

      // Transform the API data to match our table format
      const transformedData = data.map((option: OptionType) => ({
        id: option.OptionID.toString(),
        optionName: option.Name,
        optionValue: option.Value,
        scope: option.Global ? 'Global' : 'Workstation',
        dateCreated: option.DateCreated,
        createdBy: option.CreatedBy
      }));

      setOptionTypes(transformedData);
    } catch (err) {
      setError('Failed to fetch option types. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  fetchOptionTypes();
}, []);
  
  // Define columns for the table
  const columns = [
    {
      header: 'Option Name',
      accessor: 'optionName' as const,
    },
    {
      header: 'Option Value',
      accessor: 'optionValue' as const,
      render: (value: string) => value || 'Not set'
    },
    {
      header: 'Scope',
      accessor: 'scope' as const,
    },
      header: 'Date Created',
      accessor: 'dateCreated' as const,
      render: (value: string) => {
        const date = new Date(value);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
      }
    },
    {
      header: 'Created By',
      accessor: 'createdBy' as const,
    }
  ];

  if (isLoading) {
    return <div className="text-center p-4">Loading option types...</div>;
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
    return <div className="text-center p-4">No option types found.</div>;
  }

  return (
    <div className="container mx-auto py-4">
      <GenericResourceTable<TableOptionType>
        title="DHCP Option Types"
        description="List of all DHCP option types in the system"
        data={optionTypes}
        columns={columns}
        resourceName="option types"
      />
    </div>
  );
};

export default OptionTypes;
