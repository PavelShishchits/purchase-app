<template>
    <v-form @submit.prevent="onSubmit">
        <form-alert
            v-if="alertData.show"
            :type="alertData.type"
            :auto-close-time="3000"
            @close="alertData.show = false"
        >{{ alertData.text }}</form-alert>
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
                        >
                            <template v-slot:label>
                                <slot :name="field.name"></slot>
                            </template>
                        </component>
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
    import FormAlert from '@/components/ui/FormAlert';

    export default {
        props: ['schema', 'data', 'alert'],
        model: {
            prop: 'data',
            event: 'updateFormData'
        },
        inject: ['$v'],
        components: {
            FormAlert,
            FormGroup,
            InputField,
            PasswordField,
            CheckboxField,
        },
        data() {
            return {
                formData: this.data || {},
                alertData: this.alert || {}
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
                // this.$emit('updateFormData', this.formData);
            },
            onSubmit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.$emit('submitForm', this.formData);
                }
            }
        }
    }
</script>

<style lang="scss">

</style>