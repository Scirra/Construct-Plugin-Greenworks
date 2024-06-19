
const C3 = self.C3;
const DOM_COMPONENT_ID = "greenworks";

C3.Plugins.Greenworks.Instance = class GreenworksInstance extends globalThis.ISDKInstanceBase
{
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
		this.runtime.addLoadPromise(this._init());
	}

	async _init()
	{
		const data = await this._postToDOMAsync("load");

		this._isAvailable = data["isAvailable"];

		if (this._isAvailable)
		{
			this._isGameOverlayEnabled = data["isGameOverlayEnabled"];
			this._isRunningOnSteamDeck = data["isRunningOnSteamDeck"];
			
			this._accountId = data["accountId"];
			this._staticAccountId = data["staticAccountId"];
			this._screenName = data["screenName"];
			this._level = data["level"];
			this._gameLang = data["gameLang"];
			this._uiLang = data["uiLang"];
		}
	}
	
	_release()
	{
		super._release();
	}
	
	_onGameOverlayActivated(e)
	{
		if (e["isActive"])
			this._trigger(C3.Plugins.Greenworks.Cnds.OnGameOverlayActivated);
		else
			this._trigger(C3.Plugins.Greenworks.Cnds.OnGameOverlayDeactivated);
	}
};
