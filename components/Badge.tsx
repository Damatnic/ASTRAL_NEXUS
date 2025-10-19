interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
}

export default function Badge({ children, variant = 'primary', size = 'md' }: BadgeProps) {
  const variants = {
    primary: 'bg-primary/20 text-primary border-primary/30',
    secondary: 'bg-white/10 text-gray-300 border-white/20',
    accent: 'bg-accent/20 text-accent border-accent/30',
  }

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border font-semibold ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </span>
  )
}

