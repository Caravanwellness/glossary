/** URL slug for an item name. Kept free of data imports so client components can use it. */
export function encodeSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[()\/]/g, '')
}
