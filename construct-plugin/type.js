"use strict";

(function()
{
	const PLUGIN_CLASS = SDK.Plugins.Greenworks;
	
	PLUGIN_CLASS.Type = class GreenworksType extends SDK.ITypeBase
	{
		constructor(sdkPlugin, iObjectType)
		{
			super(sdkPlugin, iObjectType);
		}
	};
}());