<template>
    <div class="registration-page">
        <form-generator
            v-model="formData"
            @submitForm="onFormSubmit"
            :schema="schema"
            :data="formData"
            :alert="alert"
        >
            <template v-slot:buttons>
                <v-btn color="primary" type="submit" block large>Register</v-btn>
                <v-btn color="primary" @click="fillFields" block large>Fill fields</v-btn>
            </template>
            <template v-slot:terms>
                <span>I accept the <a @click.prevent.stop="onTermsClick">terms and conditions</a></span>
            </template>
        </form-generator>
        <v-dialog
            v-model="showTermsModal"
            width="500"
        >
            <v-card>
                <v-card-title
                    class="headline"
                    primary-title
                >Privacy Policy</v-card-title>

                <v-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        @click="onModalAccept"
                    >
                        I accept
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import FormGenerator from "@/components/ui/FormGenerator";
    import {email, minLength, required, sameAs} from "vuelidate/lib/validators";
    import {mapActions} from "vuex";

    export default {
        name: 'Registration',
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
                        fieldType: "InputField",
                        type: "text",
                        label: "Second name",
                        name: "secondName",
                    },
                    {
                        fieldType: "InputField",
                        type: "email",
                        label: "Email",
                        name: "email",
                    },
                    {
                        fieldType: "InputField",
                        type: "email",
                        label: "Relative email",
                        name: "email",
                    },
                    {
                        fieldType: "PasswordField",
                        type: "password",
                        label: "Password",
                        name: "password",
                    },
                    {
                        fieldType: "PasswordField",
                        type: "password",
                        label: "Confirm password",
                        name: "confirmPassword",
                    },
                    {
                        fieldType: "CheckboxField",
                        name: "terms", // should have the same name as slot name (if we need to render slot as label)
                    }
                ],
                formData: {},
                alert: {
                    type: 'success',
                    text: '',
                    show: false
                },
                showTermsModal: false
            }
        },
        validations: {
            formData: {
                name: {
                    required
                },
                secondName: {
                    required
                },
                email: {
                    required,
                    email
                },
                relativeEmail: {
                    required,
                    email
                },
                password: {
                    required,
                    minLength: minLength(6)
                },
                confirmPassword: {
                    required,
                    sameAsPassword: sameAs('password')
                },
                terms: {
                    required,
                    checked: sameAs( () => true )
                }
            }
        },
        methods: {
            ...mapActions({
                signUp: 'auth/signUp'
            }),
            onModalAccept() {
                this.showTermsModal = false;
                if (!this.formData.terms) {
                    this.$set(this.formData, 'terms', true);
                }
            },
            onTermsClick() {
                this.showTermsModal = true;
            },
            onFormSubmit(formData) {
                this.formData = formData;
                this.signUp({
                    email: this.formData.email,
                    password: this.formData.password
                })
                    .then(() => {
                        this.alert.text = 'Registration done';
                        this.alert.type = 'success';
                        this.alert.show = true;
                    })
                    .catch((error) => {
                        this.alert.text = 'Registration failed';
                        this.alert.type = 'error';
                        this.alert.show = true;
                    });
            },
            fillFields() { // toDo remove
                this.$set(this.formData, 'name', 'Pavel');
                this.$set(this.formData, 'secondName', 'Mew');
                this.$set(this.formData, 'email', 'test@gmail.com');
                this.$set(this.formData, 'relativeEmail', 'test2@gmail.com');
                this.$set(this.formData, 'password', 123456);
                this.$set(this.formData, 'confirmPassword', 123456);
                this.$set(this.formData, 'terms', true);
            }
        }
    }
</script>
