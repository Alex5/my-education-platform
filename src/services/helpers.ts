export const snipText = (text: string, length?: number): string => {
   return text.length > 25 ? `${text.slice(0, length || 25)}...` : text
}