import { CylinderGeometry, Geometry, Group, Mesh, MeshStandardMaterial, OctahedronGeometry } from "three"

class Decoration extends Group {
	private colors: string[] = ['#ff0051', '#f56762','#a53c6c','#f19fa0','#72bdbf','#47689b'];
	private bauble: Mesh;
	private shapeOne: Mesh;
	private rotationSpeed: number;
	private rotationPosition: number;

	constructor() {
		super();
		this.bauble = new Mesh(
			this.addNoise(new OctahedronGeometry(12, 1), 2),
			new MeshStandardMaterial({
				color: this.colors[Math.floor(Math.random() * this.colors.length)],
				flatShading: true,
				metalness: 0,
				roughness: 1
			})
		);
		this.bauble.castShadow = true;
		this.bauble.receiveShadow = true;
		this.bauble.rotateZ(Math.random() * Math.PI * 2);
		this.bauble.rotateY(Math.random() * Math.PI * 2);
		this.add(this.bauble);

		this.shapeOne = new Mesh(
			this.addNoise(new CylinderGeometry(4, 6, 10, 6, 1), 0.5),
			new MeshStandardMaterial({
					color: 0xf8db08,
					flatShading: true,
					metalness: 0,
					roughness: 1
			})
		);
		this.shapeOne.position.y += 8;
		this.shapeOne.castShadow = true;
		this.shapeOne.receiveShadow = true;
		this.add(this.shapeOne);

		this.rotationSpeed = Math.random() * 0.02 + 0.005;
		this.rotationPosition = Math.random();
	}

	private addNoise(geometry: Geometry, noiseX: number, noiseY?: number, noiseZ?: number): Geometry  {
    noiseX = noiseX || 2;
    noiseY = noiseY || noiseX;
    noiseZ = noiseZ || noiseY;
    // loop through each vertix in the geometry and move it randomly
    for(var i = 0; i < geometry.vertices.length; i++){
			var v = geometry.vertices[i];
			v.x += -noiseX / 2 + Math.random() * noiseX;
			v.y += -noiseY / 2 + Math.random() * noiseY;
			v.z += -noiseZ / 2 + Math.random() * noiseZ;
    }
    return geometry;
	}

	public updatePosition() {
    this.rotationPosition += this.rotationSpeed;
    this.rotation.y = Math.sin(this.rotationPosition);
	};
}

export default Decoration;
