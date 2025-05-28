<template>
    <vue-basic-alert :duration="300" :closeIn="2000" ref="alert" />

    <div v-if="user" class="quick-view">
        <button class="permanent-back-btn" @click="$emit('close')">Back</button>
        
        <div class="quick-view-container">
            <div class="quick-view-inner" v-for="f in selectedFood" :key="f">
                <div class="heading">
                    <span>FOOD DETAILS</span>
                    <h3>{{ f.food_name }}</h3>
                    <slot></slot>
                </div>

                <div class="product-detail">
                    <div class="image">
                        <img :src="require(`../assets/images/${f.food_src}`)" alt="" />
                    </div>
                    <div class="content">
                        <p class="desc">{{ f.food_desc }}</p>
                        <div class="price-container">
                            <p class="money">₹{{ parseFloat(f.food_price) - parseFloat(f.food_discount) }}
                                <span v-if="parseFloat(f.food_discount) > 0">
                                    ₹{{ parseFloat(f.food_price) }}
                                </span>
                            </p>
                        </div>
                        
                        <div class="form-group">
                            <label for="qty">Quantity:</label>
                            <div class="input-wrapper">
                                <i class="fas fa-shopping-basket input-icon"></i>
                                <input type="number" name="qty" id="qty" class="form-control" value="1" min="1" max="1000"
                                    @change="onQtyChange($event)" />
                            </div>
                        </div>
                        
                        <button class="btn" @click="addToCart">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="quick-view">
        <button class="permanent-back-btn" @click="$emit('close')">Back</button>
        <div class="login-alert">
            <div class="login-content">
                <h2>Please login to continue</h2>
                <p>You need to be logged in to add items to your cart</p>
                <router-link class="login-btn" to="/login">Login Now</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import VueBasicAlert from 'vue-basic-alert';
export default {
    props: ['food'],
    name: "QuickView",

    data() {
        return {
            qty: 1,
        }
    },

    computed: {
        ...mapState(["allFoods", "user"]),

        selectedFood: function () {
            return this.allFoods.filter((f) => parseInt(f.food_id) == parseInt(this.food));
        }
    },

    methods: {
        onQtyChange: function (e) {
            if (e.target.value < 1) {
                e.target.value = 1;
                this.qty = e.target.value;
            } else {
                this.qty = e.target.value;
            }
        },

        async addToCart() {
            try {
                let existItem = await axios.get('/cartItem/' + parseInt(this.user.user_id) + '/' + parseInt(this.food));

                if (existItem.data.length == 1) {
                    let data = {
                        user_id: parseInt(this.user.user_id),
                        food_id: parseInt(this.food),
                        item_qty: parseInt(this.qty) + parseInt(existItem.data[0].item_qty)
                    };
                    await axios.put("/cartItem/", data);
                    this.$refs.alert.showAlert('success', 'Thank you!', 'Add To Cart Successfully !');
                    
                    // Add delay before closing
                    setTimeout(() => {
                        this.$emit('close');
                    }, 1000); // Close after 1 second

                } else {
                    let data = {
                        user_id: parseInt(this.user.user_id),
                        food_id: parseInt(this.food),
                        item_qty: parseInt(this.qty)
                    };

                    await axios.post("/cartItem/", data);
                    this.$refs.alert.showAlert('success', 'Thank you!', 'Add To Cart Successfully !');
                    
                    // Add delay before closing
                    setTimeout(() => {
                        this.$emit('close');
                    }, 1000); // Close after 1 second
                }
            } catch (error) {
                console.error("Error adding to cart:", error);
                this.$refs.alert.showAlert('error', 'Error!', 'Failed to add item to cart');
            }
        }
    },

    components: {
        VueBasicAlert
    }
}
</script>

<style scoped>
/* Base Container */
.quick-view {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
}

/* Update the back button styles */
.permanent-back-btn {
    position: absolute;  /* Changed from fixed to absolute */
    top: 20px;
    right: 40px;
    width: 80px;
    height: 40px;
    border-radius: 25px;
    background: #27ae60;
    border: none;
    font-size: 16px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(39, 174, 96, 0.2);
}

