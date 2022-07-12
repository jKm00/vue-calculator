<script setup lang="ts"></script>

<template>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/calculator">Calculator</router-link></li>
    </ul>
  </nav>
</template>

<style lang="scss">
  nav {
    position: fixed;
    left:0;
    right: 0;
    top:0;
    z-index: 100;
    box-shadow: 0 5px 10px rgba(0,0,0,0.3);
    margin-bottom: 2rem;
  }

  ul {
    display: flex;
    list-style-type: none;
  }

  a {
    display: block;
    padding: 1rem;
    color: #fff;
    text-decoration: none;
  }

  a:hover,
  a:focus {
    background-color: rgb(26, 26, 26);
  }
</style>