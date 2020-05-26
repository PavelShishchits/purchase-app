<template>
    <div class="registration-page">
        <v-form @submit.prevent="onSubmit">
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
                                label="I accept the terms and conditions"
                                @change="$v.formData.terms.$touch()"
                            ></v-checkbox>
                        </template>
                    </form-group>
                </v-col>
                <v-col class="btn-wrap" cols="12">
                    <v-btn color="primary" type="submit" width="100%" large>Register</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script>
    import { required, email, sameAs, minLength } from 'vuelidate/lib/validators';

    export default {
        name: 'Registration',
        props: {},
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
                showConfirmPassword: false
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
                    required
                }
            }
        },
        methods: {
            onSubmit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    console.log(this.formData);
                }
            }
        }
    }
</script>

<style lang="scss">

</style>
