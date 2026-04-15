from django.shortcuts import render
from django.views.generic import View

from netbox.settings import VERSION # type: ignore
if VERSION.startswith("3."):
    from extras.plugins import get_plugin_config # type: ignore
else:
    from netbox.plugins import get_plugin_config # type: ignore

class ContextMenuRenderView(View):
    def get(self, request):
        hideburgers = 1 if bool(get_plugin_config('netbox_contextmenus', 'hideburgers', 0)) else 0
        nbcmopendelay = get_plugin_config('netbox_contextmenus', 'nbcmopendelay', 150 if hideburgers==0 else 350)
        return render(
            request, 
            'netbox_contextmenus/nbcm.js', 
            { 
                'opendelay' : nbcmopendelay, 
                'hideburgers' : hideburgers,
            }, 
            content_type='application/javascript'
        )
