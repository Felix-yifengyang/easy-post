import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function Model() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // 初始化场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const canvas = renderer.domElement;
    const controls = new OrbitControls(camera, canvas);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(canvas);

    // 设置相机初始位置
    camera.position.set(0, 0, 30);
    controls.update();
    
    // 主方向光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight.position.set(5, 10, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // 创建FBX加载器并加载teapot模型
    const fbxLoader = new FBXLoader();
    const mixers: THREE.AnimationMixer[] = [];
    
    fbxLoader.load('models/teapot.FBX', (teapot) => {
      teapot.scale.setScalar(0.1);
      teapot.position.set(0, 0, 0);
      scene.add(teapot);
      
      // 播放动画
      if (teapot.animations.length > 0) {
        const mixer = new THREE.AnimationMixer(teapot);
        const action = mixer.clipAction(teapot.animations[0]);
        action.play();
        mixers.push(mixer);
      }
    }, undefined, (error) => {
      console.error('Failed to load teapot model:', error);
    });
    
    // 动画循环
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      
      // 更新动画
      const delta = clock.getDelta();
      mixers.forEach(mixer => mixer.update(delta));
      
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 窗口大小调整
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      controls.dispose();
      window.removeEventListener('resize', handleResize);
      container?.removeChild(canvas);
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
}
