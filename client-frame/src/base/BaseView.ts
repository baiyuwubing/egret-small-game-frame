class BaseView extends eui.Component implements eui.UIComponent {

	/**是否要黑底 */
	public _needBlackBg = true
	private _bgShape: egret.Shape

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.percentWidth = this.percentHeight = 100
		this.drawBlackBg()
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
		if (this.parent) {
			this.parent.addChild(this)
		}
		egret.Tween.removeTweens(this)
		this.alpha = 0.2
		this.scaleX = this.scaleY = 0.9
		egret.Tween.get(this).to({ alpha: 1 })
		egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backInOut)
	}

	public hide(...params: any[]) {
		// this.visible = false
		egret.Tween.removeTweens(this)
		egret.Tween.get(this).to({ alpha: 0, scaleX: 0.8, scaleY: 0.8 }, 500).call(() => {
			this.visible = false
		})
	}

	public addTouchTapEvent(obj: egret.DisplayObject, callback: Function, useCapture?: boolean, priority?: number) {
		obj.addEventListener(egret.TouchEvent.TOUCH_TAP, callback, this, useCapture, priority)
		// func.addButtonClickByEff(obj, callback, this)
	}

}