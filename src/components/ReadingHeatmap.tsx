import { useMemo } from 'react';
import type { SessionRecord } from '@/types/game';

interface ReadingHeatmapProps {
  sessions: SessionRecord[];
  timeFilter: 'month' | 'year';
}

export const ReadingHeatmap = ({ sessions, timeFilter }: ReadingHeatmapProps) => {
  const heatmapData = useMemo(() => {
    const now = new Date();
    const days: { date: string; count: number; label: string }[] = [];
    
    const daysToShow = timeFilter === 'month' ? 35 : 365;
    
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = sessions.filter(s => s.date === dateStr).length;
      const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });
      days.push({ date: dateStr, count, label: dayLabel });
    }
    
    return days;
  }, [sessions, timeFilter]);

  const getIntensityClass = (count: number) => {
    if (count === 0) return 'bg-muted';
    if (count === 1) return 'bg-progress-green/40';
    if (count === 2) return 'bg-progress-green/60';
    return 'bg-progress-green';
  };

  if (timeFilter === 'month') {
    // Calendar-style view for month
    const weeks: typeof heatmapData[] = [];
    for (let i = 0; i < heatmapData.length; i += 7) {
      weeks.push(heatmapData.slice(i, i + 7));
    }

    return (
      <div className="card-glow p-4 rounded-xl">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>
        <div className="space-y-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-1">
              {week.map((day, dayIndex) => (
                <div
                  key={day.date}
                  className={`aspect-square rounded-sm ${getIntensityClass(day.count)} transition-colors`}
                  title={`${day.date}: ${day.count} session${day.count !== 1 ? 's' : ''}`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end gap-1 mt-3 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-muted" />
          <div className="w-3 h-3 rounded-sm bg-progress-green/40" />
          <div className="w-3 h-3 rounded-sm bg-progress-green/60" />
          <div className="w-3 h-3 rounded-sm bg-progress-green" />
          <span>More</span>
        </div>
      </div>
    );
  }

  // Simplified year view
  const monthGroups = useMemo(() => {
    const groups: { month: string; count: number }[] = [];
    const months: Record<string, number> = {};
    
    heatmapData.forEach(day => {
      const month = day.date.substring(0, 7);
      months[month] = (months[month] || 0) + day.count;
    });

    Object.entries(months).forEach(([month, count]) => {
      const date = new Date(month + '-01');
      groups.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        count
      });
    });

    return groups.slice(-12);
  }, [heatmapData]);

  return (
    <div className="card-glow p-4 rounded-xl">
      <div className="grid grid-cols-6 gap-2">
        {monthGroups.map((m, i) => (
          <div key={i} className="text-center">
            <div 
              className={`h-8 rounded ${getIntensityClass(m.count)} mb-1`}
              title={`${m.month}: ${m.count} sessions`}
            />
            <span className="text-xs text-muted-foreground">{m.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
