<template>
  <section class="feedback">
    <div class="feedback__container">
      <!-- Фоновые элементы -->
      <div class="decor decor-1"></div>
      <div class="decor decor-2"></div>
      <div class="decor decor-3"></div>
      
      <div class="feedback__form">
        <transition name="slide-fade" mode="out-in">
          <!-- Форма -->
          <form 
            v-if="!isSubmitted" 
            key="form"
            @submit.prevent="submitForm"
            class="feedback-form"
          >
            <div class="feedback__titles">
              <h2>Обратная связь</h2>
              <p>Оставьте заявку и мы свяжемся с вами!</p>
            </div>
            
            <div class="feedback__block">
              <div class="input-group">
                <span>Ваше имя <sup>*</sup></span>
                <input 
                  type="text" 
                  class="feedback__form-input" 
                  :class="{ 'error': nameError }"
                  name="firstName" 
                  autocomplete="given-name"
                  placeholder="Имя"
                  v-model="name"
                  @focus="animateInput($event)"
                  @blur="validateName">
                <div class="error-message" v-if="nameError">{{ nameError }}</div>
              </div>
              
              <div class="input-group">
                <span>Электронная почта</span>
                <input 
                  type="email" 
                  class="feedback__form-input" 
                  placeholder="Email"
                  id="email" 
                  v-model="email"
                  @focus="animateInput($event)"
                  @blur="validateEmail">
                <div class="error-message" v-if="emailError">{{ emailError }}</div>
              </div>
              
              <div class="input-group">
                <span>Номер телефона <sup>*</sup></span>
                <div class="phone-input-wrapper">
                  <input
                    type="tel"
                    class="feedback__form-input phone-input"
                    :class="{ 
                      'has-value': phoneValue.length > prefix.length, 
                      'error': phoneError 
                    }"
                    v-maska="'+7 ### ### ## ##'"
                    v-model="phoneValue"
                    @keydown="protectPrefix($event)"
                    @focus="handlePhoneFocus($event)"
                    @blur="validatePhone">
                </div>
                <div class="error-message" v-if="phoneError">{{ phoneError }}</div>
              </div>
              
              <div class="required-fields">
                <sup>*</sup> Поля, обязательные для заполнения
              </div>
              
              <div v-if="submitError" class="error-message">{{ submitError }}</div>
              
              <button 
                type="submit"
                class="feedback__form-input-accept"
                @mouseenter="hoverButton"
                @mouseleave="unhoverButton"
                :disabled="isLoading">
                {{ isLoading ? 'Отправка...' : 'Отправить заявку' }}
                <span class="button-wave"></span>
              </button>
            </div>
          </form>
          
          <!-- Сообщение об успехе -->
          <div v-else key="success" class="success-message">
            <svg class="success-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
            </svg>
            <h3>Заявка успешно отправлена!</h3>
            <p>Мы свяжемся с вами в ближайшее время</p>
            <div class="success-buttons">
              <button 
                class="success-button"
                @click="resetForm">
                Отправить новую заявку
              </button>
              <button 
                class="success-button secondary"
                @click="goToHome">
                Перейти на главную
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { vMaska } from "maska/vue"
import { useRouter } from 'vue-router'

const submitError = ref('');
const router = useRouter()
const isSubmitted = ref(false)
const isLoading = ref(false); 

const submitForm = async () => {
  if (!validateForm()) return;
  
  isLoading.value = true;
  submitError.value = '';
  
  try {
    const formData = {
      name: name.value,
      email: email.value,
      phone: phoneValue.value
    };
    
    await sendToTelegram(formData);
    isSubmitted.value = true;
  } catch (error) {
    submitError.value = 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.';
    console.error('Ошибка при отправке формы:', error);
  } finally {
    isLoading.value = false;
  }
};

