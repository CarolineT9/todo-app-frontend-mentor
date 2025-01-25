<script setup>
import { ref, defineEmits, computed } from 'vue';
import { useTheme } from 'vuetify';
const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark);
const props = defineProps({
    todo: {
        type: Object,
        required: true
    }
});
const emit = defineEmits([ 'remove-todo', 'toggle-complete']); // Declare an emit for updating todo
const selected = ref(false);



const handleRemove = ( id)=>{
    emit('remove-todo', id)
};
const toggle = () =>{
    emit('toggle-complete', props.todo.id);
}
</script>

<template>
  
    <div class="btn">
        <button :class="todo.completed ? 'btn-check' : 'btn-unchecked '" @click="toggle()">
            <img v-if="todo.completed" src="../../public/images/icon-check.svg" />
        </button>
    </div>

    <div class="title" >
        <p  :class="todo.completed ?  'text-decoration-line-through' : ''"><span :class="isDark ? 'text-lightGrayishBlue':'text-veryDarkGrayishBlue'">{{ todo.text }}</span></p>
    </div>
    <div class="btn-del">
        <button @click="handleRemove(todo.id)">
            <img src="../../public/images/icon-cross.svg" />
        </button>
    </div>



</template>



<style scoped>
.btn {
    display: flex;
    align-items: center;
    height: 50px;
    width: 80px;

}

.btn-del {
    display: flex;
    align-items: center;
    height: 50px;
    width: 80px;
    margin-right: -40px;

}

.title {
    font-size: 1.2rem;
    font-weight: 500;
    margin-left: -10px;
    width: 100%;

}

button {
    width: 24px;
    height: 24px;
    border-radius: 24px;

}

img {
    width: 16px;
    margin-bottom: 13px;
}

.btn-check {
    background: linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%));
}


.btn-unchecked {
  width: 24px;
  height: 24px;
  border-radius: 50%; /* Botão circular */
  border: 1px solid hsl(236, 9%, 61%); /* Cor inicial da borda */
  background: transparent; /* Fundo transparente */
  position: relative;
  overflow: hidden; /* Garante que o gradiente não extrapole */
  transition: border-color 0.3s ease, background 0.3s ease; /* Suave transição */
}

.btn-unchecked:hover {
  border: 2px solid transparent; /* Faz a borda "desaparecer" momentaneamente */
  border-color: linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%)); /* Gradiente */
  background-origin: border-box; /* Aplica o gradiente na borda */
  background-clip: padding-box, border-box; /* O gradiente aparece na borda */
}
</style>