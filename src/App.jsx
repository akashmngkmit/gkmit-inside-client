import { useState } from "react"
import { Button } from "./components/ui/button"

export function App() {
  const [showMessage, setShowMessage] = useState(false)

  return (
    <div className="flex bg-black min-h-svh flex-col items-center justify-center gap-4">
      {showMessage && (
        <p className="text-amber-600">hola user,  welcome to gkmit inside</p>
      )}
      <Button onClick={() => setShowMessage((s) => !s)}>
        Click me
      </Button>
    </div>
  )
}
