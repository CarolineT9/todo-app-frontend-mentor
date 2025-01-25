import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';


const myCustomLightTheme = {
  dark: false, 
  colors: {
    veryLightGray: 'hsl(0, 0%, 98%)',
    veryLightGrayBlue: 'hsl(236, 33%, 92%)',
    lightGrayishBlue: 'hsl(233, 11%, 84%)',
    darkGrayishBlue: 'hsl(236, 9%, 61%)',
    veryDarkGrayishBlue: 'hsl(235, 19%, 35%)'
    
  },
};

const myCustomDarkTheme = {
  dark: true, 
  colors: {
    veryDarkBlue: 'hsl(235, 21%, 11%)',
    veryDarkDesaturatedBlue: 'hsl(235, 24%, 19%)',
    lightGrayishBlue: 'hsl(234, 39%, 85%)',
    lightGrayishHover: 'hsl(236, 33%, 92%)',
    darkGrayishBlue: 'hsl(234, 11%, 52%)',
    veryDarkGrayishBlue: 'hsl(233, 14%, 35%)',
    veryDarkGrayishBlue: 'hsl(237, 14%, 26%)'
  },
};


const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myCustomLightTheme', 
    themes: {
      myCustomLightTheme, 
      myCustomDarkTheme,  
    },
  },
});

const app = createApp(App);
app.use(vuetify); 
app.mount('#app');
