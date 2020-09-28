import { PlaneGeometry } from "three";

class PlaneOneGeometry {
    private planeGeometry: PlaneGeometry;

    constructor() {
        this.planeGeometry = new PlaneGeometry(5, 5, 5, 5);
    }

    public get(): PlaneGeometry {
        return this.planeGeometry;
    }
}

export default PlaneOneGeometry;
