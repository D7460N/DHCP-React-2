import React from "react";

// Define the TaskStatus type
type TaskStatus = 'Overdue' | 'Within 3 days' | 'Within 32 days';

// Define the Task interface
interface Task {
  id: string;
  title: string;
  description: string;
  progress: number;
}

const TaskCards: React.FC = () => {
  // Define the tasks data structure
  const tasks: Record<TaskStatus, Test[]> = {
    'Overdue': [
      {
        id: '1',
        title: 'EBS Volumes missing correct tagging',
        description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        progress: 75,
      }
    ],
    'Within 3 days': [
      {
        id: '2',
        title: 'EBS Volumes missing correct tagging',
        description: 'Some quick example text to build on the card title and make up the',
        progress: 60,
      }
    ],
    'Within 32 days': [
      {
        id: '3',
        title: 'EBS Volumes missing correct',
        description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        progress: 30,
      }
    ]
  };

  const getStatusColor = (status: TaskStatus): string => {
    switch (status) {
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      case 'Within 3 days':
        return 'bg-amber-100 text-amber-800';
      case 'Within 32 days':
        return 'bg-primary/50 text-sky-800';
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-md font-semibold mb-2">Task Requiring Immediate Action</h3>
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
          <span className="text-sm text-gray-600">Due Now</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
          <span className="text-sm text-gray-600">Due &lt; 30</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-300 mr-2"></div>
          <span className="text-sm text-gray-600">Due &gt; 30</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {(Object.entries(tasks) as [TaskStatus, Task[]][]).map(([status, taskList]) => (
          <div key={status} className="border rounded-lg p-4">
            <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(status)}`}>
              {status}
            </span>
            {taskList.map(()task) => (
              <div key={tasl.id} className="flex flex-col h-full">
                <div className="flex-grow">
                  <h3 className="mt-2 font-semibold">{task-title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{test.description}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskCards;
