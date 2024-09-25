from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """
    Настройка отображения модели Product в админке.
    """
    list_display = ('id', 'name', 'price')  # Поля, отображаемые в списке
    search_fields = ('name',)  # Поля для поиска
    list_filter = ('price',)   # Фильтрация по цене
