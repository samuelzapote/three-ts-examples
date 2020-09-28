import { AmbientLight, Camera, Mesh, PCFSoftShadowMap, PerspectiveCamera, PointLight, Scene, Vector3, WebGLRenderer } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Decoration from "./decoration.group";
import OctaOneMesh from "./mesh/octa-one.mesh";
import PlaneOneMesh from "./mesh/plane-one.mesh";

class ChristmasScene {
  private scene: Scene;
  private camera: Camera;
  private renderer: WebGLRenderer;

  private groundMesh: Mesh;
  // private octaOneMesh: OctaOneMesh;
  // private octaTwoMesh: OctaOneMesh;

  private decorations: Decoration[] = [];

  private ambienLight: AmbientLight;
  private pointLight: PointLight;

  private controls: OrbitControls;

  constructor() {
    this.scene = new Scene();
    this.setupCamera();
    this.setupRenderer();
    this.setupMesh();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target = new Vector3(0, 15, 0);
    this.controls.maxPolarAngle = Math.PI / 2;
    // this.controls.addEventListener('change', () => { this.renderer.render(this.scene, this.camera); });
    this.setupLighting();
  }

  public render(): void {
    this.controls.update();
    for(var d = 0; d < this.decorations.length; d++) {
      this.decorations[d].updatePosition();
    }
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
    this.camera.position.set(5, 30, 50);
    this.camera.lookAt(new Vector3(0, 15, 0));
  }

  private setupRenderer(): void {
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xfff6e6);
    
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;

    document.body.appendChild(this.renderer.domElement);
  }

  private setupMesh(): void {
    this.groundMesh = new PlaneOneMesh().get();
    this.scene.add(this.groundMesh);

    // this.octaOneMesh = new OctaOneMesh(6, 0xff0051);
    // this.octaOneMesh.offsetPositionY(6);
    // this.octaOneMesh.rotatePositionZ(Math.PI / 3);
    // this.scene.add(this.octaOneMesh.get());

    // this.octaTwoMesh = new OctaOneMesh(3, 0x47689b);
    // this.octaTwoMesh.offsetPositionX(9);
    // this.octaTwoMesh.offsetPositionY(3);
    // this.octaTwoMesh.rotatePositionZ(Math.PI / 5);
    // this.scene.add(this.octaTwoMesh.get());

    const decorationOne = new Decoration();
    decorationOne.position.y += 10;
    this.scene.add(decorationOne);
    this.decorations.push(decorationOne);

    const decorationTwo = new Decoration();
    decorationTwo.position.set(20, 15, -10);
    decorationTwo.scale.set(.8, .8, .8);
    this.scene.add(decorationTwo);
    this.decorations.push(decorationTwo);

    const decorationThree = new Decoration();
    decorationThree.position.set(-20, 20, -12);
    this.scene.add(decorationThree);
    this.decorations.push(decorationThree);
  }

  private setupLighting(): void {
    this.ambienLight = new AmbientLight(0xffffff, 0.2);
    this.scene.add(this.ambienLight);

    this.pointLight = new PointLight(0xffffff, 1);
    this.pointLight.position.set(25, 50, 25);
    this.pointLight.castShadow = true;
    this.pointLight.shadow.mapSize.width = 1024;
    this.pointLight.shadow.mapSize.height = 1024;
    this.scene.add(this.pointLight);
  }
}

export default ChristmasScene;
