import { useCallback, useState } from "react";
import type { FloatingTextProps } from "./FloatingText";

type FloatingText = FloatingTextProps & { id: string }

export function useFloatingText() {
  const [fTexts, setTexts] = useState<FloatingText[]>([])

  const addFloatingText = useCallback((text: Omit<FloatingText, 'id'>) => {    
    setTexts((prev) => {
      return [ ...prev, { ...text, id: crypto.randomUUID()}]
    })
  }, [])

  const removeFloatingText = useCallback((id: string) => {
    setTexts((prev) => prev.filter(item => item.id !== id))
  }, [])

  return { fTexts, addFloatingText, removeFloatingText }

}