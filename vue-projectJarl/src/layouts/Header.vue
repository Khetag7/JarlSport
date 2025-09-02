<!-- ? 1начни делать разные страницы в футере 2сделай форму заказа и Подключи CRM системы -->
<!-- ? 3потихоньку начни делать Внутренюю часть карточек, -->
<!-- ? 4Медии ВСЕГО 1 медиа 1550 -->
<!-- * 25тр✓ + 20тр + 20тр + 25тр + 20тр  -->
 
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import logo from '@/assets/icons/JarlSportLogo.png'
import phoneIcon from '@/assets/icons/TelephoneIcon.png' 
import bottomArrowIcon from '@/assets/icons/BottomArrow.png' 

const phoneNumber = ref('+7 (999) 111-22-33')


</script>

<template>
    <header>
        <div class="container">
            <div class="header__block-top">
                <div class="header__logo">
                    <RouterLink to="/">
                        <img :src='logo' alt="LOGO">
                    </RouterLink>
                    <p>Товары Из Китая на Складе в Москве Оптом.</p>
                </div>
                <div class="header__phone-block">
                    <a :href="`tel:${phoneNumber}`" class="header__phone">
                        <span class="phone-text">{{phoneNumber}}</span>
                        <img :src="phoneIcon" alt="PhoneNumberPng" class="phone-icon">
                    </a>
                    <span class="phone-caption">Позвоните нам для консультации</span>
                </div>
            </div>
            <div class="header__block-bottom">
                <nav>
                    <ul class="header__wrapp">
                        <RouterLink to="/childGoods">
                            <li class="nav-item">
                                <span>Детcкие товары</span>
                                <img :src="bottomArrowIcon" alt="bottomArrow" class="arrow-icon">
                                <div class="underline"></div>
                            </li>
                        </RouterLink>
                        <RouterLink to="/sportGoods">
                            <li class="nav-item">
                                <span>Спорт товары</span>
                                <img :src="bottomArrowIcon" alt="bottomArrow" class="arrow-icon">
                                <div class="underline"></div>
                            </li>
                        </RouterLink>
                        <RouterLink to="/thermalGoods">
                            <li class="nav-item">
                                <span>Термобелье</span>
                                <img :src="bottomArrowIcon" alt="bottomArrow" class="arrow-icon">
                                <div class="underline"></div>
                            </li>
                        </RouterLink>
                        <RouterLink to="/girlsGoods">
                            <li class="nav-item">
                                <span>Лучшее для девушек</span> 
                                <img :src="bottomArrowIcon" alt="bottomArrow" class="arrow-icon">
                                <div class="underline"></div>
                            </li>
                        </RouterLink>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
header
{
    padding-top: 23px;
    padding-bottom: 25px;
    background: white;
    border-bottom: 1px solid #bababa;
    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 50px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
.header__block-top
{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
}
.header__logo
{
    display: flex;
    align-items: center;
    gap: 10px;
    
    & p
    {
        font-size: 15px;
        font-weight: 400;
    }
}
.header__wrapp
{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 177px;
}

.header__phone-block {
    display: flex;
    gap: 3px;
    flex-direction: column;
    align-items: flex-end;
    position: relative;
}

.phone-caption {
    color: #b3b3b3;
}

.header__phone {
    color: #000000;
    font-size: 25px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    text-decoration: none;
    position: relative;
    
    .phone-text {
        transition: all 0.3s ease;
    }
    
    
    &:hover {
        .phone-text {
            transform: translateY(-3px) scale(1.05);
            display: inline-block;
        }
    }
}
.nav-item {
    position: relative;
    cursor: pointer;
    font-weight: 300;
    text-align: center;
    color: #000;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 0;
}

.underline {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #000;
    transition: all 0.3s ease;
}

.arrow-icon {
    transition: transform 0.3s ease;
}

.nav-item:hover {
    .underline {
        width: 100%;
    }
    .arrow-icon {
        transform: rotate(90deg);
    }
}
</style>

