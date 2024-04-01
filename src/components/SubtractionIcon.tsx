import React, { ComponentProps } from 'react'

export interface SubtractionIconProps extends Omit<ComponentProps<'svg'>, 'viewBox' | ''> {}

export const SubtractionIcon = ({ className = '', ...props }: SubtractionIconProps) => {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 448 512" {...props}>
      <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
    </svg>
  )
}
