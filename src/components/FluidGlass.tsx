/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { useRef, useState, memo, Suspense } from 'react';
import type { ReactNode } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import type { ThreeElements } from '@react-three/fiber';
import {
  useFBO,
  useGLTF,
  MeshTransmissionMaterial,
} from '@react-three/drei';
import { easing } from 'maath';

interface FluidGlassProps {
  children?: ReactNode;
  scale?: number;
}

export function FluidGlass({ children, scale = 0.1 }: FluidGlassProps) {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>
          <ambientLight intensity={2} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Lens scale={scale}>
            {children}
          </Lens>
        </Canvas>
      </Suspense>
    </div>
  );
}

type MeshProps = ThreeElements['mesh'];

interface ModeWrapperProps extends MeshProps {
  children?: ReactNode;
  glb: string;
  geometryKey: string;
  modeScale?: number;
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  modeScale = 0.1,
  ...props
}: ModeWrapperProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const { nodes } = useGLTF(glb);
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState<THREE.Scene>(() => new THREE.Scene());

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = (pointer.x * v.width) / 2;
    const destY = (pointer.y * v.height) / 2;
    
    if (ref.current) {
      easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);
      ref.current.scale.setScalar(modeScale);
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent opacity={0} />
      </mesh>
      <mesh
        ref={ref}
        scale={modeScale}
        rotation-x={Math.PI / 2}
        geometry={(nodes[geometryKey] as THREE.Mesh)?.geometry}
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={1.15}
          thickness={5}
          anisotropy={0.01}
          chromaticAberration={0.1}
          transmission={1}
          roughness={0}
        />
      </mesh>
    </>
  );
});

function Lens({ children, scale }: { children?: ReactNode; scale: number }) {
  return (
    <ModeWrapper 
      glb="https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/lens/model.gltf" 
      geometryKey="Cylinder" 
      modeScale={scale}
    >
      {children}
    </ModeWrapper>
  );
}