.permanent-back-btn:hover {
    background: #f38609;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(243, 134, 9, 0.3);
}

.quick-view-container {
    width: 100%;
    max-width: 90rem;
    margin: 0 auto;
    animation: fadeIn .5s ease-out;
}

.quick-view-inner {
    width: 100%;
    background-color: #fff;
    border-radius: 1.2rem;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1);
    padding: 3rem;
}

/* Heading Styles */
.heading {
    text-align: center;
    margin-bottom: 2.5rem;
}

.heading span {
    font-size: 1.5rem;
    font-weight: 600;
    color: #27ae60;
    letter-spacing: 2px;
    display: block;
    margin-bottom: 0.5rem;
}

.heading h3 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #666666;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
}

/* Product Detail Layout */
.product-detail {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
}

.product-detail .image {
    text-align: center;
}

.product-detail .image img {
    max-height: 35rem;
    max-width: 100%;
    object-fit: contain;
    border-radius: 0.8rem;
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.08);
}

.product-detail .content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.product-detail .content .desc {
    font-size: 1.6rem;
    line-height: 1.6;
    color: #555;
    margin-bottom: 1rem;
}

.price-container {
    margin-bottom: 1rem;
}

.product-detail .content .money {
    font-size: 2.2rem;
    font-weight: 700;
    color: #27ae60;
}

.product-detail .content .money span {
    margin-left: 1rem;
    font-size: 1.6rem;
    color: #888;
    text-decoration: line-through;
    font-weight: normal;
}

/* Form elements */
.form-group {
    margin-bottom: 2rem;
}

.form-group label {
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

.form-control {
    width: 100%;
    padding: 1.6rem 1.5rem 1.6rem 4rem;
    font-size: 1.5rem;
    color: #333;
    background: #f8f9fa;
    border: 2px solid #eaeaea;
    border-radius: 0.8rem;
    transition: all 0.3s ease;
}

.form-control:focus {
    border-color: #27ae60;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(39, 174, 96, 0.1);
    outline: none;
}

/* Button Styling */

.btn {
    padding: 1.5rem;
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
    width: 100%;
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

/* Enhanced login alert styling */
.login-alert {
    width: min(90vw, 450px);
    background-color: #fff;
    border-radius: 1.2rem;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1);
    overflow: hidden;
    animation: fadeIn 0.3s ease-out;
}

.login-content {
    padding: 3rem;
    text-align: center;
}

.login-content h2 {
    margin: 0;
    font-size: 2.2rem;
    color: #27ae60;
    margin-bottom: 1.5rem;
}

.login-content p {
    font-size: 1.6rem;
    color: #555;
    margin-bottom: 2.5rem;
}

.login-btn {
    display: inline-block;
    background: linear-gradient(to right, #27ae60, #2ecc71);
    color: white;
    padding: 1.2rem 2.5rem;
    border-radius: 50px;
    font-size: 1.6rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
}

.login-btn:hover {
    background: linear-gradient(to right, #219a52, #25a25a);
    transform: translateY(-3px);
    box-shadow: 0 7px 14px rgba(39, 174, 96, 0.2);
}

/* Animation */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive Design */
@media (max-width: 992px) {
    .quick-view-inner {
        padding: 2.5rem;
    }
}

@media (max-width: 768px) {
    .product-detail {
        grid-template-columns: 1fr;
    }
    
    .heading h3 {
        font-size: 2.2rem;
    }
    
    .product-detail .image img {
        max-height: 25rem;
    }
}

@media (max-width: 576px) {
    .quick-view-inner {
        padding: 2rem;
    }
    
    .heading span {
        font-size: 1.3rem;
    }
    
    .heading h3 {
        font-size: 1.8rem;
    }
    
    .product-detail .content .desc {
        font-size: 1.4rem;
    }
    
    .product-detail .content .money {
        font-size: 1.8rem;
    }
}
</style>