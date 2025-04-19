"use client"

import { Lock, Delete } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function PinCodeLock() {
  const router = useRouter()
  const [pin, setPin] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [attempts, setAttempts] = useState<number>(0)
  const [isLocked, setIsLocked] = useState<boolean>(false)
  const [lockTimer, setLockTimer] = useState<number>(0)
  const [isShaking, setIsShaking] = useState<boolean>(false)

  const CORRECT_PIN = "1234"
  const MAX_ATTEMPTS = 3
  const LOCK_TIME = 30 // seconds

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isLocked && lockTimer > 0) {
      interval = setInterval(() => {
        setLockTimer((prev) => prev - 1)
      }, 1000)
    } else if (lockTimer === 0 && isLocked) {
      setIsLocked(false)
      setAttempts(0)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isLocked, lockTimer])

  const handleNumberPress = (num: string) => {
    if (isLocked) return

    if (pin.length < 4) {
      setPin((prevPin) => prevPin + num)
      setError("")
    }
  }

  const handleDelete = () => {
    if (isLocked) return
    setPin((prevPin) => prevPin.slice(0, -1))
    setError("")
  }

  const handleClear = () => {
    if (isLocked) return
    setPin("")
    setError("")
  }

  const shakeError = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 500)
  }

  useEffect(() => {
    if (pin.length === 4) {
      if (pin === CORRECT_PIN) {
        // Success
        setError("")
        setAttempts(0)
        setTimeout(() => {
          router.push("/secure-content")
        }, 500)
      } else {
        // Failure
        const newAttempts = attempts + 1
        setAttempts(newAttempts)

        if (newAttempts >= MAX_ATTEMPTS) {
          setIsLocked(true)
          setLockTimer(LOCK_TIME)
          setError(`Too many attempts. Locked for ${LOCK_TIME} seconds.`)
        } else {
          setError(`Incorrect PIN. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`)
          shakeError()
        }
        setPin("")
      }
    }
  }, [pin, attempts, router])

  const renderPinDots = () => {
    const dots = []
    for (let i = 0; i < 4; i++) {
      dots.push(
        <div
          key={i}
          className={`w-5 h-5 rounded-full mx-2.5 border ${
            i < pin.length ? "bg-gray-800 border-gray-800" : "bg-gray-200 border-gray-300"
          }`}
        />,
      )
    }
    return dots
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
      <div className="flex flex-col items-center mb-10">
        <Lock size={40} className="text-gray-800" />
        <h1 className="text-2xl font-bold mt-4 text-gray-800">Secure PIN Lock</h1>
        <p className="text-gray-600 mt-2">Enter your 4-digit PIN</p>
      </div>

      <div className={`flex justify-center mb-8 ${isShaking ? "animate-shake" : ""}`}>{renderPinDots()}</div>

      {error ? (
        <div className="h-10 flex items-center justify-center mb-5">
          <p className="text-red-600 font-medium text-center">{error}</p>
        </div>
      ) : (
        <div className="h-10 flex items-center justify-center mb-5">
          <p className="text-gray-600 text-center">
            {isLocked ? `Locked for ${lockTimer} seconds` : "Use keypad to enter PIN"}
          </p>
        </div>
      )}

      <div className="w-full max-w-xs">
        {[
          ["1", "2", "3"],
          ["4", "5", "6"],
          ["7", "8", "9"],
          ["clear", "0", "delete"],
        ].map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex justify-between mb-5">
            {row.map((num) => {
              if (num === "delete") {
                return (
                  <button
                    key={`key-${num}`}
                    className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center disabled:opacity-50"
                    onClick={handleDelete}
                    disabled={isLocked}
                    aria-label="Delete"
                  >
                    <Delete size={24} className="text-gray-700" />
                  </button>
                )
              } else if (num === "clear") {
                return (
                  <button
                    key={`key-${num}`}
                    className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center disabled:opacity-50"
                    onClick={handleClear}
                    disabled={isLocked}
                    aria-label="Clear"
                  >
                    <span className="text-2xl font-medium text-red-600">C</span>
                  </button>
                )
              } else {
                return (
                  <button
                    key={`key-${num}`}
                    className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-2xl font-medium text-gray-800 hover:bg-gray-100 active:bg-gray-200 transition-colors disabled:opacity-50"
                    onClick={() => handleNumberPress(num)}
                    disabled={isLocked}
                  >
                    {num}
                  </button>
                )
              }
            })}
          </div>
        ))}
      </div>

      <div className="mt-10">
        <p className="text-gray-400 text-sm text-center">Default PIN: 1234 (for demo purposes only)</p>
      </div>
    </div>
  )
}
