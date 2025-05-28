<template>
    <div class="promotions">
        <div class="heading">
            <span class="subheading">promotions</span>
            <h2>Best quality with reasonable price</h2>
        </div>

        <!-- Schedule Table -->
        <div class="promotions-item schedule-container">
            <div class="table-responsive">
                <table class="table table-bordered text-center">
                    <thead>
                        <tr class="bg-light-gray">
                            <th class="text-uppercase">Time</th>
                            <th class="text-uppercase">Monday</th>
                            <th class="text-uppercase">Tuesday</th>
                            <th class="text-uppercase">Wednesday</th>
                            <th class="text-uppercase">Thursday</th>
                            <th class="text-uppercase">Friday</th>
                            <th class="text-uppercase">Saturday</th>
                            <th class="text-uppercase">Sunday</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="align-middle">09:00 AM - 11:00 AM</td>
                            <td>
                                <span class="bg-brown activity-name">Breakfast time</span>
                                <div class="activity-time">Discount 10%</div>
                            </td>
                            <td>
                                <span class="bg-brown activity-name">Breakfast time</span>
                                <div class="activity-time">Discount 10%</div>
                            </td>
                            <td>
                                <span class="bg-brown activity-name">Breakfast time</span>
                                <div class="activity-time">Discount 10%</div>
                            </td>
                            <td>
                                <span class="bg-brown activity-name">Breakfast time</span>
                                <div class="activity-time">Discount 10%</div>
                            </td>
                            <td>
                                <span class="bg-brown activity-name">Breakfast time</span>
                                <div class="activity-time">Discount 10%</div>
                            </td>
                            <td class="bg-light-gray"></td>
                            <td class="bg-light-gray"></td>
                        </tr>

                        <tr>
                            <td class="align-middle">12:00 PM - 02:00 PM</td>
                            <td>
                                <span class="bg-beige activity-name">Happy Lunch</span>
                                <div class="activity-time">Free Drink</div>
                            </td>
                            <td class="bg-light-gray"></td>
                            <td>
                                <span class="bg-beige activity-name">Happy Lunch</span>
                                <div class="activity-time">Free Drink</div>
                            </td>
                            <td class="bg-light-gray"></td>
                            <td>
                                <span class="bg-beige activity-name">Happy Lunch</span>
                                <div class="activity-time">Free Drink</div>
                            </td>
                            <td class="bg-light-gray"></td>
                            <td class="bg-light-gray"></td>
                        </tr>

                        <tr>
                            <td class="align-middle">03:00 PM - 05:00 PM</td>
                            <td class="bg-light-gray"></td>
                            <td>
                                <span class="bg-earth activity-name">Afternoon Snack</span>
                                <div class="activity-time">Discount 20% Nachos & Dessert </div>
                            </td>
                            <td class="bg-light-gray"></td>
                            <td>
                                <span class="bg-earth activity-name">Afternoon Snack</span>
                                <div class="activity-time">Discount 20% Nachos & Dessert </div>
                            </td>
                            <td class="bg-light-gray"></td>
                            <td class="bg-light-gray"></td>
                            <td class="bg-light-gray"></td>
                        </tr>

                        <tr>
                            <td class="align-middle">07:00 PM - 10:00 PM</td>
                            <td class="bg-light-gray"></td>
                            <td class="bg-light-gray"></td>
                            <td class="bg-light-gray"></td>
                            <td class="bg-light-gray"></td>
                            <td>
                                <span class="bg-green activity-name">Happy Dinner</span>
                                <div class="activity-time">Discount 15%</div>
                            </td>
                            <td>
                                <span class="bg-green activity-name">Happy Dinner</span>
                                <div class="activity-time">Discount 15%</div>
                            </td>
                            <td>
                                <span class="bg-green activity-name">Happy Dinner</span>
                                <div class="activity-time">Discount 15%</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Special Offers -->
        <h3 class="section-title">Special Offers</h3>
        
        <div class="promotions-item promo-card">
            <div class="content-box">
                <img src="../assets/images/dis-1.jpg" alt="Party Taco">
                <div class="discount-badge">50% OFF</div>
            </div>
            <div class="description">
                <h3>Party Taco up to 50% off</h3>
                <ul>
                    <li><p>Order more than 10 tacos will get discount 50%</p></li>
                    <li><p>Only weekend night</p></li>
                    <li><p>Only online payment method</p></li>
                </ul>
                <router-link @click="scrollToTop()" to="/menu" class="btn">Order Now</router-link>
            </div>
        </div>

        <div class="promotions-item promo-card">
            <div class="content-box">
                <img src="../assets/images/dis-2.png" alt="Happy Lunch">
                <div class="discount-badge">25% EXTRA</div>
            </div>
            <div class="description">
                <h3>Happy Lunch up to 25% extra</h3>
                <ul>
                    <li><p>Free up size burrito</p></li>
                    <li><p>Only lunch from 12:00 PM to 2:00 PM</p></li>
                    <li><p>Only delivery</p></li>
                </ul>
                <router-link @click="scrollToTop()" to="/menu" class="btn">Order Now</router-link>
            </div>
        </div>

        <div class="promotions-item promo-card">
            <div class="content-box">
                <img src="../assets/images/dis-3.jpg" alt="New Drink">
                <div class="discount-badge">100% CASHBACK</div>
            </div>
            <div class="description">
                <h3>New drink 100% Cashback</h3>
                <ul>
                    <li><p>Free 01 Michelada when total bill more than ₹1600</p></li>
                    <li><p>From 01/05/2025 to 31/05/2025</p></li>
                    <li><p>Only online payment method</p></li>
                </ul>
                <router-link @click="scrollToTop()" to="/menu" class="btn">Order Now</router-link>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "Promo",

    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        }
    }
}
</script>

