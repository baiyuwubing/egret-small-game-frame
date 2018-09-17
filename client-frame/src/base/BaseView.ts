class BaseView extends eui.Component implements eui.UIComponent {

	/**是否要黑底 */
	protected _needBlackBg = true
	/**是否显示效果 */
	protected _needShowEffect = 1
	private _bgShape: egret.Shape
	private _parent: egret.DisplayObjectContainer

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.percentWidth = this.percentHeight = 100
		// this.horizontalCenter = this.verticalCenter = 0
		this.drawBlackBg();
	}

	private drawBlackBg() {
		if (this._needBlackBg) {
			const stageW: number = this.stage.stageWidth * 2;
			const stageH: number = this.stage.stageHeight * 2;
			if (!this._bgShape) {
				this._bgShape = new egret.Shape();
				this._bgShape.graphics.beginFill(0x000000, 0.5);
				this._bgShape.graphics.drawRect(0, 0, stageW, stageH);
				this._bgShape.graphics.endFill();
			}
			this._bgShape.x = (this.width - stageW) / 2
			this._bgShape.y = (this.height - stageH) / 2
			this.addChildAt(this._bgShape, 0);
		} else {
			func.removeFromParent(this._bgShape)
		}
	}

	public isShow() {
		return this.visible
	}

	public show(...params: any[]) {
		this.visible = true
		const parent = this.parent || this._parent
		if (parent) {
			parent.addChild(this)
			egret.Tween.removeTweens(this)
			switch (this._needShowEffect) {
				case 2: {
					this.alpha = 0
					this.scaleX = this.scaleY = 1.15
					egret.Tween.get(this)
						.to({ alpha: 1 }, 140)
						.to({ scaleX: 0.96, scaleY: 0.96 }, 200)
						.to({ scaleX: 1.0, scaleY: 1.0 }, 100)
						.call(() => { });
					break;
				}
				case 1: {
					egret.Tween.get(this)
						.to({ scaleX: 0.8, scaleY: 0.8, alpha: 0 })
						.to({ scaleX: 1.0, scaleY: 1.0, alpha: 1 }, 300)
						.call(() => { });
					break;
				}
			}
		}
	}

	public hide(...params: any[]) {
		egret.Tween.removeTweens(this)
		egret.Tween.get(this)
			.to({ scaleX: 1, scaleY: 1, alpha: 1 })
			.to({ scaleX: 0.8, scaleY: 0.8, alpha: 0 }, 300)
			.call(() => {
				this.visible = false
				this._parent = this.parent
				func.removeFromParent(this)
			});
	}

	public addTouchTapEvent(obj: egret.DisplayObject, callback: Function, useCapture?: boolean, priority?: number) {
		obj.addEventListener(egret.TouchEvent.TOUCH_TAP, callback, this, useCapture, priority)
		// func.addButtonClickByEff(obj, callback, this)
	}

	public hideBgShape() {
		if (this._bgShape)
			this._bgShape.visible = false
	}

	public showBgShape() {
		if (this._bgShape)
			this._bgShape.visible = true
	}

	public setParent(parent: egret.DisplayObjectContainer) {
		this._parent = parent;
	}

}