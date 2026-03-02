import { useState } from 'react';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { useTasks } from '@/hooks/useTasks';
import { TabView } from '@/types/task';
import TaskItem from '@/components/TaskItem';
import AddTaskSheet from '@/components/AddTaskSheet';
import BottomNav from '@/components/BottomNav';
import CalendarView from '@/components/CalendarView';
import ProgressView from '@/components/ProgressView';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabView>('today');
  const { tasks, addTask, toggleTask, deleteTask, getTasksForDate, todayTasks, todayProgress, weeklyStats } = useTasks();

  const todayLabel = format(new Date(), 'EEEE, MMM d');
  const completedCount = todayTasks.filter(t => t.completed).length;

  const appContent = (
    <div className="mobile-container bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 glass-strong px-5 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-bold text-foreground"
            >
              SmartDay
            </motion.h1>
            <p className="text-xs text-muted-foreground mt-0.5">{todayLabel}</p>
          </div>
          {activeTab === 'today' && todayTasks.length > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1.5 rounded-xl bg-primary/10 px-3 py-1.5"
            >
              <span className="text-xs font-semibold text-primary">
                {completedCount}/{todayTasks.length}
              </span>
            </motion.div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="px-5 pb-28 pt-2">
        <AnimatePresence mode="wait">
          {activeTab === 'today' && (
            <motion.div
              key="today"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {todayTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <span className="text-5xl mb-4">☀️</span>
                  <h3 className="text-base font-semibold text-foreground mb-1">No tasks yet</h3>
                  <p className="text-sm text-muted-foreground">Tap + to add your first task</p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {todayTasks
                    .sort((a, b) => Number(a.completed) - Number(b.completed))
                    .map(task => (
                      <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
                    ))}
                </AnimatePresence>
              )}
            </motion.div>
          )}

          {activeTab === 'calendar' && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <CalendarView
                tasks={tasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
                getTasksForDate={getTasksForDate}
              />
            </motion.div>
          )}

          {activeTab === 'progress' && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <ProgressView
                todayProgress={todayProgress}
                weeklyStats={weeklyStats}
                totalTasks={tasks.length}
                completedTasks={tasks.filter(t => t.completed).length}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Add Task FAB */}
      <AddTaskSheet onAdd={addTask} />

      {/* Bottom Navigation */}
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );

  return (
    <>
      {/* Mobile: full screen */}
      <div className="block lg:hidden">{appContent}</div>

      {/* Desktop: phone frame centered */}
      <div className="hidden lg:flex min-h-screen items-center justify-center bg-muted/50 p-8">
        <div className="flex flex-col items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground text-center">SmartDay</h2>
            <p className="text-sm text-muted-foreground text-center mt-1">Your hybrid daily planner</p>
          </div>
          <div className="relative w-[390px] h-[844px] rounded-[3rem] border-[8px] border-foreground/10 shadow-2xl shadow-foreground/5 overflow-hidden bg-background">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-foreground/10 rounded-b-2xl z-50" />
            <div className="h-full overflow-y-auto overflow-x-hidden pt-7">
              {appContent}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
