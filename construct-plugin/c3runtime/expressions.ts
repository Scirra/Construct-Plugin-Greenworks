
import type { SDKInstanceClass } from "./instance.ts";

const C3 = self.C3;

C3.Plugins.Greenworks.Exps =
{
	AccountID(this: SDKInstanceClass)
	{
		return this._accountId;
	},
	
	StaticAccountID(this: SDKInstanceClass)
	{
		// Deprecated expression for backwards compatibility. Return as number,
		// which is lossy since it can be over MAX_SAFE_INTEGER.
		const ret = parseFloat(this._staticAccountId);
		return isFinite(ret) ? ret : 0;
	},
	
	StaticAccountIDStr(this: SDKInstanceClass)
	{
		return this._staticAccountId;
	},
	
	ScreenName(this: SDKInstanceClass)
	{
		return this._screenName;
	},
	
	UserLevel(this: SDKInstanceClass)
	{
		return this._level;
	},
	
	GameLanguage(this: SDKInstanceClass)
	{
		return this._gameLang;
	},
	
	UILanguage(this: SDKInstanceClass)
	{
		return this._uiLang;
	}
};