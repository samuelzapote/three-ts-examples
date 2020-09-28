import { WebGLRenderer } from "three";

class BaseScene {
    private renderer: WebGLRenderer;

    constructor() {
        this.renderer = new WebGLRenderer();
    }
}