<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useTheme } from 'vuetify';
import Todo from './components/Todo.vue';

const theme = useTheme();

const currentImage = ref('');
const icon = ref('');
const windowWidth = ref(window.innerWidth);

const isDark = computed(() => theme.global.current.value.dark);
const isMobile = computed(() => windowWidth.value < 768);

const updateImg = () => {
  if (isDark.value) {
    currentImage.value = isMobile.value ? '/images/bg-mobile-dark.jpg' : '/images/bg-desktop-dark.jpg';
    icon.value = '/images/icon-sun.svg'; // Ícone de sol para o tema escuro
  } else {
    currentImage.value = isMobile.value ? '/images/bg-mobile-light.jpg' : '/images/bg-desktop-light.jpg';
    icon.value = '/images/icon-moon.svg'; // Ícone de lua para o tema claro
  }
};


const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'myCustomLightTheme' : 'myCustomDarkTheme';
};


const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};


watch([isDark, isMobile], updateImg, { immediate: true });

onMounted(() => {
  updateImg();
  window.addEventListener('resize', updateWindowWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth);
});
</script>

<template>
  <main :class="isDark ? 'bg-veryDarkBlue': 'bg-veryLightGrayBlue'">
    <div class="background-container">
      <img 
        :src="currentImage" 
        alt="Background"
        class="img-background"
      />
    </div>
    <div class="todo-area">
      <div class="todo">
        <h1 :class="isDark ? 'lightGrayishHover' : 'text-veryDarkGrayishBlue'">
          TODO
        </h1>
        <img 
          @click="toggleTheme" 
          :src="icon" 
          alt="Toggle Theme Icon" 
          class="cursor-pointer" 
        />

        
      </div>
      <Todo></Todo>
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100vw;
  margin: 0;
  height: 100vh;
  transition: background-color 0.3s ease;
}

.background-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 350px;
}

img {
  width: 28px;
  height: 28px;
  margin-top: .1rem;
}

h1 {
  font-size: 1.5rem;
  letter-spacing: 1rem;
}

.todo-area {
  width: 90%;
  margin: auto;
  position: relative;
  top: -250px;
  
}

.todo {
  display: flex;
  justify-content: space-between;
}

.img-background {
  width: 100%;
  height: 230px;
  margin-bottom: 130px;
}
</style>
