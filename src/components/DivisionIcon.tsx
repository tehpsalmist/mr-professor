import React, { ComponentProps } from 'react'

export interface DivisionIconProps extends Omit<ComponentProps<'svg'>, 'viewBox' | ''> {}

export const DivisionIcon = ({ className = '', ...props }: DivisionIconProps) => {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 448 512" {...props}>
      <path d="M272 96a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 320a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM400 288c17.7 0 32-14.3 32-32s-14.3-32-32-32H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H400z" />
    </svg>
  )
}
