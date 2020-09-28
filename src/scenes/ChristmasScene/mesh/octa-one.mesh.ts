import { Mesh, MeshStandardMaterial, OctahedronGeometry } from "three";

class OctaOneMesh {
  private geometry: OctahedronGeometry;
  private material: MeshStandardMaterial;
  private mesh: Mesh;

  constructor(geometryRadius: number, materialColor: number) {
    this.geometry = new OctahedronGeometry(geometryRadius, 1);
    this.material = new MeshStandardMaterial({
      color: materialColor,
      flatShading: true,
      metalness: 0,
      roughness: 0.8
    });
    this.mesh = new Mesh(this.geometry, this.material);
    this.setup();
  }

  public get(): Mesh {
    return this.mesh;
  }

  private setup(): void {
    this.mesh.castShadow = true;
  }

  public offsetPositionX(amount: number): void {
    this.mesh.position.x += amount;
  }
  
  public offsetPositionY(amount: number): void {
    this.mesh.position.y += amount;
  }

  public rotatePositionZ(amount: number): void {
    this.mesh.rotateZ(Math.PI / amount);
  }
}

export default OctaOneMesh;
