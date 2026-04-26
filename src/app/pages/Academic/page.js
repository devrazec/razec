"use client";

import React, {
  useState,
  useContext,
  useMemo,
  useEffect,
  useRef,
  Suspense,
} from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Layout from "../../components/Layout";
import { useLoading } from "../../hooks/useLoading";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Image as DreiImage, TrackballControls } from "@react-three/drei";

function ImageCard({ url, onSelect, darkMode, ...props }) {
  const groupRef = useRef();
  const pointerStartRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    pointerStartRef.current = {
      x: e.clientX ?? 0,
      y: e.clientY ?? 0,
      time: Date.now(),
    };
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    if (!pointerStartRef.current) return;

    const deltaX = Math.abs((e.clientX ?? 0) - pointerStartRef.current.x);
    const deltaY = Math.abs((e.clientY ?? 0) - pointerStartRef.current.y);
    const elapsed = Date.now() - pointerStartRef.current.time;
    pointerStartRef.current = null;

    if (deltaX < 12 && deltaY < 12 && elapsed < 350) {
      onSelect && onSelect(url);
    }
  };

  const resetPointerState = () => {
    pointerStartRef.current = null;
  };

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(groupRef.current.scale.x, hovered ? 1.15 : 1, 0.1)
      );
    }
  });

  return (
    <Billboard {...props}>
      <group ref={groupRef}>
        {/* Card white background panel */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[4.6, 4.6]} />
          <meshBasicMaterial color={darkMode ? "#dbe4f0" : "#ffffff"} />
        </mesh>
        {/* Subtle shadow border */}
        <mesh position={[0, 0, -0.1]}>
          <planeGeometry args={[4.9, 4.9]} />
          <meshBasicMaterial
            color={darkMode ? "#334155" : "#cbd5e1"}
            transparent
            opacity={darkMode ? 0.65 : 0.5}
          />
        </mesh>
        {/* Image */}
        <DreiImage
          url={url}
          scale={[4, 4]}
          transparent
          opacity={hovered ? 1 : 0.9}
          onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
          onPointerOut={() => {
            setHovered(false);
            resetPointerState();
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={resetPointerState}
        />
      </group>
    </Billboard>
  );
}

const IMAGES = [
  {
    url: "/curriculum/1.png",
    title: "Image 1",
    description: "Description for image 1.",
  },
  {
    url: "/curriculum/2.png",
    title: "Image 2",
    description: "Description for image 2.",
  },
  {
    url: "/curriculum/3.png",
    title: "Image 3",
    description: "Description for image 3.",
  },
  {
    url: "/curriculum/4.png",
    title: "Image 4",
    description: "Description for image 4.",
  },
  {
    url: "/curriculum/5.png",
    title: "Image 5",
    description: "Description for image 5.",
  },
  {
    url: "/curriculum/6.png",
    title: "Image 6",
    description: "Description for image 6.",
  },
  {
    url: "/curriculum/7.png",
    title: "Image 7",
    description: "Description for image 7.",
  },
  {
    url: "/curriculum/8.png",
    title: "Image 8",
    description: "Description for image 8.",
  },
  {
    url: "/curriculum/9.png",
    title: "Image 9",
    description: "Description for image 9.",
  },
  {
    url: "/curriculum/10.png",
    title: "Image 10",
    description: "Description for image 10.",
  },
  {
    url: "/product/11.png",
    title: "Image 11",
    description: "Description for image 11.",
  },
  {
    url: "/product/12.png",
    title: "Image 12",
    description: "Description for image 12.",
  },
  {
    url: "/product/14.png",
    title: "Image 14",
    description: "Description for image 14.",
  },
];

function Cloud({ radius = 20, onImageClick, darkMode }) {
  const items = useMemo(() => {
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    return IMAGES.map((item, i) => {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / IMAGES.length);
      const pos = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      );
      return [pos, item];
    });
  }, [radius]);
  return items.map(([pos, item], index) => (
    <ImageCard
      key={index}
      position={pos}
      url={item.url}
      onSelect={() => onImageClick(item)}
      darkMode={darkMode}
    />
  ));
}

export default function AcademicPage() {
  const { darkMode } = useContext(GlobalContext);
  const { showLoading, hideLoading } = useLoading();
  const [zoomedItem, setZoomedItem] = useState(null);
  const zoomedImage = zoomedItem?.url ?? null;
  const pageBackground = darkMode ? "#111827" : "#94a3b8";
  const fogColor = darkMode ? "#202025" : "#d6e2f3";
  const overlayBackground = darkMode ? "rgba(2, 6, 23, 0.82)" : "rgba(148, 163, 184, 0.45)";
  const modalBackground = darkMode
    ? "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)"
    : "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)";
  const modalBorder = darkMode ? "1px solid rgba(148,163,184,0.28)" : "1px solid rgba(255,255,255,0.75)";
  const closeButtonBackground = darkMode ? "#334155" : "#ffffff";
  const closeButtonColor = darkMode ? "#e2e8f0" : "#0f172a";
  const titleColor = darkMode ? "#e2e8f0" : "#0f172a";
  const imagePanelBackground = darkMode ? "#020617" : "#dbe7f5";
  const descriptionBackground = darkMode ? "rgba(15, 23, 42, 0.88)" : "rgba(255,255,255,0.88)";
  const descriptionBorder = darkMode ? "1px dashed #475569" : "1px dashed #94a3b8";
  const descriptionColor = darkMode ? "#cbd5e1" : "#334155";

  useEffect(() => {
    showLoading();
    const timer = setTimeout(() => hideLoading(), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: pageBackground,
          touchAction: "none",
          position: "relative",
        }}
      >
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 35], fov: 90 }}
          style={{ width: "100%", height: "100%" }}
        >
          <fog attach="fog" args={[fogColor, 0, 80]} />
          <Suspense fallback={null}>
            <group rotation={[10, 10.5, 10]}>
              <Cloud
                radius={20}
                onImageClick={setZoomedItem}
                darkMode={darkMode}
              />
            </group>
          </Suspense>
          <TrackballControls minDistance={15} maxDistance={60} />
        </Canvas>

        {/* Zoom overlay */}
        {zoomedItem && (
          <div
            onClick={() => setZoomedItem(null)}
            style={{
              position: "absolute",
              inset: 0,
              background: overlayBackground,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              cursor: "zoom-out",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "min(92vw, 960px)",
                maxHeight: "90vh",
                background: modalBackground,
                boxShadow: "0 16px 60px rgba(0,0,0,0.55)",
                padding: 14,
                border: modalBorder,
              }}
            >
              <button
                onClick={() => setZoomedItem(null)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  width: 30,
                  height: 30,
                  border: "none",
                  background: closeButtonBackground,
                  color: closeButtonColor,
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: 14,
                  lineHeight: "30px",
                  textAlign: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                  zIndex: 11,
                }}
              >
                ✕
              </button>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 36,
                  padding: "0 42px 0 8px",
                  color: titleColor,
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {zoomedItem?.title ?? "Academic Card Preview"}
              </div>
              <div
                style={{
                  background: imagePanelBackground,
                  overflow: "hidden",
                }}
              >
                <img
                  src={zoomedImage}
                  alt="Zoomed"
                  style={{
                    width: "100%",
                    maxHeight: "calc(90vh - 210px)",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: 10,
                  width: "100%",
                  height: 140,
                  overflowY: "auto",
                  background: descriptionBackground,
                  border: descriptionBorder,
                  padding: "10px 12px",
                  color: descriptionColor,
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
              >
                {zoomedItem?.description ?? ""}
              </div>
              
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
