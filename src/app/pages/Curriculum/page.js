"use client";

import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  Suspense,
} from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Layout from "../../components/Layout";
import { useLoading } from "../../hooks/useLoading";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Image as DreiImage, 
  Text, 
  Html, 
  Environment, 
  MeshReflectorMaterial,
  useCursor
} from "@react-three/drei";

/* ─── config ──────────────────────────────────────────────── */
const GOLDENRATIO = 1.61803398875;

/* ─── images ──────────────────────────────────────────────── */
const IMAGES = [
  { url: "/curriculum/1.png",  title: "Image 1",  description: "Description for image 1."  },
  { url: "/curriculum/2.png",  title: "Image 2",  description: "Description for image 2."  },
  { url: "/curriculum/3.png",  title: "Image 3",  description: "Description for image 3."  },
  { url: "/curriculum/4.png",  title: "Image 4",  description: "Description for image 4."  },
  { url: "/curriculum/5.png",  title: "Image 5",  description: "Description for image 5."  },
  { url: "/curriculum/6.png",  title: "Image 6",  description: "Description for image 6."  },
  { url: "/curriculum/7.png",  title: "Image 7",  description: "Description for image 7."  },
  { url: "/curriculum/8.png",  title: "Image 8",  description: "Description for image 8."  },
  { url: "/curriculum/9.png",  title: "Image 9",  description: "Description for image 9."  },
  { url: "/curriculum/10.png", title: "Image 10", description: "Description for image 10." },
];


/* ─── Frame component (single image on wall) ───────────────── */
function Frame({ url, title, description, position, rotation, ...props }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { camera } = useThree();
  const isActive = useStore((state) => state.clicked === url);
  
  useCursor(hovered);
  
  useFrame((state, dt) => {
    if (!ref.current) return;
    
    // Smooth hover effect
    ref.current.scale.lerp(
      new THREE.Vector3(
        hovered ? 1.05 : 1,
        hovered ? 1.05 : 1,
        1
      ),
      0.1
    );
    
    // When clicked, move camera to focus on this frame
    if (isActive) {
      const targetPos = new THREE.Vector3();
      ref.current.getWorldPosition(targetPos);
      
      const direction = new THREE.Vector3();
      ref.current.getWorldDirection(direction);
      direction.multiplyScalar(-3.5);
      
      camera.position.lerp(targetPos.clone().add(direction).add(new THREE.Vector3(0, 0.5, 0)), 0.05);
      camera.lookAt(targetPos);
    }
  });
  
  return (
    <group ref={ref} position={position} rotation={rotation}>
      {/* Frame border/backing */}
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[1.05, GOLDENRATIO * 1.05, 0.05]} />
        <meshStandardMaterial color={hovered ? "#888" : "#555"} />
      </mesh>
      
      {/* Image on top */}
      <DreiImage
        url={url}
        scale={[0.98, GOLDENRATIO * 0.98]}
        position={[0, 0, 0.02]}
        onClick={(e) => {
          e.stopPropagation();
          useStore.setState({ clicked: isActive ? null : url });
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      />
      
      {/* Info text below frame */}
      <Text
        position={[0, -GOLDENRATIO / 2 - 0.15, 0.03]}
        fontSize={0.08}
        color="#ffffff"
        anchorX="center"
        anchorY="top"
        maxWidth={0.9}
      >
        {title}
      </Text>
      
      {isActive && (
        <Text
          position={[0, -GOLDENRATIO / 2 - 0.28, 0.03]}
          fontSize={0.05}
          color="#cccccc"
          anchorX="center"
          anchorY="top"
          maxWidth={0.9}
        >
          {description}
        </Text>
      )}
    </group>
  );
}

/* ─── Frames (all images arranged in gallery) ──────────────── */
function Frames({ darkMode }) {
  const { camera } = useThree();
  
  // Arrange images in a gallery layout
  const positions = [
    // Left wall
    { position: [-2.5, 0, -2], rotation: [0, Math.PI / 2.5, 0] },
    { position: [-3.5, 0, 0], rotation: [0, Math.PI / 2, 0] },
    { position: [-2.5, 0, 2], rotation: [0, Math.PI / 2.5, 0] },
    
    // Back wall
    { position: [-1, 0, 3.5], rotation: [0, 0, 0] },
    { position: [1, 0, 3.5], rotation: [0, 0, 0] },
    
    // Right wall
    { position: [2.5, 0, 2], rotation: [0, -Math.PI / 2.5, 0] },
    { position: [3.5, 0, 0], rotation: [0, -Math.PI / 2, 0] },
    { position: [2.5, 0, -2], rotation: [0, -Math.PI / 2.5, 0] },
    
    // Front sides
    { position: [-1, 0, -3.5], rotation: [0, Math.PI, 0] },
    { position: [1, 0, -3.5], rotation: [0, Math.PI, 0] },
  ];
  
  return (
    <group>
      {IMAGES.map((img, i) => (
        <Frame
          key={img.url}
          url={img.url}
          title={img.title}
          description={img.description}
          position={positions[i]?.position || [0, 0, 0]}
          rotation={positions[i]?.rotation || [0, 0, 0]}
        />
      ))}
    </group>
  );
}

/* ─── Reflective Floor ─────────────────────────────────────── */
function Floor({ darkMode }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -GOLDENRATIO / 2 - 0.5, 0]}>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={2048}
        mixBlur={1}
        mixStrength={40}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color={darkMode ? "#050505" : "#757575"}
        metalness={0.5}
      />
    </mesh>
  );
}

