import React, { ComponentProps } from 'react'
import ThumbsUpIcon from '@heroicons/react/24/outline/HandThumbUpIcon'
import ThumbsDownIcon from '@heroicons/react/24/outline/HandThumbDownIcon'

export interface ScoreProps extends ComponentProps<'div'> {
  correct: number
  wrong: number
}

export const Score = ({ className = '', correct, wrong, ...props }: ScoreProps) => {
  return (
    <div className={`${className}`} {...props}>
      <h3 className="my-2 text-center">Score</h3>
      <div className="flex justify-evenly">
        <div className="flex-center flex-col text-green-500">
          <ThumbsUpIcon className="h-1/2 w-1/2" />
          <span className="text-4xl font-bold">{correct}</span>
        </div>
        <div className="flex-center flex-col text-red-500">
          <ThumbsDownIcon className="h-1/2 w-1/2" />
          <span className="text-4xl font-bold">{wrong}</span>
        </div>
      </div>
    </div>
  )
}
