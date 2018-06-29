class GameMgr extends SingletonClass {
	public constructor() {
		super()
	}

	private _gameView: GameView
	private _mainView: MainView;

	public static ins() {
		return super.ins() as GameMgr
	}

	public init() {
		this._mainView = Main.ins.mainView
		this._gameView = this._mainView.getView(GameView) as GameView;

		this.resetGame()
		egret.startTick(this.enterFrame, this)
	}

	public resetGame() {
		GameModel.ins().resetData()
		this._gameView.resetView()
	}

	public gameOver() {
		this.resetGame()
	}

	/** 每帧刷新 */
	private enterFrame(evt: number): boolean {

		return
	}

	public resetAllData() {

	}



}