import React, { ComponentProps, useState } from 'react'
import { NumPad } from './NumPad'
import CheckIcon from '@heroicons/react/24/outline/CheckIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import CalculatorIcon from '@heroicons/react/24/outline/CalculatorIcon'
import SparklesIcon from '@heroicons/react/24/outline/SparklesIcon'
import RocketIcon from '@heroicons/react/24/outline/RocketLaunchIcon'
import { Button, Modal } from '@8thday/react'
import { useGameState } from './hooks/useGameState'
import { Score } from './Score'

const levels = Array(8).fill(1)

export interface AppProps extends ComponentProps<'div'> {}

export const App = ({ className = '', ...props }: AppProps) => {
  const [display, setDisplay] = useState('')
  const {
    q,
    correct,
    wrong,
    totalCount,
    submission,
    result,
    submitAnswer,
    operand,
    difficulty,
    updateGameSettings,
    gameMode,
    changeGameMode,
    finalMessage,
  } = useGameState()

  return (
    <main className={`${className} min-h-screenD relative mx-auto flex w-full max-w-md flex-col`} {...props}>
      <div className="flex h-2 w-full">
        <div
          className="h-full bg-red-500 transition-all duration-500"
          style={{ width: `${((wrong / totalCount) * 100).toFixed(3)}%` }}
        ></div>
        <div
          className="h-full bg-green-500 transition-all duration-500"
          style={{ width: `${((correct / totalCount) * 100).toFixed(3)}%` }}
        ></div>
      </div>
      <div className="flex w-full overflow-x-auto whitespace-nowrap text-nowrap p-4 text-5xl text-gray-500">
        <span>{q} =&nbsp;</span>
        <span className="text-red-500/25">{submission}</span>
      </div>
      <div className="relative flex w-full p-4 text-5xl text-primary-600">
        <span className="ml-auto">{display}</span>
        {result[0] && (
          <span key={result[0]} className={`animate-fadeout flex-center absolute inset-y-0 left-0 m-4 h-12 w-12`}>
            {result[1] ? (
              <CheckIcon className="h-full w-full text-green-500" />
            ) : (
              <XMarkIcon className="h-full w-full text-red-500" />
            )}
          </span>
        )}
      </div>
      <NumPad
        className="sticky bottom-0 mx-auto mt-auto w-full max-w-md"
        value={display}
        onChange={setDisplay}
        onEnter={(v) => {
          if (v) {
            submitAnswer(v)
            setDisplay('')
          }
        }}
      />
      <button
        className="absolute right-2 top-2 z-10 rounded border p-1"
        onClick={() => {
          if (gameMode === 'playing') changeGameMode('paused')
        }}
      >
        <Bars3Icon className="h-5 w-5" />
      </button>
      {gameMode !== 'playing' && (
        <Modal className="h-screenD relative w-md" onClose={() => {}}>
          {gameMode === 'setup' && (
            <div className="flex h-full flex-col">
              <div className="relative grid grid-cols-4 gap-2">
                <button
                  className={`${operand === '+' ? 'bg-primary-500 text-white' : 'text-primary-500'} flex-center aspect-square h-full w-full rounded shadow-md`}
                  onClick={() => updateGameSettings(difficulty, '+')}
                >
                  <svg className="h-12 w-12 fill-current" viewBox="0 0 448 512">
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                  </svg>
                </button>
                <button
                  className={`${operand === '-' ? 'bg-primary-500 text-white' : 'text-primary-500'} flex-center aspect-square h-full w-full rounded shadow-md`}
                  onClick={() => updateGameSettings(difficulty, '-')}
                >
                  <svg className="h-12 w-12 fill-current" viewBox="0 0 448 512">
                    <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                  </svg>
                </button>
                <button
                  className={`${operand === 'x' ? 'bg-primary-500 text-white' : 'text-primary-500'} flex-center aspect-square h-full w-full rounded shadow-md`}
                  onClick={() => updateGameSettings(difficulty, 'x')}
                >
                  <svg className="h-12 w-12 fill-current" viewBox="0 0 384 512">
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                  </svg>
                </button>
                <button
                  className={`${operand === '/' ? 'bg-primary-500 text-white' : 'text-primary-500'} flex-center aspect-square h-full w-full rounded shadow-md`}
                  onClick={() => updateGameSettings(difficulty, '/')}
                >
                  <svg className="h-12 w-12 fill-current" viewBox="0 0 448 512">
                    <path d="M272 96a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 320a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM400 288c17.7 0 32-14.3 32-32s-14.3-32-32-32H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H400z" />
                  </svg>
                </button>
              </div>
              <h3 className="mb-2 mt-6 text-center">Level</h3>
              <div className="grid grid-cols-4 gap-2">
                {levels.map((n, i) => (
                  <button
                    key={i}
                    className={`${difficulty === i ? 'bg-primary-500 text-white' : 'text-primary-500'} flex-center aspect-square grow rounded text-2xl shadow-md`}
                    onClick={() => updateGameSettings(i, operand)}
                  >
                    {n + i}
                  </button>
                ))}
              </div>
              <div className="flex-center mb-4 mt-auto">
                {gameMode === 'setup' && (
                  <Button variant="primary" PreIcon={RocketIcon} onClick={() => changeGameMode('playing')}>
                    Play!
                  </Button>
                )}
              </div>
            </div>
          )}
          {gameMode === 'paused' && (
            <div className="flex h-full flex-col">
              <Score className="mb-auto" correct={correct} wrong={wrong} />
              <div className="flex-center mb-4 gap-4">
                <Button
                  variant="destructive"
                  PreIcon={TrashIcon}
                  onClick={() => {
                    if (confirm('Are you sure you want to cancel?')) {
                      changeGameMode('setup')
                    }
                  }}
                >
                  Cancel Game
                </Button>
                <Button variant="primary" PreIcon={CalculatorIcon} onClick={() => changeGameMode('playing')}>
                  Continue
                </Button>
              </div>
            </div>
          )}
          {gameMode === 'done' && (
            <div className="flex h-full flex-col">
              <Score correct={correct} wrong={wrong} />
              <span className="my-auto text-center text-xl">{finalMessage}</span>
              <div className="flex-center mb-4 gap-4">
                <Button variant="primary" PreIcon={SparklesIcon} onClick={() => changeGameMode('setup')}>
                  New Game
                </Button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </main>
  )
}
