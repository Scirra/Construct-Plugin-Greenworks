"use strict";

// TypeScript note: using the Greenworks node module involves calling global 'require()'.
// Declare the global 'require' function here to satisy the type checker.
declare function require(path: string): any;

{
	// This is the DOM-side script, as Construct supports hosting the runtime in a web worker,
	// in which case it doesn't have direct access to the Greenworks module. Therefore the
	// runtime uses message passing to communicate with this script which is loaded in the
	// main document and has access to the Greenworks module.
	const DOM_COMPONENT_ID = "greenworks";

	const HANDLER_CLASS = class GreenworksDOMHandler extends self.DOMHandler
	{
		_isNWjs: boolean;
		_isAvailable: boolean;

		// TypeScript note: these Greenworks properties refer to external JavaScript code,
		// so they just use 'any' to essentially disable the type checker for them.
		_greenworks: any;
		_steamId: any;

		constructor(iRuntime: IRuntimeInterface)
		{
			super(iRuntime, DOM_COMPONENT_ID);
			
			this._isNWjs = (iRuntime.GetExportType() === "nwjs");
			this._isAvailable = false;
			
			this._greenworks = null;
			this._steamId = null;
			
			this.AddRuntimeMessageHandlers([
				["load", () => this._Load()],
				["activate-achievement", e => this._OnActivateAchievement(e as JSONObject)],
				["activate-overlay", e => this._OnActivateOverlay(e as JSONObject)]
			]);
		}
		
		_Load()
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
						this._greenworks["on"]("game-overlay-activated", (isActive: boolean) =>
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
			
			if (this._isAvailable)
			{
				return {
					"isAvailable": true,
					"isGameOverlayEnabled": !!this._greenworks["isGameOverlayEnabled"](),
					"isRunningOnSteamDeck": !!this._greenworks["isSteamRunningOnSteamDeck"](),
					"accountId": (this._steamId ? this._steamId["accountId"] : 0),
					"staticAccountId": (this._steamId ? this._steamId["staticAccountId"].toString() : ""),
					"screenName": (this._steamId ? this._steamId["screenName"] : ""),
					"level": (this._steamId ? this._steamId["level"] : 0),
					"gameLang": this._greenworks["getCurrentGameLanguage"](),
					"uiLang": this._greenworks["getCurrentUILanguage"]()
				};
			}
			else
			{
				return {
					"isAvailable": false
				};
			}
			
		}
		
		_OnActivateAchievement(e: JSONObject)
		{
			return new Promise((resolve, reject) =>
			{
				this._greenworks["activateAchievement"](e["achievement"], resolve, reject);
			});
		}
		
		_OnActivateOverlay(e: JSONObject)
		{
			this._greenworks["activateGameOverlay"](e["option"]);
		}
	};

	self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}