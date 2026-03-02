import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Task, TaskCategory } from '@/types/task';
import { format } from 'date-fns';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('smartday-tasks', []);

  const addTask = useCallback((title: string, category: TaskCategory, date?: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      date: date || format(new Date(), 'yyyy-MM-dd'),
      category,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
  }, [setTasks]);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, [setTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, [setTasks]);

  const getTasksForDate = useCallback((date: string) => {
    return tasks.filter(t => t.date === date);
  }, [tasks]);

  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const todayTasks = useMemo(() => tasks.filter(t => t.date === todayStr), [tasks, todayStr]);

  const todayProgress = useMemo(() => {
    if (todayTasks.length === 0) return 0;
    return Math.round((todayTasks.filter(t => t.completed).length / todayTasks.length) * 100);
  }, [todayTasks]);

  const weeklyStats = useMemo(() => {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      const dateStr = format(d, 'yyyy-MM-dd');
      const dayTasks = tasks.filter(t => t.date === dateStr);
      const completed = dayTasks.filter(t => t.completed).length;
      return {
        day: format(d, 'EEE'),
        date: dateStr,
        total: dayTasks.length,
        completed,
        percentage: dayTasks.length > 0 ? Math.round((completed / dayTasks.length) * 100) : 0,
      };
    });
    return days;
  }, [tasks]);

  return { tasks, addTask, toggleTask, deleteTask, getTasksForDate, todayTasks, todayProgress, weeklyStats };
}
