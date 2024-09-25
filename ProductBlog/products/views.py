from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from django.shortcuts import render

class ProductListCreateAPIView(generics.ListCreateAPIView):
    """
    APIView для получения списка продуктов (GET) и создания нового продукта (POST).
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


def index(request):
    """
    Представление для отображения главной страницы с фронтендом.
    """
    return render(request, 'index.html')