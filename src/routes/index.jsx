import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '../components/ui/button'
import { Eye, Code2 } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-foreground animate-fade-in">
            Welcome Home!
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in animation-delay-200">
            Component Preview System
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animation-delay-400">
          <Link to="/preview">
            <Button size="lg" className="gap-2">
              <Eye className="w-5 h-5" />
              Browse Components
            </Button>
          </Link>
          
          <a 
            href="https://github.com/fahmifachrizal/fahmifachrizal" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="outline" className="gap-2">
              <Code2 className="w-5 h-5" />
              View on GitHub
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-fade-in animation-delay-600">
          <div className="p-6 border border-border rounded-lg bg-card">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Eye className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
            <p className="text-sm text-muted-foreground">
              View components in real-time with hot reloading
            </p>
          </div>

          <div className="p-6 border border-border rounded-lg bg-card">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Code2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Dynamic Routes</h3>
            <p className="text-sm text-muted-foreground">
              Automatic component loading via dynamic routing
            </p>
          </div>

          <div className="p-6 border border-border rounded-lg bg-card">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Theme Support</h3>
            <p className="text-sm text-muted-foreground">
              Built-in dark mode with customizable themes
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}