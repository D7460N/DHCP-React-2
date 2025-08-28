import { useState } from 'react';
import { Grip } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CaLogo from '../../assets/CaLogo.svg';
import DnsLogo from '../../assets/DnsLogo.svg';
import PrintLogo from '../../assets/PrintLogo.svg';
import MaintenanceLogo from '../../assets/MaintenanceLogo.svg';

export default function AppLauncher() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const apps = [
      { name: 'Automation', time: '2 hours ago', action: 'created a new policy' },
      { name: 'DNS', time: '3 hours ago', action: 'updated the policy' },
      { name: 'DHCP', time: '4 hours ago', action: 'deleted the policy' },
      { name: 'CA', time: '5 hours ago', action: 'created a new policy' },
      { name: 'Another', time: '6 hours ago', action: 'updated the policy' }
      { name: 'Print', time: '6 hours ago', action: 'updated the policy' }
      { name: 'Maintenance', icon: MaintenanceLogo, action: 'updated the policy' }
    ]
  };
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
