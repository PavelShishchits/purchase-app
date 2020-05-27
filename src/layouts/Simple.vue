<template>
    <fragment>
        <Header :title="title"></Header>
        <v-content style="padding: 30px 0">
            <v-container>
                <router-view />
            </v-container>
        </v-content>
    </fragment>
</template>

<script>
    import Header from '@/components/shared/Header';
    import { Fragment } from 'vue-fragment';

    export default {
        name: 'simple-layout',
        components: {
            Header,
            Fragment
        },
        computed: {
            title() {
                return this.$route.meta.title;
            }
        }
    }
</script>