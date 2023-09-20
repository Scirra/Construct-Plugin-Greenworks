"use strict";

{
	const C3 = self.C3;

	const OVERLAY_OPTIONS = [
		"Friends",
		"Community",
		"Players",
		"Settings",
		"OfficialGameGroup",
		"Stats",
		"Achievements"
	];
	
	C3.Plugins.Greenworks.Acts =
	{
		ActivateAchievement(achievement)
		{
			if (!this._isAvailable)
				return;
			
			this.PostToDOMAsync("activate-achievement", {
				"achievement": achievement
			})
			.then(() =>
			{
				this.Trigger(C3.Plugins.Greenworks.Cnds.OnAchievementActivateSuccess);
			})
			.catch(err =>
			{
				console.warn("[Construct 3] Greenworks: error activating achievement: ", err);
				
				this.Trigger(C3.Plugins.Greenworks.Cnds.OnAchievementActivateError);
			});
		},
		
		ActivateOverlay(option)
		{
			if (!this._isAvailable)
				return;
			
			this.PostToDOM("activate-overlay", {
				"option": OVERLAY_OPTIONS[option]
			});
		}
	};
}