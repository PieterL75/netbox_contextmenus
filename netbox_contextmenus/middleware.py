from netbox.settings import VERSION # type: ignore
if VERSION.startswith("3."):
    from extras.plugins import get_plugin_config # type: ignore
else:
    from netbox.plugins import get_plugin_config # type: ignore
    
import re

    
class ContextMenusMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        response = self.get_response(request)
        request_path = request.get_full_path()
        NBCM_JSPATH = get_plugin_config('netbox_contextmenus', 'nbcmjspath')

        if request_path.startswith('/api/'):
            return response
        if NBCM_JSPATH == request.get_full_path():
            return response

        NBCM_JS = '<script src="'+NBCM_JSPATH+'" defer></script>'
        content = str(response.content)
        if not NBCM_JS in content:            
            response.content=re.sub(
                    b'</head>',
                    bytes(NBCM_JS, response.charset) + b'\n  </head>',
                    response.content,
                    flags=re.IGNORECASE
                )
        return response
