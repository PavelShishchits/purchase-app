<template>
    <div>
        <router-link to="/">Home</router-link>
        <router-link to="/sign-in">Sign In</router-link>
        <router-link to="/main">Main</router-link>
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'simple-layout'
    }
</script>