"use strict";

(function() {

	////////////////////////////////////////////
	// The plugin ID is how Construct identifies different kinds of plugins.
	// *** NEVER CHANGE THE PLUGIN ID AFTER RELEASING A PLUGIN! ***
	// If you change the plugin ID after releasing the plugin, Construct will think it is an entirely different
	// plugin and assume it is incompatible with the old one, and YOU WILL BREAK ALL EXISTING PROJECTS USING THE PLUGIN.
	// Only the plugin name is displayed in the editor, so to rename your plugin change the name but NOT the ID.
	// If you want to completely replace a plugin, make it deprecated (it will be hidden but old projects keep working),
	// and create an entirely new plugin with a different plugin ID.
	const PLUGIN_ID = "Greenworks";
	////////////////////////////////////////////
	
	const PLUGIN_VERSION = "1.0.82.0";
	const PLUGIN_CATEGORY = "platform-specific";
	
	// All these files are specified as "copy-to-output" dependencies
	const DEPENDENCY_FILES = [
		"greenworks-linux32.node",
		"greenworks-linux64.node",
		"greenworks-osx64.node",
		"greenworks-win32.node",
		"greenworks-win64.node"
	];
	
	let app = null;
	
	const PLUGIN_CLASS = SDK.Plugins.Greenworks = class Greenworks extends SDK.IPluginBase
	{
		constructor()
		{
			super(PLUGIN_ID);
			
			SDK.Lang.PushContext("plugins.greenworks");
			
			this._info.SetName(lang(".name"));
			this._info.SetDescription(lang(".description"));
			this._info.SetVersion(PLUGIN_VERSION);
			this._info.SetCategory(PLUGIN_CATEGORY);
			this._info.SetAuthor("Scirra");
			this._info.SetHelpUrl(lang(".help-url"));
			this._info.SetIsSingleGlobal(true);
			this._info.SetDOMSideScripts(["c3runtime/domSide.js"]);
			
			this._info.AddFileDependency({
				filename: "c3runtime/greenworks.js",
				type: "copy-to-output",
				fileType: "application/javascript"
			});
			
			// Add all dependency files so they are bundled with the plugin
			for (const filename of DEPENDENCY_FILES)
			{
				this._info.AddFileDependency({
					filename,
					type: "copy-to-output",
					fileType: "application/octet-stream"
				});
			}
			
			SDK.Lang.PopContext();
		}
	};
	
	PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
	
}());