class GameMgr extends SingletonClass {
	public constructor() {
		super()
	}

	private _gameView: GameView

	public static ins() {
		return super.ins() as GameMgr
	}

	public init() {
		this._gameView = Main.ins.mainView.gameView

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