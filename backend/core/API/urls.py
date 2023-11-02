from rest_framework.routers import DefaultRouter
from posts.API.urls import post_router
from django.urls import path, include

roter = DefaultRouter()
# psot
roter.registry.extend(post_router.registry)

urlpatterns = [
    path('', include(roter.urls))
]
