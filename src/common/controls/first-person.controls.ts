import { Camera, Event, MathUtils, Spherical, Vector3 } from "three";

class FirstPersonControls {

	private object: Camera;
	private domElement: HTMLCanvasElement;

	// API

	private enabled: boolean = true;

	private movementSpeed = 1.0;
	private lookSpeed = 0.005;

	private lookVertical = true;
	private autoForward = false;

	private activeLook = true;

	private heightSpeed = false;
	private heightCoef = 1.0;
	private heightMin = 0.0;
	private heightMax = 1.0;

	private constrainVertical = false;
	private verticalMin = 0;
	private verticalMax = Math.PI;

	private mouseDragOn = false;

	// internals

	private autoSpeedFactor = 0.0;

	private mouseX = 0;
	private mouseY = 0;

	private moveForward: boolean = false;
	private moveBackward: boolean = false;
	private moveLeft: boolean = false;
	private moveRight: boolean = false;
	private moveUp: boolean = false; // Added, missing from js version
	private moveDown: boolean = false; // Added, missing from js version

	private viewHalfX: number = 0;
	private viewHalfY: number = 0;

	// private variables

	private lat = 0;
	private lon = 0;

	private lookDirection = new Vector3();
	private spherical = new Spherical();
	private target = new Vector3();

	private domElementIsDocument: boolean;

	constructor(object: Camera, domElement: HTMLCanvasElement) {
		if (domElement === undefined) {
			console.warn('The second parameter "domElement" is mandatory.');
			(domElement as unknown as Document) = document;
		}
		this.object = object;
		this.domElement = domElement;
		this.domElementIsDocument = (this.domElement as unknown as Document) === document;
		
		if (!this.domElementIsDocument) {
			domElement.setAttribute('tabindex', '-1');
		}

		this.setupEventListeners();
		this.handleResize();
		this.setOrientation(this);
	}

	public setLookSpeed(speed: number): void {
		this.lookSpeed = speed | this.lookSpeed;
	}

	public setMovementSpeed(speed: number): void {
		this.movementSpeed = speed | this.movementSpeed;
	}

	private handleResize = function () {
		if (this.domElementIsDocument) {
			this.viewHalfX = window.innerWidth / 2;
			this.viewHalfY = window.innerHeight / 2;
		} else {
			this.viewHalfX = this.domElement.offsetWidth / 2;
			this.viewHalfY = this.domElement.offsetHeight / 2;
		}
	};

	private onMouseDown = function (event: Event) {
		if (!this.domElementIsDocument) {
			this.domElement.focus();
		}

		event.preventDefault();
		event.stopPropagation();

		if (this.activeLook) {
			switch (event.button) {
				case 0: this.moveForward = true;
				break;
				case 2: this.moveBackward = true;
				break;
			}
		}

		this.mouseDragOn = true;
	};

	private onMouseUp = function (event: Event) {
		event.preventDefault();
		event.stopPropagation();

		if (this.activeLook) {
			switch (event.button) {
				case 0: this.moveForward = false;
				break;
				case 2: this.moveBackward = false;
				break;
			}
		}

		this.mouseDragOn = false;
	};

	private onMouseMove = function (event: Event) {
		if (this.domElementIsDocument) {
			this.mouseX = event.pageX - this.viewHalfX;
			this.mouseY = event.pageY - this.viewHalfY;
		} else {
			this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
			this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;
		}
	};

	private onKeyDown = function (event: Event) {
		//event.preventDefault();
		switch (event.keyCode) {
			case 38: /*up*/
			case 87: /*W*/ this.moveForward = true;
			break;
			case 37: /*left*/
			case 65: /*A*/ this.moveLeft = true;
			break;
			case 40: /*down*/
			case 83: /*S*/ this.moveBackward = true;
			break;
			case 39: /*right*/
			case 68: /*D*/ this.moveRight = true;
			break;
			case 82: /*R*/ this.moveUp = true;
			break;
			case 70: /*F*/ this.moveDown = true;
			break;
		}
	};

	private onKeyUp = function (event: Event) {
		switch (event.keyCode) {
			case 38: /*up*/
			case 87: /*W*/ this.moveForward = false;
			break;
			case 37: /*left*/
			case 65: /*A*/ this.moveLeft = false;
			break;
			case 40: /*down*/
			case 83: /*S*/ this.moveBackward = false;
			break;
			case 39: /*right*/
			case 68: /*D*/ this.moveRight = false;
			break;
			case 82: /*R*/ this.moveUp = false;
			break;
			case 70: /*F*/ this.moveDown = false;
			break;
		}
	};

