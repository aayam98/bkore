import { mediaUrl } from '@utils/baseUrls';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { loadGLTFModel } from './Model';
import { BodyModel, Container } from './style';

type ThreeDProps = {
  file3d: string;
};

export default function ThreeD({ file3d }: ThreeDProps) {
  const refBody = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [renderer, setRenderer] = useState<any>();
  const [_camera, setCamera] = useState<any>();
  const [target] = useState(new THREE.Vector3(-0.5, 1.2, 0));
  const [initialCameraPosition] = useState(
    new THREE.Vector3(
      120 * Math.sin(0.3 * Math.PI),
      10,
      120 * Math.cos(0.5 * Math.PI)
    )
  );
  const [scene] = useState(new THREE.Scene());
  const [_controls, setControls] = useState<any>();

  const handleWindowResize = useCallback(() => {
    const { current: container } = refBody;
    if (container && renderer) {
      const scW = 800;
      const scH = 800;

      renderer.setSize(scW, scH);
    }
  }, [renderer]);

  const easeOutCirc = (x: number) => {
    return Math.sqrt(1 - Math.pow(x - 1, 4));
  };

  useEffect(() => {
    const { current: container } = refBody;
    if (container && !renderer) {
      const scW = 800;
      const scH = 800;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(scW, scH);
      renderer.outputEncoding = THREE.sRGBEncoding;
      container.appendChild(renderer.domElement);
      setRenderer(renderer);

      const camera = new THREE.PerspectiveCamera(45, 800 / 800, 1, 1000);
      camera.position.copy(initialCameraPosition);
      camera.lookAt(target);
      setCamera(camera);

      // const ambientLight = new THREE.AmbientLight(0xffffff, 100);
      // ambientLight.position.set(0,5,0)
      const directionLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
      const spotlight = new THREE.SpotLight(0xffffff, 3);
      spotlight.position.set(0, 10, 0);
      const pointLight1 = new THREE.PointLight(0xffffff, 1, 100);
      const pointLight2 = new THREE.PointLight(0xffffff, 1, 100);
      const pointLight3 = new THREE.PointLight(0xffffff, 1, 100);
      const pointLight4 = new THREE.PointLight(0xffffff, 1, 100);
      const pointLight5 = new THREE.PointLight(0xffffff, 1, 100);
      const pointLight6 = new THREE.PointLight(0xffffff, 1, 100);
      const pointLight7 = new THREE.PointLight(0xffffff, 1, 100);
      pointLight1.position.set(0, 0, 0);
      pointLight2.position.set(0, 30, 0);
      pointLight3.position.set(0, -30, 0);
      pointLight4.position.set(50, 0, 0);
      pointLight5.position.set(0, 0, 50);
      pointLight6.position.set(-50, 0, 0);
      pointLight7.position.set(0, 0, -50);
      scene.add(pointLight1);
      scene.add(pointLight2);
      scene.add(pointLight3);
      scene.add(pointLight4);
      scene.add(pointLight5);
      scene.add(pointLight6);
      scene.add(pointLight7);

      scene.add(directionLight1);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.target = target;
      setControls(controls);

      loadGLTFModel(scene, mediaUrl + file3d, {
        receiveShadow: true,
        castShadow: false,
      }).then(() => {
        animate();
        setLoading(false);
      });

      let req: any = null;
      let frame = 0;
      const animate = () => {
        req = requestAnimationFrame(animate);

        frame = frame <= 100 ? frame + 1 : frame;

        if (frame <= 100) {
          // const p = initialCameraPosition;
          // const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20;
          // camera.position.y = 10;
          // camera.position.x =
          //   p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed);
          // camera.position.z =
          //   p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed);
          // camera.lookAt(target);
        } else {
          controls.update();
        }

        renderer.render(scene, camera);
      };

      return () => {
        cancelAnimationFrame(req);
        renderer.dispose();
      };
    }
  }, [initialCameraPosition, renderer, scene, target]);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false);
    return () => {
      window.removeEventListener('resize', handleWindowResize, false);
    };
  }, [renderer, handleWindowResize]);

  return (
    <Container className="justify-center w-full pt-2 flex flex-wrap">
      <BodyModel className="justify-center flex flex-wrap w-full" ref={refBody}>
        {loading && (
          <p
            id={'loading_id'}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 9999,
            }}
          ></p>
        )}
      </BodyModel>
    </Container>
  );
}
