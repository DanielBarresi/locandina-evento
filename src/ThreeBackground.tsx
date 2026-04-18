import { useEffect, useRef } from "react";
import * as THREE from "three";

const bgSrc = new URL("./WhatsApp Image 2026-04-15 at 22.41.08 (3).jpeg", import.meta.url).href;

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.z += sin(pos.x * 2.5 + uTime * 0.7) * 0.035
           + sin(pos.y * 2.0 + uTime * 0.55) * 0.030;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uTime;

  void main() {
    vec2 uv = vUv;
    uv.x += sin(uv.y * 3.0 + uTime * 0.5) * 0.018;
    uv.y += cos(uv.x * 2.5 + uTime * 0.4) * 0.016;
    vec4 color = texture2D(uTexture, uv);
    color.rgb *= 0.88;
    gl_FragColor = color;
  }
`;

interface Props {
  style?: React.CSSProperties;
  className?: string;
}

export const ThreeBackground: React.FC<Props> = ({ style, className }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const texture = new THREE.TextureLoader().load(bgSrc);
    texture.minFilter = THREE.LinearFilter;

    const geometry = new THREE.PlaneGeometry(2, 2, 32, 32);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      material.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      texture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        ...style,
      }}
    />
  );
};
