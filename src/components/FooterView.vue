<script setup>
import { computed } from 'vue';
import { useTheme } from 'vuetify';
const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark);
</script>
<template>
    <div :class="isDark ? 'bg-veryDarkBlue' : 'bg-veryLightGrayBlue'">
         
    </div>
      
    
    
</template>
<style scoped>
div{
    height: 130dvh;
}
p{
    
    font-size: 1rem;
   
}
</style>