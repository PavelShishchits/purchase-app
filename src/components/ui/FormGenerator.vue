<template>
    <v-form @submit.prevent="onSubmit">
        <v-row>
            <v-col
               cols="12"
               v-for="(field, i) in schema"
               :key="i"
            >
                <form-group :validator="$v.formData[field.name]">
                    <template slot-scope="{ attrs }">
                        <component
                            v-bind="{...field, ...attrs}"
                            :is="field.fieldType"
                            :value="formData[field.name]"
                            @input="updateField(field.name, $event)"
                            @blur="triggerFieldValidation(field.name)"
                        ></component>
                    </template>
                </form-group>
            </v-col>
            <v-col cols="12">
                <form-group :validator="$v.formData.terms">
                    <template slot-scope="{ attrs }">
                        <CheckboxField
                            v-bind="attrs"
                            :value="formData.terms"
                            label="mew mew"
                            @change="updateField('terms', $event)"
                        ></CheckboxField>
                    </template>
                </form-group>
            </v-col>
            <v-col class="btn-wrap" cols="12">
                <slot name="buttons"></slot>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
    import FormGroup from "@/components/ui/FormGroup";
    import InputField from "@/components/ui/InputField";
    import PasswordField from "@/components/ui/PasswordField";
    import CheckboxField from "@/components/ui/CheckboxField";

    export default {
        props: ['schema', 'data'],
        model: {
            prop: 'data',
            event: 'updateFormData'
        },
        inject: ['$v'],
        components: {
            FormGroup,
            InputField,
            PasswordField,
            CheckboxField
        },
        data() {
            return {
                formData: this.data || {}
            }
        },
        methods: {
            triggerFieldValidation(field) {
                try {
                    this.$v.formData[field].$touch();
                }
                catch (e) {
                    console.log(e);
                }
            },
            updateField(field, value) {
                this.$set(this.formData, field, value);
                // this.triggerFieldValidation(field, value); // toDo remove (needed only for checkbox)
                // this.$emit('updateFormData', this.formData);
            },
            onSubmit() {
                this.$emit('submitForm', this.formData);
            }
        }
    }
</script>

<style lang="scss">

</style>