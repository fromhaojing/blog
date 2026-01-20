'use client'
import { useEffect, useRef } from 'react'

import Experience from './ThreeExperience'

export default function ThreeScene() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    new Experience(ref.current)
  }, [])

  return <canvas ref={ref} className="fixed inset-0" />
}
