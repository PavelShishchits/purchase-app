<template>
    <div class="login-page">
        <form-generator
            v-model="formData"
            @submitForm="onFormSubmit"
            :schema="schema"
            :data="formData"
            :alert="alert"
        >
            <template v-slot:buttons>
                <v-btn color="primary" type="submit" block large>Login</v-btn>
                <v-btn color="primary" @click="fillFields" type="button" block large>Fill Fields</v-btn>
            </template>
        </form-generator>
    </div>
</template>

<script>
    import FormGenerator from "@/components/ui/FormGenerator";
    import {minLength, required, email} from "vuelidate/lib/validators";
    import {mapActions} from 'vuex';

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
                        type: "email",
                        label: "Email",
                        name: "email",
                    },
                    {
                        fieldType: "PasswordField",
                        type: "password",
                        label: "Password",
                        name: "password",
                    }
                ],
                formData: {},
                alert: {
                    type: 'success',
                    text: '',
                    show: false,
                    closeCallback: null
                },
            }
        },
        validations: {
            formData: {
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minLength: minLength(6)
                }
            }
        },
        methods: {
            ...mapActions({
                signIn: 'auth/signIn'
            }),
            onFormSubmit(formData) {
                this.formData = formData;
                this.signIn({
                    email: this.formData.email,
                    password: this.formData.password
                })
                    .then(() => {
                        this.alert.text = 'Login done';
                        this.alert.type = 'success';
                        this.alert.show = true;
                        this.alert.closeCallback = () => {
                            this.$router.push('/main');
                        }
                    })
                    .catch((error) => {
                        this.alert.text = 'Login failed';
                        this.alert.type = 'error';
                        this.alert.show = true;
                    });
            },
            fillFields() {
                this.$set(this.formData, 'email', 'test@gmail.com');
                this.$set(this.formData, 'password', 123456);
            }
        }
    }
</script>
