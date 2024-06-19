
const C3 = self.C3;

C3.Plugins.Greenworks.Exps =
{
	AccountID()
	{
		return this._accountId;
	},
	
	StaticAccountID()
	{
		// Deprecated expression for backwards compatibility. Return as number,
		// which is lossy since it can be over MAX_SAFE_INTEGER.
		const ret = parseFloat(this._staticAccountId);
		return isFinite(ret) ? ret : 0;
	},
	
	StaticAccountIDStr()
	{
		return this._staticAccountId;
	},
	
	ScreenName()
	{
		return this._screenName;
	},
	
	UserLevel()
	{
		return this._level;
	},
	
	GameLanguage()
	{
		return this._gameLang;
	},
	
	UILanguage()
	{
		return this._uiLang;
	}
};