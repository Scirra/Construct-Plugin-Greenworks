# Read this before contributing or modifying

The [Greenworks library](https://github.com/greenheartgames/greenworks) that this plugin depends on is no longer maintained. This makes it difficult to further support, and so Scirra does not intend to further develop this addon. The code is being open sourced to help anyone who still depends on it. Where possible we recommend using the [Steamworks for WebView2](https://github.com/Scirra/Construct-Plugin-Steamworks) plugin instead.

## Code of conduct

This repository will be managed in accordance with Scirra's [Forum & Community guidelines](https://www.construct.net/en/forum/general/open-topic-33/forum-community-guidelines-141035).

## Accepting contributions

As Scirra does not intend to further develop this addon, we also do not intend to accept code changes to it.

Instead if you want to make alterations, we recommend cloning the plugin, **change the plugin ID** to avoid compatibility problems with the original plugin, and rename the plugin (which is only cosmetic but will help avoid confusion). This essentially makes it an entirely separate kind of plugin. This will avoid severe compatibility problems and project corruption that can result if you modify a plugin but don't change it's ID, since your modifications will result in a plugin that Construct thinks is compatible with other projects, but is in fact incompatible.

For example if you want to make a local modification to this plugin, clone it, change the plugin ID from `Greenworks` to something like `Greenworks_MyCompanyMods`, rename it, and then make your modifications. Now you have your own unique plugin that you can modify to your heart's content, and won't cause compatibility nightmares with the original plugin.