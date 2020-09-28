import { MeshBasicMaterial } from "three";

class PlaneOneMaterial {
	private material: MeshBasicMaterial;

	constructor() {
		this.material = new MeshBasicMaterial({ color: 0x393839, wireframe: true });
	}

	public get(): MeshBasicMaterial {
		return this.material;
	}
}

export default PlaneOneMaterial;
