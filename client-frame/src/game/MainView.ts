class MainView extends BaseView {

	public gameView: GameView;

	public constructor() {
		super();

	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.gameView = new GameView()
		this.addChild(this.gameView)
	}

}