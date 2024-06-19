
import type { SDKInstanceClass } from "./instance.ts";

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
	async ActivateAchievement(this: SDKInstanceClass, achievement: string)
	{
		if (!this._isAvailable)
			return;
		
		this._postToDOMAsync("activate-achievement", {
			"achievement": achievement
		})
		.then(() =>
		{
			this._trigger(C3.Plugins.Greenworks.Cnds.OnAchievementActivateSuccess);
		})
		.catch(err =>
		{
			console.warn("[Construct 3] Greenworks: error activating achievement: ", err);
			
			this._trigger(C3.Plugins.Greenworks.Cnds.OnAchievementActivateError);
		});
	},
	
	ActivateOverlay(this: SDKInstanceClass, option: number)
	{
		if (!this._isAvailable)
			return;
		
		this._postToDOM("activate-overlay", {
			"option": OVERLAY_OPTIONS[option]
		});
	}
};
