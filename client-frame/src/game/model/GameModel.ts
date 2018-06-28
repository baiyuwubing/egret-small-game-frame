class GameModel extends SingletonClass {
	private constructor() {
		super()
	}

	public static ins() {
		return super.ins() as GameModel
	}



	// /** 分数 */
	// private _totalScore = 0
	// /** 分数 */
	// public get totalScore() {
	// 	return this._totalScore
	// }
	// public set totalScore(value: number) {
	// 	const old = this._totalScore
	// 	this._totalScore = value
	// 	if (value > this._bestScore) {
	// 		this.bestScore = value
	// 	}
	// 	if (value >= 15) {
	// 		Main.ins.mainView.gameView.backboardRandomPos()
	// 	}
	// 	Main.ins.mainView.gameView.updateScoreView(old)
	// }



	public init() {
		// this.bestScore = LocalStorageMgr.ins().getLocal(LocalStorageMgr.KEY_BEST_SCORE, 0)
		this.resetData()
	}

	public resetData() {
		// this.totalScore = 0;

	}

}