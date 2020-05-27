import Vue from 'vue';
import Vuelidate from 'vuelidate';
import vuelidateErrorExtractor from "vuelidate-error-extractor";

Vue.use(Vuelidate);
Vue.use(vuelidateErrorExtractor, {
    messages: {
        required: "The {attribute} field is required",
        checked: "The {attribute} field is required",
        sameAsPassword: "The {attribute} field should be same as password",
        email: "Field {attribute} is not a proper email address"
    },
    attributes: {
        name: "Name",
        email: "Email",
        text: "Text"
    }
});