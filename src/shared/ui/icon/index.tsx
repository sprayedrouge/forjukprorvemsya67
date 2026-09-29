type IconName = 'arrow-up-right' | 'arrow-down' | 'arrow-left' | 'arrow-right';

const paths: Record<IconName, string> = {
  'arrow-up-right': 'M4 12 12 4M6 4h6v6',
  'arrow-down': 'M8 3v10M4 9l4 4 4-4',
  'arrow-left': 'M13 8H3M7 4 3 8l4 4',
  'arrow-right': 'M3 8h10M9 4l4 4-4 4',
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}

export type { IconName };
