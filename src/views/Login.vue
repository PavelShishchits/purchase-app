<template>
    <div class="login-page">
        <form-generator
            v-model="formData"
            @submitForm="onFormSubmit"
            :schema="schema"
            :data="formData"
        >
            <template v-slot:buttons>
                <v-btn color="primary" type="submit" block large>Login</v-btn>
            </template>
        </form-generator>
    </div>
</template>

<script>
    import FormGenerator from "@/components/ui/FormGenerator";
    import {minLength, required} from "vuelidate/lib/validators";

    export default {
        name: 'Login',
        components: {
            FormGenerator
        },
        provide() {
            return {
                $v: this.$v
            }
        },
        data() {
            return {
                schema: [
                    {
                        fieldType: "InputField",
                        type: "text",
                        label: "Name",
                        name: "name",
                    },
                    {
                        fieldType: "PasswordField",
                        type: "password",
                        label: "Password",
                        name: "password",
                    }
                ],
                formData: {}
            }
        },
        validations: {
            formData: {
                name: {
                    required
                },
                password: {
                    required,
                    minLength: minLength(6)
                }
            }
        },
        methods: {
            onFormSubmit(formData) {
                this.formData = formData;
            }
        }
    }
</script>
