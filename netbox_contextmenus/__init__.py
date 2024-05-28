import logging

from django_redis.exceptions import ConnectionInterrupted
from redis.exceptions import ConnectionError

from netbox.settings import VERSION
if VERSION.startswith("3."):
    from extras.plugins import PluginConfig
else:
    from netbox.plugins import PluginConfig

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
        "nbcmjs": '<script src="/static/netbox_contextmenus/nbcm.js"></script>'
    }
    baseurl = "netbox_contextmenus"

    def ready(self):
        try:
            import netbox_contextmenus.signals

            super().ready()

            from core.models import ConfigRevision
            from netbox.config import get_config
            from django.core.cache import cache

            NBCM_JS = self.default_settings["nbcmjs"]

            cache.clear()
            nb_config = get_config()
            nb_config._populate_from_db()
            ConfigRevisions = ConfigRevision.objects.all()
            if not ConfigRevisions:
                DefaultConfigRevisionParams = get_config().config
                ConfigRevisionItem = ConfigRevision.objects.create(
                    data=DefaultConfigRevisionParams
                )
                ConfigRevisionItem.save()
            else:
                for ConfigRevisionItem in ConfigRevisions:
                    if ConfigRevisionItem.is_active:
                        if NBCM_JS not in getattr(
                            ConfigRevisionItem, "BANNER_BOTTOM", ""
                        ):
                            ConfigRevisionItem.save()
        except (ConnectionInterrupted, ConnectionError) as e:
            logger = logging.getLogger("netbox.netbox_contextmenus")
            logger.error("Redis connection is not ready")
            logger.debug(e)


config = NetboxContextMenusConfig
