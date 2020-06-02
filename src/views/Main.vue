<template>
    <div>
        <v-btn color="primary" @click="logOut" type="button" block large>LogOut</v-btn>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: 'Main',
        methods: {
            ...mapActions({
                logOut: 'auth/logOut'
            })
        }
    }
</script>
