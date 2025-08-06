import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';

interface Column<T> { 
  header: string; 
  accessor: keyof T;
  render?: (value: any, item: T) => React.ReactMode;
}

interface Column<T> { 
  title: string; 
  description: string;
  data?: T[];
  endpoint?: string;
  columns: Column<T>[];
  resourceName: string;
}

export function GenericResourceTable<T extends { id: string }>({
  title,
  description,
  data: initialData,
  endpoint,
  columns,
  resourceName
}: TableProps<T>) {
  const [data, setData] = useState<T[]>(initialData || []);
  const [isLoading, setIsLoading] = useState(!initialData && !!endpoint);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (endpoint && !initialData) {
      const fetchData = async () => {
      try {
        const response = await axios.get(endpoint);
        setData(response.data);
      } catch (err) {
        setError(`Failed to fetch ${resourceName}`);
        console.error(`Error fetching ${resourceName}:`, err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }
  }, [endpoint, reesourceName, initialData]);

  if (isLoading) return <div>Loading instances...</div>;
  if (error) return <div>Error:</div>;
  if (!data || data.length === 0) return <div>No {resourceName} found</div>;

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6">
      <h3 className="text-md font-semibold mb-2">{title}</h3>
      <p className="mb-6">{description}</p>
      <table className="min-w-full">
        <thead className="border-b">
          <tr>
            {columns.map((column) => (
              <th
                key={`header-${String(column.accessor)}`}
               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                {column.header}
            </th>
            ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
              <td
                key={`${item.id}-${String(column.accessor)}`}
               className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                {column.render
                  ? column.render(item[column.accessor], item)
                  : String(item[column.accessor] ?? '-')}
            </td>
            ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}
