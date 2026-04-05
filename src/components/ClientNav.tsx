'use client'

import { useRef } from 'react'
import Header from './Header'
import AlphaBar from './AlphaBar'
import { articlesData } from '@/data/articles'

const presentLetters = new Set(
  Object.keys(articlesData).map(name => name[0].toUpperCase())
)

export default function ClientNav() {
  return (
    <>
      <Header />
      <AlphaBar presentLetters={presentLetters} />
    </>
  )
}