	private lookAt = function (x: number, y: number, z: number) {
		if ((x as unknown as Vector3).isVector3) {
			this.target.copy((x as unknown as Vector3));
		} else {
			this.target.set(x, y, z);
		}

		this.object.lookAt(this.target);
		this.setOrientation(this);
		return this;
	};

	public update = function () {
		const targetPosition = new Vector3();

		return function update(delta: number) {
			const actualMoveSpeed = delta * this.movementSpeed;
			let actualLookSpeed = delta * this.lookSpeed;
			let verticalLookRatio = 1;
			
			if (!this.enabled) return;
			if (this.heightSpeed) {
				const y = MathUtils.clamp(this.object.position.y, this.heightMin, this.heightMax);
				const heightDelta = y - this.heightMin;
				this.autoSpeedFactor = delta * (heightDelta * this.heightCoef);
			} else {
				this.autoSpeedFactor = 0.0;
			}
			if (this.moveForward || (this.autoForward && !this.moveBackward)) {
				this.object.translateZ(-(actualMoveSpeed + this.autoSpeedFactor));
			}
			if (this.moveBackward) this.object.translateZ(actualMoveSpeed);
			if (this.moveLeft) this.object.translateX(-actualMoveSpeed);
			if (this.moveRight) this.object.translateX(actualMoveSpeed);
			if (this.moveUp) this.object.translateY(actualMoveSpeed);
			if (this.moveDown) this.object.translateY(-actualMoveSpeed);

			if (!this.activeLook) actualLookSpeed = 0;

			if (this.constrainVertical) verticalLookRatio = Math.PI / (this.verticalMax - this.verticalMin);

			this.lon -= this.mouseX * actualLookSpeed;
			if (this.lookVertical) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;

			this.lat = Math.max(-85, Math.min(85, this.lat));

			let phi = MathUtils.degToRad(90 - this.lat);
			const theta = MathUtils.degToRad(this.lon);

			if (this.constrainVertical) {
				phi = MathUtils.mapLinear(phi, 0, Math.PI, this.verticalMin, this.verticalMax);
			}

			const position = this.object.position;

			targetPosition.setFromSphericalCoords(1, phi, theta).add(position);

			this.object.lookAt(targetPosition);
		};
	}();

	private contextmenu(event: Event): void {
		event.preventDefault();
	}

	private dispose = function () {
		this.domElement.removeEventListener('contextmenu', this.contextmenu, false);
		this.domElement.removeEventListener('mousedown', this._onMouseDown, false);
		this.domElement.removeEventListener('mousemove', this._onMouseMove, false);
		this.domElement.removeEventListener('mouseup', this._onMouseUp, false);

		window.removeEventListener('keydown', this._onKeyDown, false);
		window.removeEventListener('keyup', this._onKeyUp, false);
	};

	private _onMouseMove = this.bind(this, this.onMouseMove);
	private _onMouseDown = this.bind(this, this.onMouseDown);
	private _onMouseUp = this.bind(this, this.onMouseUp);
	private _onKeyDown = this.bind(this, this.onKeyDown);
	private _onKeyUp = this.bind(this, this.onKeyUp);

	private setupEventListeners(): void {
		this.domElement.addEventListener('contextmenu', this.contextmenu, false);
		this.domElement.addEventListener('mousemove', this._onMouseMove, false);
		this.domElement.addEventListener('mousedown', this._onMouseDown, false);
		this.domElement.addEventListener('mouseup', this._onMouseUp, false);
		
		window.addEventListener('keydown', this._onKeyDown, false);
		window.addEventListener('keyup', this._onKeyUp, false);
	}


	private bind(scope: unknown, fn: Function): () => void {
		return function () {
			fn.apply(scope, arguments);
		};
	}

	private setOrientation(controls: FirstPersonControls): void {
		const quaternion = controls?.object.quaternion;

		if (quaternion) { // added null checker
			this.lookDirection.set(0, 0, - 1).applyQuaternion(quaternion);
			this.spherical.setFromVector3(this.lookDirection);
			this.lat = 90 - MathUtils.radToDeg(this.spherical.phi);
			this.lon = MathUtils.radToDeg(this.spherical.theta);
		}
	}
};

export default FirstPersonControls;
