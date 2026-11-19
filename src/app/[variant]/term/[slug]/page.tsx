import { itemRoute } from '@/lib/item-page'

const route = itemRoute('term', { variantRoute: true })

export const dynamicParams = false
export const generateStaticParams = route.generateStaticParams
export const generateMetadata = route.generateMetadata
export default route.Page
