<template>
    <div class="catalog__card">
        <RouterLink to="content">
            <div class="catalog__card-img">
                <img :src="image" alt="ImgCatalog" class="img__catalog">
            </div>
            <div class="catalog__card-texts">
                <div class="catalog__price-wrap">
                    <img :src="discountIcon" alt="">
                    <span class="catalog__card-price" :class="{ 'no-discount-color': !hasDiscount }">{{ price }} ₽</span>
                    <span v-if="oldPrice" class="catalog__card-noDiscount">{{ oldPrice }} ₽</span>
                </div>
                <p v-if="hasDiscount">Со скидкой</p>
                <div>
                    <p class="catalog__card__block-text">{{ brand }} <span>/ {{ category }}</span></p>
                    <div class="catalod__rating-wrap">
                        <img :src="starIcon" alt="">
                        <p>{{ rating }} <span>• {{ reviews }} оценок</span></p>
                    </div>
                </div>
            </div>
        </RouterLink>
        <div class="catalog__card-phone-wrap">
            <slot name="action">
                <RouterLink to="/form">
                    <p class="catalog__card-phone">Заказать</p>
                </RouterLink>
            </slot>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

import discountIcon from '@/assets/icons/discountIcon.png'
import starIcon from '@/assets/icons/starIcon.png'


// Props
const props = defineProps({
  content: {
    type: String,
    default: '/content'
  },
  image: {  
    type: String,
    required: true,
    default: "Нет картинки"
  },
  price: {
    type: String,
    required: true,
    default: "Нет цены"
  },
  oldPrice: {
    type: String,
    default: 'Нет старой цены'
  },
  hasDiscount: {
    type: Boolean,
    default: false
  },
  brand: {
    type: String,
    required: true,
    default: "Нет бренда"
  },
  category: {
    type: String,
    required: true,
    default: "Без категории"
  },
  rating: {
    type: String,
    default: 'Нет рейтинга'
  },
  reviews: {
    type: String,
    default: 'Нет'
  }
});

</script>

<style scoped lang="scss">

.catalog__card
{
     display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 275px; /* Фиксированная ширина по вашему требованию */
    background: white;
    border-bottom: 1px solid #bababa;
    border-radius: 30px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    
    &-img
    {
    width: 275px;
    max-height: 367px; 
    overflow: hidden; /* Обрезаем всё, что выходит за границы */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    }
    
    &-texts
    {
        padding: 0px 20px;
        padding-top: 10px;
        padding-bottom: 15px;
        
        > p { 
            color: #fa6161;
            margin-bottom: 7px;
            font-size: 14px;
            font-weight: 600;
        }
    }
    
    &-price
    {
        color: #f04a4a;
        font-weight: 600;
        font-size: 18px;
        margin-right: 3px;

        &.no-discount-color
        {
            color: #000000;
        }
    }
    
    &-noDiscount
    {
        font-size: 15px;
        text-decoration: line-through;
        text-decoration-thickness: 1px;
        font-weight: 540;
        color: #868695;
    }
}


.img__catalog
{
     width: 100%;
    height: 100%;
    object-fit: cover; /* Заполняет контейнер без искажений */
    object-position: center; /* Центрируем изображение */
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    transition: transform 0.3s ease;
    
    &:hover {
        transform: scale(1.03); /* Небольшой эффект увеличения при наведении */
    }
}
.catalog__card-phone-wrap
{
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 20px;
}
.catalog__card__block-text
{
    color: #000000;
    font-weight: 500;
    font-size: 13px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 4px;
    
    > span
    {
        color: #9d9da5;
        font-size: 13px;
        font-weight: 600;
    }
}
.catalod__rating-wrap
{
    display: flex;
    align-items: center;
    gap: 5px;
    
    > p 
    {
        color: #000000;
        font-size: 15px;
        font-weight: 500;
        
        >span
        {
            color: #9d9da5;
            font-size: 14px;
            font-weight: 600;
        }
    }
}
.catalog__price-wrap
{
    display: flex;
    align-items: center;
    gap: 3px;
    margin-bottom: 4px;
}
// Анимация Для кнопки
.catalog__card-phone {
    color: #FFFFFF;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    background: linear-gradient(to right, #ff9514 50%, #ff8514 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    border-radius: 20px;
    padding: 12px 10px;
    width: 249px;
    margin: 0 auto;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    top: 0;
    box-shadow: 0 4px 0 #e07e10, 
    0 6px 10px rgba(255, 149, 20, 0.3);
    
    &:hover {
        background-position: left bottom;
        top: -2px;
        box-shadow: 0 6px 0 #e07e10,
        0 8px 15px rgba(255, 149, 20, 0.4);
        transform: scale(1.02);
    }
    
    &:active {
        top: 2px;
        box-shadow: 0 2px 0 #e07e10,
        0 3px 8px rgba(255, 149, 20, 0.3);
    }
    
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.1);
        opacity: 0;
        transition: opacity 0.3s ease;
        border-radius: 20px;
    }
    
    &:hover::after {
        opacity: 1;
    }
}
</style>