<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useTheme } from 'vuetify';
import Todo from './components/Todo.vue';
import FooterView from './components/FooterView.vue';

const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark);
const currentImage = ref('');
const icon = ref('');
const windowWidth = ref(window.innerWidth);

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
  <main :class="isDark ? 'bg-veryDarkBlue' : 'bg-veryLightGrayBlue'">
    <div class="background-container">
      <img :src="currentImage" alt="Background" class="img-background" />
    </div>

    <div class="todo-area">
      <div class="title">
        <h1 :class="isDark ? 'text-lightGrayishHover' : 'text-veryLightGray'">
          TODO
        </h1>
        <img @click="toggleTheme" :src="icon" alt="Toggle Theme Icon" class="cursor-pointer" />

      </div>
      <Todo></Todo>
      <p class="text-center mt-10" :class="isDark ? 'text-darkGrayishBlue' : 'text-darkGrayishBlue'">Drag and drop to reorder list.</p> 
    </div>
   
  </main>

  
    
  

</template>

<style scoped>
main {
  width: 100dvw;
  height: 100dvh;
  margin: 0;
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
  width: 20px;
  height: 20px;
  margin-top: .1rem;
}

h1 {
  font-size: 1.7rem;
  letter-spacing: 0.5rem;
  font-weight: bold;
}

.todo-area {
  width: 85%;
  min-width: 250px;
  margin: auto;
  position: relative;
  top: -310px;

}

.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 35px;


}

.img-background {
  width: 100%;
  height: 230px;
  margin-bottom: 130px;
}
p{
  font-size: 1rem;
  margin-left: -40px;
}
@media (min-width: 890px) {
  .todo-area {
    width: 50%;

    max-width: 800px;
    margin-top: 2rem;
  }
  h1{
    font-size: 2.5rem;
  }
  img {
  width: 35px;
  height: 35px;
  margin-top: .5rem;
}
.img-background {
 
  width: 100%;
  height: 300px;
  margin-bottom: 60px;
}
 
}
</style>
