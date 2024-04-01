import React, { ComponentProps } from 'react'
import { Operand } from '../utils'
import { AdditionIcon } from './AdditionIcon'
import { SubtractionIcon } from './SubtractionIcon'
import { MultiplicationIcon } from './MultiplicationIcon'
import { DivisionIcon } from './DivisionIcon'

export interface GameSettingsProps extends ComponentProps<'div'> {
  difficulty: number
  operand: Operand
}

export const GameSettings = ({ className = '', difficulty, operand, ...props }: GameSettingsProps) => {
  return (
    <div className={`${className}`} {...props}>
      <h2 className="mb-2 text-center">Game Settings</h2>
      <div className="grid grid-cols-2">
        <div className="flex flex-col items-center">
          <span className="mb-1 text-lg font-bold text-gray-600">Operator</span>
          {operand === '+' && <AdditionIcon className="aspect-square w-12 text-primary-500" />}
          {operand === '-' && <SubtractionIcon className="aspect-square w-12 text-primary-500" />}
          {operand === 'x' && <MultiplicationIcon className="aspect-square w-12 text-primary-500" />}
          {operand === '/' && <DivisionIcon className="aspect-square w-12 text-primary-500" />}
        </div>
        <div className="flex flex-col items-center">
          <span className="mb-2 text-lg font-bold text-gray-600">Level</span>
          <span className="flex-center h-1/2 w-1/2 text-5xl text-primary-500">{difficulty + 1}</span>
        </div>
      </div>
    </div>
  )
}
