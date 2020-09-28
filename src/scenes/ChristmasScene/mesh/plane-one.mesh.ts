import { Mesh } from "three";

import PlaneOneGeometry from '../geometry/plane-one.geometry';
import PlaneOneMaterial from '../materials/plane-one.material';

class PlaneOneMesh {
	private mesh: Mesh;
	private planeOneGeometry: PlaneOneGeometry;
	private planeOneMaterial: PlaneOneMaterial;

	constructor() {
		this.planeOneGeometry = new PlaneOneGeometry();
		this.planeOneMaterial = new PlaneOneMaterial();
		this.mesh = new Mesh(this.planeOneGeometry.get(), this.planeOneMaterial.get());
		this.position();
	}

	private position(): void {
		this.mesh.rotateX(Math.PI / 2);
	}

	public get(): Mesh {
		return this.mesh;
	}
}

export default PlaneOneMesh;
