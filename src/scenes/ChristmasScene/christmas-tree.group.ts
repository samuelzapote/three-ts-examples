import { Group, MeshStandardMaterial } from "three";

class ChristmasTree extends Group {
	private potMaterial: MeshStandardMaterial;

	constructor() {
		super();
		
		this.potMaterial = new MeshStandardMaterial( {
			color: 0xf97514,
			flatShading: true,
			metalness: 0,
			roughness: 0.8,
			refractionRatio: 0.25
	} );
	}
}

export default ChristmasTree;
