"use client";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

interface GlobeProps {
  className?: string;
}

export function Globe({ className }: GlobeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvas3DRef = useRef<HTMLCanvasElement | null>(null);
  const canvas2DRef = useRef<HTMLCanvasElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      !containerRef.current ||
      !canvas3DRef.current ||
      !canvas2DRef.current ||
      !popupRef.current
    )
      return;

    const containerEl = containerRef.current;
    const canvas3D = canvas3DRef.current;
    const canvas2D = canvas2DRef.current;
    const popupEl = popupRef.current;

    let globe: THREE.Points;
    let globeMesh: THREE.Mesh;
    let mapMaterial: THREE.ShaderMaterial;
    let animationId: number;
    let resizeHandler: () => void;

    const clock = new THREE.Clock();

    // ---------------- INIT SCENE ----------------
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas3D,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance"
    });
    // Cap pixel ratio for performance (original was 2, now adaptive)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1.1, 1.1, 1.1, -1.1, 0, 3);
    camera.position.z = 1.1;

    const rayCaster = new THREE.Raycaster();
    rayCaster.far = 1.15;

    const controls = new OrbitControls(camera, canvas3D);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    controls.minPolarAngle = 0.4 * Math.PI;
    controls.maxPolarAngle = 0.4 * Math.PI;
    camera.position.set(0.3, 0.6, 0.9);
    camera.lookAt(0, 0, 0);

    // Function to initialize the globe with texture
    function initGlobe(earthTexture: THREE.Texture) {
      // Optimized geometry complexity: 8 detail is plenty for an animated background
      const globeGeometry = new THREE.IcosahedronGeometry(1, 8);

      const vertexShader = `
        uniform sampler2D u_map_tex;
        uniform float u_dot_size;
        uniform float u_time_since_click;
        uniform vec3 u_pointer;

        #define PI 3.14159265359

        varying float vOpacity;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          float visibility = step(.2, texture2D(u_map_tex, uv).r);
          gl_PointSize = visibility * u_dot_size;

          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vOpacity = (1. / length(mvPosition.xyz) - .7);
          vOpacity = clamp(vOpacity, .03, 1.);

          float t = u_time_since_click - .1;
          t = max(0., t);
          float max_amp = .15;
          float dist = 1. - .5 * length(position - u_pointer);
          float damping = 1. / (1. + 20. * t);
          float delta = max_amp * damping * sin(5. * t * (1. + 2. * dist) - PI);
          delta *= 1. - smoothstep(.8, 1., dist);
          vec3 pos = position;
          pos *= (1. + delta);

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
        }
      `;

      const fragmentShader = `
        uniform sampler2D u_map_tex;
        uniform float u_time;

        varying float vOpacity;
        varying vec2 vUv;

        void main() {
          vec3 baseColor = texture2D(u_map_tex, vUv).rgb;

          float t = (sin(u_time * 0.5) + 1.0) / 2.0;
          vec3 teal = vec3(0.0, 0.83, 0.76);
          vec3 green = vec3(0.43, 0.91, 0.76);
          vec3 shiftColor = mix(teal, green, t);

          float dot = 1. - smoothstep(.38, .4, length(gl_PointCoord.xy - vec2(.5)));
          if (dot < 0.5) discard;

          gl_FragColor = vec4(baseColor * shiftColor, dot * vOpacity);
        }
      `;

      mapMaterial = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          u_map_tex: { value: earthTexture },
          u_dot_size: { value: 0 },
          u_pointer: { value: new THREE.Vector3(0.0, 0.0, 1) },
          u_time_since_click: { value: 0 },
          u_time: { value: 0 },
        },
        transparent: true,
      });

      globe = new THREE.Points(globeGeometry, mapMaterial);
      scene.add(globe);

      globeMesh = new THREE.Mesh(
        globeGeometry,
        new THREE.MeshBasicMaterial({
          color: 0x222222,
          transparent: true,
          opacity: 0.05,
        })
      );
      scene.add(globeMesh);

      setIsLoading(false);

      // Render loop
      function render() {
        mapMaterial.uniforms.u_time.value = clock.getElapsedTime();
        controls.update();
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(render);
      }
      render();

      // Resize handling
      resizeHandler = function updateSize() {
        const containerWidth = containerEl.clientWidth;
        const containerHeight = containerEl.clientHeight;
        const minSide = Math.min(containerWidth, containerHeight);

        renderer.setSize(minSide, minSide);
        canvas2D.width = canvas2D.height = minSide;
        mapMaterial.uniforms.u_dot_size.value = 0.04 * minSide;
      };
      resizeHandler();
      window.addEventListener("resize", resizeHandler);

      // Click handler for lat/lon popup + ripple wave
      canvas3D.addEventListener("click", (event) => {
        const rect = canvas3D.getBoundingClientRect();
        const mouse = new THREE.Vector2(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1
        );

        rayCaster.setFromCamera(mouse, camera);
        const intersects = rayCaster.intersectObject(globeMesh);

        if (intersects.length > 0) {
          const point = intersects[0].point;
          const face = intersects[0].face;

          if (face && mapMaterial.uniforms.u_pointer.value instanceof THREE.Vector3) {
            const normal = face.normal.clone().normalize();
            (mapMaterial.uniforms.u_pointer.value as THREE.Vector3).copy(normal);
          }

          const lat = (90 - (Math.acos(point.y / point.length()) * 180) / Math.PI).toFixed(4);
          const lon = (((270 + (Math.atan2(point.x, point.z) * 180) / Math.PI) % 360) - 180).toFixed(4);

          popupEl.innerHTML = `Lat: ${lat}°, Lon: ${lon}°`;
          popupEl.style.display = "block";
          popupEl.style.position = "absolute";
          popupEl.style.top = event.clientY - rect.top + "px";
          popupEl.style.left = event.clientX - rect.left + "px";
          popupEl.style.color = "#0B0F17";
          popupEl.style.background = "#6FE7C1";
          popupEl.style.padding = "6px 10px";
          popupEl.style.borderRadius = "6px";
          popupEl.style.fontSize = "14px";
          popupEl.style.fontWeight = "600";
          popupEl.style.boxShadow = "0 0 10px rgba(111, 231, 193, 0.4)";

          gsap.fromTo(
            mapMaterial.uniforms.u_time_since_click,
            { value: 0 },
            { value: 3, duration: 3, ease: "power1.out" }
          );

          setTimeout(() => {
            popupEl.style.display = "none";
          }, 3000);
        }
      });
    }

    // Load texture with fallback
    const textureLoader = new THREE.TextureLoader();
    const localTextureUrl = "/earth-map.png";
    const fallbackUrl = "https://ksenia-k.com/img/earth-map-colored.png";

    textureLoader.load(
      localTextureUrl,
      (texture) => initGlobe(texture),
      undefined,
      () => {
        // Local texture failed, try fallback
        textureLoader.load(
          fallbackUrl,
          (texture) => initGlobe(texture),
          undefined,
          () => setIsLoading(false) // Both failed, hide loader
        );
      }
    );

    // Cleanup
    return () => {
      if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
      }
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Loading spinner */}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid rgba(111, 231, 193, 0.2)",
              borderTop: "3px solid #6FE7C1",
              borderRadius: "50%",
              animation: "globe-spin 1s linear infinite",
            }}
          />
          <style>{`@keyframes globe-spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
      <canvas
        ref={canvas3DRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
      />
      <canvas
        ref={canvas2DRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />
      <div
        id="globe-popup-overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <div
          ref={popupRef}
          className="globe-popup"
          style={{ display: "none", pointerEvents: "auto" }}
        />
      </div>
    </div>
  );
}

export default Globe;
