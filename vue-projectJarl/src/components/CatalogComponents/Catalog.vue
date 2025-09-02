
<script setup>
import { ref, computed, watch } from 'vue'
import { onMounted, onUnmounted } from 'vue'
import { debounce } from 'lodash-es'
import ProductCard from '@/components/CatalogComponents/ProductCard.vue'
import BurgerCatalog from '@/components/CatalogComponents/BurgerCatalog.vue'
import CatalogSort from '@/components/CatalogComponents/CatalogSort.vue'
import logoBlack from '@/assets/icons/JarlSportLogoBlack.png'
import catalogIcon from '@/assets/icons/CatalogIcon.png'
import { images } from '@/data/imagesImports';
import { products } from '@/data/products';

const debouncedSearchQuery = ref('');
const productData = ref(products || {})
const displayedProducts = ref(Object.values(productData.value || {})) // Переименовали для ясности
const searchQuery = ref('')
const sortMethod = ref('default') // Добавляем локальное состояние

// Обновляем метод сортировки при изменении
const updateSortMethod = (method) => {
  sortMethod.value = method
}

watch(() => productData.value, (newVal) => {
  displayedProducts.value = Object.values(newVal || {});
}, { deep: true, immediate: true });

// Сортировка
const updateSortedProducts = debounce((newSortedProducts) => {
  displayedProducts.value = newSortedProducts || []
}, 200) // Задержка 

// Поиск
const filteredProducts = computed(() => {
  if (!searchQuery.value) return displayedProducts.value;
  
  const query = searchQuery.value.toLowerCase();
  return Object.values(productData.value).filter(product => {
    return (
      product.brand.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query))
    );
  });
});

// Задержка ms
const debounceSearch = debounce(() => {
  debouncedSearchQuery.value = searchQuery.value;
}, 300); 

watch(searchQuery, debounceSearch);

// Сброс debounce при размонтировании
onUnmounted(() => {
  updateSortedProducts.cancel()
})

</script>

<template>
    <section class="catalog">
        <div class="catalog__container">
            <div class="catalog__wrap">
                <div class="catalog__block">
                    <div class="catalog__block-img">
                        <img :src="logoBlack" alt="LOGOblack">
                    </div>
                    <BurgerCatalog />
                </div>
                <div class="catalog__title">
                    <div class="catalog__title-wrap">
                        <h1 class="catalog__title-h1">Каталог <span>JARL SPORT</span> </h1>
                        <img :src="catalogIcon" alt="">
                    </div>
                    <span class="catalog__title-text">{{ filteredProducts.length }} Товаров в каталоге</span>
                </div>
            </div>
            
            <div class="catalog__controls">
                
                <CatalogSort 
                v-if="Object.keys(productData).length > 0"
                :products-data="productData" 
                @update:sorted-products="updateSortedProducts"
                @update:sort-method="updateSortMethod"
                />
                
                <div class="catalog__search">
                    <input 
                    type="text" 
                    v-model="searchQuery" 
                    placeholder="Поиск по каталогу..." 
                    class="catalog__search-input"
                    >
                    <svg class="catalog__search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#868695" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17.5 17.5L13.875 13.875" stroke="#868695" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            
            <div class="catalog__cards" 
            v-auto-animate="
            {
                duration: 300,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: false,
                scale: false,
                delay: 0
            }">
                <template v-if="filteredProducts.length > 0">
                    <ProductCard
                    v-for="product in filteredProducts"
                    :key="`${product.id}-${sortMethod}`"
                    :image="images[product.image]"
                    :price="product.price"
                    :oldPrice="product.oldPrice"
                    :brand="product.brand"
                    :category="product.category"
                    :hasDiscount="product.hasDiscount"
                    :rating="product.rating"
                    :reviews="product.reviews"
                    
                    />
                </template>
                <div v-else class="catalog__empty">
                    {{ searchQuery ? 'Ничего не найдено' : 'Нет товаров для отображения' }}
                </div>
            </div>
        </div>
</section>
</template>

<style scoped lang="scss">
.catalog {
    margin-top: 50px;
    margin-bottom: 50px;
}
.catalog__container
{
    max-width: 1532px;
    margin: 0 auto;
    width: 100%;
    padding: 0 16px;
}

.catalog__wrap {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.catalog__block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    &-img {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #000000;
        border-radius: 15px;
        width: 170px;
        height: 35px;
    }
}

.catalog__title {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 3px;
    margin-bottom: 30px;
    
    &-wrap {
        display: flex;
        flex-direction: row;
        gap: 5px;
        align-items: center;
        justify-content: center;
    }
    
    &-h1 {
        font-size: 32px;
        font-weight: 500;
        span {
            color: #ff9514;
            font-weight: 700;
        }
    }
    
    &-text {
        color: #868695;
    }
}

.catalog__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    gap: 20px;
}

.catalog__search {
    position: relative;
    flex-grow: 1;
    max-width: 400px;
    
    &-input {
        width: 100%;
        padding: 12px 20px 12px 40px;
        border-radius: 8px;
        border: 1px solid #ddd;
        font-size: 16px;
        transition: all 0.3s ease;
        
        &:focus {
            outline: none;
            border-color: #ff9514;
            box-shadow: 0 0 0 2px rgba(255, 149, 20, 0.2);
        }
    }
    
    &-icon {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
    }
}


.catalog__cards {
    display: grid;
    grid-template-columns: repeat( 5, 275px );
    grid-auto-rows: 1fr; /* для выравнивания высоты строк */
    justify-content: space-between; 
    width: 100%;
    row-gap: 20px; /* Отступ между элементами вниз*/
    
    max-height: 1350px; /* Фиксированная высота для скролла */
    overflow-y: auto; /* Вертикальный скролл */
    padding-right: 10px; /* Чтобы контент не заезжал под скроллбар */
    
    /* Стилизация скроллбара */
    scrollbar-width: thin;
    scrollbar-color: #ff9514 #f0f0f0;
    
    
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-track {
        background: #f0f0f0;
        border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ff9514;
        border-radius: 3px;
    }
}

.catalog__cards [data-auto-animate-target] {
  transition: all 0.3s ease-out !important;
}

.catalog__cards [data-auto-animate-enter] {
  opacity: 0;
  transform: translateY(10px);
}

.catalog__cards [data-auto-animate-leave-active] {
  position: absolute;
  width: calc(20% - 16px);
}

.catalog__empty {
    width: 100%;
    text-align: center;
    padding: 40px;
    font-size: 18px;
    color: #868695;
    grid-column: 1 / -1;
}

</style>