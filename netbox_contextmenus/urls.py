from django.urls import path
from .views import ContextMenuRenderView

urlpatterns = [
    path('nbcmrender/', ContextMenuRenderView.as_view(), name='nbcmrender'),
]