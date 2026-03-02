import { motion } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';
import { Task, CATEGORY_CONFIG } from '@/types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const config = CATEGORY_CONFIG[task.category];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm border border-border/50"
    >
      <button
        onClick={() => onToggle(task.id)}
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
          task.completed
            ? 'border-success bg-success'
            : 'border-muted-foreground/30 hover:border-primary'
        }`}
      >
        {task.completed && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-success-foreground">
            <Check className="h-4 w-4" />
          </motion.div>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium leading-tight transition-all ${
          task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
        }`}>
          {task.title}
        </p>
        <span className="text-xs text-muted-foreground mt-0.5 inline-block">
          {config.emoji} {config.label}
        </span>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="shrink-0 p-1.5 rounded-lg text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </motion.div>
  );
};

export default TaskItem;
