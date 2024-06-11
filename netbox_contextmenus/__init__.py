from netbox.settings import VERSION # type: ignore
if VERSION.startswith("3."):
    from extras.plugins import PluginConfig # type: ignore
else:
    from netbox.plugins import PluginConfig # type: ignore

from .pluginvars import (
    __version__,
    __name__,
    __description__,
    __author__,
    __author_email__,
)


class NetboxContextMenusConfig(PluginConfig):
    name = __name__
    verbose_name = "NetBox ContextMenu"
    description = __description__
    version = __version__
    author = __author__
    author_email = __author_email__
    required_settings = []
    default_settings = {
        'nbcmjspath': '/plugins/netbox_contextmenus/nbcmrender/',
        'nbcmopendelay': 150
    }
    baseurl = "netbox_contextmenus"
    middleware = ["netbox_contextmenus.middleware.ContextMenusMiddleware"]

config = NetboxContextMenusConfig
