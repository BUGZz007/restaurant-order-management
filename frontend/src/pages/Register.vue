<template>
    <div class="register-container">
        <div class="register-form-container">
            <form id="registerForm" @submit="handleSubmit" novalidate autocomplete="off">
                
                <h3>CREATE YOUR ACCOUNT</h3>

                <!-- Removed the error-box that shows all errors at the top -->

                <div class="form-group">
                    <label for="uName">Full Name</label>
                    <div class="input-wrapper">
                        <i class="fas fa-user input-icon"></i>
                        <input type="text" name="uName" placeholder="Your Full Name" id="uName" class="form-control"
                            v-model="registerObj.name" />
                    </div>
                    <p class="error-mess" v-if="errorObj.nameErr.length > 0">{{ errorObj.nameErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="uEmail">Email Address</label>
                    <div class="input-wrapper">
                        <i class="fas fa-envelope input-icon"></i>
                        <input type="email" name="uEmail" placeholder="example@gmail.com" id="uEmail" class="form-control"
                            v-model="registerObj.email" @input="registerObj.email = registerObj.email.toLowerCase()" />
                    </div>
                    <p class="error-mess" v-if="errorObj.emailErr.length > 0">{{ errorObj.emailErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="uPass">Password</label>
                    <div class="input-wrapper">
                        <i class="fas fa-lock input-icon"></i>
                        <input type="password" name="uPass" placeholder="Password" id="uPass"
                            class="form-control" v-model="registerObj.pass" />
                    </div>
                    <p class="error-mess" v-if="errorObj.passErr.length > 0">{{ errorObj.passErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="uPassConfirm">Confirm Password</label>
                    <div class="input-wrapper">
                        <i class="fas fa-lock input-icon"></i>
                        <input type="password" name="uPassConfirm" placeholder="Password again" id="uPassConfirm"
                            class="form-control" v-model="registerObj.confirm" />
                    </div>
                    <p class="error-mess" v-if="errorObj.confirmErr.length > 0">{{ errorObj.confirmErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="uPhone">Phone Number</label>
                    <div class="input-wrapper">
                        <i class="fas fa-phone input-icon"></i>
                        <input type="tel" name="uPhone" placeholder="Enter your phone number" id="uPhone"
                            class="form-control" v-model="registerObj.phone" />
                    </div>
                    <p class="error-mess" v-if="errorObj.phoneErr.length > 0">{{ errorObj.phoneErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="uBirth">Date of Birth</label>
                    <div class="input-wrapper">
                        <i class="fas fa-calendar input-icon"></i>
                        <input 
                            type="date" 
                            name="uBirth" 
                            id="uBirth" 
                            class="form-control" 
                            v-model="registerObj.birth"
                            ref="birthDateInput"
                            @click="setupDatePickerLimits"
                            @focus="setupDatePickerLimits"
                            @keydown="handleDateKeydown"
                        />
                    </div>
                    <p class="error-mess" v-if="errorObj.birthErr.length > 0">{{ errorObj.birthErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label>Gender</label>
                    <div class="gender-buttons">
                        <button 
                            type="button" 
                            class="gender-btn" 
                            :class="{ active: registerObj.gender === 'male' }"
                            @click="registerObj.gender = 'male'"
                        >
                            <i class="fas fa-mars"></i> Male
                        </button>
                        <button 
                            type="button" 
                            class="gender-btn" 
                            :class="{ active: registerObj.gender === 'female' }"
                            @click="registerObj.gender = 'female'"
                        >
                            <i class="fas fa-venus"></i> Female
                        </button>
                    </div>
                    <p class="error-mess" v-if="errorObj.genderErr.length > 0">{{ errorObj.genderErr[0] }}</p>
                </div>

                <div class="form-group">
                    <input type="submit" value="Register" class="btn" />
                    <p class="login-link">Already have an account? <router-link @click="scrollToTop()" to="/login">Login</router-link>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "Register",

    data() {
        return {
            registerObj: { name: "", email: "", pass: "", confirm: "", phone: "", birth: "", gender: "" },
            errorObj: { nameErr: [], emailErr: [], passErr: [], confirmErr: [], phoneErr: [], birthErr: [], genderErr: [] },
            matchUser: undefined,
        }
    },

    mounted() {
        // Set date limits when component mounts
        this.setupDatePickerLimits();
    },

    methods: {
        async getMatchUser(email) {
            let data = await axios.get('/users/' + email);
            this.matchUser = data.data;
        },

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        setupDatePickerLimits() {
            // Fix date picker limits
            var now = new Date();
            var day = ("0" + now.getDate()).slice(-2);
            var currentMonth = ("0" + (now.getMonth() + 1)).slice(-2);
            var minRange = (now.getFullYear() - 150) + "-" + currentMonth + "-" + day;
            var maxRange = now.getFullYear() + "-" + currentMonth + "-" + day;

            // Make sure date input element exists
            if (this.$refs.birthDateInput) {
                this.$refs.birthDateInput.setAttribute("min", minRange);
                this.$refs.birthDateInput.setAttribute("max", maxRange);
            }
        },

        handleDateKeydown(e) {
            // Ensure arrow keys, tab, and other navigation works with date input
            if (['Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                // Allow default behavior for these keys
                return true;
            }
        },

        resetCheckErr: function () {
            this.errorObj.nameErr = [];
            this.errorObj.emailErr = [];
            this.errorObj.passErr = [];
            this.errorObj.confirmErr = [];
            this.errorObj.phoneErr = [];
            this.errorObj.birthErr = [];
            this.errorObj.genderErr = [];
        },

        checkEmptyErr: function () {
            for (var typeErr in this.errorObj) {
                if (this.errorObj[typeErr].length != 0) {
                    return false;
                }
            }
            return true;
        },

        getAllErrors: function() {
            let allErrors = [];
            for (let key in this.errorObj) {
                allErrors = [...allErrors, ...this.errorObj[key]];
            }
            return allErrors;
        },

        checkForm: function () {
            this.resetCheckErr();

            // Name validate
            if (!this.registerObj.name) {
                this.errorObj.nameErr.push("Entering a name is required");
            }
            else {
                if (!/^[A-Za-z]+$/.test(this.registerObj.name.replace(/\s/g, ""))) {
                    this.errorObj.nameErr.push('A name can only contain letters');
                }
            }

            // Email validate
            if (!this.registerObj.email) {
                this.errorObj.emailErr.push("Entering an email is required");
            }
            else {
                // Always convert email to lowercase before validation
                this.registerObj.email = this.registerObj.email.toLowerCase();
                
                if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.registerObj.email)) {
                    this.errorObj.emailErr.push('Email must be valid');
                }
            }

            // Pass validate
            if (!this.registerObj.pass) {
                this.errorObj.passErr.push('Password is required');
            }
            else {
                if (!/[!@#$%^&*]/.test(this.registerObj.pass)) {
                    this.errorObj.passErr.push('Password must contain at least 1 special character');
                }

                if (this.registerObj.pass.length < 8) {
                    this.errorObj.passErr.push('Password must be more than or equal 8 characters');
                }
            }

            // Confirm Pass validate
            if (!this.registerObj.confirm) {
                this.errorObj.confirmErr.push('Confirm password is required');
            }
            else {
                if (this.registerObj.pass !== this.registerObj.confirm) {
                    this.errorObj.confirmErr.push('Confirm password must match with password');
                }
            }

            // Phone validate
            if (!this.registerObj.phone) {
                this.errorObj.phoneErr.push('Entering phone number is required');
            }
            else {
                if (!this.registerObj.phone.startsWith('+91')) {
                    this.errorObj.phoneErr.push('Phone numbers must start with +91');
                }

                if (this.registerObj.phone.length != 13) {
                    this.errorObj.phoneErr.push('Phone numbers must have exactly 10 digits');
                }

                if (!/[0-9]{11}/.test(this.registerObj.phone)) {
                    this.errorObj.phoneErr.push('Phone numbers can only contain numbers');
                }
            }

            // Birth validate
            if (!this.registerObj.birth) {
                this.errorObj.birthErr.push("Entering birthday is required");
            }
            else {
                let minRange = this.$refs.birthDateInput.getAttribute("min");
                let maxRange = this.$refs.birthDateInput.getAttribute("max");
                let dateMin = new Date(minRange);
                let dateMax = new Date(maxRange);
                let dateInput = new Date(this.registerObj.birth);

                if (dateInput === "Invalid Date") {
                    this.errorObj.birthErr.push("Invalid date input");
                }

                if (dateInput.getTime() < dateMin.getTime() || dateInput.getTime() > dateMax.getTime()) {
                    this.errorObj.birthErr.push("Available birthday range is from past 150 years to now");
                }
            }

            // Gender validate
            if (!this.registerObj.gender) {
                this.errorObj.genderErr.push("Please select a gender");
            }
        },

        async handleSubmit(e) {
            this.checkForm();

            if (!this.checkEmptyErr()) {
                e.preventDefault();
            } else {
                e.preventDefault();
                // Ensure email is lowercase before checking for matching user
                this.registerObj.email = this.registerObj.email.toLowerCase();
                await this.getMatchUser(this.registerObj.email);
                if (this.matchUser) {
                    this.errorObj.emailErr.push("Account already exists");
                }
                else {
                    let data = {
                        user_name: this.registerObj.name,
                        user_email: this.registerObj.email,
                        user_phone: this.registerObj.phone,
                        user_password: this.registerObj.pass,
                        user_birth: this.registerObj.birth,
                        user_gender: this.registerObj.gender
                    }
                    await axios.post("/users/", data);
                    this.$router.push("/login");
                }
            }
        }
    },
};
</script>


<style scoped>
/* Base Container */
.register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #f9f9f9, #f1f1f1);
    padding: 2rem;
}

.register-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

/* Form Styling */
.register-form-container form {
    width: 100%;
    max-width: 50rem;
    background: #fff;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.08);
    border-radius: 1.2rem;
    padding: 3.5rem 3rem;
    animation: fadeIn .5s ease-out;
    position: relative;
}
/* Header Styling */
.register-form-container form h3 {
    font-size: 2.2rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #27ae60;
    text-align: center;
    letter-spacing: 2px;
    margin-bottom: 2rem;
}

/* Label Styling */
.register-form-container form label {
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
.register-form-container form .form-control {
    width: 100%;
    padding: 1.6rem 1.5rem 1.6rem 4rem;
    font-size: 1.5rem;
    color: #333;
    background: #f8f9fa;
    border: 2px solid #eaeaea;
    border-radius: 0.8rem;
    transition: all 0.3s ease;
}

.register-form-container form .form-control:focus {
    border-color: #27ae60;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(39, 174, 96, 0.1);
    outline: none;
}

/* Gender buttons */
.gender-buttons {
    display: flex;
    gap: 2rem;
    margin: 1rem 0;
}

.gender-btn {
    flex: 1;
    padding: 1.2rem;
    font-size: 1.5rem;
    border: 2px solid #eaeaea;
    border-radius: 0.8rem;
    background: #f8f9fa;
    color: #555;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.gender-btn i {
    margin-right: 0.8rem;
    font-size: 1.6rem;
}

.gender-btn.active {
    background: #27ae60;
    color: white;
    border-color: #27ae60;
    box-shadow: 0 4px 8px rgba(39, 174, 96, 0.2);
}

.gender-btn:hover:not(.active) {
    background: #f1f1f1;
    border-color: #d8d8d8;
}

/* Button Styling */
.register-form-container form .btn {
    width: 100%;
    padding: 1.5rem;
    margin-top: 2rem;
    font-size: 1.6rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: white;
    border: none;
    border-radius: 0.8rem;
    cursor: pointer;
    transition: all 0.3s ease;
    background: linear-gradient(to right, #27ae60, #2ecc71);
}

.register-form-container form .btn:hover {
    background: linear-gradient(to right, #219a52, #25a25a);
    transform: translateY(-3px);
    box-shadow: 0 7px 14px rgba(39, 174, 96, 0.2);
}

.register-form-container form .btn:active {
    transform: translateY(-1px);
}

/* Login link */
.register-form-container form .login-link {
    margin-top: 2rem;
    font-size: 1.4rem;
    color: #666;
    text-align: center;
}

.register-form-container form .login-link a {
    color: #27ae60;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.3s;
}

.register-form-container form .login-link a:hover {
    color: #219a52;
    text-decoration: underline;
}

/* Error Message Styling */
.register-form-container form .error-mess {
    color: #e74c3c;
    font-size: 1.3rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
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

/* Date picker specific styles */
input[type="date"] {
    cursor: pointer;
}

input[type="date"]::-webkit-calendar-picker-indicator {
    cursor: pointer;
    opacity: 0.8;
    position: absolute;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 2rem;
    height: 2rem;
}

input[type="date"]::-webkit-calendar-picker-indicator:hover {
    opacity: 1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .register-form-container form {
        padding: 2.5rem 2rem;
    }
    
    .gender-buttons {
        flex-direction: column;
        gap: 1rem;
    }
}
</style>