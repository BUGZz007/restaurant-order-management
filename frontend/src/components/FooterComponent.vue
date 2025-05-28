<template>
    <div class="footer">
        <div class="footer-content">
            <div class="footer-logo">
                <router-link @click="scrollToTop()" to="/" class="logo">
                    <div class="logo-container">
                        <img src="../assets/images/taco-logo.png" alt="Vedeshi Khana Logo" />
                        <span class="logo-text">Vedeshi Khana</span>
                    </div>
                </router-link>
                <p>Authentic international cuisine delivered at your doorstep</p>
            </div>

            <div class="footer-links">
                <h3>Quick Links</h3>
                <router-link @click="scrollToTop()" to="/" class="footer-link">
                    <i class="fas fa-home"></i>
                    <span>home</span>
                </router-link>
                <router-link @click="scrollToTop()" to="/menu" class="footer-link">
                    <i class="fas fa-utensils"></i>
                    <span>menu</span>
                </router-link>
                <router-link @click="scrollToTop()" to="/table" class="footer-link">
                    <i class="fas fa-chair"></i>
                    <span>table</span>
                </router-link>
                <router-link @click="scrollToTop()" to="/promotions" class="footer-link">
                    <i class="fas fa-percentage"></i>
                    <span>promotions</span>
                </router-link>
                <router-link @click="scrollToTop()" to="/about" class="footer-link">
                    <i class="fas fa-info-circle"></i>
                    <span>about</span>
                </router-link>
            </div>

            <div class="footer-contact">
                <h3>Contact Us</h3>
                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <a href="https://www.google.com/maps?q=4th+T+Block+East,+Jayanagar" target="_blank">
                            4th T Block East, Jayanagar
                        </a>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <a href="https://wa.me/917340425065" target="_blank">
                            Contact via WhatsApp
                        </a>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <a href="mailto:vishalsuthar2002@outlook.com">
                            vishalsuthar2002@outlook.com
                        </a>
                    </div>
                </div>
            </div>

            <div class="footer-social">
                <h3>Connect With Us</h3>
                <div class="icons">
                    <a href="https://www.facebook.com/share/1LQCo51hDs/?mibextid=wwXIfr" class="social-icon"
                        target="_blank">
                        <div class="fab fa-facebook-f">
                            <span class="tooltip">Facebook</span>
                        </div>
                    </a>
                    <a href="https://www.instagram.com/sujjaaa_?igsh=MTVkMHM2NHN2OTRmaw==" class="social-icon"
                        target="_blank">
                        <div class="fab fa-instagram">
                            <span class="tooltip">Instagram</span>
                        </div>
                    </a>
                    <a href="https://x.com/vishalsuthar007?s=11" class="social-icon" target="_blank">

                        <div class="fab fa-twitter">
                            <span class="tooltip">Twitter</span>
                        </div>
                    </a>
                    <a href="https://www.youtube.com/@vishalsuthar007" class="social-icon" target="_blank">
                        <div class="fab fa-youtube">
                            <span class="tooltip">YouTube</span>
                        </div>
                    </a>
                    <a href="https://github.com/BUGZz007" class="social-icon" target="_blank">
                        <div class="fab fa-github">
                            <span class="tooltip">GitHub</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; {{ currentYear }} Vedeshi Khana. All Rights Reserved.</p>
            <div class="footer-bottom-links">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FooterComponent',

    data() {
        return {
            currentYear: new Date().getFullYear()
        }
    },

    mounted() {
        // Load FontAwesome if not already loaded
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
            document.head.appendChild(link);
        }
    },

    methods: {
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
}
</script>

<style scoped>
/* Footer styling with exact matching design to header */
.footer {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.1);
    padding: 3rem 9%;
    transition: all 0.3s ease;
    z-index: 900;
}

.footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 2rem;
}

/* Logo styling with animation and effects - matching header */
.footer-logo {
    flex: 1;
    min-width: 200px;
}

.footer-contact a {
    color: inherit;
    /* Inherit color from parent */
    text-decoration: none;
    /* Remove underline */
}

.footer-contact a:hover {
    text-decoration: underline;
    /* Optional: underline on hover */
}

.footer .logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-bottom: 1rem;
}

