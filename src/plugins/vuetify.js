import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'

// Global components
import InputField from "@/components/ui/InputField";
import FormGroup from "@/components/ui/FormGroup";

Vue.use(Vuetify);

Vue.component('input-field', InputField);
Vue.component('form-group', FormGroup);

export default new Vuetify({
    icons: {
        iconfont: 'md'
    },
    // theme: {
    //     themes: {
    //         light: {
    //             success: '#e5e5e5',
    //             error: '#E57373'
    //         }
    //     }
    // }
});
