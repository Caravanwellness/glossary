'use client'

import Header from './Header'
import AlphaBar from './AlphaBar'

export default function ClientNav({ letters }: { letters: string[] }) {
  const presentLetters = new Set(letters)
  return (
    <>
      <Header />
      <AlphaBar presentLetters={presentLetters} />
    </>
  )
}
