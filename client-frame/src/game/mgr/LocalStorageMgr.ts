class LocalStorageMgr extends SingletonClass {
	public constructor() {
		super()
	}

	public static ins() {
		return super.ins() as LocalStorageMgr
	}

	public static readonly KEY_MUSIC_VOLUME = `KEY_MUSIC_VOLUME`
	public static readonly KEY_SOUND_VOLUME = `KEY_SOUND_VOLUME`
	public static readonly KEY_BEST_SCORE = `KEY_BEST_SCORE`


	private game_key = 'game_name_'

	public setLocal(key: string, value) {
		egret.localStorage.setItem(this.str_encrypt(this.game_key + key), this.str_encrypt(value))
	}

	public getLocal(key: string, defalut?) {
		let result = egret.localStorage.getItem(this.str_encrypt(this.game_key + key))
		if (result == null) {
			return defalut
		}
		result = this.str_decrypt(result);

		switch (typeof defalut) {
			case "boolean": {
				return (result == "true")
			}
			case "number": {
				return Number(result) || defalut;
			}
		}
		return result
	}

	/**
	 * 加密函数
	 * @param str 待加密字符串
	 * @returns {string}
	 */
	private str_encrypt(str: string) {
		str = str.toString()
		let c = String.fromCharCode(str.charCodeAt(0) + str.length * 11);
		for (let i = 1; i < str.length; i++) {
			c += String.fromCharCode(str.charCodeAt(i) + str.charCodeAt(i - 1));
		}
		return encodeURIComponent(c);
	}

	/**
	 * 解密函数
	 * @param str 待解密字符串
	 * @returns {string}
	 */
	private str_decrypt(str: string) {
		str = str.toString()
		str = decodeURIComponent(str);
		let c = String.fromCharCode(str.charCodeAt(0) - str.length * 11);
		for (let i = 1; i < str.length; i++) {
			c += String.fromCharCode(str.charCodeAt(i) - c.charCodeAt(i - 1));
		}
		return c;
	}


}