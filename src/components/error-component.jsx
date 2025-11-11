import React from 'react'
import { AlertCircle } from 'lucide-react'

function ErrorComponent() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <AlertCircle className="w-16 h-16 text-destructive mb-4" />
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Component Not Found
      </h2>
      <p className="text-muted-foreground">
        The requested component could not be loaded. Please check the component name and try again.
      </p>
    </div>
  )
}

export default ErrorComponent