interface StampBadgeProps {
  label: string;
}

export default function StampBadge({ label }: StampBadgeProps) {
  return (
    <span className="inline-flex items-center justify-center -rotate-6 border-2 border-dashed border-accent text-accent rounded-full w-16 h-16 shrink-0 text-center">
      <span className="font-mono text-[9px] font-semibold tracking-wide leading-tight">
        {label}
      </span>
    </span>
  );
}
