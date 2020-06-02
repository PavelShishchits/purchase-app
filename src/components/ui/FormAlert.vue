<template>
    <div class="form-alert">
        <v-alert
            v-bind="$attrs"
            v-on="$listeners"
            transition="fade-transition"
        >
            <slot></slot>
        </v-alert>
    </div>

</template>

<script>
    export default {
        props: {
            autoCloseTime: Number,
            closeCallback: {
                type: Function,
                default: () => {}
            }
        },
        mounted() {
            if (this.autoCloseTime) {
                setTimeout(() => {
                    this.close();
                }, this.autoCloseTime);
            }
        },
        methods: {
            close() {
                this.$emit('close');
                this.closeCallback();
            }
        }
    }
</script>

<style lang="scss" scoped>

    .form-alert {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        top: calc(var(--header-height) - 10px);
        width: 100%;
        padding-left: $grid-gutter / 2;
        padding-right: $grid-gutter / 2;
        z-index: 10;
    }

</style>