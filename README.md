# Vue code sample

## Description
Simple accounting system to track users’ personal income and expenses.
The app helps user to plan a budget, distribute finances and keep records of financial transactions.
### Credentials for the test account
```
email: test.user@test.test
password: Test12345
```

## Technologies
This project is build with such technologies as:
* [Vue](https://vuejs.org/)
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
## Project structure



```
vue-code-sample-crm
|            
+---public
|   |   
|   \---img
|       \---icons
|             
+---src
|   | 
|   |   
|   +---assets
|   |       
|   +---components
|   |   |   
|   |   +---Charts   
|   |   |       
|   |   \---Common       
|   |           
|   +---directives
|   |       
|   +---filters
|   |       
|   +---fonts
|   |       
|   +---layouts
|   |       
|   +---locales
|   |       
|   +---mixins
|   |       
|   +---router
|   |       
|   +---store
|   |   |   
|   |   \---modules
|   |           
|   +---utils
|   |       
|   \---views
|           
+---tests
|   \---unit
|       +---components
|       |   | 
|       |   |   
|       |   \---Common
|       |           
|       \---views
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






