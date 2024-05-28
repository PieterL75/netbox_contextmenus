from django.db.models.signals import pre_save, post_delete
from django.dispatch import Signal, receiver

from core.models import ConfigRevision
from netbox.config import get_config
from netbox.settings import VERSION
if VERSION.startswith("3."):
    from extras.plugins import get_plugin_config
else:
    from netbox.plugins import get_plugin_config



@receiver(pre_save, sender=ConfigRevision)
def update_configrevision(sender, instance, **kwargs):
    NBCM_JS = get_plugin_config('netbox_contextmenus', 'nbcmjs')
    BANNER_BOTTOM = instance.data.get('BANNER_BOTTOM' ,'')
    if NBCM_JS not in BANNER_BOTTOM:
        instance.data['BANNER_BOTTOM'] = BANNER_BOTTOM + NBCM_JS

@receiver(post_delete, sender=ConfigRevision)
def postdelete_configrevision(sender, instance, **kwargs):
    ConfigRevisions = ConfigRevision.objects.all()
    if not ConfigRevisions:
        DefaultConfigRevisionParams = get_config().config
        ConfigRevisionItem = ConfigRevision.objects.create(data = DefaultConfigRevisionParams)
        ConfigRevisionItem.save()