.footer .logo-container {
    display: flex;
    align-items: center;
    position: relative;
}

.footer .logo-container img {
    width: 40px;
    height: auto;
    transition: transform 0.3s ease;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.footer .logo-text {
    font-size: 2.5rem;
    font-weight: 800;
    color: #130f40;
    margin-left: 10px;
    background: linear-gradient(135deg, #27ae60, #f38609);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.3s ease;
}

.footer .logo:hover img {
    transform: rotate(20deg);
}

.footer-logo p {
    color: #666;
    font-size: 1.4rem;
    margin-top: 0.5rem;
}

/* Footer links styling - matching navbar links */
.footer-links {
    flex: 1;
    min-width: 200px;
    display: flex;
    flex-direction: column;
}

.footer h3 {
    font-size: 1.8rem;
    color: #130f40;
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 0.5rem;
}

.footer h3:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: #f38609;
    border-radius: 3px;
}

.footer-link {
    position: relative;
    font-size: 1.5rem;
    margin: 0.5rem 0;
    color: #666;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    text-decoration: none;
}

.footer-link i {
    font-size: 1.6rem;
    margin-right: 0.8rem;
    color: #f38609;
    transition: transform 0.3s ease;
}

.footer-link span {
    font-size: 1.4rem;
    text-transform: capitalize;
    font-weight: 500;
}

.footer-link:hover {
    color: #27ae60;
    transform: translateX(5px);
}

.footer-link:hover i {
    transform: translateY(-2px);
}

/* Contact section styling */
.footer-contact {
    flex: 1;
    min-width: 200px;
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.contact-item {
    display: flex;
    align-items: center;
    color: #666;
    font-size: 1.4rem;
}

.contact-item i {
    width: 30px;
    height: 30px;
    line-height: 30px;
    background: #f7f7f7;
    color: #f38609;
    border-radius: 50%;
    margin-right: 1rem;
    text-align: center;
    transition: all 0.3s ease;
}

.contact-item:hover i {
    background: #27ae60;
    color: #fff;
    transform: translateY(-2px);
}

/* Social icons container styling - matching header icons */
.footer-social {
    flex: 1;
    min-width: 200px;
}

.footer-social .icons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.footer-social .social-icon {
    text-decoration: none;
}

.footer-social .icons div {
    height: 4.5rem;
    width: 4.5rem;
    line-height: 4.5rem;
    font-size: 2rem;
    background: #f7f7f7;
    color: #130f40;
    border-radius: 50%;
    cursor: pointer;
    text-align: center;
    transition: all 0.3s ease;
    position: relative;
}

.footer-social .icons div:hover {
    color: #fff;
    background: #27ae60;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(39, 174, 96, 0.4);
}

/* Tooltip styling - matching header tooltips */
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

.footer-social .icons div:hover .tooltip {
    opacity: 1;
    visibility: visible;
    bottom: -30px;
}

/* Footer bottom section */
.footer-bottom {
    padding-top: 2rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.footer-bottom p {
    color: #666;
    font-size: 1.4rem;
}

.footer-bottom-links {
    display: flex;
    gap: 2rem;
}

.footer-bottom-links a {
    color: #666;
    font-size: 1.4rem;
    text-decoration: none;
    transition: all 0.3s ease;
}

.footer-bottom-links a:hover {
    color: #f38609;
}

/* Responsive design - matching navbar breakpoints */
@media (max-width: 1024px) {
    .footer {
        padding: 3rem 5%;
    }
}

@media (max-width: 768px) {
    .footer-content {
        flex-direction: column;
        gap: 3rem;
    }

    .footer-bottom {
        flex-direction: column;
        text-align: center;
    }

    .footer h3 {
        text-align: center;
    }

    .footer h3:after {
        left: 50%;
        transform: translateX(-50%);
    }

    .footer-social .icons {
        justify-content: center;
    }
}

@media (max-width: 576px) {
    .footer {
        padding: 2rem 4%;
    }

    .footer .logo-container img {
        width: 30px;
    }

    .footer .logo-text {
        font-size: 1.8rem;
    }

    .footer-social .icons div {
        height: 3.5rem;
        width: 3.5rem;
        line-height: 3.5rem;
        font-size: 1.6rem;
    }
}
</style>