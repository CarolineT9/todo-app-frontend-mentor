<script setup>
import { ref, computed } from 'vue';
import Tasks from './Tasks.vue';
import { useTheme } from 'vuetify';
const theme = useTheme();
const task = ref('');
const todos = ref([]);
const filter = ref('all'); // Estado inicial do filtro
const isDark = computed(() => theme.global.current.value.dark);
let genId = 1;

const addTodo = () => {
    if (!task.value.trim()) return;
    todos.value.push({ id: genId++, text: task.value, completed: false });
    task.value = '';
};

const filteredTodos = computed(() => {
    if (filter.value === 'all') return todos.value;
    if (filter.value === 'active') return todos.value.filter(todo => !todo.completed);
    if (filter.value === 'completed') return todos.value.filter(todo => todo.completed);
});

const removeTodo = id => {
    todos.value = todos.value.filter(todo => todo.id !== id);
};

const toggleComplete = id => {
    const task = todos.value.find(task => task.id === id);
    if (task) task.completed = !task.completed;
};
const clearCompleted = () => {
     todos.value = todos.value.filter(todo => !todo.completed);
};

const tasksLeft = computed(() => todos.value.filter(todo => !todo.completed).length);

</script>
<template>
    <div>
        <div class="tasks" :class="isDark ? 'bg-veryDarkDesaturatedBlue' : 'bg-veryLightGray'">
            <div class="btn-add">
                <button @click="addTodo()"></button>
            </div>
            <div>
                <input v-model="task" type="text" placeholder="Create a new todo" @change="addTodo">
            </div>
        </div>
        <div>
            <div class="tasks-content" :class="isDark ? 'bg-veryDarkDesaturatedBlue' : 'bg-veryLightGray'">
                <div class="task" v-for="todo in filteredTodos" :key="todo.id">
                    <Tasks :todo="todo" @update-todo="updateTodo" @remove-todo="removeTodo"
                        @toggle-complete="toggleComplete" />
                </div>

                <div v-if="todos.length > 0" class="todo-list">

                    <p class=""><span v-if="tasksLeft >= 1"><p>{{ tasksLeft }} items left</p> </span></p>
                    <div class="filter">
                        <button  class=" btn-action btn-all" :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
                        <button  class="btn-action"  :class="{ active: filter === 'active' }" @click="filter = 'active'">Actives</button>
                        <button class="btn-action"  :class="{ active: filter === 'completed' }"
                            @click="filter = 'completed'">Completed</button>
                    </div>

                    <button  class=" btn-action " :class="{ active: filter === 'completed' }" @click="clearCompleted()">Clear All  Completed
                       </button>
                </div>
            </div>


        </div>

    </div>
</template>
<style scoped>
.tasks-content {
   
    border-radius: 5px;
    display: block;
    margin-top: 20px;


}

.btn-add {
    width: 24px;
    height: 24px;
    border: 1px solid hsl(234, 39%, 85%);
    border-radius: 35px;
    margin-left: 20px;
}

.tasks {
    
    border-radius: 5px;
    display: flex;
    align-items: center;
    height: 60px;
    
    

}

.task {
    display: flex;
    justify-content: center;
    height: 60px;
    align-items: center;
    padding: 10px;
    border-bottom: '';
}

input {
   font-size: 1rem;
    padding: 10px;
    margin-left: 10px;
    margin-top: 8px;
}

input:focus {
    outline: none;
}

.todo-list {
    
    display: flex;
    font-size: .9rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color:  hsl(234, 11%, 52%);
    
}
.filter{
    
    color:  hsl(234, 11%, 52%);

}
.btn-action:hover{
    font-weight: 700;
}
.btn-all{
    color: hsl(220, 98%, 61%);
}

</style>