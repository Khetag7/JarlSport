<!-- components/CatalogComponents/CatalogSort.vue -->
<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  productsData: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

const emit = defineEmits(['update:sorted-products', 'update:sort-method'])

const sortOption = ref('default')

// Преобразуем объект в массив для сортировки
const productsArray = computed(() => {
  return Object.values(props.productsData)
})

// Функция для преобразования строки в число
const parseNumber = (value) => {
  // Если значение отсутствует или null/undefined, возвращаем -1 (будет в конце списка)
  if (value === null || value === undefined || value === '') return -1;
  
  // Если уже число - возвращаем как есть
  if (typeof value === 'number') return value;
  
  // Преобразуем строку в число
  const num = parseFloat(String(value).replace(',', '.').replace(/[^\d.-]/g, ''));
  
  // Если преобразование не удалось (NaN) - возвращаем -1
  return isNaN(num) ? -1 : num;
}

// Сортированные товары
const sortedProducts = computed(() => {
  if (!productsArray.value.length) return [];
  
  // Создаем глубокую копию массива
  const productsCopy = JSON.parse(JSON.stringify(productsArray.value));
  
  switch(sortOption.value) {
    case 'price-asc':
      return productsCopy.sort((a, b) => {
        const priceA = parseNumber(a.price);
        const priceB = parseNumber(b.price);
        return priceA - priceB;
      });
    case 'price-desc':
      return productsCopy.sort((a, b) => {
        const priceA = parseNumber(a.price);
        const priceB = parseNumber(b.price);
        return priceB - priceA;
      });
    case 'rating':
  return productsCopy.sort((a, b) => {
    const ratingA = a.rating !== null && a.rating !== undefined ? parseNumber(a.rating) : -1;
    const ratingB = b.rating !== null && b.rating !== undefined ? parseNumber(b.rating) : -1;
    
    // Сначала идут товары с рейтингом (по убыванию), затем без рейтинга
    if (ratingA === -1 && ratingB === -1) return 0;
    if (ratingA === -1) return 1;
    if (ratingB === -1) return -1;
    
    return ratingB - ratingA;
  });
    case 'discount':
      return productsCopy
        .filter(product => product.hasDiscount)
        .sort((a, b) => {
          const priceA = parseNumber(a.price);
          const oldPriceA = parseNumber(a.oldPrice) || priceA;
          const priceB = parseNumber(b.price);
          const oldPriceB = parseNumber(b.oldPrice) || priceB;
          
          const discountA = oldPriceA > 0 ? ((oldPriceA - priceA) / oldPriceA) * 100 : 0;
          const discountB = oldPriceB > 0 ? ((oldPriceB - priceB) / oldPriceB) * 100 : 0;
          
          return discountB - discountA;
        });
    default:
      return productsCopy;
  }
});

// Отслеживаем изменения и отправляем отсортированные данные
watch(sortOption, () => {
  emit('update:sorted-products', sortedProducts.value);
}, { immediate: true });


const handleSortChange = (option) => {
  sortOption.value = option;
   emit('update:sort-method', option) 
  emit('update:sorted-products', sortedProducts.value);
};
</script>

<template>
  <div class="catalog__sort">
    <span>Сортировать:</span>
    <select 
      v-model="sortOption" 
      @change="handleSortChange(sortOption)" 
      class="catalog__sort-select"
    >
      <option value="default">По умолчанию</option>
      <option value="price-asc">По возрастанию цены</option>
      <option value="price-desc">По убыванию цены</option>
      <option value="rating">По рейтингу</option>
      <option value="discount">Со скидкой</option>
    </select>
    
    <div class="catalog__sort-buttons">
      <button 
        @click="handleSortChange('default')" 
        :class="{ 'active': sortOption === 'default' }"
      >
        По умолчанию
      </button>
      <button 
        @click="handleSortChange('price-asc')" 
        :class="{ 'active': sortOption === 'price-asc' }"
      >
        Дешевые
      </button>
      <button 
        @click="handleSortChange('price-desc')" 
        :class="{ 'active': sortOption === 'price-desc' }"
      >
        Дорогие
      </button>
      <button 
        @click="handleSortChange('rating')" 
        :class="{ 'active': sortOption === 'rating' }"
      >
        По рейтингу
      </button>
      <button 
        @click="handleSortChange('discount')" 
        :class="{ 'active': sortOption === 'discount' }"
      >
        Со скидкой
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.catalog__sort {
  display: flex;
  align-items: center;
  gap: 15px;
  
  &-select {
    padding: 8px 15px;
    border-radius: 8px;
    border: 1px solid #ddd;
    background-color: #fff;
    cursor: pointer;
    
    &:focus {
      outline: none;
      border-color: #ff9514;
    }
  }
  
  &-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    
    button {
      padding: 8px 15px;
      border-radius: 8px;
      border: 1px solid #ddd;
      background-color: #fff;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: #f5f5f5;
      }
      
      &.active {
        background-color: #ff9514;
        color: white;
        border-color: #ff9514;
      }
    }
  }
}
</style>