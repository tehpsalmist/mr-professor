import { useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { useInterval } from '@8thday/react'

export type Operand = '+' | '-' | 'x' | '/'
export type GameMode = 'setup' | 'playing' | 'paused' | 'done'

export const useGameState = () => {
  const confettiIntervalRef = useRef(0)

  const [gameMode, setGameMode] = useState<GameMode>('setup')

  const [difficulty, setDifficulty] = useState(0)
  const [operand, setOperand] = useState<Operand>('+')
  const [questions, setQuestions] = useState(() => [...generateQandAs(difficulty, operand)])

  const [currentIndex, setCurrentIndex] = useState(0)
  const { q, a } = questions[currentIndex]

  const [submission, setSubmission] = useState('')
  const [result, setResult] = useState<[string, boolean]>(['', false])

  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)

  const [finalMessage, setFinalMessage] = useState('')

  const changeGameMode = (newMode: GameMode) => {
    if (newMode === gameMode) return

    switch (newMode) {
      case 'setup':
        if (gameMode === 'playing') return

        setResult(['', false])
        setSubmission('')
        setCorrect(0)
        setWrong(0)
        setQuestions([...generateQandAs(difficulty, operand)])
        setCurrentIndex(0)
        setFinalMessage('')

        return setGameMode(newMode)
      case 'done':
        if (['paused', 'setup'].includes(gameMode)) return

        setFinalMessage(getFinalMessage(correct, wrong, difficulty, operand))

        if (wrong === 0) {
          confetti({ zIndex: 9999, origin: { y: 1 } })
        }

        return setGameMode(newMode)
      case 'playing':
        if (gameMode === 'done') return
        return setGameMode(newMode)
      case 'paused':
        if (['done', 'setup'].includes(gameMode)) return
        return setGameMode(newMode)
    }
  }

  const submitAnswer = (answer: string) => {
    if (answer === a) {
      setSubmission('')
      setResult([`${q} = ${answer}`, true])

      if (currentIndex === questions.length - 1) {
        changeGameMode('done')
      } else {
        setCurrentIndex((i) => i + 1)
      }

      if (!submission) {
        setCorrect((c) => c + 1)
      }

      return true
    } else {
      setSubmission(answer)
      setResult([`${q} = ${answer}`, false])

      if (!submission) {
        setWrong((w) => w + 1)
      }

      return false
    }
  }

  const updateGameSettings = (difficulty: number, operand: Operand) => {
    setDifficulty(difficulty)
    setOperand(operand)

    setQuestions([...generateQandAs(difficulty, operand)])
  }

  useInterval(
    () => {
      const angle = Math.floor(Math.random() * 90) + 45
      confetti({ zIndex: 9999, angle, origin: { x: (angle - 45) / 90, y: 1 } })
    },
    gameMode === 'done' && wrong === 0 ? 1000 : 0,
  )

  return {
    operand,
    difficulty,
    gameMode,
    q,
    a,
    submission,
    result,
    correct,
    wrong,
    totalCount: questions.length,
    currentIndex,
    finalMessage,
    changeGameMode,
    submitAnswer,
    updateGameSettings,
  }
}

function* generateQandAs(difficulty: number, operand: Operand, length = 10) {
  const questions = {}

  switch (operand) {
    case '+': {
      while (length-- > 0) {
        yield getRandomAdditionProblem()
      }

      function getRandomAdditionProblem() {
        const addend1 = getValidProblemPart(difficulty, operand)
        const addend2 = getValidProblemPart(difficulty, operand)
        const sum = addend1 + addend2

        const q = `${addend1} + ${addend2}`

        if (questions[q]) {
          return getRandomAdditionProblem()
        }

        questions[q] = 1

        return { q, a: `${sum}` }
      }
    }
    case '-': {
      while (length-- > 0) {
        yield getRandomSubtractionProblem()
      }

      function getRandomSubtractionProblem() {
        const addend1 = getValidProblemPart(difficulty, operand)
        const addend2 = getValidProblemPart(difficulty, operand)
        // do the math in reverse to get the right values within difficulty parameters
        const sum = addend1 + addend2

        const q = `${sum} - ${addend1}`

        if (questions[q]) {
          return getRandomSubtractionProblem()
        }

        questions[q] = 1

        return { q, a: `${addend2}` }
      }
    }
  }
}

function getValidProblemPart(difficulty: number, operand: Operand) {
  const [min, max] = difficulties[difficulty][operand]
  const problemPart = Math.floor(Math.random() * (max + 1) - min) + min

  return problemPart
}

const difficulties = [
  {
    '+': [0, 9],
    '-': [0, 9],
    x: [0, 5],
    '/': [0, 5],
  },
  {
    '+': [10, 20],
    '-': [10, 20],
    x: [0, 9],
    '/': [0, 9],
  },
  {
    '+': [21, 50],
    '-': [21, 50],
    x: [10, 15],
    '/': [10, 15],
  },
  {
    '+': [51, 100],
    '-': [51, 100],
    x: [16, 30],
    '/': [16, 30],
  },
  {
    '+': [101, 200],
    '-': [101, 200],
    x: [31, 100],
    '/': [31, 100],
  },
  {
    '+': [201, 500],
    '-': [201, 500],
    x: [101, 500],
    '/': [101, 500],
  },
  {
    '+': [501, 1000],
    '-': [501, 1000],
    x: [501, 1000],
    '/': [501, 1000],
  },
  {
    '+': [1001, 10000],
    '-': [1001, 10000],
    x: [1001, 10000],
    '/': [1001, 10000],
  },
]

function getFinalMessage(correct: number, wrong: number, difficulty: number, operand: Operand) {
  const ratio = correct / (correct + wrong)

  switch (true) {
    case ratio === 1:
      return 'Perfect Score!'
    case ratio > 0.75:
      return 'Good work!'
    case ratio > 0.5:
      return "Whoa, you're halfway there!"
    case ratio > 0.25:
      return "Keep at it, and you're sure to improve!"
    default:
      return 'Well, thanks for showing up!'
  }
}
