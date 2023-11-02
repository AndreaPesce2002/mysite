from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ModelViewSet

post_router = DefaultRouter()
post_router.register(r'post', ModelViewSet)