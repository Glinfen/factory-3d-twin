import * as THREE from "three";
import type { ThreeElements } from "@react-three/fiber";
import { useMemo } from "react";

const { Vector3 } = THREE;

// 尺寸常量（避免重复创建）- 缩小尺寸
const goodsSize = new Vector3(5, 5, 5);
const palletPlaneSize = new Vector3(5.6, 0.1, 5.6);
const palletRackSize = new Vector3(0.4, 0.6, 0.4);

// 几何体常量（避免每次渲染重新创建）
const goodsGeometry = new THREE.BoxGeometry(
  goodsSize.x,
  goodsSize.y,
  goodsSize.z
);
const palletPlaneGeometry = new THREE.BoxGeometry(
  palletPlaneSize.x,
  palletPlaneSize.y,
  palletPlaneSize.z
);
const palletRackGeometry = new THREE.BoxGeometry(
  palletRackSize.x,
  palletRackSize.y,
  palletRackSize.z
);

export const goodsItemSize = {
  x: palletPlaneSize.x,
  y: goodsSize.y + palletPlaneSize.y * 2 + palletRackSize.y,
  z: palletPlaneSize.z,
};

// 位置计算函数
function calculatePositions() {
  return {
    goodsPosition: new Vector3(
      0,
      palletRackSize.y + palletPlaneSize.y * 2 + goodsSize.y / 2,
      0
    ),
    palletPlaneTopPosition: new Vector3(
      0,
      palletRackSize.y + palletPlaneSize.y * 1.5,
      0
    ),
    palletPlaneBottomPosition: new Vector3(0, palletPlaneSize.y / 2, 0),
    rackPositions: [
      new Vector3( // 左上角支柱
        -palletPlaneSize.x / 2 + palletRackSize.x / 2,
        palletPlaneSize.y + palletRackSize.y / 2,
        -palletPlaneSize.z / 2 + palletRackSize.z / 2
      ),
      new Vector3( // 右上角支柱
        palletPlaneSize.x / 2 - palletRackSize.x / 2,
        palletPlaneSize.y + palletRackSize.y / 2,
        -palletPlaneSize.z / 2 + palletRackSize.z / 2
      ),
      new Vector3( // 左下角支柱
        -palletPlaneSize.x / 2 + palletRackSize.x / 2,
        palletPlaneSize.y + palletRackSize.y / 2,
        palletPlaneSize.z / 2 - palletRackSize.z / 2
      ),
      new Vector3( // 右下角支柱
        palletPlaneSize.x / 2 - palletRackSize.x / 2,
        palletPlaneSize.y + palletRackSize.y / 2,
        palletPlaneSize.z / 2 - palletRackSize.z / 2
      ),
    ],
  };
}

interface IGoodsItem {
  groupProps?: ThreeElements["group"];
}

function GoodsItem(props: IGoodsItem) {
  const { groupProps } = props;

  // 创建材质 - 直接使用亮黄色
  const goodsMaterial = useMemo(
    () => new THREE.MeshPhongMaterial({ color: 0xffff00 }), // 亮黄色
    []
  );

  const palletMaterial = useMemo(
    () => new THREE.MeshPhongMaterial({ color: "grey" }),
    []
  );

  // 获取计算好的位置信息
  const {
    goodsPosition,
    palletPlaneTopPosition,
    palletPlaneBottomPosition,
    rackPositions,
  } = useMemo(calculatePositions, []);

  return (
    <group {...groupProps}>
      {/* 货物 (亮黄色) */}
      <mesh
        geometry={goodsGeometry}
        material={goodsMaterial}
        position={goodsPosition}
        castShadow
      />

      {/* 货架托盘 */}
      <mesh
        geometry={palletPlaneGeometry}
        material={palletMaterial}
        position={palletPlaneTopPosition}
        castShadow
      />
      <mesh
        geometry={palletPlaneGeometry}
        material={palletMaterial}
        position={palletPlaneBottomPosition}
        castShadow
      />

      {/* 货架支柱 (使用循环优化渲染) */}
      {rackPositions.map((position, index) => (
        <mesh
          key={index}
          geometry={palletRackGeometry}
          material={palletMaterial}
          position={position}
          castShadow
        />
      ))}
    </group>
  );
}

export default GoodsItem;
