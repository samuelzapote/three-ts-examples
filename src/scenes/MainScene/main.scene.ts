import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from "three";

import FirstPersonControls from '../../common/controls/first-person.controls';
import CubeMesh from "./mesh/cube.mesh";

class MainScene {
	private scene: Scene;
	private camera: PerspectiveCamera;
	private renderer: WebGLRenderer;
	private cubeMesh: CubeMesh;
	private cubeMeshRotateRadians: number = 0.01;
	private firstPersonControls: FirstPersonControls;
	private clock: Clock;
	
	constructor() {
		this.scene = new Scene();
		this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.renderer = new WebGLRenderer();
		this.clock = new Clock();
		this.setup();
	}

	public animate(): void {
		this.cubeMesh.rotate(this.cubeMeshRotateRadians);
		this.firstPersonControls && this.firstPersonControls.update(this.clock.getDelta());
		this.renderer.render(this.scene, this.camera);
	}

	public setup(): void {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);
		this.setupMesh();
		this.setupCamera();
		this.initializeControls();
	}

	private setupMesh(): void {
		this.cubeMesh = new CubeMesh();
		this.scene.add(this.cubeMesh.mesh);
	}

	private setupCamera(): void {
		this.camera.position.z = 5;
	}

	private initializeControls() {
		this.firstPersonControls = new FirstPersonControls(this.camera, this.renderer.domElement);
		if (this.firstPersonControls) { // Added this null checker, not in original js
			this.firstPersonControls.setMovementSpeed(50);
			this.firstPersonControls.setLookSpeed(0.1);
		}
	}
}

export default MainScene;
