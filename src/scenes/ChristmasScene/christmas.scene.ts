import { Camera, Mesh, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import PlaneOneMesh from "./mesh/plane-one.mesh";

class ChristmasScene {
  private scene: Scene;
  private camera: Camera;
  private renderer: WebGLRenderer;
  private plane: Mesh;
  private octaOne: Mesh;
  private controls: OrbitControls;

  constructor() {
    this.scene = new Scene();
    this.setupCamera();
    this.setupRenderer();
    this.setupMesh();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.addEventListener('change', () => { this.renderer.render(this.scene, this.camera); });
  }

  public animate(): void {
    this.renderer.render(this.scene, this.camera);
  }

  private generateCamera(): Camera {
    const fov: number = 60;
    const aspect: number = window.innerWidth / window.innerHeight;
    const near: number = 0.1;
    const far: number = 1000;
    return new PerspectiveCamera(fov, aspect, near, far);
  }

  private setupCamera(): void {
    this.camera = this.generateCamera();
    this.camera.position.set(5, 5, 0);
    this.camera.lookAt(new Vector3(0, 0, 0));
  }

  private setupRenderer(): void {
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xfff6e6);
    document.body.appendChild(this.renderer.domElement);
  }

  private setupMesh(): void {
    this.plane = new PlaneOneMesh().get();
    this.scene.add(this.plane);
  }
}

export default ChristmasScene;
