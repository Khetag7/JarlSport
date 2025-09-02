<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import phoneIconFooter from '@/assets/icons/phoneIconFooter.png' 
    import EmailIcon from '@/assets/icons/EmailIcon.png' 
    import Delivery from '@/assets/icons/Delivery.png' 


</script>

<template>
    <footer>
        <div class="container">
            <div class="footer__wrap">
            <div class="footer__left">
                <p class="footer__left-title">JARL SPORT - Компания производящая спортивную одежду и спортивное снаряжение.</p>
                <div class="footer__left-elements">
                    <img :src="EmailIcon" alt="Email Icon" class="footer__imgs">
                    <div class="footer__left-el">
                        <span>Наша почта: </span>
                        <a href="mailto:" class="email-link">Email</a>
                    </div>
                </div>
                <div class="footer__left-elements">
                    <img :src="phoneIconFooter" alt="Phone Icon" class="footer__imgs">
                    <div class="footer__left-el">
                        <span>Наш телефон:</span>
                        <a href="tel:+79001111111" class="phone-link">+7 (900) 111-11-11</a>
                    </div>
                </div>
                <div class="footer__left-elements">
                    <img :src="Delivery" alt="Delivery Icon" class="footer__imgs">
                    <span class="footer__left-delivery">Доставка по всей России</span>
                </div>
            <p class="footer__left-conf">© 2024 JARL SPORT. Все права защищены.</p>
            <p class="footer__left-infor">© Разработка интернет магазина 2025г</p>
            </div>
            <div class="footer__right">
                <ul class="footer__right-list">
                    <p>О нас</p>
                    <li>
                       <RouterLink to="/company">
                           <span>О компании</span>
                       </RouterLink> 
                    </li>
                    <li>
                        <RouterLink to="/contact">
                           <span>Контактная Информация</span>
                       </RouterLink> 
                    </li>
                    <li>
                        <RouterLink to="/advantages">
                           <span>Преимущества</span>
                       </RouterLink>
                    </li>
                </ul>
                <span class="footer__right-dev">
                    Связь с разработчиком через Менеджера:
                    <a href="https://vk.com/davidsiukaev15?from=groups">Ссылка</a> 
                </span>
            </div>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
    footer
    {
       padding-top: 50px;
       padding-bottom: 50px;
       background-color: #1B1E1E;
    }
    .footer__wrap
    {
        display: flex;
        justify-content: space-between;
    }
    .footer__left
    {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .footer__left-infor
    {
        color: #FFFFFF;
        font-size: 14px;
    }
    .footer__left-title
    {
        color: #FFFFFF;
        font-size: 18px;
        font-weight: 500;
    }
    .footer__left-elements
    {
        display: flex;
        gap: 7px;
        align-items: center;
    }
    .footer__left-el
    {
        display: flex;
        align-items: center;
        gap: 5px;
        > span
        {
            color: #FFFFFF;
            font-size: 15px;
        }

        > a
        {
            font-size: 18px;
            color: #FFFFFF;
        }
    }
    .footer__left-delivery
    {
        color: #FFFFFF;
        font-size: 15px;
    }
    .footer__left-conf
    {
        font-size: 14px;
        color: #FFFFFF;
    }
    .footer__right
    {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        &-list
        {
            display: flex;
            flex-direction: column;
            gap: 15px;

            >p
            {
                color: #FFFFFF;
                font-size: 20px;
                margin-bottom: 5px;
            }

            >li span
            {
                font-size: 16px;
                color: #868695;
                font-weight: 300;
            }
        }
    }
    .phone-link,
.email-link {
    font-size: 18px;
    color: #FFFFFF;
    transition: color 0.4s ease;
    
    &:hover {
        color: #b3b3b3; /* Серый цвет при наведении */
    }
}
.footer__right-dev
{
    font-size: 14px;
    color: #9d9da5;

    a 
    {
        font-size: 16px;
        color: #FFFFFF;
    }
}
</style>