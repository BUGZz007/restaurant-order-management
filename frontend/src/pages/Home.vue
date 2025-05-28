<template>
    <div>
        <div class="home-main">
            <div class="content">
                <span>WELCOME FOODIES</span>
                <h3>AUTHENTIC MEXICAN FLAVORS</h3>
                <p>We guarantee to use fresh ingredients with the best quality. Our customers enjoy Mexican cuisine with explosive, sophisticated flavors prepared by expert chefs.</p>
                <router-link @click="scrollToTop()" to="/menu" class="btn">ORDER NOW</router-link>
            </div>
            <div class="image">
                <img src="../assets/images/b.png" alt="" class="home-img">
                <img src="../assets/images/a.png" alt="" class="home-parallax-img">
            </div>
        </div>

        <div class="home-category">
            <router-link @click="scrollToTop()" to="/menu" class="box">
                <img src="../assets/images/taco-img.png" alt="">
                <h3>TACOS</h3>
            </router-link>

            <router-link @click="scrollToTop()" to="/menu" class="box">
                <img src="../assets/images/burrito-img.png" alt="">
                <h3>BURRITOS</h3>
            </router-link>

            <router-link @click="scrollToTop()" to="/menu" class="box">
                <img src="../assets/images/nachos-img.png" alt="">
                <h3>NACHOS</h3>
            </router-link>

            <router-link @click="scrollToTop()" to="/menu" class="box">
                <img src="../assets/images/salad-img.png" alt="">
                <h3>SIDES</h3>
            </router-link>

            <router-link @click="scrollToTop()" to="/menu" class="box">
                <img src="../assets/images/dessert-img.png" alt="">
                <h3>DESSERTS</h3>
            </router-link>

            <router-link @click="scrollToTop()" to="/menu" class="box">
                <img src="../assets/images/coca-img.png" alt="">
                <h3>DRINKS</h3>
            </router-link>
        </div>

        <div class="home-banner">
            <div class="grid-banner row">
                <div class="grid col-md-4">
                    <img src="../assets/images/dis-1.jpg" alt="">
                    <div class="content">
                        <span>SPECIAL OFFER</span>
                        <h3>UP TO 50% OFF</h3>
                        <router-link @click="scrollToTop()" to="/menu" class="btn">ORDER NOW</router-link>
                    </div>
                </div>

                <div class="grid col-md-4">
                    <img src="../assets/images/dis-2.png" alt="">
                    <div class="content center">
                        <span>SPECIAL OFFER</span>
                        <h3>UP TO 25% EXTRA</h3>
                        <router-link @click="scrollToTop()" to="/menu" class="btn">ORDER NOW</router-link>
                    </div>
                </div>

                <div class="grid col-md-4">
                    <img src="../assets/images/dis-3.jpg" alt="">
                    <div class="content">
                        <span>LIMITED OFFER</span>
                        <h3>100% CASHBACK</h3>
                        <router-link @click="scrollToTop()" to="/menu" class="btn">ORDER NOW</router-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="home-about">
            <div class="image">
                <img src="../assets/images/about-img.jpg" alt="">
            </div>
            <div class="content">
                <span>WHY CHOOSE US?</span>
                <h3 class="title">WHAT MAKES OUR FOOD DELICIOUS!</h3>
                <p>Our customers are always guaranteed the finest quality Mexican cuisine. Every dish is expertly
                    crafted by our master chef, bringing authentic and vibrant Mexican flavors to life. With a blend of
                    tradition and innovation, our chef creates mouth-watering meals that are both explosive and delicate
                    in taste. Whether dining in or enjoying our professional delivery service, you can savor the same
                    top-tier quality from our restaurant in the comfort of your home.</p>
                <router-link @click="scrollToTop()" to="/about" class="btn">READ MORE</router-link>

                <div class="icons-container">
                    <div class="icons">
                        <img src="../assets/images/serv-1.png" alt="">
                        <h3>FAST DELIVERY</h3>
                    </div>
                    <div class="icons">
                        <img src="../assets/images/serv-2.png" alt="">
                        <h3>FRESH FOOD</h3>
                    </div>
                    <div class="icons">
                        <img src="../assets/images/serv-3.png" alt="">
                        <h3>BEST QUALITY</h3>
                    </div>
                    <div class="icons">
                        <img src="../assets/images/serv-4.png" alt="">
                        <h3>24/7 SUPPORT</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",

    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        }
    }
};
</script>

<style scoped>
.home-main,
.home-about,
.home-banner,
.home-category {
    padding: 2rem 9%;
    font-family: 'Poppins', sans-serif;
}

