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
                <div class="task" v-for="todo in filteredTodos" :key="todo.id"
                    :class="isDark ? 'border-black' : 'border-light'">
                    <Tasks :todo="todo" @update-todo="updateTodo" @remove-todo="removeTodo"
                        @toggle-complete="toggleComplete" />
                </div>

                <div v-if="todos.length > 0" class="todo-list">

                    <p class=""><span v-if="tasksLeft >= 1">
                            <p>{{ tasksLeft }} items left</p>
                        </span></p>
                    <div class="filter">
                        <button class=" btn-action btn-all" :class="{ active: filter === 'all' }"
                            @click="filter = 'all'">All</button>
                        <button class=" btn-action ml-4 mr-4" :class="{ active: filter === 'active' }"
                            @click="filter = 'active'">Actives</button>
                        <button class=" btn-action" :class="{ active: filter === 'completed' }"
                            @click="filter = 'completed'">Completed</button>
                    </div>

                    <button class=" btn-action " :class="{ active: filter === 'completed' }"
                        @click="clearCompleted()">Clear All Completed
                    </button>
                </div>

            </div>
            <div class="displayset justify-center mt-4 mobile-menu align-center"
                :class="isDark ? 'bg-veryDarkDesaturatedBlue' : 'bg-veryLightGray'">
                <div class="filter-mobile">
                    <button class=" btn-action btn-all" :class="{ active: filter === 'all' }"
                        @click="filter = 'all'">All</button>
                    <button class=" btn-action" :class="{ active: filter === 'active' }"
                        @click="filter = 'active'">Actives</button>
                    <button class=" btn-action" :class="{ active: filter === 'completed' }"
                        @click="filter = 'completed'">Completed</button>
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
    width: 20px;
    height: 20px;
    border: 1px solid hsl(234, 39%, 85%);
    border-radius: 35px;
    margin-left: 20px;
}

.tasks {

    border-radius: 5px;
    display: flex;
    align-items: center;
    height: 50px;

}

.task {
    display: flex;
    height: 50px;
    align-items: center;
    padding: 10px;
}

.border-black {
    border-bottom: 0.2px dotted hsl(233, 14%, 35%);
}

.border-light {
    border-bottom: 0.2px dotted hsl(236, 9%, 61%);
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
    padding: 10px;
    height: 50px;
    font-size: .9rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: hsl(234, 11%, 52%);

}

.filter-mobile {
    width: 60%;
    color: hsl(234, 11%, 52%);
    display: flex;
    justify-content: space-between;

}

.btn-action:hover {
    font-weight: 700;
}

.btn-all {
    color: hsl(220, 98%, 61%);
}

.mobile-menu {
    height: 50px;
    border-radius: 8px;

}
.displayset{
    display: flex;
}
.mobile{
    display: none;
 }
 .filter{
    display: none;
 }
@media (min-width: 890px) {
 .displayset{
    display: none;
 }
 .filter{
    display: flex;
 }
 .task{
    padding: 9;
 }
 .todo-list{
    font-size: 1rem;
 }
}
</style>