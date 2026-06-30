'use client'

import { useEffect, useState } from 'react'

const messages = [
  'Someone recently purchased Cyberpunk 2077 just now',
  'A gamer just topped up their wallet',
  'GTA V was activated 2 minutes ago',
  'FC 25 just got a new owner',
  'Black Myth: Wukong purchased recently'
]

export default function LiveToast() {
  const [index, setIndex] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const cycle = () => {
      setShow(true)
      setTimeout(() => setShow(false), 5000)
    }
    cycle()
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length)
      cycle()
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  if (!show) return null

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30 animate-slideIn">
      <div className="glass neon-border shadow-neon rounded-full px-5 py-2.5 flex items-center gap-2 text-sm">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
        <span className="text-gray-200">{messages[index]}</span>
      </div>
    </div>
  )
}