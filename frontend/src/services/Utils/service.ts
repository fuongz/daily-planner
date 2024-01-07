export function capitalizeFirstLetter(string: string | undefined | null) {
  if (typeof string === 'undefined' || !string || string.length === 0) return string
  if (string.length === 1) return string.toUpperCase()
  return string.charAt(0).toUpperCase() + string.slice(1)
}
