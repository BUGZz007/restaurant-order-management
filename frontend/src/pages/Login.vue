<template>
    <div class="login-container">
        <div class="login-form-container">
            <form id="loginForm" @submit="handleSubmit" novalidate autocomplete="off">
                
                <h3>LOGIN</h3>

                <div v-if="errors.length" class="error-box">
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </div>

                <div class="form-group">
                    <label for="uEmail">Email</label>
                    <div class="input-wrapper">
                        <i class="fas fa-envelope input-icon"></i>
                        <input type="email" id="uEmail" name="uEmail" class="form-control" 
                            placeholder="Enter your email" v-model="loginObj.email" 
                            style="text-transform: none;" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="uPass">Password</label>
                    <div class="input-wrapper">
                        <i class="fas fa-lock input-icon"></i>
                        <input type="password" id="uPass" name="uPass" class="form-control"
                            placeholder="Enter your password" v-model="loginObj.pass" 
                            style="text-transform: none;" />
                    </div>
                </div>

                <div class="form-actions">
                    
                    <a href="#" class="forgot-password">Forgot password?</a>
                </div>

                <div class="form-group">
                    <input type="submit" value="Login" class="btn">
                    <p class="register-link">Don't have an account? <router-link @click="scrollToTop()" to="/register">Create one</router-link></p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
    name: 'Login',

    data() {
        return {
            loginObj: { email: "", pass: "" },
            matchUser: undefined,
            errors: [],
        }
    },

    methods: {
        ...mapMutations(["setUser"]),

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        async getMatchUser(email) {
            let data = await axios.get('/users/' + email);
            this.matchUser = data.data;
        },

        async handleSubmit(e) {
            this.errors = [];

            if (!this.loginObj.email) {
                this.errors.push("Email is required");
            }
            else {
                if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.loginObj.email)) {
                    this.errors.push('Please enter a valid email address');
                }
            }

            if (!this.loginObj.pass) {
                this.errors.push('Password is required');
            }

            if (!this.errors.length == 0) {
                e.preventDefault();
            }
            else {
                e.preventDefault();
                await this.getMatchUser(this.loginObj.email);
                if (!this.matchUser) {
                    this.errors.push("Incorrect email or password!")
                }
                else {
                    if (this.matchUser.user_password === this.loginObj.pass) {
                        this.matchUser.user_password = "";
                        this.setUser(this.matchUser);
                        this.$router.push("/");
                    }
                    else {
                        this.errors.push("Incorrect email or password!")
                    }
                }
            }
        }
    }
}
</script>

<style scoped>
/* Base Container */
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #f9f9f9, #f1f1f1);
    padding: 2rem;
}

.login-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

/* Form Styling */
.login-form-container form {
    width: 100%;
    max-width: 40rem;
    background: #fff;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.08);
    border-radius: 1.2rem;
    padding: 3.5rem 3rem;
    animation: fadeIn .5s ease-out;
    position: relative;
}

/* Input Case Fix */
.login-form-container form input {
    text-transform: none !important;
}

/* Header Styling */
.login-form-container form h3 {
    font-size: 2.2rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #27ae60;
    text-align: center;
    letter-spacing: 2px;
    margin-bottom: 2rem;
}

/* Label Styling */
.login-form-container form label {
    display: block;
    margin-bottom: 0.8rem;
    font-size: 1.4rem;
    color: #555;
    font-weight: 600;
}

/* Input Wrapper for icon */
.input-wrapper {
    position: relative;
}

.input-icon {
    position: absolute;
    left: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: #aaa;
    font-size: 1.6rem;
}

/* Input Styling */
.login-form-container form .form-control {
    width: 100%;
    padding: 1.6rem 1.5rem 1.6rem 4rem;
    font-size: 1.5rem;
    color: #333;
    background: #f8f9fa;
    border: 2px solid #eaeaea;
    border-radius: 0.8rem;
    transition: all 0.3s ease;
}

.login-form-container form .form-control:focus {
    border-color: #27ae60;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(39, 174, 96, 0.1);
    outline: none;
}

/* Remember me and forgot password */
.form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
}

.remember-me {
    display: flex;
    align-items: center;
}

.remember-me input[type="checkbox"] {
    margin-right: 0.5rem;
    accent-color: #27ae60;
}

.remember-me label {
    margin-bottom: 0;
    font-size: 1.3rem;
    color: #666;
}

.forgot-password {
    font-size: 1.3rem;
    color: #27ae60;
    text-decoration: none;
    transition: color 0.3s;
}

.forgot-password:hover {
    color: #219a52;
    text-decoration: underline;
}

/* Button Styling */
.login-form-container form .btn {
    width: 100%;
    padding: 1.5rem;
    margin-top: 2rem;
    font-size: 1.6rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: white;
    background: linear-gradient(to right, #27ae60, #2ecc71);
    border: none;
    border-radius: 0.8rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.login-form-container form .btn:hover {
    background: linear-gradient(to right, #219a52, #25a25a);
    transform: translateY(-3px);
    box-shadow: 0 7px 14px rgba(39, 174, 96, 0.2);
}

.login-form-container form .btn:active {
    transform: translateY(-1px);
}

/* Register link */
.login-form-container form .register-link {
    margin-top: 2rem;
    font-size: 1.4rem;
    color: #666;
    text-align: center;
}

.login-form-container form .register-link a {
    color: #27ae60;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.3s;
}

.login-form-container form .register-link a:hover {
    color: #219a52;
    text-decoration: underline;
}

/* Error Box Styling */
.login-form-container form .error-box {
    background-color: #fff0f0;
    border-left: 4px solid #ff4c4c;
    padding: 1.2rem 1.5rem;
    margin-bottom: 2rem;
    border-radius: 0.4rem;
}

.login-form-container form .error-box ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.login-form-container form .error-box ul li {
    padding: 0.5rem 0;
    color: #e74c3c;
    font-size: 1.4rem;
}

/* Animation */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .login-form-container form {
        padding: 2.5rem 2rem;
    }
    
    .form-actions {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .forgot-password {
        margin-top: 1rem;
    }
}
</style>