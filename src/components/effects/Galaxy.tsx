 "use client";
 
 import { Renderer, Program, Mesh, Triangle } from "ogl";
 import { useEffect, useRef } from "react";
 
 const vertexShader = `
 attribute vec2 uv;
 attribute vec2 position;
 varying vec2 vUv;
 void main() {
   vUv = uv;
   gl_Position = vec4(position, 0.0, 1.0);
 }
 `;
 
 const fragmentShader = `
 precision highp float;
 uniform float uTime;
 uniform vec3 uResolution;
 uniform vec2 uFocal;
 uniform vec2 uRotation;
 uniform float uStarSpeed;
 uniform float uDensity;
 uniform float uHueShift;
 uniform float uSpeed;
 uniform vec2 uMouse;
 uniform float uGlowIntensity;
 uniform float uSaturation;
 uniform bool uMouseRepulsion;
 uniform float uTwinkleIntensity;
 uniform float uRotationSpeed;
 uniform float uRepulsionStrength;
 uniform float uMouseActiveFactor;
 uniform float uAutoCenterRepulsion;
 uniform bool uTransparent;
 varying vec2 vUv;
 #define NUM_LAYER 4.0
 #define STAR_COLOR_CUTOFF 0.2
 #define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
 #define PERIOD 3.0
 float Hash21(vec2 p) {
   p = fract(p * vec2(123.34, 456.21));
   p += dot(p, p + 45.32);
   return fract(p.x * p.y);
 }
 float tri(float x) {
   return abs(fract(x) * 2.0 - 1.0);
 }
 float tris(float x) {
   float t = fract(x);
   return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
 }
 float trisn(float x) {
   float t = fract(x);
   return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
 }
 vec3 hsv2rgb(vec3 c) {
   vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
   vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
   return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
 }
 float Star(vec2 uv, float flare) {
   float d = length(uv);
   float m = (0.05 * uGlowIntensity) / d;
   float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
   m += rays * flare * uGlowIntensity;
   uv *= MAT45;
   rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
   m += rays * 0.3 * flare * uGlowIntensity;
   m *= smoothstep(1.0, 0.2, d);
   return m;
 }
 vec3 StarLayer(vec2 uv) {
   vec3 col = vec3(0.0);
   vec2 gv = fract(uv) - 0.5;
   vec2 id = floor(uv);
   for (int y = -1; y <= 1; y++) {
     for (int x = -1; x <= 1; x++) {
       vec2 offset = vec2(float(x), float(y));
       vec2 si = id + vec2(float(x), float(y));
       float seed = Hash21(si);
       float size = fract(seed * 345.32);
       float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
       float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;
       float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
       float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
       float grn = min(red, blu) * seed;
       vec3 base = vec3(red, grn, blu);
       float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
       hue = fract(hue + uHueShift / 360.0);
       float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
       float val = max(max(base.r, base.g), base.b);
       base = hsv2rgb(vec3(hue, sat, val));
       vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;
       float star = Star(gv - offset - pad, flareSize);
       vec3 color = base;
       float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
       twinkle = mix(1.0, twinkle, uTwinkleIntensity);
       star *= twinkle;
       col += star * size * color;
     }
   }
   return col;
 }
 void main() {
   vec2 focalPx = uFocal * uResolution.xy;
   vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;
   vec2 mouseNorm = uMouse - vec2(0.5);
   if (uAutoCenterRepulsion > 0.0) {
     vec2 centerUV = vec2(0.0, 0.0);
     float centerDist = length(uv - centerUV);
     vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
     uv += repulsion * 0.05;
   } else if (uMouseRepulsion) {
     vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
     float mouseDist = length(uv - mousePosUV);
     vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
     uv += repulsion * 0.05 * uMouseActiveFactor;
   } else {
     vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
     uv += mouseOffset;
   }
   float autoRotAngle = uTime * uRotationSpeed;
   mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
   uv = autoRot * uv;
   uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;
   vec3 col = vec3(0.0);
   for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
     float depth = fract(i + uStarSpeed * uSpeed);
     float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
     float fade = depth * smoothstep(1.0, 0.9, depth);
     col += StarLayer(uv * scale + i * 453.32) * fade;
   }
   if (uTransparent) {
     float alpha = length(col);
     alpha = smoothstep(0.0, 0.3, alpha);
     alpha = min(alpha, 1.0);
     gl_FragColor = vec4(col, alpha);
   } else {
     gl_FragColor = vec4(col, 1.0);
   }
 }
 `;
 
 interface GalaxyProps {
   focal?: [number, number];
   rotation?: [number, number];
   starSpeed?: number;
   density?: number;
   hueShift?: number;
   disableAnimation?: boolean;
   speed?: number;
   mouseInteraction?: boolean;
   glowIntensity?: number;
   saturation?: number;
   mouseRepulsion?: boolean;
   twinkleIntensity?: number;
   rotationSpeed?: number;
   repulsionStrength?: number;
   autoCenterRepulsion?: number;
   transparent?: boolean;
 }
 
 export default function Galaxy({
   focal = [0.5, 0.5],
   rotation = [1.0, 0.0],
   starSpeed = 0.5,
   density = 1,
   hueShift = 140,
   disableAnimation = false,
   speed = 1.0,
   mouseInteraction = true,
   glowIntensity = 0.3,
   saturation = 0.0,
   mouseRepulsion = true,
   twinkleIntensity = 0.3,
   rotationSpeed = 0.1,
   repulsionStrength = 2.0,
   autoCenterRepulsion = 0.0,
   transparent = true,
   ...rest
 }: GalaxyProps & React.HTMLAttributes<HTMLDivElement>) {
   const ctnDom = useRef<HTMLDivElement | null>(null);
   const rendererRef = useRef<Renderer | null>(null);
   const meshRef = useRef<Mesh | null>(null);
 
   useEffect(() => {
    const container = ctnDom.current;
    if (!container) return;
     const renderer = new Renderer({ alpha: true, antialias: true });
     rendererRef.current = renderer;
     const gl = renderer.gl as WebGLRenderingContext;
     const canvas = gl.canvas as HTMLCanvasElement;
     canvas.style.width = "100%";
     canvas.style.height = "100%";
     canvas.style.display = "block";
    container.appendChild(canvas);

    const geometry = new Triangle(gl as any);
    const program = new Program(gl as any, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
         uTime: { value: 0 },
        uResolution: { value: [container.clientWidth, container.clientHeight, 1] },
         uFocal: { value: focal },
         uRotation: { value: rotation },
         uStarSpeed: { value: starSpeed },
         uDensity: { value: density },
         uHueShift: { value: hueShift },
         uSpeed: { value: speed },
         uMouse: { value: [0.5, 0.5] },
         uGlowIntensity: { value: glowIntensity },
         uSaturation: { value: saturation },
         uMouseRepulsion: { value: mouseRepulsion ?? false },
         uTwinkleIntensity: { value: twinkleIntensity },
         uRotationSpeed: { value: rotationSpeed },
         uRepulsionStrength: { value: repulsionStrength },
         uMouseActiveFactor: { value: mouseInteraction ? 1.0 : 0.0 },
         uAutoCenterRepulsion: { value: autoCenterRepulsion },
         uTransparent: { value: transparent },
       },
    });

    const mesh = new Mesh(gl as any, { geometry, program });
    meshRef.current = mesh;

    type Uniforms = {
      uTime: { value: number };
      uResolution: { value: [number, number, number] };
      uFocal: { value: [number, number] };
      uRotation: { value: [number, number] };
      uStarSpeed: { value: number };
      uDensity: { value: number };
      uHueShift: { value: number };
      uSpeed: { value: number };
      uMouse: { value: [number, number] };
      uGlowIntensity: { value: number };
      uSaturation: { value: number };
      uMouseRepulsion: { value: boolean };
      uTwinkleIntensity: { value: number };
      uRotationSpeed: { value: number };
      uRepulsionStrength: { value: number };
      uMouseActiveFactor: { value: number };
      uAutoCenterRepulsion: { value: number };
      uTransparent: { value: boolean };
    };
    const uniforms = program.uniforms as Uniforms;

     const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      uniforms.uResolution.value = [container.clientWidth, container.clientHeight, 1];
     };
     resize();
     const onMouseMove = (e: MouseEvent) => {
       if (!mouseInteraction) return;
       const x = e.clientX / window.innerWidth;
       const y = e.clientY / window.innerHeight;
      uniforms.uMouse.value = [x, y];
      uniforms.uMouseActiveFactor.value = 1.0;
     };
     const onMouseLeave = () => {
       if (!mouseInteraction) return;
      uniforms.uMouseActiveFactor.value = 0.0;
     };
     window.addEventListener("resize", resize);
     window.addEventListener("mousemove", onMouseMove);
     window.addEventListener("mouseleave", onMouseLeave);
 
     let raf = 0;
     const render = (t: number) => {
      uniforms.uTime.value = t * 0.001;
       renderer.render({ scene: mesh });
       if (!disableAnimation) raf = requestAnimationFrame(render);
     };
     if (!disableAnimation) {
       raf = requestAnimationFrame(render);
     } else {
       render(performance.now());
     }
 
     return () => {
       cancelAnimationFrame(raf);
       window.removeEventListener("resize", resize);
       window.removeEventListener("mousemove", onMouseMove);
       window.removeEventListener("mouseleave", onMouseLeave);
       try {
        container?.removeChild(canvas);
       } catch {}
      const prog = program as unknown as { delete?: () => void };
      prog.delete?.();
      const geom = geometry as unknown as { delete?: () => void };
      geom.delete?.();
      const loseExt = gl.getExtension("WEBGL_lose_context") as { loseContext: () => void } | null;
      loseExt?.loseContext();
     };
   }, [
     focal,
     rotation,
     starSpeed,
     density,
     hueShift,
     disableAnimation,
     speed,
     mouseInteraction,
     glowIntensity,
     saturation,
     mouseRepulsion,
     twinkleIntensity,
     rotationSpeed,
     repulsionStrength,
     autoCenterRepulsion,
     transparent,
   ]);
 
   return <div ref={ctnDom} className="w-full h-full" {...rest} />;
 }
 
