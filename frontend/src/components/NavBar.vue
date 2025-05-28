<template>
    <div class="header">
        <router-link @click="scrollToTop()" to="/" class="logo">
            <div class="logo-container">
                <img src="../assets/images/taco-logo.png" alt="Vedeshi Khana Logo" />
                <span class="logo-text">Vedeshi Khana</span>
            </div>
        </router-link>

        <nav class="navbar" :class="{ 'mobile-view': isMobileView }">
            <router-link @click="scrollToTop()" to="/" class="nav-link">
                <i class="fas fa-home"></i>
                <span>home</span>
            </router-link>
            <router-link @click="scrollToTop()" to="/menu" class="nav-link">
                <i class="fas fa-utensils"></i>
                <span>menu</span>
            </router-link>
            <router-link @click="scrollToTop()" to="/table" class="nav-link">
                <i class="fas fa-chair"></i>
                <span>table</span>
            </router-link>
            <router-link @click="scrollToTop()" to="/promotions" class="nav-link">
                <i class="fas fa-percentage"></i>
                <span>promotions</span>
            </router-link>
            <router-link @click="scrollToTop()" to="/about" class="nav-link">
                <i class="fas fa-info-circle"></i>
                <span>about</span>
            </router-link>

            <router-link v-if="user && user.role === 'admin'" @click="scrollToTop()" to="/menu-management" class="nav-link">
                <i class="fas fa-tasks"></i>
                <span>menu mgmt</span>
            </router-link>
            
            <router-link v-if="user && user.role === 'admin'" @click="scrollToTop()" to="/order-review" class="nav-link">
                <i class="fas fa-clipboard-check"></i>
                <span>orders</span>
            </router-link>

            <router-link v-if="user && user.role === 'admin'" @click="scrollToTop()" to="/table-management" class="nav-link">
                <i class="fas fa-chair"></i>
                <span>tables</span>
            </router-link>
        </nav>

        <div class="icons">
            <div id="menu-btn" class="fas fa-bars menu-btn" @click="showNav"></div>
            
            <router-link @click="scrollToTop()" to="cart" class="cart-icon">
                <div class="fas fa-shopping-cart cart">
                    <span class="tooltip">Cart</span>
                </div>
            </router-link>

            <div v-if="!user" class="fas fa-user account" @click="showLog">
                <span class="tooltip">Account</span>
                <ul class="drop-down-select">
                    <li>
                        <router-link @click="scrollToTop()" to="/login">
                            <i class="fas fa-sign-in-alt"></i> login
                        </router-link>
                    </li>
                    <li>
                        <router-link @click="scrollToTop()" to="/register">
                            <i class="fas fa-user-plus"></i> register
                        </router-link>
                    </li>
                    <li>
                        <router-link @click="scrollToTop()" to="/admin">
                            <i class="fas fa-user-shield"></i> admin
                        </router-link>
                    </li>
                </ul>
            </div>

            <div v-else class="fas fa-user account user-logged" @click="showLog">
                <span class="tooltip">My Account</span>
                <ul class="drop-down-select">
                    <li>
                        <router-link @click="scrollToTop()" to="/myorder">
                            <i class="fas fa-clipboard-list"></i> my orders
                        </router-link>
                    </li>
                    <li v-if="user.role === 'admin'">
                        <router-link @click="scrollToTop()" to="/admin">
                            <i class="fas fa-user-shield"></i> dashboard
                        </router-link>
                    </li>
                    <li>
                        <a href="#" @click="handleLogout">
                            <i class="fas fa-sign-out-alt"></i> logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    name: 'NavBar',
    
    data() {
        return {
            isMobileView: false
        }
    },

    computed: {
        ...mapState(["user"])
    },

    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.checkScreenSize);
        this.checkScreenSize();
        
        // Load FontAwesome if not already loaded
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
            document.head.appendChild(link);
        }
    },
    
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.checkScreenSize);
    },

    methods: {
        ...mapMutations(["setUser"]),

        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },

        showNav: function () {
            let navbar = document.querySelector('.header .navbar');
            navbar.classList.toggle('active');
        },

        showLog: function () {
            let mq = window.matchMedia("(max-width: 768px)");
            if (mq.matches) {
                let log = document.querySelector('.drop-down-select');
                log.classList.toggle('active');
            }
        },

        handleScroll: function () {
            let navbar = document.querySelector('.header .navbar');
            navbar.classList.remove('active');
            let log = document.querySelector('.drop-down-select');
            if (log) {
                log.classList.remove('active');
            }
        },

        handleLogout: function () {
            this.setUser("");
        },
        
        checkScreenSize() {
            this.isMobileView = window.innerWidth <= 768;
        }
    }
}
</script>

<style scoped>
/* Header styling with enhanced visuals */
.header {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.0rem 2%;
    transition: all 0.3s ease;
    width: 100%;
}

/* Logo styling with animation and effects */
.header .logo {
    display: flex;
    align-items: center;
    text-decoration: none;
}

.logo-container {
    display: flex;
    align-items: center;
    position: relative;
}

