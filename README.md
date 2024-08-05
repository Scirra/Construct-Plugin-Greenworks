# Greenworks plugin
This repository contains code for the [Greenworks Construct plugin](https://www.construct.net/en/make-games/addons/84/greenworks). This plugin uses the [Greenworks library](https://github.com/greenheartgames/greenworks) to interact with the Steamworks SDK when using the NW.js exporter.

> [!NOTE]
> Where possible we advise using the [Steamworks for WebView2](https://github.com/Scirra/Construct-Plugin-Steamworks) plugin instead. Scirra does not intend to further develop this addon, but it is occasionally updated to support new NW.js/Steamworks SDK versions, and the code is open sourced to help anyone who wishes to customize it.

## Build

Before building a usable version of the plugin, you will need the Greenworks node binaries (a set of .node files for each platform). These need to be added alongside the plugin files in the *construct-plugin* subfolder.

> [!WARNING]
> If you want to modify the plugin for your own purposes, we strongly advise to **change the Construct plugin ID.** This will avoid serious compatibility problems which could result in your project becoming unopenable. For more information see the [Contributing guide](https://github.com/Scirra/Construct-Plugin-Greenworks/blob/main/CONTRIBUTING.md).

## Testing

Use [developer mode](https://www.construct.net/en/make-games/manuals/addon-sdk/guide/using-developer-mode) for a more convenient way to test the Construct plugin during development.

For details about configuring and exporting projects for Steam, refer to the [Greenworks plugin documentation](https://www.construct.net/en/make-games/addons/84/greenworks/documentation).

## Distributing

The Construct plugin is distributed as a [.c3addon file](https://www.construct.net/en/make-games/manuals/addon-sdk/guide/c3addon-file), which is essentially a renamed zip file with the addon files.

> [!WARNING]
> If you want to modify the plugin for your own purposes, we strongly advise to **change the Construct plugin ID.** This will avoid serious compatibility problems which could result in your project becoming unopenable. For more information see the [Contributing guide](https://github.com/Scirra/Construct-Plugin-Greenworks/blob/main/CONTRIBUTING.md).

## Support

Scirra does not intend to further develop this addon, and we are not expecting to provide any further significant support for it. However the code is available in case you want to clone it and make your own alterations.

## Contributing

Scirra does not intend to further develop this addon. There is some more advice in the [Contributing guide](https://github.com/Scirra/Construct-Plugin-Greenworks/blob/main/CONTRIBUTING.md).

## License

This code is published under the [MIT license](LICENSE).
