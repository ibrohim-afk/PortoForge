/**
 * 3D Text Rendering Utility
 * Menggunakan Three.js untuk render teks 3D yang berputar
 */

export const generateThreeDTextScript = (props) => {
  const {
    text3D = 'PortoForge',
    text3DColor = '#3b82f6',
    text3DSize = 'large'
  } = props;

  const fontSizeMap = {
    small: 20,
    medium: 40,
    large: 60
  };

  const fontSize = fontSizeMap[text3DSize] || 40;

  return `
    <script>
      (function() {
        const container = document.getElementById('threeDText');
        if (!container) return;

        // Import Three.js if not already loaded
        if (typeof THREE === 'undefined') {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
          script.onload = initThreeDText;
          document.head.appendChild(script);
        } else {
          initThreeDText();
        }

        function initThreeDText() {
          const width = container.clientWidth;
          const height = container.clientHeight;
          
          // Scene setup
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
          const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
          
          renderer.setSize(width, height);
          renderer.setClearColor(0x000000, 0);
          container.appendChild(renderer.domElement);

          camera.position.z = 150;

          // Lighting
          const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
          scene.add(ambientLight);

          const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
          directionalLight.position.set(100, 100, 100);
          scene.add(directionalLight);

          // Create text geometry
          const loader = new THREE.FontLoader();
          const fontUrl = 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json';

          loader.load(fontUrl, (font) => {
            const geometry = new THREE.TextGeometry('${text3D}', {
              font: font,
              size: ${fontSize},
              height: 20,
              curveSegments: 12,
              bevelEnabled: true,
              bevelThickness: 10,
              bevelSize: 8,
              bevelSegments: 5
            });

            geometry.center();

            // Create material with custom color
            const color = new THREE.Color('${text3DColor}');
            const material = new THREE.MeshStandardMaterial({
              color: color,
              metalness: 0.7,
              roughness: 0.3,
              emissive: color,
              emissiveIntensity: 0.3
            });

            const textMesh = new THREE.Mesh(geometry, material);
            scene.add(textMesh);

            // Animation loop
            const animate = () => {
              requestAnimationFrame(animate);
              
              // Rotate text
              textMesh.rotation.x += 0.005;
              textMesh.rotation.y += 0.01;
              textMesh.rotation.z += 0.003;

              renderer.render(scene, camera);
            };

            animate();

            // Handle window resize
            const onWindowResize = () => {
              const newWidth = container.clientWidth;
              const newHeight = container.clientHeight;
              camera.aspect = newWidth / newHeight;
              camera.updateProjectionMatrix();
              renderer.setSize(newWidth, newHeight);
            };

            window.addEventListener('resize', onWindowResize);
          });
        }
      })();
    </script>
  `;
};

/**
 * Create HTML container for 3D text
 */
export const createThreeDTextContainer = () => {
  return `
    <div id="threeDText" style="
      width: 100%;
      height: 300px;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      border-radius: 12px;
      overflow: hidden;
      margin: 20px 0;
      box-shadow: 0 8px 32px rgba(59, 130, 246, 0.2);
      border: 1px solid rgba(59, 130, 246, 0.3);
    "></div>
  `;
};
