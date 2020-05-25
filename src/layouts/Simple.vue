<template>
    <div>
        <Header :title="title"></Header>
        <main class="main">
            <router-view />
        </main>
    </div>
</template>

<script>
    import Header from '@/components/shared/Header';

    export default {
        name: 'simple-layout',
        components: {
            Header
        },
        computed: {
            title() {
                return this.$route.meta.title;
            }
        }
    }
</script>