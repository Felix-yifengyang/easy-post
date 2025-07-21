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

    // 创建FBX加载器
    const fbxLoader = new FBXLoader();

    // 加载所有模型
    const modelPaths = [
      'models/skeleton/CyberFish/CyberFishAnim.FBX',
      'models/skeleton/CyberFly/CyberFlyAnim.FBX',
      'models/skeleton/Robot01/Robot01Anim.FBX',
      'models/skeleton/Robot02/Robot02_Anim.FBX',
      'models/skeleton/Robot03/Robot3Anim.FBX',
      'models/skeleton/SiverAnt/SilverAnt01.FBX'
    ];

    const modelScales = [0.1, 0.1, 0.03, 0.03, 0.05, 0.01];
    const modelPositions = [
      new THREE.Vector3(-75, 5, -5),
      new THREE.Vector3(75, 5, -5),
      new THREE.Vector3(-100, -50, 5),
      new THREE.Vector3(100, -5, 5),
      new THREE.Vector3(-100, 10, 0),
      new THREE.Vector3(35, -10, 0)
    ];

    modelPaths.forEach((path, index) => {
      fbxLoader.load(path, (fbx) => {
        fbx.scale.setScalar(modelScales[index]);
        fbx.position.copy(modelPositions[index]);
        scene.add(fbx);
        
        // 播放动画
        if (fbx.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(fbx);
          const action = mixer.clipAction(fbx.animations[0]);
          action.play();
          
          // 存储mixer用于动画更新
          mixers.push(mixer);
        }
      }, undefined, (error) => {
        console.error(`Failed to load model ${path}:`, error);
      });
    });

    // 存储动画mixers
    const mixers: THREE.AnimationMixer[] = [];
    
    // 动画循环
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      
      // 更新所有动画
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
