interface StatusStampProps {
  status: 'Completed' | 'In Progress' | 'Blocked';
}

const STAMP_COLORS: Record<StatusStampProps['status'], { color: string; bg: string }> = {
  'Completed': { color: 'var(--color-stamp-done)', bg: 'var(--color-stamp-done-soft)' },
  'In Progress': { color: 'var(--color-stamp-progress)', bg: 'var(--color-stamp-progress-soft)' },
  'Blocked': { color: 'var(--color-stamp-blocked)', bg: 'var(--color-stamp-blocked-soft)' },
};

export const StatusStamp = ({ status }: StatusStampProps) => {
  const s = STAMP_COLORS[status];
  return (
    <span
      className="inline-flex items-center justify-center px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-widest border-2 rounded-sm shrink-0"
      style={{
        color: s.color,
        borderColor: s.color,
        backgroundColor: s.bg,
        transform: 'rotate(-2deg)',
      }}
    >
      {status}
    </span>
  );
};