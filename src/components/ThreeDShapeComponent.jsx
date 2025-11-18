import React, { useEffect, useRef } from 'react';

/**
 * React Component for 3D Shape from Image Rendering
 * Props:
 * - imageBase64: string - Base64 encoded image
 * - color: string - Tint color for the shape
 * - depth: 'low' | 'medium' | 'high' - Depth of the 3D effect
 * - rotationX: number - X rotation speed
 * - rotationY: number - Y rotation speed
 * - rotationZ: number - Z rotation speed
 * - bgColor: string - Background color
 */
const ThreeDShapeComponent = ({
  imageBase64,
  color = '#3b82f6',
  depth = 'medium',
  rotationX = 0.005,
  rotationY = 0.008,
  rotationZ = 0,
  bgColor = '#f3f4f6'
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !imageBase64) return;

    // Clear any existing content
    containerRef.current.innerHTML = '';

    // Create canvas for 3D shape
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';

    containerRef.current.appendChild(canvas);

    // Initialize Three.js scene
    const initThreeDShape = () => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

      renderer.setSize(canvas.width, canvas.height);
      renderer.setClearColor(0x000000, 0);
      camera.position.z = 5;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(10, 10, 5);
      scene.add(directionalLight);

      // Create geometry from image
      const texture = new THREE.TextureLoader().load(imageBase64);
      const geometry = new THREE.PlaneGeometry(2, 2, 32, 32);

      // Apply displacement map for 3D effect
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        displacementMap: texture,
        displacementScale: depth === 'high' ? 0.5 : depth === 'medium' ? 0.3 : 0.1,
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.8
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        mesh.rotation.x += rotationX;
        mesh.rotation.y += rotationY;
        mesh.rotation.z += rotationZ;

        renderer.render(scene, camera);
      };

      animate();

      // Handle resize
      const handleResize = () => {
        const rect = canvas.getBoundingClientRect();
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        renderer.setSize(rect.width, rect.height);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    };

    // Load Three.js if not available
    if (typeof THREE === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = initThreeDShape;
      document.head.appendChild(script);
    } else {
      initThreeDShape();
    }

    // Cleanup
    return () => {
      const existingScript = document.querySelector('script[src*="three.min.js"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, [imageBase64, color, depth, rotationX, rotationY, rotationZ, bgColor]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '300px',
        backgroundColor: bgColor,
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(59, 130, 246, 0.2)',
        border: '1px solid rgba(59, 130, 246, 0.3)'
      }}
    />
  );
};

export default ThreeDShapeComponent;