const sendToTelegram = async (data) => {
  const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  
  const message = `
📌 Новая заявка с сайта:
  
👤 Имя: ${data.name}
📧 Email: ${data.email || 'не указан'}
📞 Телефон: ${data.phone}
  `;
  
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message
    }),
  });
  
  if (!response.ok) {
    throw new Error('Ошибка при отправке в Telegram');
  }
  
  return response.json();
};

const resetForm = () => {
  isSubmitted.value = false
  name.value = ''
  email.value = ''
  phoneValue.value = '+7 '
  nameError.value = ''
  emailError.value = ''
  phoneError.value = ''
  submitError.value = ''
}

const goToHome = () => {
  router.push('/')
}

const name = ref('')
const email = ref('')
const phoneValue = ref('+7 ')
const prefix = '+7 '

const nameError = ref('')
const emailError = ref('')
const phoneError = ref('')

const validateName = () => {
  if (!name.value.trim()) {
    nameError.value = 'Поле обязательно для заполнения'
    return false
  }
  if (name.value.length < 2) {
    nameError.value = 'Имя должно содержать минимум 2 символа'
    return false
  }
  if (name.value.length > 25) {
    nameError.value = 'Имя должно содержать не более 25 символов'
    return false
  }
  nameError.value = ''
  return true
}

const validateEmail = () => {
  if (!email.value) {
    emailError.value = ''
    return true
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    emailError.value = 'Введите корректный email'
    return false
  }
  emailError.value = ''
  return true
}

const validatePhone = () => {
  if (!phoneValue.value || phoneValue.value === prefix) {
    phoneError.value = 'Поле обязательно для заполнения'
    return false
  }
  if (phoneValue.value.replace(/\D/g, '').length !== 11) {
    phoneError.value = 'Введите полный номер телефона'
    return false
  }
  phoneError.value = ''
  return true
}

const protectPrefix = (e) => {
  const selectionStart = e.target.selectionStart
  
  if (
    (e.key === 'Backspace' || e.key === 'Delete') && 
    selectionStart <= prefix.length
  ) {
    e.preventDefault()
  }
  
  if (e.ctrlKey && e.key === 'v') {
    e.preventDefault()
  }
}

const handlePhoneFocus = (e) => {
  animateInput(e)
  
  if (!e.target.value.startsWith(prefix)) {
    phoneValue.value = prefix
  }
  
  setTimeout(() => {
    const cursorPos = Math.max(prefix.length, e.target.selectionStart)
    e.target.setSelectionRange(cursorPos, cursorPos)
  }, 0)
}

const animateInput = (e) => {
  e.target.classList.add('input-focused')
  if (e.target.name === 'firstName') nameError.value = ''
  if (e.target.id === 'email') emailError.value = ''
  if (e.target.id === 'phone') phoneError.value = ''
}

const hoverButton = (e) => {
  e.target.classList.add('button-hover')
}

const unhoverButton = (e) => {
  e.target.classList.remove('button-hover')
}

const validateForm = () => {
  const isNameValid = validateName()
  const isEmailValid = validateEmail()
  const isPhoneValid = validatePhone()
  return isNameValid && isEmailValid && isPhoneValid
}
</script>

