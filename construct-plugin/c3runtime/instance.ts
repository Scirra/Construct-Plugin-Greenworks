
const C3 = self.C3;
const DOM_COMPONENT_ID = "greenworks";

class GreenworksInstance extends globalThis.ISDKInstanceBase
{
	_isAvailable: boolean;
	_isGameOverlayEnabled: boolean;
	_isRunningOnSteamDeck: boolean;

	_accountId: number;
	_staticAccountId: string;
	_screenName: string;
	_level: number;
	_gameLang: string;
	_uiLang: string;

	constructor()
	{
		super({ domComponentId: DOM_COMPONENT_ID });
		
		this._isAvailable = false;
		this._isGameOverlayEnabled = false;
		this._isRunningOnSteamDeck = false;
		
		this._accountId = 0;
		this._staticAccountId = "";		// string because is 64-bit number
		this._screenName = "";
		this._level = 0;
		this._gameLang = "";
		this._uiLang = "";
		
		// Listen for game overlay events
		this._addDOMMessageHandlers([
			["game-overlay-activated", e => this._onGameOverlayActivated(e)]
		]);
		
		// Get initial state from DOM. Make runtime loading wait for the response.
		this.runtime.sdk.addLoadPromise(this._init());
	}

	async _init()
	{
		const data_ = await this._postToDOMAsync("load");
		const data = data_ as JSONObject;

		this._isAvailable = data["isAvailable"] as boolean;

		if (this._isAvailable)
		{
			this._isGameOverlayEnabled = data["isGameOverlayEnabled"] as boolean;
			this._isRunningOnSteamDeck = data["isRunningOnSteamDeck"] as boolean;
			
			this._accountId = data["accountId"] as number;
			this._staticAccountId = data["staticAccountId"] as string;
			this._screenName = data["screenName"] as string;
			this._level = data["level"] as number;
			this._gameLang = data["gameLang"] as string;
			this._uiLang = data["uiLang"] as string;
		}
	}
	
	_release()
	{
		super._release();
	}
	
	_onGameOverlayActivated(e_: JSONValue)
	{
		const e = e_ as JSONObject;

		if (e["isActive"] as boolean)
			this._trigger(C3.Plugins.Greenworks.Cnds.OnGameOverlayActivated);
		else
			this._trigger(C3.Plugins.Greenworks.Cnds.OnGameOverlayDeactivated);
	}
};

C3.Plugins.Greenworks.Instance = GreenworksInstance;

export type { GreenworksInstance as SDKInstanceClass };