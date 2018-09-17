class GameModel extends SingletonClass {
	private constructor() {
		super()
	}

	public static ins() {
		return super.ins() as GameModel
	}

	/** 分数 */
	private _totalScore = 0
	/** 分数 */
	public get totalScore() {
		return this._totalScore
	}
	public set totalScore(value: number) {
		const old = this._totalScore
		this._totalScore = value
		if (value > this._bestScore) {
			this.bestScore = value
		}
	}

	/** 最高分数 */
	private _bestScore = 0
	/** 最高分数 */
	public get bestScore() {
		return this._bestScore
	}
	public set bestScore(value: number) {
		const old = this._bestScore
		this._bestScore = value
		LocalStorageMgr.ins().setLocal(LocalStorageMgr.KEY_BEST_SCORE, value)
	}

	public init() {
		this.bestScore = LocalStorageMgr.ins().getLocal(LocalStorageMgr.KEY_BEST_SCORE, 0)
		this.resetData()
	}

	public resetData() {
		this.totalScore = 0;

	}

}