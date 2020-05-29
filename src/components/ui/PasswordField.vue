<template>
    <input-field
        v-on="$listeners"
        v-bind="$attrs"
        :type="showPasswordFlag ? 'text' : 'password'"
        :append-icon="showPasswordFlag ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPasswordFlag= !showPasswordFlag"
    />
</template>

<script>
    import InputField from "@/components/ui/InputField";

    export default {
        props: {
            showPassword: {
                type: Boolean,
                default: false
            }
        },
        components: {
            InputField
        },
        data() {
            return {
                showPasswordFlag: this.showPassword
            }
        }
    }
</script>