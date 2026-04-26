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
import { Image as DreiImage, Text, Html } from "@react-three/drei";

/* ─── config ──────────────────────────────────────────────── */
const CARD_W = 5.2;
const CARD_H = 7.2;
const RADIUS = 20; // radius of the semicircle
const VISIBLE_CARDS = 10; // how many cards visible in the arc

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

/* ─── single card in carousel ────────────────────────────── */
function CarouselCard({ item, angle, rotation, darkMode, cameraZoom }) {
  const meshRef = useRef();
  
  useFrame(() => {
    if (!meshRef.current) return;
    
    const totalAngle = angle + rotation;
    const normalizedAngle = ((totalAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    
    // Calculate position on semicircle
    const x = Math.sin(totalAngle) * RADIUS;
    const z = -Math.cos(totalAngle) * RADIUS;
    const y = -2;
    
    // Smooth position interpolation
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x, 0.1);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y, 0.1);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, z, 0.1);
    
    // Rotate card to face center
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      -totalAngle,
      0.1
    );
    
    // Calculate scale based on position (zoom edges)
    const edgeThreshold = Math.PI * 0.35; // 35% from center
    const distanceFromCenter = Math.abs(normalizedAngle - Math.PI);
    
    let targetScale = 1;
    if (distanceFromCenter > edgeThreshold) {
      // Scale up cards at the edges
      const edgeFactor = (distanceFromCenter - edgeThreshold) / (Math.PI - edgeThreshold);
      targetScale = 1 + edgeFactor * 0.5; // up to 1.5x scale
    }
    
    // Apply camera zoom
    targetScale *= cameraZoom;
    
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
    );
    
    // Fade out cards behind camera
    const opacity = normalizedAngle < Math.PI ? 1 : Math.max(0, 1 - (normalizedAngle - Math.PI) / Math.PI);
    if (meshRef.current.children[3]) {
      meshRef.current.children[3].material.opacity = opacity * 0.95;
    }
  });

  return (
    <group ref={meshRef}>
      {/* card shadow */}
      <mesh position={[0, -0.05, -0.15]}>
        <planeGeometry args={[CARD_W + 0.3, CARD_H + 0.3]} />
        <meshBasicMaterial color="#000000" transparent opacity={darkMode ? 0.4 : 0.2} />
      </mesh>
      
      {/* card back */}
      <mesh position={[0, 0, -0.08]}>
        <planeGeometry args={[CARD_W, CARD_H]} />
        <meshBasicMaterial color={darkMode ? "#1e293b" : "#f1f5f9"} />
      </mesh>
      
      {/* card border */}
      <mesh position={[0, 0, -0.07]}>
        <planeGeometry args={[CARD_W - 0.1, CARD_H - 0.1]} />
        <meshBasicMaterial color={darkMode ? "#334155" : "#e2e8f0"} />
      </mesh>
      
      {/* card image */}
      <DreiImage
        url={item.url}
        scale={[CARD_W - 0.15, CARD_H - 0.15]}
        transparent
        opacity={1.0}
      />
      
      {/* highlight on top edge */}
      <mesh position={[0, CARD_H / 2 + 0.02, 0]}>
        <planeGeometry args={[CARD_W, 0.04]} />
        <meshBasicMaterial color={darkMode ? "#64748b" : "#cbd5e1"} transparent opacity={0.6} />
      </mesh>
      
      {/* Info overlay */}
      <Html
        position={[0, 0, 0.1]}
        transform
        occlude
        style={{
          width: `${CARD_W * 100}px`,
          height: `${CARD_H * 100}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "20px",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div style={{
          background: darkMode 
            ? "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.6), transparent)"
            : "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.5), transparent)",
          padding: "16px 12px",
          borderRadius: "0 0 8px 8px",
        }}>
          <div style={{
            color: "#ffffff",
            fontSize: "20px",
            fontWeight: "700",
            marginBottom: "6px",
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}>
            {item.title}
          </div>
          <div style={{
            color: "#e2e8f0",
            fontSize: "14px",
            lineHeight: "1.4",
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
          }}>
            {item.description}
          </div>
        </div>
      </Html>
    </group>
  );
}

/* ─── carousel with rotation ──────────────────────────────── */
function Carousel({ images, currentIndex, darkMode, cameraZoom }) {
  const groupRef = useRef();
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);
  
  useEffect(() => {
    const anglePerImage = (Math.PI) / (VISIBLE_CARDS - 1);
    targetRotation.current = -currentIndex * anglePerImage;
  }, [currentIndex]);
  
  useFrame(() => {
    currentRotation.current = THREE.MathUtils.lerp(
      currentRotation.current,
      targetRotation.current,
      0.08
    );
  });
  
  const anglePerImage = (Math.PI) / (VISIBLE_CARDS - 1);
  const startAngle = -Math.PI / 2;
  
  return (
    <group ref={groupRef}>
      {/* floor/platform */}
      <mesh position={[0, -CARD_H / 2 - 2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[RADIUS + 3, 64]} />
        <meshStandardMaterial 
          color={darkMode ? "#0f172a" : "#94a3b8"} 
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* cards */}
      {images.map((item, i) => {
        const angle = startAngle + i * anglePerImage;
        return (
          <CarouselCard
            key={i}
            item={item}
            angle={angle}
            rotation={currentRotation.current}
            darkMode={darkMode}
            cameraZoom={cameraZoom}
          />
        );
      })}
    </group>
  );
}

/* ─── page ────────────────────────────────────────────────── */
export default function ExperiencePage() {
  const { darkMode } = useContext(GlobalContext);
  const { showLoading, hideLoading } = useLoading();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartIndex = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const bg = darkMode ? "#0d1117" : "#8fa8c4";
  const fogColor = darkMode ? "#0d1117" : "#8fa8c4";
  const btnBg = darkMode ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.9)";
  const btnColor = darkMode ? "#e2e8f0" : "#0f172a";
  const btnHoverBg = darkMode ? "#475569" : "#f8fafc";

  useEffect(() => {
    showLoading();
    const t = setTimeout(() => hideLoading(), 800);
    return () => clearTimeout(t);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(IMAGES.length - 1, prev + 1));
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  // Mouse drag handling
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX || e.touches?.[0]?.clientX || 0;
    dragStartIndex.current = currentIndex;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
    const diff = dragStartX.current - currentX;
    const sensitivity = isMobile ? 0.01 : 0.005;
    const indexChange = Math.round(diff * sensitivity);
    const newIndex = Math.max(0, Math.min(IMAGES.length - 1, dragStartIndex.current + indexChange));
    setCurrentIndex(newIndex);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleMouseMove);
      window.addEventListener("touchend", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchmove", handleMouseMove);
        window.removeEventListener("touchend", handleMouseUp);
      };
    }
  }, [isDragging, currentIndex]);

  return (
    <Layout>
      <div 
        style={{ width: "100%", height: "100%", background: bg, position: "relative", cursor: isDragging ? "grabbing" : "grab" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 2, 28], fov: 60 }}
          style={{ width: "100%", height: "100%" }}
        >
          <fog attach="fog" args={[fogColor, 15, 45]} />
          <ambientLight intensity={darkMode ? 0.6 : 0.9} />
          <directionalLight position={[10, 15, 10]} intensity={darkMode ? 0.8 : 1.2} />
          <directionalLight position={[-8, 8, -5]} intensity={0.4} />
          <spotLight position={[0, 20, 0]} angle={0.5} intensity={0.5} penumbra={1} />
          <Suspense fallback={null}>
            <Carousel 
              images={IMAGES} 
              currentIndex={currentIndex} 
              darkMode={darkMode} 
              cameraZoom={zoom}
            />
          </Suspense>
        </Canvas>

        {/* Navigation arrows */}
        <button
          onClick={handlePrev}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          disabled={currentIndex === 0}
          style={{
            position: "absolute",
            left: 20,
            top: "50%",
            transform: "translateY(-50%)",
            width: 56,
            height: 56,
            border: "none",
            background: btnBg,
            color: btnColor,
            cursor: currentIndex === 0 ? "not-allowed" : "pointer",
            fontSize: 28,
            borderRadius: "50%",
            boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
            opacity: currentIndex === 0 ? 0.4 : 1,
            transition: "all 0.2s",
            zIndex: 10,
            fontWeight: "bold",
          }}
          onMouseEnter={(e) => currentIndex > 0 && (e.target.style.background = btnHoverBg)}
          onMouseLeave={(e) => e.target.style.background = btnBg}
        >
          ‹
        </button>

        <button
          onClick={handleNext}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          disabled={currentIndex >= IMAGES.length - 1}
          style={{
            position: "absolute",
            right: 20,
            top: "50%",
            transform: "translateY(-50%)",
            width: 56,
            height: 56,
            border: "none",
            background: btnBg,
            color: btnColor,
            cursor: currentIndex >= IMAGES.length - 1 ? "not-allowed" : "pointer",
            fontSize: 28,
            borderRadius: "50%",
            boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
            opacity: currentIndex >= IMAGES.length - 1 ? 0.4 : 1,
            transition: "all 0.2s",
            zIndex: 10,
            fontWeight: "bold",
          }}
          onMouseEnter={(e) => currentIndex < IMAGES.length - 1 && (e.target.style.background = btnHoverBg)}
          onMouseLeave={(e) => e.target.style.background = btnBg}
        >
          ›
        </button>

        {/* Image indicator */}
        <div style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          background: btnBg,
          color: btnColor,
          padding: "8px 20px",
          borderRadius: 20,
          fontSize: 15,
          fontWeight: 600,
          boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
          zIndex: 10,
        }}>
          {currentIndex + 1} / {IMAGES.length}
        </div>

        {/* Zoom controls */}
        <div 
          style={{
            position: "absolute",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 12,
            display: "flex",
            gap: 8,
            background: btnBg,
            padding: "10px 14px",
            borderRadius: 10,
            boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 0.5}
            style={{
              width: 36,
              height: 36,
              border: "none",
              background: darkMode ? "#334155" : "#ffffff",
              color: btnColor,
              cursor: zoom <= 0.5 ? "not-allowed" : "pointer",
              fontSize: 20,
              fontWeight: "bold",
              borderRadius: 6,
              opacity: zoom <= 0.5 ? 0.5 : 1,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => zoom > 0.5 && (e.target.style.background = btnHoverBg)}
            onMouseLeave={(e) => e.target.style.background = darkMode ? "#334155" : "#ffffff"}
          >
            −
          </button>
          
          <div style={{
            minWidth: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: btnColor,
            fontSize: 15,
            fontWeight: 600,
          }}>
            {Math.round(zoom * 100)}%
          </div>
          
          <button
            onClick={handleZoomIn}
            disabled={zoom >= 2}
            style={{
              width: 36,
              height: 36,
              border: "none",
              background: darkMode ? "#334155" : "#ffffff",
              color: btnColor,
              cursor: zoom >= 2 ? "not-allowed" : "pointer",
              fontSize: 20,
              fontWeight: "bold",
              borderRadius: 6,
              opacity: zoom >= 2 ? 0.5 : 1,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => zoom < 2 && (e.target.style.background = btnHoverBg)}
            onMouseLeave={(e) => e.target.style.background = darkMode ? "#334155" : "#ffffff"}
          >
            +
          </button>
          
          <button
            onClick={handleResetZoom}
            disabled={zoom === 1}
            style={{
              height: 36,
              padding: "0 14px",
              border: "none",
              background: darkMode ? "#334155" : "#ffffff",
              color: btnColor,
              cursor: zoom === 1 ? "not-allowed" : "pointer",
              fontSize: 13,
              fontWeight: 600,
              borderRadius: 6,
              opacity: zoom === 1 ? 0.5 : 1,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => zoom !== 1 && (e.target.style.background = btnHoverBg)}
            onMouseLeave={(e) => e.target.style.background = darkMode ? "#334155" : "#ffffff"}
          >
            Reset
          </button>
        </div>

        {/* Hint text */}
        <div style={{
          position: "absolute",
          bottom: 70,
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.6)",
          fontSize: 13,
          pointerEvents: "none",
          userSelect: "none",
          textAlign: "center",
        }}>
          Drag to rotate • Use arrows or keyboard ← → to navigate
        </div>
      </div>
    </Layout>
  );
}
