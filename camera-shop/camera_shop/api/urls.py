from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, OrderCreateView, RegisterView, LoginView, ProfileView

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('orders/', OrderCreateView.as_view(), name='order-create'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView, name='profile'),
]
