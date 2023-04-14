'use client';

import { OrbitControls, Point, Points, PointMaterial, shaderMaterial } from "@react-three/drei";
import { Canvas, useFrame, type InstancedMeshProps, type Object3DNode, extend } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Mesh, InstancedMesh, Object3D, Vector3, SphereGeometry, Raycaster, BoxGeometry, Color } from "three";
import { motion } from "framer-motion-3d"

const MyPointsMaterial = shaderMaterial(
    {
        u: 1,
    },
    /* glsl */ `
      attribute float size;
      attribute vec3 color;
  
      varying vec3 vColor;
  
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = size * ( 100.0 / -mvPosition.z );
        gl_Position = projectionMatrix * mvPosition;
      }
  
    `,
    /* glsl */ `
      varying vec3 vColor;
  
      void main() {
        gl_FragColor = vec4( vColor, 1.0 );
  
        #include <tonemapping_fragment>
        #include <encodings_fragment>
      }
    `
)

extend({ MyPointsMaterial })



interface PointcloudProps {
    coordinates: Array<{ x: number, y: number, z: number }>
}

const Pointcloud: React.FC<PointcloudProps> = ({ coordinates }) => {

    const [selectedPointIdx, setSelectedPointIdx] = useState(-1)
    const meshRef = useRef<InstancedMesh>(null!);

    const [hoveredId, setHoveredId] = useState<number | undefined>(undefined)

    useFrame(({ raycaster }) => {
        if (meshRef.current) {
            const intersection = raycaster.intersectObject(meshRef.current);

            if (intersection.length > 0) {


                const instanceId = intersection[0].instanceId!;
                setSelectedPointIdx(instanceId)


            }
        }
    });

    useEffect(() => {
        const calcObj3D = new Object3D()

        coordinates.forEach(({ x, y, z }, i) => {
            calcObj3D.position.set(x, y, z)
            calcObj3D.updateMatrix()
            const mat4 = calcObj3D.matrix;
            meshRef.current.setMatrixAt(i, mat4)
        })
        // Update the instance
        meshRef.current.instanceMatrix.needsUpdate = true
    }, [coordinates])


    return (
        <motion.instancedMesh
            ref={meshRef}
            args={[null, null, coordinates.length]}
            // color={}
            onPointerDown={console.log}
            onHoverStart={() => { }}
            onHoverEnd={() => { }}
        >
            <sphereBufferGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="hotpink" />

        </motion.instancedMesh>
        // <Points
        //     limit={coordinates.length} // Optional: max amount of items (for calculating buffer size)
        //     range={1000} // Optional: draw-range
        // >
        //     <myPointsMaterial />
        //     {coordinates.map(({ x, y, z }, idx) => <Point key={`point-${idx}`} position={new Vector3(x, y, z)} size={0.1} color={idx === selectedPointIdx ? 'red' : 'blue'} onPointerDown={() => setSelectedPointIdx(idx)} />)}

        // </Points>
    );
};



interface PointcloudChartProps {
    coordinates: Array<{ x: number, y: number, z: number }>
}
const PointcloudChart = ({ coordinates }: PointcloudChartProps) => {

    return (
        <Canvas
            raycaster={{ params: { Points: { threshold: 0.05 } } }}
            camera={{ position: [1.5, 1.5, 2.5] }}
            style={{ width: '100%', height: '100%', aspectRatio: 1, backgroundColor: 'gray' }}
        >
            <ambientLight intensity={0.5} />
            <Pointcloud coordinates={coordinates} />
            <OrbitControls />
        </Canvas>
    );
};


export { PointcloudChart }


