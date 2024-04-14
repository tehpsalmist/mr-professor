import React, { ComponentProps, useState } from 'react'
import BackspaceIcon from '@heroicons/react/24/outline/BackspaceIcon'
import CheckIcon from '@heroicons/react/24/outline/CheckIcon'
import { useEventListener } from '@8thday/react'

export interface NumPadProps extends Omit<ComponentProps<'div'>, 'onChange' | 'value'> {
  onChange(value: string): void
  value: string
  onEnter(value: string): void
}

export const NumPad = ({ className = '', value, onChange, onEnter, ...props }: NumPadProps) => {
  const appendDigit = (digit: string) => {
    const adjustedValue = value === '0' ? '' : value

    onChange(`${adjustedValue}${digit}`)
  }

  useEventListener('keydown', (e) => {
    console.log(e.key)

    switch (e.key) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        return appendDigit(e.key)
      case 'Backspace':
        return onChange(value.slice(0, -1))
      case 'Enter':
        return onEnter(value)
    }
  })

  return (
    <div className={`${className} grid grid-cols-3 gap-2 p-2`} {...props}>
      <NumPadButton onClick={(e) => appendDigit('7')}>7</NumPadButton>
      <NumPadButton onClick={(e) => appendDigit('8')}>8</NumPadButton>
      <NumPadButton onClick={(e) => appendDigit('9')}>9</NumPadButton>
      <NumPadButton onClick={(e) => appendDigit('4')}>4</NumPadButton>
      <NumPadButton onClick={(e) => appendDigit('5')}>5</NumPadButton>
      <NumPadButton onClick={(e) => appendDigit('6')}>6</NumPadButton>
      <NumPadButton onClick={(e) => appendDigit('1')}>1</NumPadButton>
      <NumPadButton onClick={(e) => appendDigit('2')}>2</NumPadButton>
      <NumPadButton onClick={(e) => appendDigit('3')}>3</NumPadButton>
      <NumPadButton onClick={(e) => value !== '0' && appendDigit('0')}>0</NumPadButton>
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
