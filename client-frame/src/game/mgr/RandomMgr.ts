enum RandomSeedType {
	UNDEFINE = 0,

}

class RandomMgr extends SingletonClass {
	public constructor() {
		super()
	}

	public static ins() {
		return super.ins() as RandomMgr
	}

	private _seeds: number[][] = []
	private _seedIndex: number[] = [];
	private _selectedIndexes: number[][] = []

	public init() {
		const keysAll = [RandomSeedType.UNDEFINE]
		this._seeds = [];
		this._selectedIndexes = [];
		this._seedIndex = [];
		for (const key of keysAll) {
			this._seeds[key] = []
			this._selectedIndexes[key] = [];
			this._seedIndex[key] = 0;
		}

		for (let i: number = 0; i < GameConst.randomSeed.length; i++) {
			let fix: number = parseInt(GameConst.randomSeed[i], 36) || 0
			fix = (9301 * fix + 49297) % (1048576) || 0
			for (const key of keysAll) {
				this._seeds[key].push(fix)
			}
		}
	}

	public randomNum(min: number, max: number, randomSeedType: RandomSeedType = RandomSeedType.UNDEFINE): number {
		if (min > max)
			max = min
		const seedIndex = this._seedIndex[randomSeedType] % GameConst.randomSeed.length
		const ret = min + (this._seeds[randomSeedType][seedIndex]) % (max - min + 1)
		this._seeds[randomSeedType][seedIndex] = (9301 * this._seeds[randomSeedType][seedIndex] + 49297) % (1048576) || 0
		this._seedIndex[randomSeedType]++;
		this._selectedIndexes[randomSeedType].push(ret)
		return ret
	}

	public randomNumArray(min: number, max: number, count: number, randomSeedType: RandomSeedType = RandomSeedType.UNDEFINE): number[] {
		if (min > max)
			max = min
		const ret = []
		if (max - min + 1 < count) {
			count = max - min + 1
		}
		for (let i = 0; i < count;) {
			const ramdomNum = this.randomNum(min, max, randomSeedType)
			if (ret.indexOf(ramdomNum) < 0) {
				ret.push(ramdomNum)
				i++;
			}
		}
		return ret
	}

	/**百分比概率 */
	public getPercentProbability(percent: number, randomSeedType: RandomSeedType = RandomSeedType.UNDEFINE): boolean {
		const ramdomNum = this.randomNum(1, 100, randomSeedType)
		// egret.log("getPercentProbability", percent, ramdomNum)
		return (percent >= ramdomNum)
	}

}