.logo-container img {
    width: 40px;
    height: auto;
    transition: transform 0.3s ease;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.logo-text {
    font-size: 2.5rem;
    font-weight: 800;
    color: #130f40;
    margin-left: 10px;
    background: linear-gradient(135deg, #27ae60, #f38609);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.3s ease;
}

.header .logo:hover img {
    transform: rotate(20deg);
}

/* Navigation menu styling */
.header .navbar {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;
    margin: 0 2rem;
}

.header .navbar .nav-link {
    position: relative;
    font-size: 1.7rem;
    margin: 0 1rem;
    color: #666;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s ease;
    text-decoration: none;
}

.header .navbar .nav-link i {
    font-size: 1.8rem;
    margin-bottom: 0.3rem;
    transition: transform 0.3s ease;
}

.header .navbar .nav-link span {
    font-size: 1.2rem;
    text-transform: capitalize;
    font-weight: 500;
}

.header .navbar .nav-link:hover {
    color: #27ae60;
}

.header .navbar .nav-link:hover i {
    transform: translateY(-3px);
}

.header .navbar .nav-link:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    width: 0;
    height: 3px;
    background: #f38609;
    transition: all 0.3s ease;
    transform: translateX(-50%);
    border-radius: 3px;
}

.header .navbar .nav-link:hover:after {
    width: 70%;
}

.header .navbar a.router-link-exact-active {
    color: #f38609;
}

.header .navbar a.router-link-exact-active:after {
    width: 70%;
}

.header .navbar .nav-link i.fa-tasks,
.header .navbar .nav-link i.fa-clipboard-check {
    color: #f38609;
}

/* Icons container styling */
.header .icons {
    display: flex;
    align-items: center;
}

.header .icons div,
.header .icons .cart-icon .cart {
    height: 4.5rem;
    width: 4.5rem;
    line-height: 4.5rem;
    font-size: 2rem;
    background: #f7f7f7;
    color: #130f40;
    border-radius: 50%;
    margin-left: 0.8rem;
    cursor: pointer;
    text-align: center;
    transition: all 0.3s ease;
    position: relative;
}

.header .icons div:hover,
.header .icons .cart-icon:hover .cart {
    color: #fff;
    background: #27ae60;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(39, 174, 96, 0.4);
}

.header .icons a.router-link-exact-active .cart {
    background: #f38609;
    color: white;
    box-shadow: 0 5px 15px rgba(243, 134, 9, 0.4);
}

/* Tooltip styling */
.tooltip {
    position: absolute;
    bottom: -35px;
    left: 50%;
    transform: translateX(-50%);
    background: #130f40;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-size: 1.2rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    white-space: nowrap;
}

.tooltip:before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 5px 5px 5px;
    border-style: solid;
    border-color: transparent transparent #130f40 transparent;
}

.header .icons div:hover .tooltip {
    opacity: 1;
    visibility: visible;
    bottom: -30px;
}

/* Menu button for mobile */
#menu-btn {
    display: none;
}

/* User account styling */
.user-logged {
    background: #f38609 !important;
    color: white !important;
}

.header .icons .account .drop-down-select {
    display: none;
    position: absolute;
    margin-top: 5px;
    right: 0;
    margin-left: -120px;
    list-style-type: none;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
    padding: 0.5rem 0;
    width: 160px;
    z-index: 100;
    transition: all 0.3s ease;
    overflow: hidden;
}

.header .icons .account .drop-down-select li {
    transition: all 0.2s ease;
}

.header .icons .account .drop-down-select li:hover {
    background: rgba(243, 134, 9, 0.1);
}

.header .icons .account .drop-down-select a {
    text-decoration: none;
    color: #130f40;
    font-size: 1.4rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    transition: all 0.3s ease;
}

.header .icons .account .drop-down-select a i {
    margin-right: 10px;
    font-size: 1.6rem;
    color: #f38609;
}

.header .icons .account .drop-down-select.active {
    display: block !important;
    animation: fadeIn 0.3s ease;
}

.drop-down-select li a[href="#"] {
    color: #e74c3c !important;
}

.drop-down-select li a[href="#"]:hover {
    background: rgba(231, 76, 60, 0.1);
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.header .icons .account:hover .drop-down-select a:hover {
    color: #f38609;
}

@media (min-width: 769px) {
    .header .icons .account:hover .drop-down-select {
        display: block;
        animation: fadeIn 0.3s ease;
    }
}

/* Responsive design */
@media (max-width: 1200px) {
    .header .navbar .nav-link {
        margin: 0 0.8rem;
    }
}

@media (max-width: 1024px) {
    .header {
        padding: 1.5rem 5%;
    }
    
    .header .navbar .nav-link {
        margin: 0 1rem;
    }
}

@media (max-width: 768px) {
    .header {
        padding: 1.5rem 4%;
    }
    
    .logo-text {
        font-size: 2rem;
    }
    
    .navbar.mobile-view {
        position: absolute;
        top: 99%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-top: 0.1rem solid rgba(0, 0, 0, 0.1);
        border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);
        clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
        transition: all 0.4s ease;
        flex-direction: column;
        padding: 1rem 4%;
    }

    .header .navbar.active {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }

    .header .navbar .nav-link {
        margin: 1.5rem 0;
        flex-direction: row;
        font-size: 2rem;
    }
    
    .header .navbar .nav-link i {
        margin-right: 1rem;
        margin-bottom: 0;
    }

    #menu-btn {
        display: inline-block;
    }
    
    .header .icons div,
    .header .icons .cart-icon .cart {
        height: 4rem;
        width: 4rem;
        line-height: 4rem;
        font-size: 1.8rem;
    }
}

@media (max-width: 576px) {
    .header {
        padding: 1.2rem 4%;
    }
    
    .logo-container img {
        width: 30px;
    }
    
    .logo-text {
        font-size: 1.8rem;
    }
    
    .header .navbar .nav-link {
        font-size: 1.8rem;
    }
    
    .header .icons div,
    .header .icons .cart-icon .cart {
        height: 3.5rem;
        width: 3.5rem;
        line-height: 3.5rem;
        font-size: 1.6rem;
        margin-left: 0.5rem;
    }
}
</style>