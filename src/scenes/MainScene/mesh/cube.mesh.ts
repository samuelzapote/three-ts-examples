import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";

class CubeMesh {
	private geometry: BoxGeometry;
	private material: MeshBasicMaterial;
	private _mesh: Mesh;

	get mesh(): Mesh {
		return this._mesh;
	}
    
	constructor() {
		this.geometry = new BoxGeometry();
		this.material = new MeshBasicMaterial({ color: 0x00ff00 });
		this._mesh = new Mesh(this.geometry, this.material);
	}

	public rotate(radians?: number): void {
		this.mesh.rotation.x += radians;
		this.mesh.rotation.y += radians;
	}
}

export default CubeMesh;
