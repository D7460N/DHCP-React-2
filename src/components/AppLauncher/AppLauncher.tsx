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
    { name: 'Automation', icon: PrintLogo, path: '/automation' },
    { name: 'DNS', icon: DnsLogo, path: '/dns' },
    { name: 'DHCP', icon: DnsLogo, path: '/dhcp' },
    { name: 'CA', icon: CaLogo, path: '/ca' },
    { name: 'Hub', icon: MaintenanceLogo, path: '/hub' },
    { name: 'Print', icon: PrintLogo, path: '/print' },
    { name: 'Maintenance', icon: MaintenanceLogo, path: '/maintenance' },
  ]
  
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="hover:bg-gray-100 rounded-full p-2"
      >
        <Grip size={20} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg p-4 z-50 min-w-[400px]">
          <div className="grid grid-cols-3 gap-6">
            {apps.map((app) => (
              <button
                key={app.name}
                onClick={() => {
                  setOpen(false)
                  navigate(app.path)
                }}
                className="flex flex-col items-center text-center py-3 hover:bg-gray-100 rounded transition-colors"
              >
                <div className="w-24 h-24 mb-1 flex items-center justify-center">
                  <img
                    src={app.icon}
                    alt={`${app.name} icon`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xs text-gray-700 break-words w-full">
                  {app.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
