interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
}

export default function Badge({ children, variant = 'primary', size = 'md' }: BadgeProps) {
  const variants = {
    primary: 'bg-primary/10 text-primary border-primary/40',
    secondary: 'bg-surface/60 text-[color:var(--text-secondary)] border-[color:var(--border-soft)]',
    accent: 'bg-accent/10 text-accent border-accent/40',
  }

  const sizes = {
    sm: 'px-2 py-1 text-[11px] tracking-[0.3em] uppercase',
    md: 'px-3 py-1.5 text-xs tracking-[0.3em] uppercase',
    lg: 'px-4 py-2 text-sm tracking-[0.3em] uppercase',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border font-semibold ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </span>
  )
}