<style scoped lang="scss">
.feedback {
  position: relative;
  overflow: hidden;
  padding: 80px 0;
  background: linear-gradient(135deg, #f9f9ff 0%, #f0f4ff 100%);
  
  &__container {
    position: relative;
    max-width: 832px;
    margin: 0 auto;
    width: 100%;
    padding: 0 16px;
    z-index: 2;
  }
  
  &__form {
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 25px;
    padding: 50px 40px;
    border-radius: 20px;
    background: white;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  }
  
  &__titles {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 10px;
    
    h2 {
      font-size: 22px;
      font-weight: 500;
    }
    
    p {
      font-size: 16px;
      font-weight: 300;
      color: #BBBBBB;
    }
  }
  
  &__block {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; 
    gap: 10px;
    width: 100%;
    
    .input-group {
      width: 100%;
      max-width: 400px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      
      span {
        font-size: 15px;
        font-weight: 400;
        
        sup {
          color: #ff4d4f;
        }
      }
    }
  }
  
  &__form-input {
    width: 100%;
    max-width: 400px;
    padding: 15px 20px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    font-size: 16px;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1);
    outline: none;
    background-color: #f9f9f9;
    
    &.error {
      border-color: #ff4d4f !important;
      animation: shake 0.5s;
    }
    
    &.input-focused {
      transform: translateY(-3px);
      border-color: #4a6cf7;
      box-shadow: 0 5px 15px rgba(74, 108, 247, 0.2);
      
      &::placeholder {
        opacity: 0.5;
        transform: translateX(5px);
      }
    }
    
    &::placeholder {
      color: #a0a0a0;
      transition: all 0.3s ease;
    }
  }
  
  .error-message {
    color: #ff4d4f;
    font-size: 12px;
    margin-top: -3px;
    height: 15px;
  }
  
  .required-fields {
    margin-top: 5px;
    font-size: 12px;
    color: #BBBBBB;
    margin-bottom: 5px;
    max-width: 400px;
    
    sup {
      color: #ff4d4f;
    }
  }
  
  .phone-input-wrapper {
    width: 100%;
    max-width: 400px;
    position: relative;
    
    .phone-input {
      color: #a0a0a0;
      
      &.has-value {
        color: inherit;
      }
      
      &::placeholder {
        color: transparent;
      }
    }
  }
  
  &__form-input-accept {
    margin-top: 15px;
    position: relative;
    width: 100%;
    max-width: 400px;
    padding: 18px 25px;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    color: white;
    background: linear-gradient(45deg, #4a6cf7 0%, #6a5acd 100%);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1);
    overflow: hidden;
    z-index: 1;
    
    .button-wave {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 5px;
      height: 5px;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      z-index: -1;
    }
    
    &.button-hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(74, 108, 247, 0.3);
      
      .button-wave {
        animation: wave 0.6s ease-out;
      }
    }
    
    &:active {
      transform: translateY(0);
    }
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
  
  // Фоновые элементы
  .decor {
    position: absolute;
    border-radius: 50%;
    z-index: 1;
    opacity: 0.08;
    
    &-1 {
      width: 300px;
      height: 300px;
      background: #4a6cf7;
      top: -100px;
      left: -100px;
    }
    
    &-2 {
      width: 200px;
      height: 200px;
      background: #6a5acd;
      bottom: -50px;
      right: -50px;
    }
    
    &-3 {
      width: 150px;
      height: 150px;
      background: #4a6cf7;
      top: 9%;
      right: 18%;
    }
  }
}

// Стили для сообщения об успехе
.success-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
  height: 100%;
  
  .success-icon {
    width: 80px;
    height: 80px;
    color: #4CAF50;
    margin-bottom: 25px;
    animation: bounceIn 0.6s;
  }
  
  h3 {
    font-size: 24px;
    font-weight: 600;
    color: #4CAF50;
    margin-bottom: 15px;
  }
  
  p {
    font-size: 16px;
    color: #666;
    margin-bottom: 30px;
    max-width: 350px;
    line-height: 1.5;
  }
}

.success-buttons {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.success-button {
  padding: 14px 28px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  background: linear-gradient(45deg, #6c757d, #495057);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(76, 175, 80, 0.2);
  
  &.secondary {
    background: linear-gradient(45deg, #4CAF50, #2E7D32);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(76, 175, 80, 0.25)
    }
  }
  
  &:hover {
    box-shadow: 0 6px 12px rgba(108, 117, 125, 0.25);
  }
  
  &:active {
    transform: translateY(0);
  }
}

// Анимации
@keyframes wave {
  0% {
    width: 5px;
    height: 5px;
    opacity: 0.8;
  }
  100% {
    width: 400px;
    height: 400px;
    opacity: 0;
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(5px);
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

@keyframes bounceIn {
  0% {
    transform: scale(0.1);
    opacity: 0;
  }
  60% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}
</style>