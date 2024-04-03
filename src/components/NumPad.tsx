import React, { ComponentProps, useState } from 'react'
import BackspaceIcon from '@heroicons/react/24/outline/BackspaceIcon'
import CheckIcon from '@heroicons/react/24/outline/CheckIcon'

export interface NumPadProps extends Omit<ComponentProps<'div'>, 'onChange' | 'value'> {
  onChange(value: string): void
  value: string
  onEnter(value: string): void
}

export const NumPad = ({ className = '', value, onChange, onEnter, ...props }: NumPadProps) => {
  return (
    <div className={`${className} grid grid-cols-3 gap-2 p-2`} {...props}>
      <NumPadButton onClick={(e) => onChange(`${value}7`)}>7</NumPadButton>
      <NumPadButton onClick={(e) => onChange(`${value}8`)}>8</NumPadButton>
      <NumPadButton onClick={(e) => onChange(`${value}9`)}>9</NumPadButton>
      <NumPadButton onClick={(e) => onChange(`${value}4`)}>4</NumPadButton>
      <NumPadButton onClick={(e) => onChange(`${value}5`)}>5</NumPadButton>
      <NumPadButton onClick={(e) => onChange(`${value}6`)}>6</NumPadButton>
      <NumPadButton onClick={(e) => onChange(`${value}1`)}>1</NumPadButton>
      <NumPadButton onClick={(e) => onChange(`${value}2`)}>2</NumPadButton>
      <NumPadButton onClick={(e) => onChange(`${value}3`)}>3</NumPadButton>
      <NumPadButton onClick={(e) => onChange(`${value}0`)}>0</NumPadButton>
      <NumPadButton className={!value ? 'bg-gray-300' : `bg-green-400 text-white`} onClick={() => onEnter(value)}>
        <CheckIcon className="h-10 w-10" />
      </NumPadButton>
      <NumPadButton onClick={() => onChange(value.slice(0, -1))}>
        <BackspaceIcon className="h-10 w-10" />
      </NumPadButton>
    </div>
  )
}

export interface NumPadButtonProps extends ComponentProps<'button'> {}

export const NumPadButton = ({ className = '', ...props }: NumPadButtonProps) => {
  const [pressed, setPressed] = useState(false)

  return (
    <button
      className={`${className} ${pressed ? 'shadow' : 'shadow-md'} flex-center h-full w-full rounded-md text-3xl`}
      {...props}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onTouchCancel={() => setPressed(false)}
    ></button>
  )
}
