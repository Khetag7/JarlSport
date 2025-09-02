<script setup>
import { ref, computed, watch } from 'vue'
import { onMounted, onUnmounted } from 'vue'
import { debounce } from 'lodash-es'
import CatalogSort from '@/components/CatalogComponents/CatalogSort.vue'
import BurgerCatalog from '@/components/CatalogComponents/BurgerCatalog.vue'
import ProductCard from '@/components/CatalogComponents/ProductCard.vue'
import { images } from '@/data/imagesImports';
import { sportProducts } from '@/data/sportProps';

const debouncedSearchQuery = ref('');
const productData = ref(sportProducts || []) // Предполагаем, что products - это массив
const displayedProducts = ref([...productData.value]) // Копируем массив
const searchQuery = ref('')
const sortMethod = ref('default')

const updateSortMethod = (method) => {
    sortMethod.value = method
}

// Если productData должен быть объектом, преобразуем его в массив
watch(() => productData.value, (newVal) => {
    displayedProducts.value = Array.isArray(newVal) ? [...newVal] : Object.values(newVal || {});
}, { deep: true, immediate: true });

const updateSortedProducts = debounce((newSortedProducts) => {
    displayedProducts.value = newSortedProducts || []
}, 200)

const debounceSearch = debounce(() => {
    debouncedSearchQuery.value = searchQuery.value;
    // Здесь должна быть логика фильтрации по поисковому запросу
    if (debouncedSearchQuery.value) {
        displayedProducts.value = displayedProducts.value.filter(product => 
            product.name.toLowerCase().includes(debouncedSearchQuery.value.toLowerCase()) ||
            product.brand.toLowerCase().includes(debouncedSearchQuery.value.toLowerCase())
        );
    } else {
        displayedProducts.value = Array.isArray(productData.value) 
            ? [...productData.value] 
            : Object.values(productData.value || {});
    }
}, 300); 

watch(searchQuery, debounceSearch);

onUnmounted(() => {
    updateSortedProducts.cancel()
})
</script>

<template>
    <section class="sportGoods">
        <div class="sportGoods__container">
            <h2 class="sportGoods__title">Спорт товары</h2>
            <div class="sportGoods__wrap">
                <CatalogSort 
                    v-if="displayedProducts.length > 0"
                    :products-data="productData" 
                    @update:sorted-products="updateSortedProducts"
                    @update:sort-method="updateSortMethod"
                />

                <BurgerCatalog menu-text="Спорт товары"/>
            </div>
            <div class="catalog__cards" 
                v-auto-animate="{
                    duration: 300,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: false,
                    scale: false,
                    delay: 0
                }">
                <ProductCard
                    v-for="product in displayedProducts"
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
                <div 
                    v-if="displayedProducts.length === 0" 
                    class="catalog__empty"
                >
                    {{ searchQuery ? 'Ничего не найдено' : 'Нет товаров для отображения' }}
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.sportGoods
{
    margin-top: 35px;
    margin-bottom: 50px;
}
.sportGoods__container
{
    max-width: 1532px;
    margin: 0 auto;
    width: 100%;
    padding: 0 16px;
}
.sportGoods__title
{
    font-size: 30px;
    font-weight: 300;
    text-align: left;
    margin-bottom: 20px;
}
.sportGoods__wrap
{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
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
