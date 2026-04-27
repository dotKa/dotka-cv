import { useEffect, useRef, useState } from "react";
import { profilePhoto, silhouettePhoto } from "../data/profile";

const FALLBACK_SILHOUETTE =
  "https://images.unsplash.com/photo-1542044896530-05d3c054e276?auto=format&fit=crop&w=400&h=500&q=80";
const FALLBACK_PROFILE =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=500&q=80";

const MAX_NODES = 120;
const MAX_AMBIENT_NODES = 160;
const MAX_BACKGROUND_NODES = 120;
const MIN_NODE_DISTANCE = 12;
const CONNECTION_DISTANCE = 35;
const NODE_RADIUS = 0.75;
const PHASE_3_START = 4000;
const ANIMATION_END = 5000;

function drawCoverImage(ctx, image, width, height) {
  const containerRatio = width / height;
  const imageRatio = image.naturalWidth / image.naturalHeight;
  let drawWidth = width;
  let drawHeight = height;
  let offsetX = 0;
  let offsetY = 0;

  if (imageRatio > containerRatio) {
    drawHeight = height;
    drawWidth = height * imageRatio;
    offsetX = (width - drawWidth) / 2;
  } else {
    drawWidth = width;
    drawHeight = width / imageRatio;
    offsetY = (height - drawHeight) / 2;
  }

  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

function waitForImage(image) {
  if (image.complete && image.naturalWidth > 0) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Image could not be loaded."));
  });
}

