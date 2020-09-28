import { BoxGeometry, Mesh, MeshBasicMaterial, ShadowMaterial } from "three";

class PlaneOneMesh {
	private mesh: Mesh;
	private planeOneGeometry: BoxGeometry;
	// private planeOneMaterial: MeshBasicMaterial;
	private shadowMaterial: ShadowMaterial;

	constructor() {
		this.planeOneGeometry = new BoxGeometry(100, .1, 100);
		// this.planeOneMaterial = new MeshBasicMaterial({ color: 0x393839, wireframe: true });
		this.shadowMaterial = new ShadowMaterial({ color: 0xeeeeee });
		this.shadowMaterial.opacity = 0.5;
		this.mesh = new Mesh(this.planeOneGeometry, this.shadowMaterial);
		this.mesh.receiveShadow = true;
		this.position();
	}

	private position(): void {
		
	}

	public get(): Mesh {
		return this.mesh;
	}
}

export default PlaneOneMesh;
