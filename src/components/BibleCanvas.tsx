import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

function LoadedBible() {
  const ref = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/models/bible/open_bible.glb')

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.008
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.08
    }
  })

  return (
    <group ref={ref} scale={1.8} position={[0, -0.3, 0]}>
      <primitive object={scene} />
    </group>
  )
}

function Fallback() {
  return null
}

export default function BibleCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 4], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#FFF8E7" />
      <directionalLight position={[-3, 3, -3]} intensity={0.3} color="#C9A24B" />
      <pointLight position={[0, 2, 3]} intensity={0.5} color="#E8A93B" />

      <Suspense fallback={<Fallback />}>
        <LoadedBible />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  )
}
