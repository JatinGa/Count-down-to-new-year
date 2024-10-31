'use client'

import React, { useEffect, useState } from 'react'

export default function Component() {
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    // Create confetti
    const createConfetti = () => {
      const confetti = document.createElement('div')
      confetti.classList.add('confetti')
      confetti.style.left = `${Math.random() * 100}vw`
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`
      document.body.appendChild(confetti)
      setTimeout(() => confetti.remove(), 5000)
    }

    // Create firework
    const createFirework = () => {
      const firework = document.createElement('div')
      firework.classList.add('firework')
      firework.style.left = `${Math.random() * 100}vw`
      firework.style.bottom = '0'
      document.body.appendChild(firework)
      setTimeout(() => firework.remove(), 1000)
    }

    // Create star
    const createStar = () => {
      const star = document.createElement('div')
      star.classList.add('star')
      star.style.left = `${Math.random() * 100}vw`
      star.style.top = `${Math.random() * 100}vh`
      star.style.animationDuration = `${Math.random() * 3 + 2}s`
      document.body.appendChild(star)
    }

    // Set up intervals for animations
    const confettiInterval = setInterval(createConfetti, 50)
    const fireworkInterval = setInterval(createFirework, 200)

    // Create initial set of stars
    for (let i = 0; i < 50; i++) {
      createStar()
    }

    // Countdown timer
    const countdownTimer = setInterval(() => {
      const now = new Date()
      const newYear = new Date(now.getFullYear() + 1, 0, 1)
      const diff = newYear - now
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }, 1000)

    // Cleanup
    return () => {
      clearInterval(confettiInterval)
      clearInterval(fireworkInterval)
      clearInterval(countdownTimer)
    }
  }, [])

  return (
    <div className="h-screen w-screen overflow-hidden bg-black flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient animate-pulse animate-bounce animate-spin-slow">
        Happy New Year!
      </h1>
      <p className="text-2xl text-white mt-4" aria-live="polite">
        Countdown to midnight: {countdown}
      </p>
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes glow {
          from { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ff00de, 0 0 20px #ff00de; }
          to { text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #ff00de, 0 0 40px #ff00de; }
        }
        @keyframes confettiFall {
          to { transform: translateY(100vh) rotate(360deg); }
        }
        @keyframes firework {
          0% { transform: translateY(0) scale(0); }
          50% { transform: translateY(-50vh) scale(1); }
          100% { transform: translateY(-50vh) scale(0); opacity: 0; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          animation: confettiFall linear forwards;
        }
        .firework {
          position: fixed;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: radial-gradient(circle, white 10%, transparent 70%);
          animation: firework 1s ease-out forwards;
        }
        .star {
          position: fixed;
          width: 2px;
          height: 2px;
          background-color: white;
          border-radius: 50%;
          animation: twinkle ease-in-out infinite;
        }
        h1 {
          animation: gradient 5s ease infinite, glow 2s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  )
}
