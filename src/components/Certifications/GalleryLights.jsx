import { cameraFocusPoints } from './certData';

export default function GalleryLights({ activeCert }) {
  return (
    <>
      <ambientLight color="#ffffff" intensity={0.3} />
      <directionalLight color="#fff5e6" intensity={0.6} position={[0, 2, 5]} />
      <pointLight color="#c9a96e" intensity={5} position={[-6, 2, 0]} distance={15} />
      <pointLight color="#e85d26" intensity={4} position={[6, 1, -2]} distance={15} />

      {cameraFocusPoints.map(({ pos }, i) => (
        <pointLight
          key={i}
          color="#c9a96e"
          intensity={activeCert === i ? 12 : 0}
          position={[pos[0], pos[1] + 1.5, pos[2] + 2]}
          distance={10}
          decay={1.5}
        />
      ))}
    </>
  );
}
