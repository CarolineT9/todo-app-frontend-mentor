<script setup>
import { ref, defineEmits } from 'vue';
const props = defineProps({
    todo: {
        type: Object,
        required: true
    }
});
const emit = defineEmits(['update-todo', 'remove-todo']); // Declare an emit for updating todo
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
        <button :class="selected ? 'btn-check' : 'btn-unchecked '" @click="toggle()">
            <img v-if="selected" src="../../public/images/icon-check.svg" />
        </button>
    </div>

    <div class="title" >
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
    width: 100px;

}

.btn-del {
    display: flex;
    align-items: center;
    height: 50px;
    width: 100px;

}

.title {
    color: hsl(236, 9%, 61%);
    width: 700px;

}

button {
    width: 35px;
    height: 35px;
    border-radius: 35px;

}

img {
    width: 20px;
    margin-bottom: 5px;
}

.btn-check {
    background: linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%));
}


.btn-unchecked {
    width: 35px;
    height: 35px;
    border-radius: 35px;
    border: 1px solid hsl(236, 9%, 61%);
}
</style>