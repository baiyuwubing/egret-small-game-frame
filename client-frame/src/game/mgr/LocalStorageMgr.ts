class LocalStorageMgr extends SingletonClass {
	public constructor() {
		super()
	}

	public static ins() {
		return super.ins() as LocalStorageMgr
	}

	public static readonly KEY_MUSIC_VOLUME = `KEY_MUSIC_VOLUME`
	public static readonly KEY_SOUND_VOLUME = `KEY_SOUND_VOLUME`

	public setLocal(key: string, value) {
		egret.localStorage.setItem(key, value)
	}

	public getLocal(key: string, defalut?) {
		const result = egret.localStorage.getItem(key)
		if (result == null) {
			return defalut
		}

		switch (typeof defalut) {
			case "boolean": {
				return (result == "true")
			}
			case "number": {
				return Number(result)
			}
		}
		return result
	}


}