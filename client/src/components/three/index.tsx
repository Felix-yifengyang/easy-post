import { useRef, useEffect } from 'react';
import { useReactive } from 'ahooks';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import tooltipStyles from '../../styles/components/three/tooltip.module.css';
import thinkingStyles from '../../styles/components/three/thinking.module.css';

export function Model() {
    const state = useReactive({
      isThinking: false
    });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const canvas = renderer.domElement;
    const controls = new OrbitControls(camera, canvas);
    renderer.setSize(400, window.innerHeight);
    container.appendChild(canvas);

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(400, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none';
    container.appendChild(labelRenderer.domElement);

new GLTFLoader().load('/src/assets/models/flowertest.glb', (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        // 添加点击事件
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.userData.clickable = true;
          }
        });

        // 点击交互
        canvas.addEventListener('click', (event) => {
          const mouse = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
          );
          
          const raycaster = new THREE.Raycaster();
          raycaster.setFromCamera(mouse, camera);
          
          const intersects = raycaster.intersectObject(model, true);
          if (intersects.length > 0) {
            // 点击反馈效果
            intersects[0].object.scale.set(1.1, 1.1, 1.1);
            setTimeout(() => {
              intersects[0].object.scale.set(1.0, 1.0, 1.0);
            }, 200);
            
            // 触发思考状态
            state.isThinking = true;
            setTimeout(() => {
              state.isThinking = false;
            }, 3000);
            
            // 显示提示
            const tooltip = document.createElement('div');
            tooltip.className = tooltipStyles['model-tooltip'];
            tooltip.textContent = '点击了我!';
            tooltip.style.position = 'absolute';
            tooltip.style.left = `${event.clientX}px`;
            tooltip.style.top = `${event.clientY}px`;
            document.body.appendChild(tooltip);
            setTimeout(() => tooltip.remove(), 1000);
          }
        });
        
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

  return (
    <div ref={containerRef}>
      {state.isThinking && (
        <div className={thinkingStyles['model-thinking']}>
          <div className={thinkingStyles['thinking-bubble']}>思考中...</div>
        </div>
      )}
    </div>
  );
}
