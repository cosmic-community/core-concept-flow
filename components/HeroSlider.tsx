'use client'

import { useState, useEffect } from 'react'
import type { HeroSlide } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  if (!slides || slides.length === 0) {
    return (
      <div className="relative h-64 sm:h-80 rounded-2xl glass neon-border flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold gradient-text">Welcome to PixelChowk</h1>
          <p className="text-gray-400 mt-2">Budget Steam game activations, instant delivery.</p>
        </div>
      </div>
    )
  }

  const slide = slides[current]
  if (!slide) return null

  const bg = slide.metadata?.background_image
  const headline = getMetafieldValue(slide.metadata?.headline)
  const subtext = getMetafieldValue(slide.metadata?.subtext)
  const link = getMetafieldValue(slide.metadata?.button_link)

  return (
    <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden neon-border shadow-purpleGlow">
      {bg?.imgix_url && (
        <img
          src={`${bg.imgix_url}?w=2000&h=800&fit=crop&auto=format,compress`}
          alt={headline}
          width={1000}
          height={400}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-base-black via-base-black/60 to-transparent" />
      <div className="relative h-full flex flex-col justify-end p-6 sm:p-10 max-w-2xl">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-lg">{headline}</h1>
        {subtext && <p className="text-gray-200 mt-3 text-sm sm:text-lg">{subtext}</p>}
        {link && (
          <a
            href={link}
            className="mt-5 inline-block w-fit px-6 py-2.5 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold text-sm hover:opacity-90 transition shadow-neon"
          >
            Explore Now
          </a>
        )}
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-4 right-4 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition ${
                i === current ? 'bg-neon-blue w-6' : 'bg-white/40'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}