<script setup>
import { onMounted, onUnmounted } from 'vue'
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const props = defineProps({
    menuText: {
        type: String,
        default: "Главная" // Значение по умолчанию
    }
});

const router = useRouter();
const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const navigateToMain = () => {
    router.push('/');
    isMenuOpen.value = false;
};

const navigateToFeedback = () => {
    router.push('/feedback');
    isMenuOpen.value = false;
};

// Закрытие меню при клике вне его области
const handleClickOutside = (event) => {
    const menuContainer = document.querySelector('.menu-container');
    if (menuContainer && !menuContainer.contains(event.target)) {
        isMenuOpen.value = false;
    }
};

// Добавляем обработчик при монтировании
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

// Удаляем обработчик при размонтировании
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <div class="menu-container">
        <div class="menu-trigger" @click="toggleMenu">
            <p class="catalog__block-text">{{ menuText }}</p>
            <div class="burger-icon" :class="{ 'open': isMenuOpen }">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <transition name="fade">
            <ul class="dropdown-menu" v-show="isMenuOpen" @click.stop>
                <li class="dropdown-item" @click="navigateToMain">Главная</li>
                <li class="dropdown-item" @click="navigateToFeedback">Обратная связь</li>
            </ul>
        </transition>
    </div>
</template>

<style scoped lang="scss">
.menu-container {
    position: relative;
    display: inline-block;
}

.menu-trigger {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.burger-icon {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 20px;
    height: 16px;
    margin-left: 10px;
    transition: all 0.3s ease;
}

.burger-icon span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: #000;
    transition: all 0.3s ease;
}

.burger-icon.open span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
}

.burger-icon.open span:nth-child(2) {
    opacity: 0;
}

.burger-icon.open span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px 0;
    min-width: 150px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    z-index: 100;
    list-style: none;
    margin-top: 5px;
}

.dropdown-item {
    padding: 8px 15px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.dropdown-item:hover {
    background-color: #f5f5f5;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
.catalog__block-text
{
    font-size: 17px;
    color: #868695;
}
</style>