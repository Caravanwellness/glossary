'use client'

import { createContext, useContext } from 'react'
import { DEFAULT_VARIANT, type Variant } from '@/variants'

const VariantContext = createContext<Variant>(DEFAULT_VARIANT)

export function VariantProvider({ variant, children }: { variant: Variant; children: React.ReactNode }) {
  return <VariantContext.Provider value={variant}>{children}</VariantContext.Provider>
}

export const useVariant = () => useContext(VariantContext)
