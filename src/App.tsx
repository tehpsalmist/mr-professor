import React, { ComponentProps, useState } from 'react'
import { NumPad } from './components/NumPad'
import CheckIcon from '@heroicons/react/24/outline/CheckIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import CalculatorIcon from '@heroicons/react/24/outline/CalculatorIcon'
import SparklesIcon from '@heroicons/react/24/outline/SparklesIcon'
import RocketIcon from '@heroicons/react/24/outline/RocketLaunchIcon'
import { Button, Modal } from '@8thday/react'
import { useGameState } from './hooks/useGameState'
import { Score } from './components/Score'
import { AdditionIcon } from './components/AdditionIcon'
import { SubtractionIcon } from './components/SubtractionIcon'
import { MultiplicationIcon } from './components/MultiplicationIcon'
import { DivisionIcon } from './components/DivisionIcon'
import { GameSettings } from './components/GameSettings'

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
    <main className={`${className} game-grid relative mx-auto min-h-screenD w-full max-w-md flex-col`} {...props}>
      <div className="progress flex h-2 w-full">
        <div
          className="h-full bg-red-500 transition-all duration-500"
          style={{ width: `${((wrong / totalCount) * 100).toFixed(3)}%` }}
        ></div>
        <div
          className="h-full bg-green-500 transition-all duration-500"
          style={{ width: `${((correct / totalCount) * 100).toFixed(3)}%` }}
        ></div>
      </div>
      <div className="display flex w-full overflow-x-auto overflow-y-hidden whitespace-nowrap text-nowrap p-4 pb-0 text-5xl text-gray-500">
        <span>{q} =&nbsp;</span>
        <span className="text-red-500/25">{submission}</span>
      </div>
      <div className="answer relative flex w-full px-4 text-5xl text-primary-600">
        <span className="ml-auto">{display || <>&nbsp;</>}</span>
        {result[0] && (
          <span key={result[0]} className={`flex-center absolute inset-y-0 left-0 m-4 h-12 w-12 animate-fadeout`}>
            {result[1] ? (
              <CheckIcon className="h-full w-full text-green-500" />
            ) : (
              <XMarkIcon className="h-full w-full text-red-500" />
            )}
          </span>
        )}
      </div>
      {gameMode === 'playing' && (
        <NumPad
          className="numberpad mx-auto h-full max-h-lg w-full max-w-md place-self-end"
          value={display}
          onChange={setDisplay}
          onEnter={(v) => {
            if (v) {
              submitAnswer(v)
              setDisplay('')
            }
          }}
        />
      )}
      <button
        className="absolute right-2 top-2 z-10 rounded border bg-white p-1 text-primary-500"
        onClick={() => {
          if (gameMode === 'playing') changeGameMode('paused')
        }}
      >
        <Bars3Icon className="h-5 w-5" />
      </button>
      {gameMode !== 'playing' && (
        <Modal className="relative h-screenD w-md" onClose={() => {}}>
          {gameMode === 'setup' && (
            <div className="flex h-full flex-col">
              <h3 className="mb-2 text-center text-gray-600">Operator</h3>
              <div className="relative grid grid-cols-4 gap-2">
                <button
                  className={`${operand === '+' ? 'bg-primary-500 text-white' : 'text-primary-500'} flex-center aspect-square h-full w-full rounded shadow-md`}
                  onClick={() => updateGameSettings(difficulty, '+')}
                >
                  <AdditionIcon className="h-12 w-12" />
                </button>
                <button
                  className={`${operand === '-' ? 'bg-primary-500 text-white' : 'text-primary-500'} flex-center aspect-square h-full w-full rounded shadow-md`}
                  onClick={() => updateGameSettings(difficulty, '-')}
                >
                  <SubtractionIcon className="h-12 w-12" />
                </button>
                <button
                  className={`${operand === 'x' ? 'bg-primary-500 text-white' : 'text-primary-500'} flex-center aspect-square h-full w-full rounded shadow-md`}
                  onClick={() => updateGameSettings(difficulty, 'x')}
                >
                  <MultiplicationIcon className="h-12 w-12" />
                </button>
                <button
                  className={`${operand === '/' ? 'bg-primary-500 text-white' : 'text-primary-500'} flex-center aspect-square h-full w-full rounded shadow-md`}
                  onClick={() => updateGameSettings(difficulty, '/')}
                >
                  <DivisionIcon className="h-12 w-12" />
                </button>
              </div>
              <h3 className="mb-2 mt-6 text-center text-gray-600">Level</h3>
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
              <GameSettings className="mb-4" difficulty={difficulty} operand={operand} />
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
              <GameSettings className="mb-4" difficulty={difficulty} operand={operand} />
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
