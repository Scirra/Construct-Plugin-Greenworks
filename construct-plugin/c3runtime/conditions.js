"use strict";

{
	const C3 = self.C3;
	
	C3.Plugins.Greenworks.Cnds =
	{
		IsAvailable()
		{
			return this._isAvailable;
		},
		
		OnAchievementActivateSuccess()
		{
			return true;
		},
		
		OnAchievementActivateError()
		{
			return true;
		},
		
		IsOverlayEnabled()
		{
			return this._isGameOverlayEnabled;
		},
		
		OnGameOverlayActivated()
		{
			return true;
		},
		
		OnGameOverlayDeactivated()
		{
			return true;
		}
	};
}