<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useTheme } from 'vuetify';
import Todo from './components/Todo.vue';
const theme = useTheme();

const currentImage = ref("");
const icon = ref("images/icon-sun.svg")
const updateImg = () => {
  const isMobile = window.innerWidth < 768;
  const isDark = theme.global.current.value.dark;

  if (isDark) {
    currentImage.value = isMobile ? "/images/bg-mobile-dark.jpg" : "/images/bg-desktop-dark.jpg";
    icon.value = "/images/icon-sun.svg"; // Ícone de sol para o tema escuro
  } else {
    currentImage.value = isMobile ? "/images/bg-mobile-light.jpg" : "/images/bg-desktop-light.jpg";
    icon.value = "/images/icon-moon.svg"; // Ícone de lua para o tema claro
  }
};

const toggleTheme = () => {
  theme.global.current.value.dark = !theme.global.current.value.dark
  updateImg()
}

onMounted(() => {
  updateImg();
  window.addEventListener("resize", updateImg); // Detecta redimensionamento
});


onBeforeUnmount(() => {
  window.removeEventListener("resize", updateImg);
});
</script>
<template>
  <div class="top-container">
    <div class="circle"></div>
    <img class="img-bg" :src="currentImage" alt="background">
  </div>

  <main>
    <div class="header-container">
      <h1>TODO</h1>
      <transition class="fade">
        <img @click="toggleTheme" :src="icon" alt="" class="cursor-pointer">
      </transition>
    </div>
    <Todo></Todo>
    <div class="footer">
      <p>Drag and drop to reorder list.</p>
    </div>
    
  </main>
</template>
<style scoped>
.top-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
}

main {
  width: 100%;
  margin: 0;
  max-height: 100dvh;

}

.header-container {

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 5rem;
}

.header-container h1 {
  font-size: 1.8rem;
  letter-spacing: 1.6rem;
}

.img-bg {
  object-fit: cover;
  transition: opacity 1s;
  width: 100%;
  height: 300px;
  
}

.footer{
  letter-spacing: -0.2px;
  line-height: 1.75rem;
  text-align: center;
}
.footer p{
  margin-bottom: 1rem;
}
@media(min-width: 768px) {
  .header-container h1 {
    font-size: 2.25rem;

  }
}
</style>