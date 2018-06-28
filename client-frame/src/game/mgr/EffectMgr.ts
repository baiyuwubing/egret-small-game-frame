class EffectMgr extends SingletonClass {
	public constructor() {
		super()
	}

	public static readonly RES_EFFECT_COINT = 'effect_coin';

	public static ins() {
		return super.ins() as EffectMgr
	}

	private _effectReses = {}
	private _effectFactory = {}

	public init() {
		this._effectReses = {}
		// for (const key of [EffectMgr.RES_EFFECT_COINT]) {
		// 	this._effectReses[key] = this.newMovieClip(key)
		// }
	}

	public getMovieClip(key: string): egret.MovieClip {
		if (!this._effectReses[key]) {
			this._effectReses[key] = this.newMovieClip(key)
		}
		return (this._effectReses[key] as egret.MovieClip)
	}

	public newMovieClip(key: string) {
		if (!this._effectFactory[key]) {
			const data = RES.getRes(`${key}_json`);
			const txtr = RES.getRes(`${key}_png`);
			this._effectFactory[key] = new egret.MovieClipDataFactory(data, txtr);
		}
		const mcFactory = this._effectFactory[key] as egret.MovieClipDataFactory;
		const mc1: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData(key));
		mc1.addEventListener(egret.Event.COMPLETE, (e: egret.Event) => {
			func.removeFromParent(mc1)
		}, this);
		mc1.touchEnabled = false;
		return mc1
	}


}