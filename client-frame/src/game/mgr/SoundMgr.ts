class SoundMgr extends SingletonClass {
	public constructor() {
		super()
	}
	private _isPlayMusic = false


	public static readonly RES_V_DOWN = 'v_down_mp3';

	public static readonly RES_BG = "bg_mp3";


	private _musicVolume: number = 1
	private _soundVolume: number = 1

	public get musicVolume() {
		return this._musicVolume
	}
	public set musicVolume(value) {
		this._musicVolume = value
		if (this._isPlayMusic)
			this._bgChannel.volume = value
		LocalStorageMgr.ins().setLocal(LocalStorageMgr.KEY_MUSIC_VOLUME, value)
	}

	public get soundVolume() {
		return this._soundVolume
	}
	public set soundVolume(value) {
		this._soundVolume = value
		if (this._isPlayMusic)
			this._bgChannel.volume = value
		LocalStorageMgr.ins().setLocal(LocalStorageMgr.KEY_SOUND_VOLUME, value)
	}

	public static ins() {
		return super.ins() as SoundMgr
	}

	private _soundReses = {}
	public _bgChannel: egret.SoundChannel

	public init() {
		this._soundReses = {}
		// for (const key of
		// 	[
		// 		SoundMgr.RES_MOVE_LEFT, SoundMgr.RES_MOVE_RIGHT,
		// 		SoundMgr.RES_V_DOWN, SoundMgr.RES_ELIMINATE, SoundMgr.RES_TRANSFORMATION,
		// 		SoundMgr.RES_COUNT_DOWN, SoundMgr.RES_DIRECTLY_DOWN,
		// 		SoundMgr.RES_TIME_TIPS
		// 	]) {
		// 	this._soundReses[key] = RES.getRes(key) as egret.Sound;
		// }

		const sound = RES.getRes(SoundMgr.RES_BG) as egret.Sound
		if (sound && sound[`play`]) {
			this._bgChannel = sound.play()
			this._bgChannel.volume = 0
			this._isPlayMusic = false
		}

		this.soundVolume = LocalStorageMgr.ins().getLocal(LocalStorageMgr.KEY_SOUND_VOLUME, 1)
		this.musicVolume = LocalStorageMgr.ins().getLocal(LocalStorageMgr.KEY_MUSIC_VOLUME, 1)
	}

	public resetData() {
		this.changeBg(SoundMgr.RES_BG)
	}

	public playSoundEffect(res: string) {
		if (!this._soundReses[res]) {
			this._soundReses[res] = RES.getRes(res) as egret.Sound;
		}
		const sound = (this._soundReses[res] as egret.Sound)
		if (sound && sound[`play`]) {
			const chanel = sound.play(0, 1)
			chanel.volume = this._soundVolume
		}

	}

	public playBg(bool = true) {
		this._isPlayMusic = bool
		if (this._bgChannel)
			this._bgChannel.volume = bool ? this._musicVolume : 0
	}

	public changeBg(res: string) {
		if (this._bgChannel) {
			this._bgChannel.stop()
		}
		const sound = (RES.getRes(res) as egret.Sound)
		if (sound && sound[`play`]) {
			this._bgChannel = sound.play()
			this._bgChannel.volume = this._isPlayMusic ? this._musicVolume : 0
		}
	}

}