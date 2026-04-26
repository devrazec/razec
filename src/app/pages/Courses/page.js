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
import { Image as DreiImage } from "@react-three/drei";

/* ─── config ──────────────────────────────────────────────── */
const CARD_W   = 5.6;
const CARD_H   = 7.8;
const CARD_GAP = 6.5;
/* each card leans a tiny random amount, like real magazines */
const TILTS = [2, -3, 1.5, -2, 3, -1, 2.5, -3.5, 1, -2.5, 3, -1.5, 2];

/* ─── images — row 1 ──────────────────────────────────────── */
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

/* ─── images — row 2 ──────────────────────────────────────── */
const IMAGES2 = [
  { url: "/product/1.png",  title: "Row2 Image 1",  description: "Description for row 2, image 1."  },
  { url: "/product/2.png",  title: "Row2 Image 2",  description: "Description for row 2, image 2."  },
  { url: "/product/3.png",  title: "Row2 Image 3",  description: "Description for row 2, image 3."  },
  { url: "/product/4.png",  title: "Row2 Image 4",  description: "Description for row 2, image 4."  },
  { url: "/product/5.png",  title: "Row2 Image 5",  description: "Description for row 2, image 5."  },
  { url: "/product/6.png",  title: "Row2 Image 6",  description: "Description for row 2, image 6."  },
  { url: "/product/7.png",  title: "Row2 Image 7",  description: "Description for row 2, image 7."  },
  { url: "/product/8.png",  title: "Row2 Image 8",  description: "Description for row 2, image 8."  },
  { url: "/product/9.png",  title: "Row2 Image 9",  description: "Description for row 2, image 9."  },
  { url: "/product/10.png", title: "Row2 Image 10", description: "Description for row 2, image 10." },
  { url: "/product/11.png", title: "Row2 Image 11", description: "Description for row 2, image 11." },
  { url: "/product/12.png", title: "Row2 Image 12", description: "Description for row 2, image 12." },
  { url: "/product/14.png", title: "Row2 Image 14", description: "Description for row 2, image 14." },
];

/* ─── images — row 3 ──────────────────────────────────────── */
const IMAGES3 = [
  { url: "/product/1.png",  title: "Row3 Image 1",  description: "Description for row 3, image 1."  },
  { url: "/product/2.png",  title: "Row3 Image 2",  description: "Description for row 3, image 2."  },
  { url: "/product/3.png",  title: "Row3 Image 3",  description: "Description for row 3, image 3."  },
  { url: "/product/4.png",  title: "Row3 Image 4",  description: "Description for row 3, image 4."  },
  { url: "/product/5.png",  title: "Row3 Image 5",  description: "Description for row 3, image 5."  },
  { url: "/product/6.png",  title: "Row3 Image 6",  description: "Description for row 3, image 6."  },
  { url: "/product/7.png",  title: "Row3 Image 7",  description: "Description for row 3, image 7."  },
  { url: "/product/8.png",  title: "Row3 Image 8",  description: "Description for row 3, image 8."  },
  { url: "/product/9.png",  title: "Row3 Image 9",  description: "Description for row 3, image 9."  },
  { url: "/product/10.png", title: "Row3 Image 10", description: "Description for row 3, image 10." },
  { url: "/product/11.png", title: "Row3 Image 11", description: "Description for row 3, image 11." },
  { url: "/product/12.png", title: "Row3 Image 12", description: "Description for row 3, image 12." },
  { url: "/product/14.png", title: "Row3 Image 14", description: "Description for row 3, image 14." },
];