/* ─── Camera Rig ───────────────────────────────────────────── */
function CameraRig() {
  const { camera, mouse } = useThree();
  const clicked = useStore((state) => state.clicked);
  
  useFrame((state, dt) => {
    if (!clicked) {
      // Free roam mode - slight mouse movement
      camera.position.lerp(
        new THREE.Vector3(
          mouse.x * 0.5,
          1 + mouse.y * 0.2,
          5
        ),
        0.05
      );
      camera.lookAt(0, 0, 0);
    }
  });
  
  return null;
}

/* ─── Global state store ───────────────────────────────────── */
const useStore = (() => {
  let listeners = [];
  let state = { clicked: null };
  
  return Object.assign(
    (selector = (s) => s) => {
      const [, forceUpdate] = useState(0);
      
      useEffect(() => {
        const listener = () => forceUpdate((n) => n + 1);
        listeners.push(listener);
        return () => {
          listeners = listeners.filter((l) => l !== listener);
        };
      }, []);
      
      return selector(state);
    },
    {
      setState: (partial) => {
        state = { ...state, ...partial };
        listeners.forEach((listener) => listener());
      },
      getState: () => state,
    }
  );
})();

/* ─── page ────────────────────────────────────────────────── */
export default function CurriculumPage() {
  const { darkMode } = useContext(GlobalContext);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    showLoading();
    const t = setTimeout(() => hideLoading(), 800);
    return () => clearTimeout(t);
  }, []);

  const bg = darkMode ? "#0d1117" : "#8fa8c4";

  return (
    <Layout>
      <div style={{ width: "100%", height: "100%", background: bg, position: "relative" }}>
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 1, 5], fov: 70 }}
          style={{ width: "100%", height: "100%" }}
        >
          <color attach="background" args={[darkMode ? "#0a0a0a" : "#f0f0f0"]} />
          <fog attach="fog" args={[darkMode ? "#0a0a0a" : "#f0f0f0", 5, 15]} />
          
          <ambientLight intensity={darkMode ? 0.3 : 0.5} />
          <spotLight position={[0, 10, 0]} angle={0.5} intensity={darkMode ? 0.5 : 1} penumbra={1} />
          <spotLight position={[5, 5, 5]} angle={0.3} intensity={0.3} penumbra={1} />
          <spotLight position={[-5, 5, 5]} angle={0.3} intensity={0.3} penumbra={1} />
          
          <Suspense fallback={null}>
            <Frames darkMode={darkMode} />
            <Floor darkMode={darkMode} />
            <Environment preset={darkMode ? "night" : "city"} />
          </Suspense>
          
          <CameraRig />
        </Canvas>

        {/* Instructions */}
        <div style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          background: darkMode ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.9)",
          color: darkMode ? "#e2e8f0" : "#0f172a",
          padding: "12px 24px",
          borderRadius: 20,
          fontSize: 14,
          fontWeight: 500,
          boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
          zIndex: 10,
          textAlign: "center",
        }}>
          Move mouse to look around • Click frames to focus • Click again to exit
        </div>
        
        {/* Reset button */}
        <button
          onClick={() => useStore.setState({ clicked: null })}
          style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: darkMode ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.9)",
            color: darkMode ? "#e2e8f0" : "#0f172a",
            padding: "10px 24px",
            border: "none",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
            zIndex: 10,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => e.target.style.background = darkMode ? "#475569" : "#f8fafc"}
          onMouseLeave={(e) => e.target.style.background = darkMode ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.9)"}
        >
          Reset View
        </button>
      </div>
    </Layout>
  );
}
