from django.shortcuts import render
from django.views.generic import View

from netbox.settings import VERSION # type: ignore
if VERSION.startswith("3."):
    from extras.plugins import get_plugin_config # type: ignore
else:
    from netbox.plugins import get_plugin_config # type: ignore

class ContextMenuRenderView(View):
    def get(self, request):
        return render(
            request, 
            'netbox_contextmenus/nbcm.js', 
            { 'opendelay' : get_plugin_config('netbox_contextmenus', 'nbcmopendelay') }, 
            content_type='application/javascript'
        )
