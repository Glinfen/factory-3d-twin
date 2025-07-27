import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GoodsItem from "./components/goodsItem"; // 导入Goods组件

export default function FactoryScene() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas shadows camera={{ position: [10, 50, 100], fov: 50 }}>
        {/* 环境光 */}
        <ambientLight intensity={0.5} />
        {/* 方向光 - 调整高度以适应大型货物 */}
        <directionalLight
          position={[50, 100, 75]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        {/* 工厂地板 */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1, 0]}
          receiveShadow
        >
          <planeGeometry args={[500, 500]} /> {/* 扩大地板尺寸 */}
          <meshStandardMaterial color="#3a506b" />
        </mesh>
        {/* 货物组件 - 替换为我们的GoodsItem */}
        <GoodsItem position={[0, 0, 0]} scale={[1, 1, 1]} />
        {/* 相机控制器 */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={30}
          maxDistance={150}
        />
        {/* 坐标轴辅助 */}
        <axesHelper args={[50]} /> {/* 扩大辅助线尺寸 */}
      </Canvas>
    </div>
  );
}