/* ─── single magazine card ────────────────────────────────── */
function Magazine({ item, index, images, onSelect, darkMode }) {
  const meshRef  = useRef();
  const pointerStartRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const baseX   = (index - (images.length - 1) / 2) * CARD_GAP;
  const tiltRad = ((TILTS[index % TILTS.length] ?? 0) * Math.PI) / 180;

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);

  useFrame(() => {
    if (!meshRef.current) return;
    /* pull forward on hover, push back otherwise */
    meshRef.current.position.z = THREE.MathUtils.lerp(
      meshRef.current.position.z,
      hovered ? 2.5 : 0,
      0.1
    );
    /* slight scale-up on hover */
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, hovered ? 1.08 : 1, 0.1)
    );
  });

  const down = (e) => {
    e.stopPropagation();
    pointerStartRef.current = { x: e.clientX ?? 0, y: e.clientY ?? 0, time: Date.now() };
  };
  const up = (e) => {
    e.stopPropagation();
    if (!pointerStartRef.current) return;
    const dx = Math.abs((e.clientX ?? 0) - pointerStartRef.current.x);
    const dy = Math.abs((e.clientY ?? 0) - pointerStartRef.current.y);
    const dt = Date.now() - pointerStartRef.current.time;
    pointerStartRef.current = null;
    if (dx < 10 && dy < 10 && dt < 350) onSelect && onSelect(item);
  };

  return (
    <group ref={meshRef} position={[baseX, 0, 0]} rotation={[0, tiltRad, 0]}>
      {/* drop shadow plane behind card */}
      <mesh position={[0, -0.05, -0.18]}>
        <planeGeometry args={[CARD_W + 0.6, CARD_H + 0.1]} />
        <meshBasicMaterial color="#000000" transparent opacity={darkMode ? 0.35 : 0.15} />
      </mesh>
      {/* spine / thick edge illusion */}
      <mesh position={[-(CARD_W / 2) - 0.07, 0, -0.08]}>
        <boxGeometry args={[0.14, CARD_H, 0.14]} />
        <meshBasicMaterial color={darkMode ? "#475569" : "#94a3b8"} />
      </mesh>
      {/* white card back */}
      <mesh position={[0, 0, -0.07]}>
        <planeGeometry args={[CARD_W, CARD_H]} />
        <meshBasicMaterial color={darkMode ? "#1e293b" : "#f1f5f9"} />
      </mesh>
      {/* magazine cover image */}
      <DreiImage
        url={item.url}
        scale={[CARD_W, CARD_H]}
        transparent
        opacity={hovered ? 1 : 0.92}
        onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        onPointerOut={() => { setHovered(false); pointerStartRef.current = null; }}
        onPointerDown={down}
        onPointerUp={up}
        onPointerCancel={() => { pointerStartRef.current = null; }}
      />
      {/* subtle top edge highlight */}
      <mesh position={[0, CARD_H / 2 + 0.04, 0]}>
        <planeGeometry args={[CARD_W, 0.08]} />
        <meshBasicMaterial color={darkMode ? "#94a3b8" : "#e2e8f0"} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

/* ─── shelf floor ─────────────────────────────────────────── */
function Shelf({ images, darkMode }) {
  const shelfW = images.length * CARD_GAP + 6;
  return (
    <group position={[0, -(CARD_H / 2) - 0.15, -0.5]}>
      <mesh>
        <boxGeometry args={[shelfW, 0.22, 1.6]} />
        <meshStandardMaterial color={darkMode ? "#1e293b" : "#cbd5e1"} roughness={0.6} />
      </mesh>
      {/* shelf face edge */}
      <mesh position={[0, 0.1, 0.85]}>
        <boxGeometry args={[shelfW, 0.04, 0.04]} />
        <meshBasicMaterial color={darkMode ? "#475569" : "#94a3b8"} />
      </mesh>
    </group>
  );
}

/* ─── independently panning shelf row ────────────────────── */
/*  rowIndex: 0 = top, 1 = middle, 2 = bottom                 */
/*  totalRows: total number of rows in the library             */
function PanningRow({ images, rowIndex, totalRows, onSelect, darkMode }) {
  const groupRef = useRef();
  const targetX  = useRef(0);
  const dragRef  = useRef(null);
  const { gl }   = useThree();

  const maxPan = ((images.length - 1) / 2) * CARD_GAP - 4;

  /* returns true when clientY falls inside this row's screen band */
  const inZone = (clientY) => {
    const rect = gl.domElement.getBoundingClientRect();
    const rel  = (clientY - rect.top) / rect.height;
    const band = 1 / totalRows;
    return rel >= rowIndex * band && rel < (rowIndex + 1) * band;
  };

  useEffect(() => {
    const el = gl.domElement;
    const onWheel = (e) => {
      if (!inZone(e.clientY)) return;
      e.preventDefault();
      targetX.current = THREE.MathUtils.clamp(
        targetX.current - (e.deltaX + e.deltaY) * 0.03,
        -maxPan, maxPan
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [gl, maxPan]);

  useEffect(() => {
    const el = gl.domElement;
    const onDown = (e) => {
      if (!inZone(e.clientY)) return;
      dragRef.current = { x: e.clientX };
    };
    const onMove = (e) => {
      if (!dragRef.current) return;
      const dx = (e.clientX - dragRef.current.x) * 0.035;
      dragRef.current.x = e.clientX;
      targetX.current = THREE.MathUtils.clamp(targetX.current + dx, -maxPan, maxPan);
    };
    const onUp = () => { dragRef.current = null; };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup",   onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup",   onUp);
    };
  }, [gl, maxPan]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x, targetX.current, 0.08
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Shelf images={images} darkMode={darkMode} />
      {images.map((item, i) => (
        <Magazine key={i} item={item} index={i} images={images} onSelect={onSelect} darkMode={darkMode} />
      ))}
    </group>
  );
}

/* ─── library — three independent rows ───────────────────── */
function Library({ onSelect, darkMode }) {
  const ROW_OFFSET = CARD_H + 4.5;
  return (
    <>
      <group position={[0,  ROW_OFFSET, 0]}>
        <PanningRow images={IMAGES}  rowIndex={0} totalRows={3} onSelect={onSelect} darkMode={darkMode} />
      </group>
      <group position={[0, 0, 0]}>
        <PanningRow images={IMAGES2} rowIndex={1} totalRows={3} onSelect={onSelect} darkMode={darkMode} />
      </group>
      <group position={[0, -ROW_OFFSET, 0]}>
        <PanningRow images={IMAGES3} rowIndex={2} totalRows={3} onSelect={onSelect} darkMode={darkMode} />
      </group>
    </>
  );
}

/* ─── zoomable image viewer ──────────────────────────────── */
function ZoomableImage({ item, darkMode, onClose }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const imgPanelBg = darkMode ? "#020617" : "#dbeafe";
  const btnBg = darkMode ? "#334155" : "rgba(255,255,255,0.9)";
  const btnColor = darkMode ? "#e2e8f0" : "#0f172a";
  const btnHoverBg = darkMode ? "#475569" : "#ffffff";

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(1, scale + delta), 5);
    setScale(newScale);
    
    // Reset position when zooming out to 1x
    if (newScale === 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && e.touches.length === 1 && scale > 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.01, 5));
  };

  const zoomOut = () => {
    const newScale = Math.max(scale - 0.01, 1);
    setScale(newScale);
    if (newScale === 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = 'grabbing';
    } else if (scale > 1) {
      document.body.style.cursor = 'grab';
    } else {
      document.body.style.cursor = 'default';
    }
    return () => {
      document.body.style.cursor = 'default';
    };
  }, [isDragging, scale]);

  return (
    <div style={{
      flex: "0 0 100%",
      background: imgPanelBg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "70vh",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Zoom controls */}
      <div style={{
        position: "fixed",
        bottom: 66,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 12,
        display: "flex",
        gap: 8,
        background: darkMode ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.9)",
        padding: "8px 12px",
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        pointerEvents: "auto",
      }}>
        <button
          onClick={zoomOut}
          disabled={scale <= 1}
          style={{
            width: 32,
            height: 32,
            border: "none",
            background: btnBg,
            color: btnColor,
            cursor: scale <= 1 ? "not-allowed" : "pointer",
            fontSize: 18,
            fontWeight: "bold",
            borderRadius: 4,
            opacity: scale <= 1 ? 0.5 : 1,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => scale > 1 && (e.target.style.background = btnHoverBg)}
          onMouseLeave={(e) => e.target.style.background = btnBg}
        >−</button>
        
        <div style={{
          minWidth: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: btnColor,
          fontSize: 14,
          fontWeight: 500,
        }}>
          {Math.round(scale * 100)}%
        </div>
        
        <button
          onClick={zoomIn}
          disabled={scale >= 5}
          style={{
            width: 32,
            height: 32,
            border: "none",
            background: btnBg,
            color: btnColor,
            cursor: scale >= 5 ? "not-allowed" : "pointer",
            fontSize: 18,
            fontWeight: "bold",
            borderRadius: 4,
            opacity: scale >= 5 ? 0.5 : 1,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => scale < 5 && (e.target.style.background = btnHoverBg)}
          onMouseLeave={(e) => e.target.style.background = btnBg}
        >+</button>
        
        <button
          onClick={resetZoom}
          disabled={scale === 1}
          style={{
            height: 32,
            padding: "0 12px",
            border: "none",
            background: btnBg,
            color: btnColor,
            cursor: scale === 1 ? "not-allowed" : "pointer",
            fontSize: 12,
            fontWeight: 600,
            borderRadius: 4,
            opacity: scale === 1 ? 0.5 : 1,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => scale !== 1 && (e.target.style.background = btnHoverBg)}
          onMouseLeave={(e) => e.target.style.background = btnBg}
        >Reset</button>
      </div>

      {/* Image container */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
        }}
      >
        <img
          src={item.url}
          alt={item.title}
          draggable={false}
          style={{
            maxWidth: scale === 1 ? "100%" : "none",
            maxHeight: scale === 1 ? "100%" : "none",
            width: scale > 1 ? `${scale * 100}%` : "auto",
            height: "auto",
            objectFit: "contain",
            display: "block",
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: isDragging ? "none" : "transform 0.1s ease-out",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Hint text */}
      {/* {scale === 1 && (
        <div style={{
          position: "absolute",
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          color: darkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
          fontSize: 12,
          pointerEvents: "none",
          userSelect: "none",
          background: darkMode ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)",
          padding: "6px 12px",
          borderRadius: 4,
        }}>
          Scroll to zoom · Drag to pan when zoomed
        </div>
      )} */}
    </div>
  );
}

/* ─── page ────────────────────────────────────────────────── */
export default function CoursesPage() {
  const { darkMode } = useContext(GlobalContext);
  const { showLoading, hideLoading } = useLoading();
  const [zoomedItem, setZoomedItem] = useState(null);
  const [isMobile, setIsMobile]     = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* theme tokens */
  const bg             = darkMode ? "#0d1117" : "#8fa8c4";
  const fogColor       = darkMode ? "#0d1117" : "#8fa8c4";
  const overlayBg      = darkMode ? "rgba(0,0,0,0.88)"       : "rgba(30,50,80,0.55)";
  const modalBg        = darkMode ? "linear-gradient(160deg,#1e293b,#0f172a)" : "linear-gradient(160deg,#f8fafc,#e2e8f0)";
  const modalBorder    = darkMode ? "1px solid #334155"       : "1px solid rgba(255,255,255,0.7)";
  const closeBtnBg     = darkMode ? "#334155"  : "#ffffff";
  const closeBtnColor  = darkMode ? "#e2e8f0"  : "#0f172a";
  const titleColor     = darkMode ? "#e2e8f0"  : "#0f172a";
  const imgPanelBg     = darkMode ? "#020617"  : "#dbeafe";
  const descBg         = darkMode ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.9)";
  const descBorder     = darkMode ? "1px dashed #475569" : "1px dashed #94a3b8";
  const descColor      = darkMode ? "#cbd5e1"  : "#334155";

  useEffect(() => {
    showLoading();
    const t = setTimeout(() => hideLoading(), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <Layout>
      <div style={{ width: "100%", height: "100%", background: bg, touchAction: "none", position: "relative" }}>
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 35], fov: 72 }}
          style={{ width: "100%", height: "100%" }}
        >
          <fog attach="fog" args={[fogColor, 22, 60]} />
          <ambientLight intensity={darkMode ? 0.5 : 0.85} />
          <directionalLight position={[5, 10, 8]}  intensity={darkMode ? 0.6 : 0.9} />
          <directionalLight position={[-5, 6, -4]} intensity={0.25} />
          <Suspense fallback={null}>
            <Library onSelect={setZoomedItem} darkMode={darkMode} />
          </Suspense>
        </Canvas>

        {/* ── hint text ── */}
        <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.45)", fontSize: 12, pointerEvents: "none", userSelect: "none" }}>
          scroll or drag to browse · tap to open
        </div>

        {/* ── zoom popup — magazine spread layout ── */}
        {zoomedItem && (
          <div
            onClick={() => setZoomedItem(null)}
            style={{
              position: "absolute", inset: 0,
              background: overlayBg,
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 10, cursor: "zoom-out",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: isMobile ? "min(96vw, 500px)" : "min(92vw, 1600px)",
                maxHeight: "92vh",
                display: "flex",
                flexDirection: "row",
                background: modalBg,
                boxShadow: "0 30px 90px rgba(0,0,0,0.7)",
                border: modalBorder,
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              {/* close button */}
              <button
                onClick={() => setZoomedItem(null)}
                style={{
                  position: "absolute", top: 12, right: 12, zIndex: 11,
                  width: 32, height: 32, border: "none",
                  background: closeBtnBg, color: closeBtnColor,
                  cursor: "pointer", fontWeight: "bold", fontSize: 15,
                  lineHeight: "32px", textAlign: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                  borderRadius: 2,
                }}
              >✕</button>

              {/* zoomable image viewer */}
              <ZoomableImage item={zoomedItem} darkMode={darkMode} onClose={() => setZoomedItem(null)} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

