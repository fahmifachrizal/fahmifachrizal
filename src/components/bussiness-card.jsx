import React, { useRef, useState } from 'react'
import { Mail, Phone, Globe, Linkedin, Github } from 'lucide-react'

export default function BussinessCard() {
  const cardRef = useRef(null)
  const glowRef = useRef(null)
  const [bounds, setBounds] = useState(null)

  // Hover effect parameters - adjust these to fine-tune the effect
  const HOVER_PARAMS = {
    scale: 1.07,              // Scale multiplier on hover (1.0 = no scaling)
    maxRotation: 15,          // Maximum rotation angle in degrees (10-25 recommended)
    glowIntensity: 0.55,      // Glow opacity (0-1)
    glowSpread: 2,            // How far the glow spreads from mouse (1-3 recommended)
    transitionSpeed: 200,     // Transition duration in ms
    perspective: 1000,        // Perspective depth (500-2000 recommended)
  }

  const rotateToMouse = (e) => {
    if (!cardRef.current || !bounds) return

    const mouseX = e.clientX
    const mouseY = e.clientY
    const leftX = mouseX - bounds.x
    const topY = mouseY - bounds.y
    
    // Calculate position relative to card center (-1 to 1)
    const centerX = leftX - bounds.width / 2
    const centerY = topY - bounds.height / 2
    
    // Normalize to -1 to 1 range
    const rotateX = (centerY / (bounds.height / 2)) * HOVER_PARAMS.maxRotation
    const rotateY = (centerX / (bounds.width / 2)) * HOVER_PARAMS.maxRotation

    cardRef.current.style.transform = `
      perspective(${HOVER_PARAMS.perspective}px)
      scale3d(${HOVER_PARAMS.scale}, ${HOVER_PARAMS.scale}, ${HOVER_PARAMS.scale})
      rotateX(${-rotateX}deg)
      rotateY(${rotateY}deg)
    `

    if (glowRef.current) {
      // Convert glow intensity to hex (0-1 to 00-ff)
      const glowHex = Math.round(HOVER_PARAMS.glowIntensity * 255).toString(16).padStart(2, '0')
      
      glowRef.current.style.backgroundImage = `
        radial-gradient(
          circle at
          ${centerX * HOVER_PARAMS.glowSpread + bounds.width / 2}px
          ${centerY * HOVER_PARAMS.glowSpread + bounds.height / 2}px,
          #ffffff${glowHex},
          #0000000f
        )
      `
    }
  }

  const handleMouseEnter = () => {
    if (cardRef.current) {
      setBounds(cardRef.current.getBoundingClientRect())
    }
  }

  const handleMouseMove = (e) => {
    rotateToMouse(e)
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = ''
    }
    if (glowRef.current) {
      glowRef.current.style.backgroundImage = ''
    }
    setBounds(null)
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-[350px] h-[200px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg shadow-2xl overflow-hidden relative ease-out"
      style={{ 
        transformStyle: 'preserve-3d',
        transition: `transform ${HOVER_PARAMS.transitionSpeed}ms`
      }}
    >
      {/* Glow effect layer */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{ 
          mixBlendMode: 'overlay',
          transition: `background-image ${HOVER_PARAMS.transitionSpeed}ms`
        }}
      />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500"></div>

      <div className="relative h-full flex flex-col justify-between p-6">
        {/* Top section - Name and title */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">
            Fahmi Fachrizal
          </h2>
          <p className="text-cyan-400 text-sm font-medium tracking-wide">
            FULL STACK DEVELOPER
          </p>
        </div>

        {/* Bottom section - Contact info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-300">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs">fahmi.fachrizal@email.com</span>
          </div>
          
          <div className="flex items-center gap-2 text-slate-300">
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs">+62 812 3456 7890</span>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 text-slate-300">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs">fahmifachrizal.dev</span>
            </div>
            
            <div className="flex items-center gap-3">
              <a href="https://linkedin.com/in/fahmifachrizal" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://github.com/fahmifachrizal" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Decorative corner element */}
        <div className="absolute bottom-6 right-6 w-16 h-16 opacity-10">
          <div className="w-full h-full border-4 border-cyan-400 rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-cyan-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Logo/Monogram */}
      <div className="absolute top-2 right-2">
        <div className="w-8 h-8 flex items-center justify-center bg-slate-800/50 rounded-full border border-slate-700">
          <span className="text-xs font-bold text-cyan-400">FF</span>
        </div>
      </div>
    </div>
  )
}