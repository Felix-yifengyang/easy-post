import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function Model() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const canvas = renderer.domElement;
    const controls = new OrbitControls(camera, canvas);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(canvas);

    // Create instanced mesh
    const count = 300;
    const dummy = new THREE.Object3D();
    let instancedMesh: THREE.InstancedMesh | null = null;
    let flowerGeometry: THREE.BufferGeometry | null = null;
    let flowerMaterial: THREE.Material | null = null;

    new GLTFLoader().load('/models/flowertest.glb', (gltf) => {
      const firstMesh = gltf.scene.children[1] as THREE.Mesh;
      flowerGeometry = firstMesh.geometry;
      flowerMaterial = Array.isArray(firstMesh.material) 
        ? firstMesh.material[0] 
        : firstMesh.material;

      if (!flowerGeometry || !flowerMaterial) return;

      // Create instanced mesh
      instancedMesh = new THREE.InstancedMesh(flowerGeometry, flowerMaterial, count);
      instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      scene.add(instancedMesh);

      // Position instances in a grid
      const gridSize = Math.ceil(Math.sqrt(count));
      const spacing = 0.1;
      let index = 0;
      
      for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
          if (index >= count) break;
          
          dummy.position.set(
            (x - gridSize/2) * spacing,
            (y - gridSize/2) * spacing,
            0
          );
          dummy.updateMatrix();
          instancedMesh.setMatrixAt(index, dummy.matrix);
          index++;
        }
      }
      instancedMesh.instanceMatrix.needsUpdate = true;

      // Adjust camera position
      const box = new THREE.Box3().setFromObject(instancedMesh);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      const maxDim = Math.max(size.x, size.y, size.z);
      const cameraDistance = maxDim * 0.8;
      
      camera.position.set(
        center.x + cameraDistance * 0.5,
        center.y + cameraDistance * 0.3,
        center.z + cameraDistance * 0.5
      );
      
      controls.target.copy(center);
      controls.update();
      camera.near = 0.1;
      camera.far = cameraDistance * 10;
      camera.updateProjectionMatrix();
    },
    undefined,
    (error) => {
      console.error('Failed to load model:', error);
    }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      controls.dispose();
      container?.removeChild(canvas);
    };
  }, []);

  return <div ref={containerRef} />;
}
