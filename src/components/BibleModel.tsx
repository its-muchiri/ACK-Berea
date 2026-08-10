import { Suspense, lazy } from 'react'

const BibleCanvas = lazy(() => import('./BibleCanvas'))

export default function BibleModel() {
  return (
    <div className="w-full h-[280px] sm:h-[340px] md:h-[420px] relative">
      {/* Placeholder image behind canvas */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/models/bible/images.jpg"
          alt="Holy Bible"
          className="max-h-[320px] md:max-h-[400px] w-auto object-contain"
          style={{
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
          }}
        />
      </div>

      {/* 3D Canvas overlays the image */}
      <Suspense fallback={null}>
        <BibleCanvas />
      </Suspense>

      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201,162,75,0.08) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
