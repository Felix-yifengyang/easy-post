import { useRef, useEffect } from 'react';
import { Card } from 'antd';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

export function Model() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !cardRef.current) return;
    
    const scene = new THREE.Scene();
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create WebGL renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Create wrapper div for both renderers
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    container.appendChild(wrapper);
    
    // Add WebGL renderer
    wrapper.appendChild(renderer.domElement);
    
    // Create CSS3D renderer
    const cssRenderer = new CSS3DRenderer();
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = '0';
    cssRenderer.domElement.style.pointerEvents = 'none'; // Allow events to pass through
    wrapper.appendChild(cssRenderer.domElement);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const controls = new OrbitControls(camera, wrapper);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    // Create 3D card
    
    const cardObject = new CSS3DObject(cardRef.current);
    cardObject.position.set(0, 20, 0);
    cardObject.scale.set(0.1, 0.1, 0.1); // Make card smaller in 3D space
    scene.add(cardObject);

    let connectingLine: THREE.Line | null = null;
    let gltfScene: THREE.Group | null = null;

    const animate = () => {
      requestAnimationFrame(animate);
      
      if (gltfScene && connectingLine) {
        const newModelCenter = new THREE.Box3().setFromObject(gltfScene)
          .getCenter(new THREE.Vector3());
        const lineGeometry = connectingLine.geometry;
        lineGeometry.setFromPoints([
          newModelCenter,
          cardObject.position
        ]);
        lineGeometry.attributes.position.needsUpdate = true;
      }
      
      controls.update();
      renderer.render(scene, camera);
      cssRenderer.render(scene, camera);
    };

    new GLTFLoader().load('/models/container.glb', (gltf) => {
      gltfScene = gltf.scene;
      scene.add(gltfScene);
      
      // Get model position
      const modelBox = new THREE.Box3().setFromObject(gltf.scene);
      const modelCenter = modelBox.getCenter(new THREE.Vector3());
      
      // Create connecting line
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        modelCenter,
        cardObject.position.clone()
      ]);
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0xffffff,
        linewidth: 2,
        transparent: true,
        opacity: 0.7
      });
      connectingLine = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(connectingLine);
      
      // Adjust camera to fit all objects
      const box = new THREE.Box3().setFromObject(gltf.scene);
      box.expandByObject(cardObject);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      const maxDim = Math.max(size.x, size.y, size.z);
      const cameraDistance = maxDim * 1.5;
      
      camera.position.set(
        center.x + cameraDistance * 0.5,
        center.y + cameraDistance * 0.3,
        center.z + cameraDistance * 0.5
      );
      
      controls.target.copy(center);
      controls.update();
    });

    animate();

    return () => {
      controls.dispose();
      container?.removeChild(wrapper);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />
      <div ref={cardRef} style={{ display: 'none' }}>
        <Card 
          title="3D Card" 
          style={{ width: 200 }} // Smaller base size
        >
          <p>This card is rendered in 3D space</p>
        </Card>
      </div>
    </>
  );
}