.home-main {
    display: flex;
    align-items: center;
    flex-wrap: wrap-reverse;
    gap: 2rem;
    position: relative;
    overflow: hidden;
    min-height: 80vh;
    background: linear-gradient(135deg, #f9f9f9, #f1f1f1);
}

.home-main .content {
    flex: 1 1 41rem;
}

.home-main .content span {
    font-size: 1.8rem;
    font-weight: 600;
    color: #27ae60;
    letter-spacing: 2px;
    display: block;
    margin-bottom: 0.5rem;
}

.home-main .content h3 {
    font-size: 3.5rem;
    color: #666666;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    padding-top: 1rem;
    margin-bottom: 1rem;
}

.home-main .content p {
    font-size: 1.4rem;
    color: #666;
    line-height: 1.8;
    padding: 1rem 0;
    max-width: 80%;
}

.home-main .image {
    flex: 1 1 41rem;
    margin: 2rem 0;
    pointer-events: none;
    position: relative;
}

.home-main .image .home-img {
    width: 100%;
    margin-top: 5rem;
}

.home-main .home-parallax-img {
    position: absolute;
    top: -15rem;
    right: -15rem;
    width: 80vw;
}

/* home category */
.home-category {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    gap: 1.5rem;
    padding-bottom: 5rem;
    background: #fff;
}

.home-category .box {
    padding: 2rem;
    text-align: center;
    border-radius: 0.8rem;
    background: #f7f7f7;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    border-bottom: 3px solid transparent;
}

.home-category .box:hover {
    background: #27ae60;
    transform: translateY(-5px);
    border-bottom: 3px solid #219a52;
}

.home-category .box:hover h3 {
    color: #fff;
}

.home-category .box img {
    height: 7rem;
    margin-bottom: 1rem;
}

.home-category .box h3 {
    font-size: 1.4rem;
    color: #333;
    font-weight: 500;
    letter-spacing: 1px;
}

/* home banner */
.home-banner {
    padding-bottom: 4rem;
}

.home-banner .grid-banner {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin: 0 -1rem;
}

.home-banner .grid-banner .grid {
    border-radius: 1rem;
    overflow: hidden;
    height: 35rem;
    position: relative;
    flex: 1 1 30%;
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.home-banner .grid-banner .grid:hover {
    transform: translateY(-5px);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
}

.home-banner .grid-banner .grid:hover img {
    transform: scale(1.1);
}

.home-banner .grid-banner .grid img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.home-banner .grid-banner .grid .content {
    position: absolute;
    top: 2rem;
    padding: 0 2rem;
    z-index: 1;
}

.home-banner .grid-banner .grid .content.center {
    text-align: center;
    width: 100%;
}

.home-banner .grid-banner .grid .content.center span {
    color: #333;
    background: rgba(255, 255, 255, 0.8);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
}

.home-banner .grid-banner .grid .content.center h3 {
    color: #130f40;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
}

.home-banner .grid-banner .grid .content span {
    font-size: 1.6rem;
    font-weight: 600;
    color: #fff;
    background: rgba(39, 174, 96, 0.8);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    letter-spacing: 1px;
}

.home-banner .grid-banner .grid .content h3 {
    font-size: 2.5rem;
    color: #fff;
    padding-top: 1rem;
    font-weight: 700;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    letter-spacing: 1px;
}

.home-about {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2rem;
    background: #f7f7f7;
}

.home-about .image {
    flex: 1 1 40rem;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
}

.home-about .image img {
    width: 100%;
    transition: transform 0.5s ease;
}

.home-about .image:hover img {
    transform: scale(1.05);
}

.home-about .content {
    flex: 1 1 40rem;
    padding: 2rem;
}

.home-about .content span {
    font-size: 1.8rem;
    font-weight: 600;
    color: #27ae60;
    letter-spacing: 2px;
    display: block;
    margin-bottom: 0.5rem;
}

.home-about .content .title {
    font-size: 2.8rem;
    padding-top: 0.5rem;
    color: #666666;
    font-weight: 700;
    letter-spacing: 1px;
}

.home-about .content p {
    padding: 1.5rem 0;
    line-height: 1.8;
    font-size: 1.4rem;
    color: #666;
}

.home-about .content .icons-container {
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
}

.home-about .content .icons-container .icons {
    flex: 1 1 20rem;
    border-radius: 0.8rem;
    background: #fff;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem;
    transition: all 0.3s ease;
    border-bottom: 3px solid transparent;
}

.home-about .content .icons-container .icons:hover {
    transform: translateY(-5px);
    border-bottom: 3px solid #27ae60;
}

.home-about .content .icons-container .icons img {
    height: 5rem;
}

.home-about .content .icons-container .icons h3 {
    font-size: 1.4rem;
    color: #333;
    font-weight: 500;
    letter-spacing: 1px;
}

.btn {
    display: inline-block;
    padding: 1.2rem 2.5rem;
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: white;
    background: linear-gradient(to right, #27ae60, #2ecc71);
    border: none;
    border-radius: 0.8rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    margin-top: 1rem;
}

.btn:hover {
    background: linear-gradient(to right, #219a52, #25a25a);
    transform: translateY(-3px);
    box-shadow: 0 7px 14px rgba(39, 174, 96, 0.2);
}

.btn:active {
    transform: translateY(-1px);
}

@media (max-width: 992px) {
    .home-main,
    .home-about,
    .home-banner,
    .home-category {
        padding: 2rem 5%;
    }
    
    .home-main .content p {
        max-width: 100%;
    }
}

@media (max-width: 768px) {
    #menu-btn {
        display: inline-block;
    }

    .home-main .home-parallax-img {
        top: 0;
        right: 0;
        width: 100%;
    }

    .home-banner .grid-banner {
        flex-direction: column;
    }

    .home-banner .grid-banner .grid {
        height: 30rem;
    }

    .home-banner .grid-banner .grid .content h3 {
        font-size: 2rem;
    }

    .home-about .content .icons-container {
        justify-content: center;
    }

    .home-about .content .icons-container .icons {
        flex: 0 1 45%;
    }
}

@media (max-width: 576px) {
    .home-main .content h3 {
        font-size: 2.5rem;
    }

    .home-main .content p {
        font-size: 1.3rem;
    }
    
    .home-category {
        grid-template-columns: 1fr 1fr;
    }

    .home-about .content .title {
        font-size: 2.2rem;
    }
    
    .home-about .content .icons-container .icons {
        flex: 0 1 100%;
    }
}
</style>