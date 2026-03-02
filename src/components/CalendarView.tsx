import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, startOfWeek, endOfWeek, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task, CATEGORY_CONFIG } from '@/types/task';
import TaskItem from './TaskItem';

interface CalendarViewProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  getTasksForDate: (date: string) => Task[];
}

const CalendarView = ({ tasks, onToggle, onDelete, getTasksForDate }: CalendarViewProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
  const selectedTasks = getTasksForDate(selectedDateStr);

  const prevMonth = () => {
    setCurrentMonth(prev => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
  };

  const nextMonth = () => {
    setCurrentMonth(prev => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
  };

  return (
    <div className="space-y-4">
      {/* Month Header */}
      <div className="flex items-center justify-between">
        <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="text-base font-semibold text-foreground">{format(currentMonth, 'MMMM yyyy')}</h3>
        <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <span key={d} className="text-[10px] font-medium text-muted-foreground py-1">{d}</span>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const dayTasks = tasks.filter(t => t.date === dateStr);
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
          const today = isToday(day);

          return (
            <button
              key={dateStr}
              onClick={() => setSelectedDate(day)}
              className={`relative flex flex-col items-center justify-center rounded-xl py-2 text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-primary text-primary-foreground'
                  : today
                  ? 'bg-accent/15 text-accent font-semibold'
                  : isCurrentMonth
                  ? 'text-foreground hover:bg-muted'
                  : 'text-muted-foreground/40'
              }`}
            >
              {format(day, 'd')}
              {dayTasks.length > 0 && (
                <span className={`absolute bottom-0.5 h-1 w-1 rounded-full ${
                  isSelected ? 'bg-primary-foreground' : 'bg-primary'
                }`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected day tasks */}
      <div className="pt-2">
        <h4 className="text-sm font-semibold text-foreground mb-3">
          {format(selectedDate, 'EEEE, MMM d')}
          <span className="text-muted-foreground font-normal ml-2">
            {selectedTasks.length} task{selectedTasks.length !== 1 ? 's' : ''}
          </span>
        </h4>
        <AnimatePresence mode="popLayout">
          <div className="space-y-2">
            {selectedTasks.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No tasks for this day</p>
            ) : (
              selectedTasks.map(task => (
                <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
              ))
            )}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CalendarView;
