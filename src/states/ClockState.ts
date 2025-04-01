import { State } from "rattler";
import * as THREE from "three";
import backgroundImage from "url:../assets/background.png";
import clockFaceFragmentShader from "../shaders/clock-face.glsl";

export default class ClockState extends State {
  scene: THREE.Scene = new THREE.Scene();
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  uniforms!: { [key: string]: THREE.IUniform };
  clock: THREE.Clock = new THREE.Clock();
  clockFace!: THREE.Mesh;
  hourHand!: THREE.Mesh;
  minuteHand!: THREE.Mesh;
  secondHand!: THREE.Mesh;

  onInit() {
    this.scene.background = new THREE.TextureLoader().load(backgroundImage);
    this.camera = new THREE.PerspectiveCamera(
      75, // Field of view
      this.canvas.width / this.canvas.height, // Aspect ratio
      0.1, // Near clipping plane
      1000, // Far clipping plane
    );
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.engine.canvas,
      antialias: true,
    });
    this.uniforms = {
      uTime: new THREE.Uniform({
        type: "f",
        value: 0,
      }),
      uResolution: new THREE.Uniform({
        value: new THREE.Vector2(
          this.renderer.domElement.width,
          this.renderer.domElement.height,
        ),
      }),
    };

    // Draw clock border
    const geometry = new THREE.CircleGeometry(3, 64);
    const material = new THREE.ShaderMaterial({
      fragmentShader: clockFaceFragmentShader,
      uniforms: this.uniforms,
    });
    const circle = new THREE.Mesh(geometry, material);
    circle.position.set(0, 0, 0);
    this.scene.add(circle);
    this.clockFace = circle;

    // Draw clock hands
    const hourGeometry = new THREE.BoxGeometry(0.1, 1.5, 0.1);
    hourGeometry.translate(0, 0.75, 0);
    const hourMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const hourHand = new THREE.Mesh(hourGeometry, hourMaterial);
    hourHand.position.set(0, 0, 0);
    hourHand.rotation.z = 0;
    this.scene.add(hourHand);
    this.hourHand = hourHand;

    const minuteGeometry = new THREE.BoxGeometry(0.05, 2, 0.05);
    minuteGeometry.translate(0, 1, 0);
    const minuteMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const minuteHand = new THREE.Mesh(minuteGeometry, minuteMaterial);
    minuteHand.position.set(0, 0, 0);
    minuteHand.rotation.z = 0;
    this.scene.add(minuteHand);
    this.minuteHand = minuteHand;

    const secondGeometry = new THREE.BoxGeometry(0.02, 2.5, 0.02);
    secondGeometry.translate(0, 1.25, 0);
    const secondMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const secondHand = new THREE.Mesh(secondGeometry, secondMaterial);
    secondHand.position.set(0, 0, 0);
    secondHand.rotation.z = 0;
    this.scene.add(secondHand);
    this.secondHand = secondHand;

    // Make background blue
    this.renderer.setClearColor(0x002233); // Set the clear color to black
    this.renderer.setSize(this.canvas.width, this.canvas.height); // Set the size of the renderer
    this.renderer.setPixelRatio(window.devicePixelRatio); // Set pixel ratio for better quality on high DPI screens
    this.camera.position.z = 5; // Set camera position
    this.camera.position.y = 0; // Set camera y position
    this.camera.position.x = 0; // Set camera x position
    this.camera.lookAt(new THREE.Vector3(0, 0, 0)); // Make the camera look at the origin (0, 0, 0)
  }

  onUpdate(deltaTime: number) {
    const date = new Date();

    this.uniforms.uTime.value = this.clock.getElapsedTime();
    this.uniforms.uResolution.value = new THREE.Vector2(
      this.renderer.domElement.width,
      this.renderer.domElement.height,
    );

    this.hourHand.rotation.z =
      -((date.getHours() % 12) + date.getMinutes() / 60) * (Math.PI / 6);
    this.minuteHand.rotation.z = -(
      (date.getMinutes() + date.getSeconds() / 60) *
      (Math.PI / 30)
    );
    this.secondHand.rotation.z =
      -(date.getSeconds() + date.getMilliseconds() / 1000) * (Math.PI / 30);

    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 5;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  onRender(canvas: HTMLCanvasElement) {
    this.renderer.setSize(this.canvas.width, this.canvas.height);
    this.renderer.setPixelRatio(window.devicePixelRatio); // Set pixel ratio for better quality on high DPI screens
    this.renderer.render(this.scene, this.camera);

    // Copy the rendered image from the WebGL renderer to the main canvas
    canvas.getContext("2d")?.drawImage(this.canvas, 0, 0);
  }
}