<style scoped>
.promotions {
    padding: 3rem 9%;
    background-color: #ffffff;
    font-family: 'Poppins', sans-serif;
}

/* Heading Styles - match 'about-section' */
.heading {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
}

.heading .subheading {
    font-size: 2rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #27ae60; /* No background or border-radius */
    margin-bottom: 1rem;
}

.heading h2 {
    font-size: 2.5rem;
    color: #666666; /* Match about-section's h2 color */
    font-weight: 700;
    position: relative;
    padding-bottom: 1rem;
    text-transform: uppercase;
}

.heading h2:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: #fbfbfb; /* Match about-section underline */
}


/* Promotions Item */
.promotions .promotions-item {
    width: 100%;
    margin-bottom: 3rem;
    position: relative;
    display: flex;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    border-radius: 15px;
    overflow: hidden;
    background-color: #ffffff;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.promotions .promotions-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Table Styles */
.schedule-container {
    padding: 2rem;
    flex-direction: column;
}

.table-responsive {
    width: 100%;
    overflow-x: auto;
}

.table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 10px;
    overflow: hidden;
}

.activity-name {
    display: block;
    padding: 8px 15px;
    border-radius: 5px;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.activity-time {
    margin-top: 10px;
    font-size: 12px;
    color: #555;
}

.bg-light-gray {
    background-color: #f8f9fa;
}

.table-bordered thead td,
.table-bordered thead th {
    border-bottom-width: 2px;
    font-weight: 600;
    letter-spacing: 1px;
    padding: 1rem;
}

.table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
    background-color: #f1f8f4;
    color: #333;
}

.table-bordered td,
.table-bordered th {
    border: 1px solid #e9ecef;
}

.bg-green {
    background-color: #76BA99;
    color: white;
}

.bg-brown {
    background-color: #876445;
    color: white;
}

.bg-beige {
    background-color: #CA955C;
    color: white;
}

.bg-earth {
    background-color: #ffffff;
    color: #333;
}

.table td,
.table th {
    padding: 1rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
}

