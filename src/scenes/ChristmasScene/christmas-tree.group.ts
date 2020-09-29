import { CylinderGeometry, Group, Mesh, MeshStandardMaterial } from "three";
import Decoration from "./decoration.group";

class ChristmasTree extends Group {
	private potMaterial: MeshStandardMaterial;
	private pot: Mesh;

	constructor() {
		super();
		this.potMaterial = new MeshStandardMaterial({
			color: 0xf97514,
			flatShading: true,
			metalness: 0,
			roughness: 0.8,
			refractionRatio: 0.25
		});
		this.pot = new Mesh(
			Decoration.addNoise(new CylinderGeometry(30, 25, 35, 8, 2), 2),
      this.potMaterial,
		);
	}
}

export default ChristmasTree;
