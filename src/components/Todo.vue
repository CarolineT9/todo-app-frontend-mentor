<script setup>
import { ref } from 'vue';
const task = ref('')
const todos = ref([])
let genId =  1

const addTodo = () => {
    
   
    if (!task.value.trim()) return;
    todos.value.push({ id: genId++, text: task.value, completed: false })
    task.value = "";
    
}
const removeTodo = (id) =>{
    todos.value= todos.value.filter(todo => todo.id !== id)
}


</script>
<template>
    <v-container max-width="900">
        <div class="input-box">
            <span class="ml-5 ">
                <button @click="addTodo()" class="circle"></button>
            </span>
            <input v-model="task" type="text" placeholder="Create a new todo" @change="addTodo">

        </div>
        <div class="todos-container">
            <div>
                
                <ul v-for="task in todos" :key="task.id">

                    <div class="d-flex align-center  ">
                        <span class="ml-5">
                            <button class="circle"></button>
                        </span>
                        <li class="ml-5">{{ task.text }}</li>
                    </div>

                    <span class="mr-8">
                        <button @click="removeTodo(task.id)">
                          <img src="../../public/images/icon-cross.svg" alt="">  
                        </button>
                        
                    </span>

                </ul>
                
                
            </div>


        </div>
    </v-container>
</template>



<style scoped>
.input-box {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: rgb(49, 49, 49);
    border-radius: 8px;

}

input {
    width: 100%;
    height: 4rem;
    background-color: rgb(49, 49, 49);
    padding-left: 2rem;
}

.circle {
    width: 32px;
    height: 32px;
    margin-bottom: 20px;
    margin-left: 10px;
    border: rgb(73, 72, 72) 1px solid;
    border-radius: 42px;

}

.todos-container {
    background-color: rgb(49, 49, 49);
    margin-top: 42px;
    border-radius: 8px;

}

.todos-container ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>