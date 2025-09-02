import { useEffect, useState } from "react";
import { GenericResourceTable } from "../GenericResourceTable/GenericResourceTable";

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableProps<T> {
  title: string;
  description: string;
  data?: T[];
  endpoint?: string;
  columns?: Column<T>[];
  resourceName: string;
}

interface RowModalProps<T> {
  row: T | null;
  columns: Column<T>[];
  isOpen: boolean;
  onClose: () => void ;
}

interface ActionMenuProps<T> {
  row: T;
  onView: (row: T) => void;
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
}

function ActionMenu<T>({ row, onView, onEdit, onDelete }: ActionMenuProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1 rounded hover:bg-gray-100"
        aria-label="Row actions"
      >
        <svg
          className="w-5 h-5 text-gray-500"
          fill="currentColor"
          viewBox="0 0 24 24 "
        >
          <circle cx="12" cy="6" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="18" r="2" />
          <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0-6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        </svg>
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1 flex flex-col transition-all duration-200 ease-in-out transform origin-top-right"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'scale(1)' : 'scale(0.95)',
          }}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="py-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView(row);
                setIsOpen(false);
              }}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLineJoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLineJoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(row);
              setIsOpen(false);
            }}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLineJoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(row);
              setIsOpen(false);
            }}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLineJoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    );
  }

function RowModal<T>({ row, columns, isOpen, onClose }: RowModalProps<T>) {
  if (!isOpen || !row) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-x1 font-bold">Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover: text-gray-700"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {columns.map((column) => (
            <div key={String(column.accessor)}>
              <label className="font-medium text-gray-700">
                {column.header}:
              </label>
              <div className="mt-1">
                {column.render
                  ? column.render(row[column.accessor], row)
                  : String(row[column.accessor])}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export function RowClickableTable<T extends { id: string }>({
  title,
  description,
  data = [],
  endpoint,
  columns,
  resourceName
}: TableProps<T>) {
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (row: T) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  }

  const handleEdit = (row: T) => {
    // Implement edit logic here
  }
  
  const handleDelete = (row: T) => {
    // Implement delete logic here
  }
  
  const handleRowClick = (row: T) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRow(null);
    setIsModalOpen(false);
  };

  const enhancedColumns = columns.map(column => ({
    ...column,
    render: (value: T[keyof T], row: T) => (
      <div onClick={() => handleRowClick(row)} className="cursor-pointer">
        {column.render ? column.render(value, row) : String(value)}
      </div>
    )
  }));

    const columnsWithActions = [
      ...enhancedColumns,
    {
      header: 'Actions',
      accessor: 'id' as keyof T,
      render: (_: T[keyof T], row: T) => (
        <div onClick={(e) => e.stopPropagation()} className="flex justify-left">
          <ActionMenu
            row={row}
            onView={() => handleView(row)}
            onEdit={() => handleEdit(row)}
            onDelete={() => handleDelete(row)}
          />
        </div>
      )
    }
  ];

  return (
    <div>
      <GenericResourceTable
        title={title}
        description={description}
        data={data}
        endpoint={endpoint}
        columns={columnsWithActions}
        resrouceName={resourceName}
      />
      <RowModal<T>
        row={selectedRow}
        columns={columns}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
