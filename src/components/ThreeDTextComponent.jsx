import React, { useEffect, useRef } from 'react';
import { generateThreeDTextScript, createThreeDTextContainer } from '../utils/threeDText';

/**
 * React Component for 3D Text Rendering
 * Props:
 * - text: string - The text to display
 * - color: string - Hex color for the text
 * - size: 'small' | 'medium' | 'large' - Size of the text
 * - speed: 'slow' | 'normal' | 'fast' | 'veryfast' - Rotation speed
 * - bgColor: string - Background color for the container
 * - rotationStyle: 'none' | 'x-axis' | 'y-axis' | 'xy-orbit' | 'xyz-spin' - Rotation style
 */
const ThreeDTextComponent = ({
  text = 'PortoForge',
  color = '#3b82f6',
  size = 'large',
  speed = 'normal',
  bgColor = '#f3f4f6',
  rotationStyle = 'xy-orbit'
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing content
    containerRef.current.innerHTML = '';

    // Create the container HTML
    const containerHTML = createThreeDTextContainer();
    containerRef.current.innerHTML = containerHTML;

    // Generate and inject the script
    const scriptHTML = generateThreeDTextScript({
      text3D: text,
      text3DColor: color,
      text3DSize: size,
      text3DSpeed: speed,
      text3DBackgroundColor: bgColor,
      text3DRotationStyle: rotationStyle
    });

    // Inject the script
    const scriptElement = document.createElement('div');
    scriptElement.innerHTML = scriptHTML;
    const script = scriptElement.querySelector('script');
    if (script) {
      document.body.appendChild(script);
    }

    // Cleanup function
    return () => {
      // Remove the script when component unmounts or props change
      const existingScript = document.querySelector('script[src*="three.min.js"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, [text, color, size, speed, bgColor, rotationStyle]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '300px',
        backgroundColor: bgColor,
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(59, 130, 246, 0.2)',
        border: '1px solid rgba(59, 130, 246, 0.3)'
      }}
    />
  );
};

export default ThreeDTextComponent;
