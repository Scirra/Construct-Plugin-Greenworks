
import type { SDKInstanceClass } from "./instance.ts";

const C3 = self.C3;

C3.Plugins.Greenworks.Type = class GreenworksType extends globalThis.ISDKObjectTypeBase<SDKInstanceClass>
{
	constructor()
	{
		super();
	}
	
	_onCreate()
	{	
	}
};
