<template>
    <v-checkbox
        v-bind="$attrs"
        @change="onChange"
    >
        <template v-slot:label>
            <slot name="label"></slot>
        </template>
    </v-checkbox>
</template>

<script>
    export default {
        methods: {
            onChange(e) {
                this.$emit('input', e);
                this.$emit('blur');
            }
        }
    }
</script>

<style lang="scss">

    .v-input--checkbox {
        margin-bottom: 15px;
    }

</style>