/* Promo Cards */
.promo-card {
    transition: all 0.3s ease;
}

.promotions .promo-card .content-box {
    position: relative;
    overflow: hidden;
    border-radius: 15px 0 0 15px;
    height: 30rem;
    width: 30%;
    flex-shrink: 0;
}

.promotions .promo-card .content-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.promo-card:hover .content-box img {
    transform: scale(1.05);
}

.discount-badge {
    position: absolute;
    top: 20px;
    right: 0;
    background-color: #27ae60;
    color: white;
    padding: 8px 15px;
    font-weight: bold;
    font-size: 1rem;
    border-radius: 5px 0 0 5px;
    box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.2);
}

.promotions .promo-card .description {
    position: relative;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.promotions .promo-card .description h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #27ae60;
    font-weight: 700;
}

.promotions .promo-card .description ul {
    list-style-type: disc;
    margin-left: 20px;
    margin-bottom: 2rem;
}

.promotions .promo-card .description li {
    margin-bottom: 15px;
    position: relative;
}

.promotions .promo-card .description p {
    font-size: 1.1rem;
    color: #555;
    line-height: 1.6;
}

.promotions .promo-card .description .btn {
    display: inline-block;
    padding: 12px 30px;
    background-color: #27ae60;
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    border-radius: 50px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(39, 174, 96, 0.3);
    text-align: center;
    max-width: 200px;
    align-self: flex-start;
}

.promotions .promo-card .description .btn:hover {
    background-color: #229954;
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(39, 174, 96, 0.4);
}

/* Responsive Styles */
@media (max-width: 992px) {
    .promotions {
        padding: 2rem 5%;
    }
    
    .heading h2 {
        font-size: 2rem;
    }
    
    .promotions .promo-card .description h3 {
        font-size: 1.5rem;
    }
}

@media (max-width: 768px) {
    .bg-green,
    .bg-brown,
    .bg-beige,
    .bg-earth {
        padding: 5px 10px;
    }
    
    .bg-green {
        color: white;
    }
    
    .bg-brown {
        color: white;
    }
    
    .bg-beige {
        color: rgb(255, 255, 255);
    }
    
    .bg-earth {
        color: #333;
    }
    
    .promotions .promo-card {
        flex-direction: column;
    }
    
    .promotions .promo-card .content-box {
        width: 100%;
        height: 15rem;
        border-radius: 15px 15px 0 0;
    }
    
    .promotions .promo-card .description {
        padding: 1.5rem;
    }
    
    .promotions .promo-card .description h3 {
        font-size: 1.3rem;
    }
    
    .promotions .promo-card .description p {
        font-size: 1rem;
    }
}

@media (max-width: 576px) {
    .promotions {
        padding: 1.5rem 3%;
    }
  
    .heading .subheading {
        font-size: 0.8rem;
    }
  
    .heading h2 {
        font-size: 1.5rem;
    }

    .section-title {
        font-size: 1.3rem;
    }
    
    .activity-name {
        font-size: 12px;
        padding: 5px 8px;
    }
    
    .activity-time {
        font-size: 10px;
    }
    
    .table td, .table th {
        padding: 0.5rem;
    }
    
    .promotions .promo-card .content-box {
        height: 12rem;
    }
    
    .discount-badge {
        font-size: 0.8rem;
        padding: 5px 10px;
    }
    
    .promotions .promo-card .description {
        padding: 1rem;
    }
    
    .promotions .promo-card .description h3 {
        font-size: 1.1rem;
        margin-bottom: 1rem;
    }
    
    .promotions .promo-card .description p {
        font-size: 0.9rem;
    }
    
    .promotions .promo-card .description ul {
        margin-left: 15px;
    }
    
    .promotions .promo-card .description li {
        margin-bottom: 8px;
    }
    
    .promotions .promo-card .description .btn {
        padding: 8px 20px;
        font-size: 0.9rem;
    }
}
</style>