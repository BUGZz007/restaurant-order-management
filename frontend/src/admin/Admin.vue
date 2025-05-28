<template>
    <div class="admin-container">
        <div class="admin-form-container">
            <form id="adminForm" @submit="handleSubmit" novalidate autocomplete="off">
                <!-- Logo removed -->
                <h3>ADMIN</h3>

                <div v-if="errors.length" class="error-box">
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </div>

                <div class="form-group">
                    <label for="uPass">Password</label>
                    <div class="input-wrapper">
                        <i class="fas fa-lock input-icon"></i>
                        <input
                            type="password"
                            id="uPass"
                            name="uPass"
                            class="form-control"
                            placeholder="Enter admin password"
                            v-model="adminObj.pass"
                        />
                    </div>
                </div>

                <div class="form-group">
                    <input type="submit" value="Admin Access" class="btn">
                </div>

                <div class="back-link">
                    <router-link to="/">Back to Home</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
    name: 'Admin',
    data() {
        return {
            adminObj: {
                pass: ''
            },
            errors: [],
            key: "0008" // your admin password
        }
    },
    methods: {
        ...mapMutations(["setAdmin"]),
        handleSubmit(e) {
            e.preventDefault();
            this.errors = [];
            
            if (!this.adminObj.pass) {
                this.errors.push('Password is required');
                return;
            }

            if (this.key === this.adminObj.pass) {
                // Store both token and timestamp
                const adminData = {
                    token: 'admin',
                    timestamp: new Date().getTime()
                };
                localStorage.setItem('adminData', JSON.stringify(adminData));
                this.setAdmin("admin");
                this.$router.push("/admin/dashboard");
            } else {
                this.errors.push("Admin password wrong!");
            }
        }
    }
}
</script>

<style scoped>
.admin-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #f9f9f9, #f1f1f1);
    padding: 2rem;
}

.admin-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.admin-form-container form {
    width: 100%;
    max-width: 40rem;
    background: #fff;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.08);
    border-radius: 1.2rem;
    padding: 3.5rem 3rem;
    animation: fadeIn .5s ease-out;
    position: relative;
}

.admin-form-container form h3 {
    font-size: 2.2rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #27ae60;
    text-align: center;
    letter-spacing: 2px;
    margin-bottom: 2rem;
}

.admin-form-container form label {
    display: block;
    margin-bottom: 0.8rem;
    font-size: 1.4rem;
    color: #555;
    font-weight: 600;
}

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

.admin-form-container form .form-control {
    width: 100%;
    padding: 1.6rem 1.5rem 1.6rem 4rem;
    font-size: 1.5rem;
    color: #333;
    background: #f8f9fa;
    border: 2px solid #eaeaea;
    border-radius: 0.8rem;
    transition: all 0.3s ease;
}

.admin-form-container form .form-control:focus {
    border-color: #27ae60;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(39, 174, 96, 0.1);
    outline: none;
}

.admin-form-container form .btn {
    width: 100%;
    padding: 1.5rem;
    margin-top: 2.5rem;
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

.admin-form-container form .btn:hover {
    background: linear-gradient(to right, #219a52, #25a25a);
    transform: translateY(-3px);
    box-shadow: 0 7px 14px rgba(39, 174, 96, 0.2);
}

.admin-form-container form .btn:active {
    transform: translateY(-1px);
}

.back-link {
    text-align: center;
    margin-top: 2rem;
}

.back-link a {
    color: #666;
    font-size: 1.4rem;
    text-decoration: none;
    transition: color 0.3s;
}

.back-link a:hover {
    color: #27ae60;
}

.admin-form-container form .error-box {
    background-color: #fff0f0;
    border-left: 4px solid #ff4c4c;
    padding: 1.2rem 1.5rem;
    margin-bottom: 2rem;
    border-radius: 0.4rem;
}

.admin-form-container form .error-box ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.admin-form-container form .error-box ul li {
    padding: 0.5rem 0;
    color: #e74c3c;
    font-size: 1.4rem;
}

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

@media (max-width: 768px) {
    .admin-form-container form {
        padding: 2.5rem 2rem;
    }
}
</style>
