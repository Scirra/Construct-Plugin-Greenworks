"use strict";

{
	// This is the DOM-side script, as Construct supports hosting the runtime in a web worker,
	// in which case it doesn't have direct access to the Greenworks module. Therefore the
	// runtime uses message passing to communicate with this script which is loaded in the
	// main document and has access to the Greenworks module.
	const DOM_COMPONENT_ID = "greenworks";

	const HANDLER_CLASS = class GreenworksDOMHandler extends self.DOMHandler
	{
		constructor(iRuntime)
		{
			super(iRuntime, DOM_COMPONENT_ID);
			
			this._isNWjs = (iRuntime.GetExportType() === "nwjs");
			this._isAvailable = false;
			
			this._greenworks = null;
			this._steamId = null;
			
			this.AddRuntimeMessageHandlers([
				["load", e => this._Load(e)],
				["activate-achievement", e => this._OnActivateAchievement(e)],
				["activate-overlay", e => this._OnActivateOverlay(e)]
			]);
		}
		
		_Load(e)
		{
			if (this._isNWjs)
			{
				try {
					this._greenworks = require("./greenworks");
					this._greenworks["init"]();
					this._isAvailable = true;
					
					this._steamId = this._greenworks["getSteamId"]();
					if (this._greenworks["on"])
					{
						this._greenworks["on"]("game-overlay-activated", isActive =>
						{
							this.PostToRuntime("game-overlay-activated", {
								"isActive": !!isActive
							});
						});
					}
				}
				catch (err)
				{
					this._greenworks = null;
					this._isAvailable = false;
					console.error("[Construct 3] Failed to load Greenworks: ", err);
				}
			}
			
			return {
				"isAvailable": this._isAvailable,
				"isGameOverlayEnabled": (this._isAvailable ? !!this._greenworks["isGameOverlayEnabled"]() : false),
				"accountId": (this._steamId ? this._steamId["accountId"] : 0),
				"staticAccountId": (this._steamId ? this._steamId["staticAccountId"].toString() : ""),
				"screenName": (this._steamId ? this._steamId["screenName"] : ""),
				"level": (this._steamId ? this._steamId["level"] : 0),
				"gameLang": (this._greenworks ? this._greenworks["getCurrentGameLanguage"]() : ""),
				"uiLang": (this._greenworks ? this._greenworks["getCurrentUILanguage"]() : "")
			};
		}
		
		_OnActivateAchievement(e)
		{
			return new Promise((resolve, reject) =>
			{
				this._greenworks["activateAchievement"](e["achievement"], resolve, reject);
			});
		}
		
		_OnActivateOverlay(e)
		{
			this._greenworks["activateGameOverlay"](e["option"]);
		}
	};

	self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}