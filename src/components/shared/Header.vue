<template>
    <div class="header__wrap">
        <header class="header" ref="header">
            <v-container>
                <button @click="goBack" class="arrow-back">
                    <v-icon>arrow_back</v-icon>
                </button>
                <h3 class="header__title">{{ title }}</h3>
            </v-container>
        </header>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: true
            }
        },
        mounted() {
            this.calcHeaderHeight();
        },
        data() {
            return {}
        },
        methods: {
            goBack() {
                this.$router.back();
            },
            calcHeaderHeight() {
                document.documentElement.style.setProperty('--header-height', `${this.$refs.header.offsetHeight}px`);
            }
        }
    }
</script>

<style lang="scss">

    .header {
        background-color: #fff;
        position: fixed;
        top: 0;
        z-index: 10;
        width: 100%;
        min-width: $site-min-width;
        max-width: $site-max-width;
        box-shadow: 0 2px 1px 0 rgba($brand-gray-2, .15);

        &__wrap {
            height: var(--header-height);
        }

        .container {
            position: relative;
            min-height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__title {
            margin: 0;
            text-align: center;
            padding: 0 30px;
        }

        .arrow-back {
            background-color: transparent;
            border: 0;
            position: absolute;
            font-size: 0;
            padding: 8px 5px 8px 0;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            align-items: center;

            .v-icon {
                color: $brand-primary;
            }

            @include hover-focus {
                color: darken($brand-primary, 15%);
                outline: none;
            }
        }

    }

</style>