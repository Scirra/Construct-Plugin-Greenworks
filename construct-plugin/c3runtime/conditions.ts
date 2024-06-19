
import type { SDKInstanceClass } from "./instance.ts";

const C3 = self.C3;

C3.Plugins.Greenworks.Cnds =
{
	IsAvailable(this: SDKInstanceClass)
	{
		return this._isAvailable;
	},
	
	OnAchievementActivateSuccess(this: SDKInstanceClass)
	{
		return true;
	},
	
	OnAchievementActivateError(this: SDKInstanceClass)
	{
		return true;
	},
	
	IsOverlayEnabled(this: SDKInstanceClass)
	{
		return this._isGameOverlayEnabled;
	},
	
	OnGameOverlayActivated(this: SDKInstanceClass)
	{
		return true;
	},
	
	OnGameOverlayDeactivated(this: SDKInstanceClass)
	{
		return true;
	},

	IsRunningOnSteamDeck(this: SDKInstanceClass)
	{
		return this._isRunningOnSteamDeck;
	}
};
