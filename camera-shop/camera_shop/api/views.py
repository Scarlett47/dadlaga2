from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product, Order, OrderItem
from .serializers import ProductSerializer, OrderSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class OrderCreateView(APIView):
    def get(self, request):
        orders = Order.objects.all().order_by('-created_at') # Шинэ захиалгуудыг хамгийн түрүүнд
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Бүх талбарыг бөглөнө үү.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Ийм хэрэглэгчийн нэр бүртгэлтэй байна.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password)
        return Response({'message': 'Амжилттай бүртгэгдлээ!'}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({'error': 'Нэвтрэх мэдээлэл буруу байна!'}, status=status.HTTP_401_UNAUTHORIZED)
        

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
User = get_user_model()

@api_view(['GET', 'PUT'])  # ✅ энд зөвхөн ЖИЖИГ ҮСГЭЭР api_view
@permission_classes([IsAuthenticated])
def ProfileView(request):
    user = request.user

    if request.method == 'GET':
        return Response({
            'username': user.username,
            'email': user.email,
        })

    if request.method == 'PUT':
        data = request.data
        username = data.get('username')
        email = data.get('email')
        current_password = data.get('current_password')
        new_password = data.get('new_password')
        confirm_password = data.get('confirm_password')

        if username:
            user.username = username
        if email:
            user.email = email

        if current_password and new_password and confirm_password:
            if not check_password(current_password, user.password):
                return Response({'error': 'Одоогийн нууц үг буруу байна.'}, status=400)
            if new_password != confirm_password:
                return Response({'error': 'Шинэ нууц үг таарахгүй байна.'}, status=400)
            user.set_password(new_password)

        user.save()
        return Response({
            'message': 'Мэдээлэл амжилттай шинэчлэгдлээ!',
            'username': user.username,
            'email': user.email,
        })