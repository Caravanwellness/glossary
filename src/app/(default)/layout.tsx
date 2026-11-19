import VariantShell from '@/components/VariantShell'
import { DEFAULT_VARIANT } from '@/variants'

export default function DefaultVariantLayout({ children }: { children: React.ReactNode }) {
  return <VariantShell variant={DEFAULT_VARIANT}>{children}</VariantShell>
}
