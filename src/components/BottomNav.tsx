import { CalendarDays, CheckCircle2, LayoutList } from 'lucide-react';
import { TabView } from '@/types/task';

interface BottomNavProps {
  active: TabView;
  onChange: (tab: TabView) => void;
}

const tabs: { id: TabView; label: string; icon: React.ReactNode }[] = [
  { id: 'today', label: 'Today', icon: <LayoutList className="h-5 w-5" /> },
  { id: 'calendar', label: 'Calendar', icon: <CalendarDays className="h-5 w-5" /> },
  { id: 'progress', label: 'Progress', icon: <CheckCircle2 className="h-5 w-5" /> },
];

const BottomNav = ({ active, onChange }: BottomNavProps) => {
  return (
    <nav className="fixed lg:absolute bottom-0 left-0 right-0 z-30 mx-auto max-w-md lg:max-w-none glass-strong rounded-t-2xl safe-bottom">
      <div className="flex items-center justify-around py-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex flex-col items-center gap-0.5 px-6 py-2 rounded-xl transition-all ${
              active === tab.id
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.icon}
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
