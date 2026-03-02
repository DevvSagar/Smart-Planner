export interface Task {
  id: string;
  title: string;
  completed: boolean;
  date: string; // ISO date string YYYY-MM-DD
  category: TaskCategory;
  createdAt: string;
}

export type TaskCategory = 'personal' | 'work' | 'health' | 'study';

export const CATEGORY_CONFIG: Record<TaskCategory, { label: string; emoji: string }> = {
  personal: { label: 'Personal', emoji: '🏠' },
  work: { label: 'Work', emoji: '💼' },
  health: { label: 'Health', emoji: '💪' },
  study: { label: 'Study', emoji: '📚' },
};

export type TabView = 'today' | 'calendar' | 'progress';
