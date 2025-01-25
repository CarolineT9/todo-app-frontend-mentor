<script setup>
import { ref, computed } from 'vue';
import Tasks from './Tasks.vue';
const task = ref('');
const todos = ref([]);
const filter = ref('all'); // Estado inicial do filtro

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

const totalTasks = computed(() => todos.value.length);
</script>
<template>
    <v-container max-width="900">
        <div class="tasks">
            <div class="btn-add">
                <button @click="addTodo()"></button>
            </div>
            <div>
                <input v-model="task" type="text" placeholder="Create a new todo" @change="addTodo">
            </div>
        </div>
        <div class="mt-9">
            <div class="tasks-content">
                <div class="task" v-for="todo in filteredTodos" :key="todo.id">
                    <Tasks :todo="todo" @update-todo="updateTodo" @remove-todo="removeTodo" @toggle-complete="toggleComplete" />
                </div>
            </div>

            <div v-if="todos.length > 0">

                <p>total <span v-if="totalTasks >= 1">{{ totalTasks }}</span></p>
                <button :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
                <button :class="{ active: filter === 'active' }" @click="filter = 'active'">Actives</button>
                <button :class="{ active: filter === 'completed' }" @click="filter = 'completed'">Completed</button>
                <button :class="{ active: filter === 'completed' }" @click="clearCompleted()">Clear All
                    Completed</button>
            </div>
        </div>

    </v-container>
</template>
<style scoped>
.tasks-content {
    background-color: hsl(237, 14%, 26%);
    border-radius: 8px ;
    display: block;


}

.btn-add {
    width: 35px;
    height: 35px;
    border: 1px solid hsl(234, 39%, 85%);
    border-radius: 35px;
    margin-left: 20px;
}

.tasks {
    background: hsl(237, 14%, 26%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    height: 80px;
    
}
.task{
    display: flex;
    justify-content: center;
    height: 80px;
    align-items: center;
    padding: 20px;
    border-bottom:0.2px solid hsl(233, 14%, 35%);
}
input {
    width: 500px;
    padding: 10px;
    margin-left: 20px;
    margin-top: 8px;
}

input:focus {
    outline: none;
}
</style>