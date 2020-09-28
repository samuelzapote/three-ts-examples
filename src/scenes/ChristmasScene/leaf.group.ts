import { Group, Mesh, MeshStandardMaterial, TorusGeometry } from "three";

class Leaf extends Group{
	private leaf: Mesh;

	constructor() {
		super();
		this.leaf= new Mesh(
			new TorusGeometry(.8,1.6,3,4),
			new MeshStandardMaterial({
				color: 0x0b8450,
				flatShading: true,
				metalness: 0,
				roughness: 0.8,
				refractionRatio: 0.25
			})
		);
		this.leaf.rotateX(Math.random() * Math.PI * 2);
    this.leaf.rotateZ(Math.random() * Math.PI * 2);
    this.leaf.rotateY(Math.random() * Math.PI * 2);
    this.leaf.receiveShadow = true;
		this.leaf.castShadow = true;
		this.add(this.leaf);
	}
}

export default Leaf;
