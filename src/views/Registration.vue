<template>
    <div class="registration-page">
        <v-form @submit.prevent="onSubmit">
            <form-alert
                v-if="alert.show"
                :type="alert.type"
                :auto-close-time="3000"
                @close="alert.show = false"
            >
               {{ alert.text }}
            </form-alert>
            <v-row>
                <v-col cols="12">
                    <form-group :validator="$v.formData.name" name="name">
                        <template slot-scope="{ attrs }">
                            <input-field
                                v-bind="attrs"
                                label="Name"
                                v-model="formData.name"
                                @blur="$v.formData.name.$touch()"
                            />
                        </template>
                    </form-group>
                </v-col>
                <v-col cols="12">
                    <form-group :validator="$v.formData.secondName">
                        <template slot-scope="{ attrs }">
                            <input-field
                                v-bind="attrs"
                                label="Second name"
                                v-model="formData.secondName"
                                @blur="$v.formData.secondName.$touch()"
                            />
                        </template>
                    </form-group>
                </v-col>
                <v-col cols="12">
                    <form-group :validator="$v.formData.email">
                        <template slot-scope="{ attrs }">
                            <input-field
                                v-bind="attrs"
                                type="email"
                                label="Email"
                                v-model="formData.email"
                                @blur="$v.formData.email.$touch()"
                            />
                        </template>
                    </form-group>
                </v-col>
                <v-col cols="12">
                    <form-group :validator="$v.formData.relativeEmail">
                        <template slot-scope="{ attrs }">
                            <input-field
                                v-bind="attrs"
                                type="email"
                                label="Relative email"
                                v-model="formData.relativeEmail"
                                @blur="$v.formData.relativeEmail.$touch()"
                            />
                        </template>
                    </form-group>
                </v-col>
                <v-col cols="12">
                    <form-group :validator="$v.formData.password">
                        <template slot-scope="{ attrs }">
                            <input-field
                                v-bind="attrs"
                                :type="showPassword ? 'text' : 'password'"
                                label="Password"
                                v-model="formData.password"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPassword = !showPassword"
                                @blur="$v.formData.password.$touch()"
                            />
                        </template>
                    </form-group>
                </v-col>
                <v-col cols="12">
                    <form-group :validator="$v.formData.confirmPassword">
                        <template slot-scope="{ attrs }">
                            <input-field
                                v-bind="attrs"
                                :type="showConfirmPassword ? 'text' : 'password'"
                                label="Confirm password"
                                v-model="formData.confirmPassword"
                                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showConfirmPassword= !showConfirmPassword"
                                @blur="$v.formData.confirmPassword.$touch()"
                            />
                        </template>
                    </form-group>
                </v-col>
                <v-col cols="12">
                    <form-group :validator="$v.formData.terms">
                        <template slot-scope="{ attrs }">
                            <v-checkbox
                                v-bind="attrs"
                                v-model="formData.terms"
                                @change="$v.formData.terms.$touch()"
                            >
                                <template v-slot:label>
                                    <span>I accept the <a @click.stop="onTermsClick" ref="termsLink" href="#">terms and conditions</a></span>
                                </template>
                            </v-checkbox>
                        </template>
                    </form-group>
                </v-col>
                <v-col class="btn-wrap" cols="12">
                    <v-btn color="primary" type="submit" block large>Register</v-btn>
                </v-col>
                <v-col class="btn-wrap" cols="12">
                    <v-btn color="primary" @click="fillFields" block large>Fill fields</v-btn>
                </v-col>
            </v-row>
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
        </v-form>
    </div>
</template>

<script>
    import FormAlert from '@/components/ui/FormAlert';
    import { required, email, sameAs, minLength } from 'vuelidate/lib/validators';
    import {mapActions} from 'vuex';

    export default {
        name: 'Registration',
        props: {},
        components: {
            FormAlert
        },
        data() {
            return {
                formData: {
                    name: '',
                    secondName: '',
                    email: '',
                    relativeEmail: '',
                    password: '',
                    confirmPassword: '',
                    terms: ''
                },
                showPassword: false,
                showConfirmPassword: false,
                showTermsModal: false,
                alert: {
                    type: 'success',
                    text: '',
                    show: false
                }
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
            onSubmit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
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
                }
            },
            onModalAccept() {
                this.showTermsModal = false;
                if (!this.formData.terms) {
                    this.formData.terms = true;
                }
            },
            onTermsClick() {
              this.showTermsModal = true;
            },
            fillFields() { // toDo remove
                this.formData.name = 'Pavel';
                this.formData.secondName = 'Mew';
                this.formData.email = 'test@gmail.com';
                this.formData.relativeEmail = 'test2@gmail.com';
                this.formData.password = '123456';
                this.formData.confirmPassword = '123456';
                this.formData.terms = true;
            }
        }
    }
</script>

<style lang="scss">

</style>
