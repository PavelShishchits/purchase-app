<template>
    <v-app>
        <component :is="layout"></component>
    </v-app>
</template>

<script>
    import DefaultLayout from '@/layouts/Default';
    import SimpleLayout from '@/layouts/Simple';
    import ScreenLayout from '@/layouts/Screen';

    export default {
        name: 'App',
        components: {
            'screen': ScreenLayout,
            'simple': SimpleLayout,
            'default': DefaultLayout,
        },
        computed: {
            layout() {
                return this.$store.state.layout;
            }
        }
    };
</script>

<style lang="scss">

    .v-application {
        max-width: 1024px;
        margin-left: auto;
        margin-right: auto;
    }

</style>