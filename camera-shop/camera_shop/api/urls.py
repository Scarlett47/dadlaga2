from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, orders_list_view, create_order_view, RegisterView, LoginView, ProfileView

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('orders/', orders_list_view, name='order-list'),    # /api/orders/ (GET - өөрийн захиалгууд)
    path('orders/create/', create_order_view, name='order-create'), 
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView, name='profile'),
]
