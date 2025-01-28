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
    if (filter.value === 'completed') return todos.value.filter(todo => todo.completed); // Tarefas completas
});

const removeTodo = id => {
    todos.value = todos.value.filter(todo => todo.id !== id);
};

const toggleComplete = id => {
    const task = todos.value.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed; // Alterna o estado completed
    }
};
const clearCompleted = () => {
    todos.value = todos.value.filter(todo => !todo.completed);
};

const tasksLeft = computed(() => todos.value.filter(todo => !todo.completed).length);

</script>
<template>
    <div>

        <!--Add tasks area-->
        <div class="add-tasks" :class="isDark ? 'bg-veryDarkDesaturatedBlue' : 'bg-veryLightGray'">
            <div class="btn-add">
                <button @click="addTodo()"></button>
            </div>
            <div>
                <input :class="isDark ? 'text-lightGrayishBlue' : 'text-veryDarkGrayishBlue'" v-model="task" type="text" placeholder="Create a new todo" @change="addTodo">
            </div>
        </div>

        <!--List tasks-->
        <div>
            <div class="tasks-container" :class="isDark ? 'bg-veryDarkDesaturatedBlue' : 'bg-veryLightGray'">
                <div class="task" v-for="todo in filteredTodos" :key="todo.id"
                    :class="isDark ? 'border-black' : 'border-light'">
                    <Tasks :todo="todo" @toggle-complete="toggleComplete" @remove-todo="removeTodo" />
                </div>

                <!--Filters-->
                <div v-if="todos.length > 0" class="filter-area">

                    <p class=""><span v-if="tasksLeft >= 1">
                            <p>{{ tasksLeft }} items left</p>
                        </span></p>
                    <div class="filter">
                        <button aria-label=" All" class=" btn-action btn-all" :class="{ active: filter === 'all' }"
                            @click="filter = 'all'">All</button>
                        <button aria-label=" Actives" class=" btn-action ml-4 mr-4" :class="{ active: filter === 'active' }"
                            @click="filter = 'active'">Actives</button>
                        <button aria-label="Completed" class=" btn-action" :class="{ active: filter === 'completed' }"
                            @click="filter = 'completed'">Completed</button>
                    </div>

                    <button aria-label="Clear all completed" class=" btn-action " :class="{ active: filter === 'completed' }"
                        @click="clearCompleted()">Clear All Completed
                    </button>
                </div>

            </div>

            <!--Filters Mobile-->
            <div class="displayset justify-center mt-4 mobile-filter-area align-center"
                :class="isDark ? 'bg-veryDarkDesaturatedBlue' : 'bg-veryLightGray'">
                <div class="filters-mobile">
                    <button aria-label=" All" class=" btn-action btn-all" :class="{ active: filter === 'all' }"
                        @click="filter = 'all'">All</button>
                    <button aria-label=" Actives" class=" btn-action" :class="{ active: filter === 'active' }"
                        @click="filter = 'active'">Actives</button>
                    <button aria-label="Completed" class=" btn-action" :class="{ active: filter === 'completed' }"
                        @click="filter = 'completed'">Completed</button>
                </div>
            </div>

        </div>

    </div>
</template>
<style scoped>

/* Layout */

.add-tasks {
    border-radius: 5px;
    display: flex;
    align-items: center;
    height: 50px;
   

}

.tasks-container {
    border-radius: 5px;
    display: block;
    margin-top: 20px;
    
   
}

.task {
    display: flex;
    height: 50px;
    align-items: center;
    padding: 10px;
    
}

.filter-area {
    display: flex;
    padding: 10px;
    height: 50px;
    font-size: .9rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: hsl(234, 11%, 52%);
}

.displayset {
    display: flex;
}

.mobile-filter-area {
    height: 50px;
    border-radius: 8px;
}

/* Check Box */

.border-black {
    border-bottom: 0.2px dotted hsl(233, 14%, 35%);
}

.border-light {
    border-bottom: 0.2px dotted hsl(236, 9%, 61%);
}

/* Input */
input {
    font-size: 1rem;
    padding: 10px;
    margin-left: 10px;
    margin-top: 8px;
}

input:focus {
    outline: none;
}




/* Buttons*/
.btn-add {
    width: 20px;
    height: 20px;
    border: 1px solid hsl(234, 39%, 85%);
    border-radius: 35px;
    margin-left: 20px;
    cursor: pointer;
}

.btn-action {
    cursor: pointer;
}

.btn-action:hover {
    font-weight: 700;
}

.btn-all {
    color: hsl(220, 98%, 61%);
}


.filters-mobile {
    width: 60%;
    color: hsl(234, 11%, 52%);
    display: flex;
    justify-content: space-between;
}

.filter {
    display: none;
}

/* Media Queries */
@media (min-width: 890px) {
    .displayset {
        display: none;
    }

    .filter {
        display: flex;
    }

    .task {
        padding: 9;
    }

    .todo-list {
        font-size: 1rem;
    }

    input {
        font-size: 1.2rem;
    }
}
</style>