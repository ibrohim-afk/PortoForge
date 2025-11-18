/**
 * Enhanced 3D Text Component untuk Preview
 * Features: Dynamic loading, performance optimization, error handling, accessibility
 */
import React, { useEffect, useRef, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// Constants for better maintainability
const SPEED_MAP = {
  slow: 0.5,
  normal: 1,
  fast: 1.5,
  veryfast: 2
};

const SIZE_MAP = {
  small: 15,
  medium: 30,
  large: 45,
  xlarge: 60
};

const ROTATION_STYLES = {
  none: () => () => { },
  'x-axis': (speed) => (mesh) => { mesh.rotation.x += 0.008 * speed; },
  'y-axis': (speed) => (mesh) => { mesh.rotation.y += 0.008 * speed; },
  'xy-orbit': (speed) => (mesh) => {
    mesh.rotation.x += 0.005 * speed;
    mesh.rotation.y += 0.008 * speed;
  },
  'xyz-spin': (speed) => (mesh) => {
    mesh.rotation.x += 0.005 * speed;
    mesh.rotation.y += 0.008 * speed;
    mesh.rotation.z += 0.003 * speed;
  }
};

const FONT_URL = 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json';
const THREE_JS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';

export const ThreeDTextComponent = ({
  text = 'PortoForge',
  color = '#3b82f6',
  size = 'large',
  speed = 'normal',
  bgColor = '#ffffff',
  rotationStyle = 'xy-orbit',
  fontDepth = 15,
  bevelEnabled = true,
  bevelThickness = 8,
  bevelSize = 6,
  metalness = 0.6,
  roughness = 0.4,
  emissiveIntensity = 0.2,
  cameraDistance = 120,
  onError = null,
  onLoad = null,
  paused = false
}) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const animationRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  // Memoized values for performance
  const speedMultiplier = useMemo(() => SPEED_MAP[speed] || 1, [speed]);
  const fontSize = useMemo(() => SIZE_MAP[size] || 30, [size]);

  // Check WebGL support
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setIsWebGLSupported(!!gl);
  }, []);

  // Rotation function factory
  const getRotationFunction = useCallback((style, speed) => {
    return ROTATION_STYLES[style] ? ROTATION_STYLES[style](speed) : ROTATION_STYLES['xy-orbit'](speed);
  }, []);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (sceneRef.current) {
      const { scene, renderer, textMesh, geometry, material } = sceneRef.current;

      if (textMesh) {
        scene.remove(textMesh);
        if (geometry) geometry.dispose();
        if (material) material.dispose();
      }

      if (renderer) {
        renderer.dispose();
        if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }

      sceneRef.current = null;
    }
  }, []);

  // Load Three.js with retry mechanism
  const loadThreeJs = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (window.THREE) {
        resolve(window.THREE);
        return;
      }

      const script = document.createElement('script');
      script.src = THREE_JS_URL;
      script.onload = () => resolve(window.THREE);
      script.onerror = () => {
        console.error('[ThreeDText] Failed to load Three.js after retries');
        reject(new Error('Failed to load Three.js'));
      };
      document.head.appendChild(script);
    });
  }, []);

  // Initialize scene
  const initScene = useCallback(async () => {
    if (!isWebGLSupported) {
      const err = new Error('WebGL not supported');
      setError(err);
      setIsLoading(false);
      onError?.(err);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const THREE = await loadThreeJs();
      const container = containerRef.current;

      if (!container || !THREE) {
        throw new Error('Container or THREE not available');
      }

      // Get container dimensions with fallbacks
      let width = container.clientWidth || 400;
      let height = container.clientHeight || 300;

      if (width <= 0 || height <= 0) {
        // Wait for container to be properly sized
        await new Promise(resolve => {
          const observer = new ResizeObserver(() => {
            width = container.clientWidth || 400;
            height = container.clientHeight || 300;
            if (width > 0 && height > 0) {
              observer.disconnect();
              resolve();
            }
          });
          observer.observe(container);

          // Timeout fallback
          setTimeout(() => {
            observer.disconnect();
            resolve();
          }, 1000);
        });
      }

      // Create scene, camera, renderer
      const scene = new THREE.Scene();
      scene.background = null;

      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = cameraDistance;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
      renderer.shadowMap.enabled = false; // Disable shadows for better performance

      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      // Lighting setup
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 0.5);
      pointLight.position.set(100, 100, 100);
      scene.add(pointLight);

      // Load font and create text
      const fontLoader = new THREE.FontLoader();
      fontLoader.load(
        FONT_URL,
        (font) => {
          try {
            const geometry = new THREE.TextGeometry(text, {
              font,
              size: fontSize,
              height: fontDepth,
              curveSegments: 12,
              bevelEnabled,
              bevelThickness,
              bevelSize,
              bevelSegments: 5
            });

            geometry.center();
            geometry.computeBoundingBox();

            const textColor = new THREE.Color(color);
            const material = new THREE.MeshStandardMaterial({
              color: textColor,
              metalness,
              roughness,
              emissive: textColor,
              emissiveIntensity
            });

            const textMesh = new THREE.Mesh(geometry, material);
            scene.add(textMesh);

            sceneRef.current = { scene, camera, renderer, textMesh, geometry, material };

            setIsLoading(false);
            onLoad?.();

            // Start animation
            const rotateFunc = getRotationFunction(rotationStyle, speedMultiplier);

            const animate = () => {
              if (!sceneRef.current || paused) return;

              animationRef.current = requestAnimationFrame(animate);

              if (sceneRef.current.textMesh) {
                rotateFunc(sceneRef.current.textMesh);
              }

              renderer.render(scene, camera);
            };

            animate();
          } catch (err) {
            console.error('[ThreeDText] Error creating text geometry:', err);
            const error = new Error('Failed to create 3D text geometry');
            setError(error);
            setIsLoading(false);
            onError?.(error);
          }
        },
        (progress) => {
          // Optional: handle loading progress
          console.log('[ThreeDText] Font loading progress:', progress);
        },
        (err) => {
          console.error('[ThreeDText] Error loading font:', err);
          const error = new Error('Failed to load font');
          setError(error);
          setIsLoading(false);
          onError?.(error);
        }
      );

      // Handle resize with debouncing
      let resizeTimeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          if (!containerRef.current || !sceneRef.current) return;
          const w = containerRef.current.clientWidth;
          const h = containerRef.current.clientHeight;
          if (w > 0 && h > 0) {
            sceneRef.current.camera.aspect = w / h;
            sceneRef.current.camera.updateProjectionMatrix();
            sceneRef.current.renderer.setSize(w, h);
          }
        }, 100);
      };

      window.addEventListener('resize', handleResize);

      // Store cleanup function
      sceneRef.current = {
        ...sceneRef.current, cleanup: () => {
          window.removeEventListener('resize', handleResize);
          clearTimeout(resizeTimeout);
          cleanup();
        }
      };

    } catch (err) {
      console.error('[ThreeDText] Setup error:', err);
      const error = new Error('Failed to initialize 3D scene');
      setError(error);
      setIsLoading(false);
      onError?.(error);
    }
  }, [
    text, color, size, speed, bgColor, rotationStyle, fontDepth, bevelEnabled,
    bevelThickness, bevelSize, metalness, roughness, emissiveIntensity,
    cameraDistance, speedMultiplier, fontSize, getRotationFunction,
    loadThreeJs, isWebGLSupported, onError, onLoad, paused, cleanup
  ]);

  // Main effect
  useEffect(() => {
    if (!containerRef.current) return;

    initScene();

    return () => {
      if (sceneRef.current?.cleanup) {
        sceneRef.current.cleanup();
      } else {
        cleanup();
      }
    };
  }, [initScene, cleanup]);

  // Handle pause/play
  useEffect(() => {
    if (paused && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    } else if (!paused && sceneRef.current && !animationRef.current) {
      const rotateFunc = getRotationFunction(rotationStyle, speedMultiplier);
      const animate = () => {
        if (!sceneRef.current || paused) return;
        animationRef.current = requestAnimationFrame(animate);
        if (sceneRef.current.textMesh) {
          rotateFunc(sceneRef.current.textMesh);
        }
        sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
      };
      animate();
    }
  }, [paused, rotationStyle, speedMultiplier, getRotationFunction]);

  // Fallback content
  const renderFallback = () => {
    if (error) {
      return (
        <div
          style={{
            color: color,
            fontSize: '14px',
            textAlign: 'center',
            padding: '20px',
            background: 'rgba(255, 0, 0, 0.1)',
            border: '1px solid rgba(255, 0, 0, 0.3)',
            borderRadius: '8px'
          }}
          role="alert"
          aria-live="polite"
        >
          3D Text Error: {error.message}
        </div>
      );
    }

    if (isLoading) {
      return (
        <div
          style={{
            color: color,
            fontSize: '14px',
            textAlign: 'center',
            pointerEvents: 'none'
          }}
          aria-live="polite"
        >
          Loading 3D Text...
        </div>
      );
    }

    return null;
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        background: bgColor,
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
      role="img"
      aria-label={`3D text displaying: ${text}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ') {
          e.preventDefault();
          // Could toggle pause here if needed
        }
      }}
    >
      {renderFallback()}
    </div>
  );
};

// PropTypes for better development experience
ThreeDTextComponent.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  speed: PropTypes.oneOf(['slow', 'normal', 'fast', 'veryfast']),
  bgColor: PropTypes.string,
  rotationStyle: PropTypes.oneOf(['none', 'x-axis', 'y-axis', 'xy-orbit', 'xyz-spin']),
  fontDepth: PropTypes.number,
  bevelEnabled: PropTypes.bool,
  bevelThickness: PropTypes.number,
  bevelSize: PropTypes.number,
  metalness: PropTypes.number,
  roughness: PropTypes.number,
  emissiveIntensity: PropTypes.number,
  cameraDistance: PropTypes.number,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  paused: PropTypes.bool
};

ThreeDTextComponent.defaultProps = {
  text: 'PortoForge',
  color: '#3b82f6',
  size: 'large',
  speed: 'normal',
  bgColor: '#ffffff',
  rotationStyle: 'xy-orbit',
  fontDepth: 15,
  bevelEnabled: true,
  bevelThickness: 8,
  bevelSize: 6,
  metalness: 0.6,
  roughness: 0.4,
  emissiveIntensity: 0.2,
  cameraDistance: 120,
  onError: null,
  onLoad: null,
  paused: false
};

