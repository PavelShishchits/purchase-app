<template>
    <div class="startscreen">
        <div class="startscreen__img-wrap">
            <v-img src="../assets/images/startscreen.jpg" min-height="100vh"></v-img>
        </div>
        <div class="startscreen__text-wrap">
            <div class="startscreen__content">
                <v-container>
                    <div class="startscreen__btn-wrap">
                        <v-btn to="/sign-in" color="primary" large>Sign In</v-btn>
                        <v-btn to="/sign-up" color="warning" large>Sign Up</v-btn>
                    </div>
                </v-container>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'Home',
    }
</script>

<style lang="scss">

    .startscreen {
        position: relative;

        &__img-wrap {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background-color: $brand-secondary;
        }

        &__text-wrap {
            height: 100vh;
            padding: 40px 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__content {
            width: 100%;
        }

        &__btn-wrap {
            margin-bottom: -15px;

            .v-btn {
                margin-bottom: 15px;
                width: 100%;
            }
        }
    }
</style>
