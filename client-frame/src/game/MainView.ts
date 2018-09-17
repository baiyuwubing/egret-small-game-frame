class MainView extends eui.Component implements eui.UIComponent {

	public layer_base: eui.Group;

	private _views = {}

	public constructor() {
		super();
		this.skinName = `MainViewSkin`
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.percentWidth = this.percentHeight = 100

		const _view_config: { view: any, show: boolean, parent: egret.DisplayObjectContainer }[] = [
			{ view: GameView, show: true, parent: this.layer_base },
		]


		for (const cfg of _view_config) {
			const viewName = egret.getQualifiedClassName(cfg.view)
			this._views[viewName] = new cfg.view() as BaseView;
			this._views[viewName].setParent(cfg.parent)
			if (cfg.show) {
				this._views[viewName].show()
			} else {
				// cfg.parent.addChild(this._views[viewName])
				// this._views[viewName].visible = false;
			}
		}
	}

	public getView(viewName: any | string): BaseView {
		if (typeof viewName == `string`) {
			return this._views[viewName]
		} else {
			return this._views[egret.getQualifiedClassName(viewName)]
		}
	}

}

module ViewMgr {
	export function ins() {
		return Main.ins.mainView;
	}
}