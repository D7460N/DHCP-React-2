import userEvent from '@testing-library/user-event';
import { Home, Users, Folder, Calendar, FileText, ChartBar, Cog, ClipboardList, Cloudy, BriefcaseMedical } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

type Activity = {
  user: string;
  time: string;
  action: string;
  comment?: string;
};

const activityFeeds: Record<string, Activity[]> = {
  "Activity": [
    { user: 'John Smith', time: '2 hours ago', action: 'created a new policy' },
    { user: 'John Smith', time: '3 hours ago', action: 'updated the policy' },
    { user: 'John Smith', time: '4 hours ago', action: 'deleted the policy' },
    { user: 'John Smith', time: '5 hours ago', action: 'created a new policy' },
    { user: 'John Smith', time: '6 hours ago', action: 'updated the policy' }
  ]
};

export const ActivityFeed = () => {
  const [comment, setComment] = useState('');

  return (
    <div className="p-6">
      {Object.entries(activityFeeds).map(([title, activities]) => (
        <div key={title}>
          <h3 className="font-semibold mb-6">{title}</h3>

          {activities.map((activity: Activity, idx) => (
            <div key={idx} className="flex items-start space-x-2 relative">
              <div className="flex flex-col items-center mr-2">
                <div className="relative z-10">
                  <div className="w-2 h-2 bg-sky-800 rounded-full"></div>
                </div>
                {idx < activities.length - 1 && (
                  <div className="w-px bg-sky-500 flex-1" style={{ minHeight: '40px' }}></div>
                )}
              </div>
              <div className="flex-1 text-sm text-gray-700">
                <div>
                  <strong>{activity.user}</strong> {activity.action}
                  <span className="text-xs text-gray-400 ml-1">{activity.time}</span>
                </div>
                {activity.comment && (
                  <div className="mt-2 p-3 bg-gray-100 rounded text-sm">
                    {activity.comment}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
