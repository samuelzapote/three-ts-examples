import * as Three from 'three';
import ChristmasScene from './scenes/ChristmasScene/christmas.scene';

import LineScene from './scenes/LineScene/line.scene';
import MainScene from './scenes/MainScene/main.scene';

class Game {
	private mainScene: MainScene;
	private lineScene: LineScene;
	private christmasScene: ChristmasScene;

	constructor() {
		this.initialize();
	}

	private animate = (): void => {
		// this.mainScene.animate();
		// this.lineScene.animate();
		this.christmasScene.render();
		requestAnimationFrame(this.animate);
	}

	public start(): void {
		this.animate();
	}

	private initialize(): void {
		// this.mainScene = new MainScene();
		// this.lineScene = new LineScene();
		this.christmasScene = new ChristmasScene();
	}
}

export default Game;
