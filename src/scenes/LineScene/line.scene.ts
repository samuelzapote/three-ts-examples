import { BufferGeometry, Line, LineBasicMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";

class LineScene {
	private scene: Scene;
	private camera: PerspectiveCamera;
	private renderer: WebGLRenderer;
	private LineOneMaterial: LineBasicMaterial = new LineBasicMaterial({ color: 0x0000ff });

	constructor() {
		this.scene = new Scene();
		this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
		this.renderer = new WebGLRenderer();
		this.setup();
	}
	
	public animate(): void {
		this.renderer.render(this.scene, this.camera);
	}

	public setup(): void {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);
		this.addMesh();
		this.setupCamera();
	}

	private addMesh(): void {
		this.scene.add(this.generateLineOne(this.LineOneMaterial));
	}

	private setupCamera(): void {
		this.camera.position.set(0, 0, 100);
		this.camera.lookAt(0, 0, 0);
	}

	private generateLineOne(material: LineBasicMaterial): Line<BufferGeometry, LineBasicMaterial> {
		const points = [
			new Vector3(-10, 0, 0),
			new Vector3(0, 10, 0),
			new Vector3(10, 0, 0),
		];
		const lineOneGeometry = new BufferGeometry().setFromPoints(points);
		return new Line(lineOneGeometry, material);
	}
}

export default LineScene;
