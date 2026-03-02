import { motion } from 'framer-motion';
import ProgressRing from './ProgressRing';

interface WeeklyStatsProps {
  todayProgress: number;
  weeklyStats: {
    day: string;
    date: string;
    total: number;
    completed: number;
    percentage: number;
  }[];
  totalTasks: number;
  completedTasks: number;
}

const ProgressView = ({ todayProgress, weeklyStats, totalTasks, completedTasks }: WeeklyStatsProps) => {
  return (
    <div className="space-y-6">
      {/* Today's Progress */}
      <div className="flex flex-col items-center py-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Today&apos;s Progress</h3>
        <ProgressRing percentage={todayProgress} size={140} strokeWidth={10} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-card p-4 border border-border/50 shadow-sm"
        >
          <p className="text-2xl font-bold text-foreground">{totalTasks}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Total Tasks</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-card p-4 border border-border/50 shadow-sm"
        >
          <p className="text-2xl font-bold text-success">{completedTasks}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Completed</p>
        </motion.div>
      </div>

      {/* Weekly Bar Chart */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">This Week</h3>
        <div className="flex items-end justify-between gap-2 h-32 rounded-2xl bg-card p-4 border border-border/50 shadow-sm">
          {weeklyStats.map((day, i) => (
            <div key={day.date} className="flex flex-col items-center gap-1 flex-1">
              <motion.div
                className="w-full rounded-lg bg-primary/20 relative overflow-hidden"
                style={{ height: '80px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <motion.div
                  className="absolute bottom-0 left-0 right-0 rounded-lg bg-primary"
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(day.percentage, 4)}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                />
              </motion.div>
              <span className="text-[10px] font-medium text-muted-foreground">{day.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressView;
