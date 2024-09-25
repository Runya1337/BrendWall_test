# products/models.py

from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)  # Название продукта
    description = models.TextField()         # Описание продукта
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Цена продукта

    def __str__(self):
        return self.name
