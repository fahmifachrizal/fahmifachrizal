import React from 'react'
import { Mail, Phone, MapPin, Globe } from 'lucide-react'
import { Button } from './ui/button'

function BussinessCard() {
  return (
    <div className="max-w-md mx-auto bg-card border border-border rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-primary/80 h-32"></div>
      <div className="relative px-6 pb-6">
        <div className="absolute -top-16 left-6">
          <div className="w-32 h-32 rounded-full border-4 border-card bg-muted flex items-center justify-center text-4xl font-bold">
            FF
          </div>
        </div>
        <div className="pt-20">
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Fahmi Fachrizal
          </h2>
          <p className="text-muted-foreground mb-4">
            Full Stack Developer
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-foreground">fahmi@example.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-primary" />
              <span className="text-foreground">+62 123 4567 890</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-foreground">Jakarta, Indonesia</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-foreground">fahmifachrizal.com</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1">
              Contact
            </Button>
            <Button variant="outline" className="flex-1">
              Portfolio
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BussinessCard