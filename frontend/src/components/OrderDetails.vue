<template>
    <div class="order-details">
        <div class="order-container">
            <div class="order-details-inner">
                <div class="heading">
                    <span>YOUR ORDER</span>
                    <h3>Order Summary</h3>
                    <slot></slot>
                </div>
                
                <div class="items-container">
                    <div class="food-item" v-for="(f, index) in filterFoods" :key="f.food_id">
                        <div class="product-detail">
                            <div class="image">
                                <img :src="require(`../assets/images/${f.food_src}`)" alt="" />
                            </div>
                            <div class="content">
                                <div class="name-container">
                                    <h4>{{ f.food_name }}</h4>
                                    <span class="quantity">x {{ item_qty[index] }}</span>
                                </div>
                                <p class="price">₹{{ f.food_price }}</p>
                                <p class="desc">{{ f.food_desc }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="order-summary" v-if="billMatch">
                    <div class="summary-row">
                        <span>Discount</span>
                        <span>₹{{ billMatch.bill_discount }}</span>
                    </div>
                    <div class="summary-row">
                        <span>Delivery Fee</span>
                        <span>₹{{ billMatch.bill_delivery }}</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total</span>
                        <span>₹{{ billMatch.bill_total }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
    props: ['bill'],
    name: "OrderDetails",

    data() {
        return {
            allFoodsInBill: [],
            item_qty: [],
            billMatch: undefined,
        }
    },

    mounted() {
        this.getAllFoods();
        this.getBillStatus()
    },

    computed: {
        ...mapState(["allFoods"]),

        filterFoods: function () {
            return this.allFoods.filter(
                (f) => this.matchID(f, this.allFoodsInBill)
            );
        },
    },

    methods: {
        matchID: function (food, cartArray) {
            let temp = "";
            cartArray.forEach(element => {
                if (parseInt(food.food_id) == element) {
                    temp = food
                }
            });
            return temp
        },

        async getAllFoods() {
            if (this.bill) {
                let data = (await axios.get('/billdetails/' + this.bill)).data;
                data.forEach(element => {
                    this.allFoodsInBill.push(element.food_id);
                    this.item_qty.push(element.item_qty)
                });
            }
        },

        async getBillStatus() {
            if (this.bill) {
                this.billMatch = (await axios.get('/billstatus/bill/' + this.bill)).data[0];
            }
        },
    }
}
</script>

<style scoped>
/* Base Container */
.order-details {
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

.order-container {
    width: 100%;
    max-width: 90rem;
    margin: 0 auto;
    animation: fadeIn .5s ease-out;
}

.order-details-inner {
    width: 100%;
    background-color: #fff;
    border-radius: 1.2rem;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1);
    padding: 3rem;
    display: flex;
    flex-direction: column;
    height: 70vh;
}

/* Heading Styles */
.heading {
    text-align: center;
    margin-bottom: 2rem;
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

/* Items Container */
.items-container {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 2rem;
    padding-right: 1rem;
}

/* Custom Scrollbar */
.items-container::-webkit-scrollbar {
    width: 0.6rem;
}

.items-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 1rem;
}

.items-container::-webkit-scrollbar-thumb {
    background: #27ae60;
    border-radius: 1rem;
}

.items-container::-webkit-scrollbar-thumb:hover {
    background: #219a52;
}

/* Food Item */
.food-item {
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 1.5rem;
}

.food-item:last-child {
    border-bottom: none;
}

/* Product Detail Layout */
.product-detail {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 2rem;
    align-items: center;
}

.product-detail .image {
    text-align: center;
}

.product-detail .image img {
    width: 8rem;
    height: 8rem;
    object-fit: cover;
    border-radius: 0.8rem;
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.08);
}

.product-detail .content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.name-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.name-container h4 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
    color: #333;
}

.quantity {
    font-size: 1.5rem;
    color: #666;
    font-weight: 500;
    background-color: #f0f8f4;
    padding: 0.3rem 0.8rem;
    border-radius: 2rem;
    color: #27ae60;
}

.product-detail .content .price {
    font-size: 1.6rem;
    font-weight: 600;
    color: #f38609;
    margin: 0.2rem 0;
}

.product-detail .content .desc {
    font-size: 1.4rem;
    line-height: 1.5;
    color: #666;
    margin: 0;
}

/* Order Summary */
.order-summary {
    margin-top: auto;
    background-color: #f8f9fa;
    border-radius: 0.8rem;
    padding: 1.5rem;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 1.6rem;
    padding: 0.8rem 0;
    color: #555;
}

.summary-row.total {
    font-weight: 700;
    font-size: 1.8rem;
    color: #27ae60;
    border-top: 1px dashed #ddd;
    margin-top: 0.5rem;
    padding-top: 1.2rem;
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
    .order-details-inner {
        padding: 2.5rem;
    }
}

@media (max-width: 768px) {
    .order-container {
        width: 90%;
    }
    
    .heading h3 {
        font-size: 2.2rem;
    }
    
    .product-detail {
        grid-template-columns: auto 1fr;
    }
    
    .product-detail .image img {
        width: 7rem;
        height: 7rem;
    }
    
    .name-container h4 {
        font-size: 1.6rem;
    }
    
    .product-detail .content .price {
        font-size: 1.4rem;
    }
    
    .product-detail .content .desc {
        font-size: 1.2rem;
    }
    
    .summary-row {
        font-size: 1.4rem;
    }
    
    .summary-row.total {
        font-size: 1.6rem;
    }
}

@media (max-width: 576px) {
    .order-details-inner {
        padding: 2rem;
        height: 80vh;
    }
    
    .heading span {
        font-size: 1.3rem;
    }
    
    .heading h3 {
        font-size: 1.8rem;
    }
    
    .product-detail {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 1rem;
    }
    
    .product-detail .image img {
        width: 6rem;
        height: 6rem;
    }
    
    .name-container {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .quantity {
        font-size: 1.2rem;
    }
}

@media (max-width: 376px) {
    .order-details-inner {
        padding: 1.5rem;
    }
    
    .heading h3 {
        font-size: 1.6rem;
    }
    
    .summary-row {
        font-size: 1.3rem;
    }
    
    .summary-row.total {
        font-size: 1.5rem;
    }
}
</style>