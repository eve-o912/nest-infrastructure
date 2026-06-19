import React from 'react'
import { cn } from '../../lib/utils'

interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  className,
}) => {
  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  }

  const getInitials = (name?: string) => {
    if (!name) return ''
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name}
        className={cn(
          'rounded-full object-cover',
          sizeStyles[size],
          className
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        'rounded-full bg-primary-600 text-white flex items-center justify-center font-medium',
        sizeStyles[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  )
}
