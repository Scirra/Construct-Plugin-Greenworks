
const PLUGIN_CLASS = SDK.Plugins.Greenworks;

PLUGIN_CLASS.Type = class GreenworksType extends SDK.ITypeBase
{
	constructor(sdkPlugin: SDK.IPluginBase, iObjectType: SDK.IObjectType)
	{
		super(sdkPlugin, iObjectType);
	}
};

export {}