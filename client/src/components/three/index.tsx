import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

export function Model() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const canvas = renderer.domElement;
    const controls = new OrbitControls(camera, canvas);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(canvas);

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none';
    container.appendChild(labelRenderer.domElement);

    new GLTFLoader().load('models/flowertest.glb', (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        
        // 创建标签
        const labelDiv = document.createElement('div');
        labelDiv.className = 'model-label';
        labelDiv.textContent = 'flower';
        labelDiv.style.color = '#ff00fbff';
        labelDiv.style.fontSize = '20px';
        labelDiv.style.fontWeight = 'bold';
        labelDiv.style.pointerEvents = 'none';
        
        const label = new CSS2DObject(labelDiv);
        model.add(label);
        
        // 自动调整相机位置
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        camera.position.copy(center);
        camera.position.x += size.length();
        camera.position.y += size.length();
        camera.position.z += size.length();
        // label的位置
        label.position.copy(center);
        
        controls.target.copy(center);
        controls.update();
      },
      undefined,
      (error) => console.error('加载模型失败:', error)
    );

    const animate = () => {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
          labelRenderer.render(scene, camera);
        };
        animate();

    return () => {
      controls.dispose();
      container?.removeChild(canvas);
      container?.removeChild(labelRenderer.domElement);
    };
  }, []);

  return <div ref={containerRef} />;
}
