# Vue code sample

## Technologies
This project is build with such technologies as:
* [Vue 2](https://vuejs.org/)
* [Vuex 3](https://vuex.vuejs.org/)
* [Vue Router](https://router.vuejs.org/)
* [Materialize](https://materializecss.com/)
* [Vuelidate](https://vuelidate.js.org/)
* [Firebase](https://firebase.google.com/)
* [SCSS](https://sass-lang.com/)
* [Vue Test Utils](https://vue-test-utils.vuejs.org/)
## Project setup
1. Clone the repo
```
git clone https://github.com/gotoinc/vue-code-sample-crm.git
```
2. Install NPM packages
```
npm install
```
3. Compiles and runs locally

```
npm run serve
```
4. Compiles for production
 ```
npm run build

firebase deploy
```

## Usage
Simple accounting system to track users’s personal income and expenses. 
The app helps user to plan a budget, distribute finances and keep records of financial transactions.

## Project structure



```
vue-code-sample-crm
|            
+---public
|   |   favicon.ico
|   |   index.html
|   |   robots.txt
|   |   
|   \---img
|       \---icons
|               ...
|  
|             
+---src
|   |   App.vue
|   |   main.js
|   |   registerServiceWorker.js
|   |   
|   +---assets
|   |       main.scss
|   |       mixins.scss
|   |       _fonts.scss
|   |       _vars.scss
|   |       
|   +---components
|   |   |   CategoryCreate.vue
|   |   |   CategoryEdit.vue
|   |   |   HistoryTable.vue
|   |   |   HomeBill.vue
|   |   |   HomeCurrency.vue
|   |   |   
|   |   +---Charts
|   |   |       ChartPie.js
|   |   |       
|   |   \---Common
|   |           Loader.vue
|   |           Navbar.vue
|   |           Sidebar.vue
|   |           
|   +---directives
|   |       tooltip.directive.js
|   |       
|   +---filters
|   |       currency.filter.js
|   |       date.filter.js
|   |       localize.filter.js
|   |       
|   +---fonts
|   |       Roboto-Bold.eot
|   |       Roboto-Bold.ttf
|   |       Roboto-Bold.woff
|   |       Roboto-Bold.woff2
|   |       Roboto-Medium.eot
|   |       Roboto-Medium.ttf
|   |       Roboto-Medium.woff
|   |       Roboto-Medium.woff2
|   |       Roboto-Regular.eot
|   |       Roboto-Regular.ttf
|   |       Roboto-Regular.woff
|   |       Roboto-Regular.woff2
|   |       
|   +---layouts
|   |       AuthLayout.vue
|   |       MainLayout.vue
|   |       
|   +---locales
|   |       en.json
|   |       ru.json
|   |       
|   +---mixins
|   |       pagination.mixin.js
|   |       
|   +---router
|   |       index.js
|   |       
|   +---store
|   |   |   index.js
|   |   |   
|   |   \---modules
|   |           auth.js
|   |           category.js
|   |           errors.js
|   |           info.js
|   |           record.js
|   |           
|   +---utils
|   |       message.plugin.js
|   |       messages.js
|   |       title.plugin.js
|   |       
|   \---views
|           Categories.vue
|           DetailRecord.vue
|           History.vue
|           Home.vue
|           Login.vue
|           Planning.vue
|           Profile.vue
|           Record.vue
|           SignUp.vue
|           
+---tests
|   \---unit
|       +---components
|       |   |   CategoryCreate.spec.js
|       |   |   
|       |   \---Common
|       |           Sidebar.spec.js
|       |           
|       \---views
|               Categories.spec.js
|
|   .env
|   .eslintrc.js
|   .firebaserc
|   .gitignore
|   babel.config.js
|   firebase.json
|   package-lock.json
|   package.json
|   README.md
```
/src folder contains:
* /assets - project styles (SCSS variables, mixins, stylesheets);
* /components - Vue-components used in the project, it also contains:
  * /Charts - folder for chart-component, created with [vue-chartjs](https://vue-chartjs.org/);
  * /Common - folder for components that can be used for all layouts;
* /directives - contains directive for tooltip;
* /filters - folder for several filters used in the project (date filter, currency filter and localize filter);
* /fonts - folder for fonts used in the project;
* /layouts - folder for main layouts for authorized and non-authorized users;
* /locales - contains support-files for English-Russian locales;
* /mixins - contains mixin for pagination;
* /router - folder that contains [Vue-router](https://router.vuejs.org/) export;
* /store - assemble modules and contains the [Vuex](https://vuex.vuejs.org/) export, there is:
  * /modules - store divided into modules (auth, category, errors, info, record);
* /utils - folder for helpers, code that reused many times;
* /views - folder for components of main pages;

In the /tests folder there are unit-tests for:
* /components;
* /views;

## Firebase description

This project is created with firebase platform.
User can authenticate through [Firebase Authentication](https://firebase.google.com/docs/auth), using email and password.

All data is stored in [Firebase Realtime Database](https://firebase.google.com/docs/database).
Project is deployed with [Firebase Hosting](https://firebase.google.com/docs/hosting).

Link to deployment: https://vue-crm-project-41954.web.app/.






