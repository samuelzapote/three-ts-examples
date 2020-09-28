import { FlatShading, Mesh, MeshStandardMaterial, OctahedronGeometry } from "three";

class OctaOne {
  private geometry: OctahedronGeometry;
  private material: MeshStandardMaterial;

  constructor() {
    this.geometry = new OctahedronGeometry(10, 1);
    this.material = new MeshStandardMaterial({
      color: 0xff0051,
      flatShading: true,
      metalness: 0,
      roughness: 1
    });
  }
}