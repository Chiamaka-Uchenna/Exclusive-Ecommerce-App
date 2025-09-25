"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: Date
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex items-center space-x-4">
      <div className="text-center">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Days</div>
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {String(timeLeft.days).padStart(2, "0")}
        </div>
      </div>
      <div className="text-2xl font-bold text-red-500">:</div>
      <div className="text-center">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Hours</div>
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {String(timeLeft.hours).padStart(2, "0")}
        </div>
      </div>
      <div className="text-2xl font-bold text-red-500">:</div>
      <div className="text-center">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Minutes</div>
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {String(timeLeft.minutes).padStart(2, "0")}
        </div>
      </div>
      <div className="text-2xl font-bold text-red-500">:</div>
      <div className="text-center">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Seconds</div>
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {String(timeLeft.seconds).padStart(2, "0")}
        </div>
      </div>
    </div>
  )
}
