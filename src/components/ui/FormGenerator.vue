<template>
    <v-form @submit.prevent="onSubmit">
        <v-row>
            <v-col
               cols="12"
               v-for="(field, i) in schema"
               :key="i"
            >
                <component
                    :is="field.fieldType"
                    :value="formData[field.name]"
                    @input="updateField(field.name, $event)"
                    v-bind="field"
                ></component>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
    import InputField from "@/components/ui/InputField";
    import FormGroup from "@/components/ui/FormGroup";

    export default {
        props: ['schema', 'validation', 'data'],
        model: {
            prop: 'data',
            event: 'updateFormData'
        },
        data() {
            return {
                formData: this.data || {}
            }
        },
        methods: {
            updateField(field, value) {
                this.$set(this.formData, field, value);
                this.$emit('updateFormData', this.formData);
            },
            onSubmit() {

            }
        }
    }
</script>

<style lang="scss">

</style>