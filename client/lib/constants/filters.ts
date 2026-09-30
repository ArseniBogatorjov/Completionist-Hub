import type {
  AchievementFilterOptions,
  FilterButton,
  GameFilterOptions,
} from '@/types/filters/filters.types';

export const ACHIEVEMENT_FILTERS: FilterButton<AchievementFilterOptions>[] = [
  { value: 'all', label: 'All', className: 'min-w-16' },
  { value: 'unlocked', label: 'Unlocked', className: 'min-w-24' },
  { value: 'locked', label: 'Locked', className: 'min-w-20' },
  { value: 'missable', label: 'Missable', className: 'min-w-24' },
];

export const GAME_FILTERS: FilterButton<GameFilterOptions>[] = [
  { value: 'all', label: 'All', className: 'min-w-16' },
  { value: 'playing', label: 'Playing', className: 'min-w-20' },
  { value: 'completed', label: 'Completed', className: 'min-w-24' },
  { value: 'backlog', label: 'Backlog', className: 'min-w-24' },
];
