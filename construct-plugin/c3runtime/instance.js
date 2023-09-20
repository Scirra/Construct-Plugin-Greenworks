"use strict";

{
	const C3 = self.C3;
	const DOM_COMPONENT_ID = "greenworks";
	
	C3.Plugins.Greenworks.Instance = class GreenworksInstance extends C3.SDKInstanceBase
	{
		constructor(inst, properties)
		{
			super(inst, DOM_COMPONENT_ID);
			
			this._isAvailable = false;
			this._isGameOverlayEnabled = false;
			
			this._accountId = 0;
			this._staticAccountId = "";		// string because is 64-bit number
			this._screenName = "";
			this._level = 0;
			this._gameLang = "";
			this._uiLang = "";
			
			// Listen for game overlay events
			this.AddDOMMessageHandlers([
				["game-overlay-activated", e => this._OnGameOverlayActivated(e)]
			]);
			
			// Get initial state from DOM. Make runtime loading wait for the response.
			this._runtime.AddLoadPromise(
				this.PostToDOMAsync("load")
				.then(data =>
				{
					this._isAvailable = data["isAvailable"];
					this._isGameOverlayEnabled = data["isGameOverlayEnabled"];
					
					this._accountId = data["accountId"];
					this._staticAccountId = data["staticAccountId"];
					this._screenName = data["screenName"];
					this._level = data["level"];
					this._gameLang = data["gameLang"];
					this._uiLang = data["uiLang"];
				})
			);
		}
		
		Release()
		{
			super.Release();
		}
		
		_OnGameOverlayActivated(e)
		{
			if (e["isActive"])
				this.Trigger(C3.Plugins.Greenworks.Cnds.OnGameOverlayActivated);
			else
				this.Trigger(C3.Plugins.Greenworks.Cnds.OnGameOverlayDeactivated);
		}
	};
	
}