import Vue from 'vue';
import Vuelidate from 'vuelidate';
import vuelidateErrorExtractor from "vuelidate-error-extractor";

Vue.use(Vuelidate);
Vue.use(vuelidateErrorExtractor, {
    messages: {
        required: "The {attribute} field is required",
        email: "Field {attribute} is not a proper email address"
    },
    attributes: {
        name: "Name",
        email: "Email",
        text: "Text"
    }
});