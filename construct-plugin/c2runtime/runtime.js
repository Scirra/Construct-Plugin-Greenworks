// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.Greenworks = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	/////////////////////////////////////
	var pluginProto = cr.plugins_.Greenworks.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	// called on startup for each object type
	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
		
		// any other properties you need, e.g...
		// this.myValue = 0;
	};
	
	var instanceProto = pluginProto.Instance.prototype;
	
	var greenworks = null;
	var isAvailable = false;
	var steamId = null;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
		if (!this.runtime.isNWjs)
			return;
		
		try {
			greenworks = require("./greenworks");
		}
		catch (e)
		{
			console.error("Failed to require Greenworks: ", e);
			greenworks = null;
		}
		
		var self = this;
		
		if (greenworks)
		{
			try {
				greenworks["init"]();		// throws exception if fails
				isAvailable = true;			// succeeded
			}
			catch (e)
			{
				console.error("Failed to initialise Greenworks: ", e);
				isAvailable = false;
			}
			
			if (isAvailable)
			{
				steamId = greenworks["getSteamId"]();
				
				if (greenworks.on)
				{
					greenworks.on("game-overlay-activated", function (isActive)
					{
						if (isActive)
							self.runtime.trigger(cr.plugins_.Greenworks.prototype.cnds.OnGameOverlayActivated, self);
						else
							self.runtime.trigger(cr.plugins_.Greenworks.prototype.cnds.OnGameOverlayDeactivated, self);
					});
				}
			}
		}
	};
	
	// called whenever an instance is destroyed
	// note the runtime may keep the object after this call for recycling; be sure
	// to release/recycle/reset any references to other objects in this function.
	instanceProto.onDestroy = function ()
	{
	};
	
	// called when saving the full state of the game
	instanceProto.saveToJSON = function ()
	{
		// return a Javascript object containing information about your object's state
		// note you MUST use double-quote syntax (e.g. "property": value) to prevent
		// Closure Compiler renaming and breaking the save format
		return {
			// e.g.
			//"myValue": this.myValue
		};
	};
	
	// called when loading the full state of the game
	instanceProto.loadFromJSON = function (o)
	{
		// load from the state previously saved by saveToJSON
		// 'o' provides the same object that you saved, e.g.
		// this.myValue = o["myValue"];
		// note you MUST use double-quote syntax (e.g. o["property"]) to prevent
		// Closure Compiler renaming and breaking the save format
	};
	
	// only called if a layout object - draw to a canvas 2D context
	instanceProto.draw = function(ctx)
	{
	};
	
	// only called if a layout object in WebGL mode - draw to the WebGL context
	// 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
	// directory or just copy what other plugins do.
	instanceProto.drawGL = function (glw)
	{
	};
	
	// The comments around these functions ensure they are removed when exporting, since the
	// debugger code is no longer relevant after publishing.
	/**BEGIN-PREVIEWONLY**/
	instanceProto.getDebuggerValues = function (propsections)
	{
		// Append to propsections any debugger sections you want to appear.
		// Each section is an object with two members: "title" and "properties".
		// "properties" is an array of individual debugger properties to display
		// with their name and value, and some other optional settings.
		/*
		propsections.push({
			"title": "My debugger section",
			"properties": [
				// Each property entry can use the following values:
				// "name" (required): name of the property (must be unique within this section)
				// "value" (required): a boolean, number or string for the value
				// "html" (optional, default false): set to true to interpret the name and value
				//									 as HTML strings rather than simple plain text
				// "readonly" (optional, default false): set to true to disable editing the property
				
				// Example:
				// {"name": "My property", "value": this.myValue}
			]
		});
		*/
	};
	
	instanceProto.onDebugValueEdited = function (header, name, value)
	{
		// Called when a non-readonly property has been edited in the debugger. Usually you only
		// will need 'name' (the property name) and 'value', but you can also use 'header' (the
		// header title for the section) to distinguish properties with the same name.
		//if (name === "My property")
		//	this.myProperty = value;
	};
	/**END-PREVIEWONLY**/

	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	Cnds.prototype.IsAvailable = function ()
	{
		return isAvailable;
	};
	
	Cnds.prototype.OnAchievementActivateSuccess = function ()
	{
		return true;
	};
	
	Cnds.prototype.OnAchievementActivateError = function ()
	{
		return true;
	};
	
	Cnds.prototype.IsOverlayEnabled = function ()
	{
		if (!isAvailable)
			return false;
		
		return !!greenworks["isGameOverlayEnabled"]();
	};
	
	Cnds.prototype.OnGameOverlayActivated = function ()
	{
		return true;
	};
	
	Cnds.prototype.OnGameOverlayDeactivated = function ()
	{
		return true;
	};
	
	pluginProto.cnds = new Cnds();
	
	//////////////////////////////////////
	// Actions
	function Acts() {};

	Acts.prototype.ActivateAchievement = function (achievement)
	{
		if (!isAvailable)
			return;
		
		var self = this;
		
		greenworks["activateAchievement"](achievement, function ()
		{
			self.runtime.trigger(cr.plugins_.Greenworks.prototype.cnds.OnAchievementActivateSuccess, self);
		}, function ()
		{
			self.runtime.trigger(cr.plugins_.Greenworks.prototype.cnds.OnAchievementActivateError, self);
		});
	};
	
	var overlay_options = [
		"Friends",
		"Community",
		"Players",
		"Settings",
		"OfficialGameGroup",
		"Stats",
		"Achievements"
	];
	
	Acts.prototype.ActivateOverlay = function (option)
	{
		if (!isAvailable)
			return;
		
		greenworks["activateGameOverlay"](overlay_options[option]);
	};
	
	pluginProto.acts = new Acts();
	
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	
	Exps.prototype.AccountID = function (ret)
	{
		ret.set_int(steamId ? (steamId["accountId"] || 0) : 0);
	};
	
	Exps.prototype.StaticAccountID = function (ret)
	{
		ret.set_int(steamId ? (parseFloat(steamId["staticAccountId"]) || 0) : 0);
	};
	
	Exps.prototype.StaticAccountIDStr = function (ret)
	{
		ret.set_string(steamId ? steamId["staticAccountId"].toString() : "");
	};
	
	Exps.prototype.ScreenName = function (ret)
	{
		ret.set_string(steamId ? (steamId["screenName"] || "") : "");
	};
	
	Exps.prototype.UserLevel = function (ret)
	{
		ret.set_int(steamId ? (steamId["level"] || 0) : 0);
	};
	
	Exps.prototype.GameLanguage = function (ret)
	{
		if (greenworks && greenworks["getCurrentGameLanguage"])
			ret.set_string(greenworks["getCurrentGameLanguage"]() || "");
		else
			ret.set_string("");
	};
	
	Exps.prototype.UILanguage = function (ret)
	{
		if (greenworks && greenworks["getCurrentUILanguage"])
			ret.set_string(greenworks["getCurrentUILanguage"]() || "");
		else
			ret.set_string("");
	};
	
	pluginProto.exps = new Exps();

}());