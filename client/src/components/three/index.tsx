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
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const canvas = renderer.domElement;
    const controls = new OrbitControls(camera, canvas);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(canvas);

    // 设置相机初始位置
    camera.position.set(0, 0, 10);
    controls.update();

    // 加载bee模型作为实例化模型
    const beeInstances = 100;
    const beeMesh = new THREE.InstancedMesh(
      new THREE.BufferGeometry(),
      new THREE.MeshBasicMaterial(),
      beeInstances
    );

    // 加载flower模型作为实例化模型
    const flowerInstances = 100;
    const flowerMesh = new THREE.InstancedMesh(
      new THREE.BufferGeometry(),
      new THREE.MeshBasicMaterial(),
      flowerInstances
    );

    // 并行加载模型
    Promise.all([
      new Promise((resolve) => {
        new GLTFLoader().load('models/bee.glb', (gltf) => {
          try {
            const meshes: THREE.Mesh[] = [];
            console.log(gltf.scene);
            gltf.scene.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                if (mesh.geometry && mesh.material) {
                  meshes.push(mesh);
                }
              }
            });

            if (meshes.length === 0) {
              console.error('No valid bee mesh found', gltf);
              return resolve(null);
            }

            const firstMesh = meshes[0];
            beeMesh.geometry = firstMesh.geometry;
            beeMesh.material = new THREE.MeshBasicMaterial({
              color: (firstMesh.material as THREE.MeshStandardMaterial).color
            });

            const matrix = new THREE.Matrix4();
            for(let i = 0; i < beeInstances; i++) {
              const pos = new THREE.Vector3(
                THREE.MathUtils.randFloatSpread(10),
                THREE.MathUtils.randFloatSpread(10),
                THREE.MathUtils.randFloatSpread(10)
              );
              matrix.compose(
                pos,
                new THREE.Quaternion(),
                new THREE.Vector3(0.02, 0.02, 0.02)
              );
              beeMesh.setMatrixAt(i, matrix);
            }
            scene.add(beeMesh);
            resolve(null);
          } catch (error) {
            console.error('Failed to load bee model:', error);
            resolve(null);
          }
        });
      }),
      
      new Promise((resolve) => {
        new GLTFLoader().load('models/flowertest.glb', (gltf) => {
          try {
            console.log(gltf.scene);
            const meshes: THREE.Mesh[] = [];
            gltf.scene.traverse((child) => {
              if ((child as THREE.Object3D).isObject3D) {
                const mesh = child as THREE.Mesh;
                if (mesh.geometry && mesh.material) {
                  meshes.push(mesh);
                }
              }
            });

            if (meshes.length === 0) {
              console.error('No valid flower mesh found', gltf);
              return resolve(null);
            }

            const firstMesh = meshes[0];
            flowerMesh.geometry = firstMesh.geometry;
            flowerMesh.material = new THREE.MeshBasicMaterial({
              color: (firstMesh.material as THREE.MeshStandardMaterial).color
            });

            const matrix = new THREE.Matrix4();
            for(let i = 0; i < flowerInstances; i++) {
              const pos = new THREE.Vector3(
                THREE.MathUtils.randFloatSpread(10),
                THREE.MathUtils.randFloatSpread(10),
                THREE.MathUtils.randFloatSpread(10)
              );
              matrix.compose(
                pos,
                new THREE.Quaternion(),
                new THREE.Vector3(5, 5, 5)
              );
              flowerMesh.setMatrixAt(i, matrix);
            }
            scene.add(flowerMesh);
            resolve(null);
          } catch (error) {
            console.error('Failed to load flower model:', error);
            resolve(null);
          }
        });
      })
    ]);

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