export function ProfileReveal() {
  const canvasRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const finalImageRef = useRef(null);
  const silhouetteImageRef = useRef(null);
  const animationFrameRef = useRef();
  const [imageSrc, setImageSrc] = useState(profilePhoto);
  const [silhouetteSrc, setSilhouetteSrc] = useState(silhouettePhoto);
  const [isFallbackProfile, setIsFallbackProfile] = useState(false);
  const [isFallbackSilhouette, setIsFallbackSilhouette] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function setupAnimation() {
      const canvas = canvasRef.current;
      const imageWrapper = imageWrapperRef.current;
      const imgElement = finalImageRef.current;
      const silhouetteElement = silhouetteImageRef.current;

      if (!canvas || !imageWrapper || !imgElement || !silhouetteElement) {
        return;
      }

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) {
        return;
      }

      try {
        await Promise.all([waitForImage(imgElement), waitForImage(silhouetteElement)]);
      } catch {
        if (!isFallbackProfile) {
          setIsFallbackProfile(true);
          setImageSrc(FALLBACK_PROFILE);
        }
        if (!isFallbackSilhouette) {
          setIsFallbackSilhouette(true);
          setSilhouetteSrc(FALLBACK_SILHOUETTE);
        }
        return;
      }

      if (cancelled) {
        return;
      }

      cancelAnimationFrame(animationFrameRef.current);

      const width = imgElement.clientWidth || 144;
      const height = imgElement.clientHeight || 180;
      canvas.width = width;
      canvas.height = height;

      imageWrapper.classList.remove("profile-scan-anim");
      imageWrapper.style.opacity = "0";
      canvas.style.opacity = "1";

      let mainData;
      let silData;

      try {
        drawCoverImage(ctx, imgElement, width, height);
        mainData = ctx.getImageData(0, 0, width, height).data;
        ctx.clearRect(0, 0, width, height);

        drawCoverImage(ctx, silhouetteElement, width, height);
        silData = ctx.getImageData(0, 0, width, height).data;
        ctx.clearRect(0, 0, width, height);
      } catch {
        imageWrapper.classList.add("profile-scan-anim");
        canvas.style.opacity = "0";
        return;
      }

      const potentialEdges = [];

      for (let y = 0; y < height; y += 4) {
        for (let x = 0; x < width; x += 4) {
          const idx = (y * width + x) * 4;
          const a = silData[idx + 3];

          if (a > 128) {
            const sR = silData[idx];
            const sG = silData[idx + 1];
            const sB = silData[idx + 2];
            const brightness = (sR + sG + sB) / 3;
            let isEdge = false;

            if (x < width - 4 && y < height - 4) {
              const idxR = (y * width + (x + 4)) * 4;
              const idxB = ((y + 4) * width + x) * 4;
              const bR = (silData[idxR] + silData[idxR + 1] + silData[idxR + 2]) / 3;
              const bB = (silData[idxB] + silData[idxB + 1] + silData[idxB + 2]) / 3;

              if (Math.abs(brightness - bR) > 20 || Math.abs(brightness - bB) > 20) {
                isEdge = true;
              }
            }

            if (isEdge) {
              const mainR = mainData[idx];
              const mainG = mainData[idx + 1];
              const mainB = mainData[idx + 2];
              potentialEdges.push({ tx: x, ty: y, r: mainR, g: mainG, b: mainB });
            }
          }
        }
      }

      potentialEdges.sort(() => Math.random() - 0.5);

      const mainNodes = [];
      const ambientNodes = [];

      for (const edge of potentialEdges) {
        if (mainNodes.length < MAX_NODES) {
          let tooClose = false;
          for (const mainNode of mainNodes) {
            if (Math.hypot(edge.tx - mainNode.tx, edge.ty - mainNode.ty) < MIN_NODE_DISTANCE) {
              tooClose = true;
              break;
            }
          }

          if (!tooClose) {
            const delay = (edge.tx / width) * 1500 + Math.random() * 800;
            mainNodes.push({
              tx: edge.tx,
              ty: edge.ty,
              x: edge.tx + (Math.random() - 0.5) * 150,
              y: edge.ty + (Math.random() - 0.5) * 150,
              r: edge.r,
              g: edge.g,
              b: edge.b,
              opacity: 0,
              delay,
              connections: [],
              isAmbient: false
            });
            continue;
          }
        }

        if (ambientNodes.length < MAX_AMBIENT_NODES && Math.random() < 0.1) {
          const scatterX = edge.tx + (Math.random() - 0.5) * 50;
          const scatterY = edge.ty + (Math.random() - 0.5) * 50;
          const delay = (edge.tx / width) * 1500 + Math.random() * 1200;
          ambientNodes.push({
            tx: scatterX,
            ty: scatterY,
            x: scatterX + (Math.random() - 0.5) * 200,
            y: scatterY + (Math.random() - 0.5) * 200,
            r: edge.r,
            g: edge.g,
            b: edge.b,
            opacity: 0,
            delay,
            connections: [],
            isAmbient: true
          });
        }

        if (mainNodes.length >= MAX_NODES && ambientNodes.length >= MAX_AMBIENT_NODES) {
          break;
        }
      }

      const backgroundNodes = [];
      for (let i = 0; i < MAX_BACKGROUND_NODES; i++) {
        const rx = Math.floor(Math.random() * width);
        const ry = Math.floor(Math.random() * height);
        const idx = (ry * width + rx) * 4;
        const startOffsetX = (Math.random() - 0.5) * 300;
        const startOffsetY = (Math.random() - 0.5) * 300;
        const delay = Math.random() * 2500;

        backgroundNodes.push({
          tx: rx,
          ty: ry,
          x: rx + startOffsetX,
          y: ry + startOffsetY,
          r: mainData[idx] || 255,
          g: mainData[idx + 1] || 255,
          b: mainData[idx + 2] || 255,
          opacity: 0,
          delay,
          connections: [],
          isAmbient: true
        });
      }

      const nodes = [...mainNodes, ...ambientNodes, ...backgroundNodes];

      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].isAmbient) continue;

        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[j].isAmbient) continue;

          const dx = nodes[i].tx - nodes[j].tx;
          const dy = nodes[i].ty - nodes[j].ty;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            nodes[i].connections.push(nodes[j]);
          }
        }
      }

      const startTime = performance.now();

      function animate() {
        const elapsed = performance.now() - startTime;

        ctx.fillStyle = "rgba(15, 23, 42, 0.3)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "screen";
        ctx.lineWidth = 0.3;

        nodes.forEach((node) => {
          if (elapsed > node.delay) {
            node.x += (node.tx - node.x) * 0.04;
            node.y += (node.ty - node.y) * 0.04;

            if (node.opacity < 1) {
              node.opacity += 0.03;
            }

            ctx.beginPath();
            ctx.arc(node.x, node.y, NODE_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${node.r}, ${node.g}, ${node.b}, ${node.opacity})`;
            ctx.fill();

            node.connections.forEach((target) => {
              if (target.opacity > 0) {
                const currentDist = Math.hypot(node.x - target.x, node.y - target.y);

                if (currentDist < CONNECTION_DISTANCE + 15) {
                  const lineOpacity = Math.min(node.opacity, target.opacity) * (1 - currentDist / (CONNECTION_DISTANCE + 15)) * 0.7;
                  const avgR = (node.r + target.r) / 2;
                  const avgG = (node.g + target.g) / 2;
                  const avgB = (node.b + target.b) / 2;

                  ctx.beginPath();
                  ctx.moveTo(node.x, node.y);
                  ctx.lineTo(target.x, target.y);
                  ctx.strokeStyle = `rgba(${avgR}, ${avgG}, ${avgB}, ${lineOpacity})`;
                  ctx.stroke();
                }
              }
            });
          }
        });

        ctx.globalCompositeOperation = "source-over";

        if (elapsed > PHASE_3_START && !imageWrapper.classList.contains("profile-scan-anim")) {
          imageWrapper.classList.add("profile-scan-anim");
          canvas.style.opacity = "0";
        }

        if (elapsed < ANIMATION_END && !cancelled) {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      }

      animate();
    }

    setupAnimation();

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [imageSrc, silhouetteSrc, isFallbackProfile, isFallbackSilhouette]);

  return (
    <div className="relative h-28 w-28 shrink-0 overflow-hidden border border-cyan-300/50 bg-slate-800 shadow-2xl md:h-36 md:w-36">
      <img
        ref={silhouetteImageRef}
        crossOrigin="anonymous"
        src={silhouetteSrc}
        alt="Silüet"
        className="hidden"
        onError={() => {
          if (!isFallbackSilhouette) {
            setIsFallbackSilhouette(true);
            setSilhouetteSrc(FALLBACK_SILHOUETTE);
          }
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 z-20 h-full w-full transition-opacity duration-500 ease-out" />
      <div ref={imageWrapperRef} className="profile-reveal-image-wrapper pointer-events-none absolute inset-0 z-30 opacity-0">
        <img
          ref={finalImageRef}
          crossOrigin="anonymous"
          src={imageSrc}
          alt="Yasin Karadeniz"
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => {
            if (!isFallbackProfile) {
              setIsFallbackProfile(true);
              setImageSrc(FALLBACK_PROFILE);
            }
          }}
        />
        <img
          aria-hidden="true"
          src={imageSrc}
          alt=""
          className="profile-light-sweep-grayscale absolute inset-0 h-full w-full object-cover"
        />
        <div className="profile-light-sweep-beam absolute inset-0" />
        <div className="profile-reveal-scan-line absolute left-0 top-0 z-10 h-[3px] w-full bg-white/90 opacity-0 shadow-[0_0_15px_rgba(255,255,255,0.8),0_0_30px_cyan]" />
      </div>
    </div>
  );
}
