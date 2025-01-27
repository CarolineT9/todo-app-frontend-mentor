<script setup>
import { ref, defineEmits,computed } from 'vue';
import { useTheme } from 'vuetify';
const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark);
const props = defineProps({
    todo: {
        type: Object,
        required: true
    }
});
const emit = defineEmits(['update-todo', 'remove-todo', 'toggleomplete']); // Declare an emit for updating todo
const selected = ref(false);

const toggle = () =>{
    selected.value = !selected.value
    emit('update-todo', { ...props.todo, completed: !props.todo.completed });
};

const handleRemove = ( id)=>{
    emit('remove-todo', id)
};
</script>

<template>
  
    <div class="btn">
        <button v-if="isDark" class="" :class="selected ? 'btn-check' : 'btn-dark '" @click="toggle()">
            <img v-if="selected" src="../../public/images/icon-check.svg" />
        </button>

        <button v-else :class="selected ? 'btn-check' : 'btn-light '" @click="toggle()">
            <img v-if="selected" src="../../public/images/icon-check.svg" />
        </button>
    </div>

    <div class="title text-bold" :class="isDark? 'text-veryLightGrayBlue' : 'text-veryDarkGrayishBlue'" >
        <p :class="selected ?  'text-decoration-line-through' : ''">{{ todo.text }}</p>
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
    width: 70px;
    margin-right:0.5rem ;

}

.btn-del {
   
    height: 20px;
    width: 70px;

}

.title {
    font-size: 1rem;
    
    width: 700px;

}

button {
    width: 20px;
    height: 20px;
    border-radius: 20px;

}

img {
    width: 16px;
    height: 16px;
  
   
}

.btn-check {
    background: linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%));
}


.btn-dark {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    border: 0.2px solid hsl(233, 14%, 35%);
}

.btn-light {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    border: 0.2px solid hsl(236, 9%, 61%);
}

@media (min-width: 890px) {
 .btn{
    margin-right: 0;
   
 }
 .title {
    font-size: 1.2rem;
    width: 700px;

}



}
</style>