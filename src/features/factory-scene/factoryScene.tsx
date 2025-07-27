import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function FactoryScene() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas shadows camera={{ position: [10, 10, 10], fov: 50 }}>
        {/* 环境光 */}
        <ambientLight intensity={0.5} />

        {/* 方向光 */}
        <directionalLight position={[10, 20, 15]} intensity={1.2} castShadow />

        {/* 工厂地板 */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1, 0]}
          receiveShadow
        >
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#3a506b" />
        </mesh>

        {/* 测试设备 - 立方体机器 */}
        <mesh position={[0, 1, 0]} castShadow>
          <boxGeometry args={[3, 2, 3]} />
          <meshStandardMaterial color="#ff5e5b" />
        </mesh>

        {/* 相机控制器 */}
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

        {/* 坐标轴辅助 */}
        <axesHelper args={[10]} />
      </Canvas>
    </div>
  );
}
