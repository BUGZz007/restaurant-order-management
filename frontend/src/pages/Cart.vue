<template>
    <div class="shopping-cart-section">
        <div class="heading">
            <span>Shopping cart</span>
            <h3>Good products, fast delivery</h3>
        </div>

        <div class="container">
            <div class="wrapper wrapper-content">
                <div class="row">
                    <div class="in-cart col-md-9">
                        <div class="box">
                            <div class="box-title item-total row">
                                <h3>
                                    <p style="font-size: 15px;">{{ filterFoods.length.toString() }}
                                        <span v-if="filterFoods.length < 2">item</span>
                                        <span v-else>items</span>
                                    </p>in your cart
                                </h3>
                            </div>

                            <div v-if="!filterFoods.length">
                                <div class="box-content row no-food">
                                    <div class="content">
                                        <h2 style="color: #057835fa;">You do not have any items in your cart, go shop
                                            now!</h2>
                                    </div>
                                    <div class="image">
                                        <img src="../assets/images/notfound.png" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div v-for="(f, index) in filterFoods" :key="index">
                                    <div class="box-content row">
                                        <div class="image-box col-sm-3" style="padding-left: 0;">
                                            <img :src="require(`../assets/images/${f.food_src}`)" alt=""
                                                class="cart-product-img" />
                                        </div>

                                        <div class="desc col-sm-4">
                                            <h2 class="item-name">{{ f.food_name }}</h2>
                                            <div class="item-desc">
                                                <b>Description</b>
                                                <p>{{ f.food_desc }}</p>
                                            </div>
                                            <button class="btn remove-btn" @click="removeBtn(index)"><i
                                                    class="fa fa-trash"></i>Remove
                                                item</button>
                                        </div>

                                        <div class="item-price col-sm-1">
                                            <span class="sale-price">₹{{ parseFloat(f.food_price) -
                                                parseFloat(f.food_discount)
                                            }}</span>
                                            <p class="text-muted first-price"
                                                v-if="parseFloat(f.food_discount) != 0.00">
                                                ₹{{ parseFloat(f.food_price) }}

                                            </p>
                                        </div>

                                        <div class="item-qty col-sm-2 d-inline">
                                            <label for="iQuantity"
                                                style="font-size: 12px; padding-right: 2px;">Quantity:</label>
                                            <input type="number" id="iQuantity" class="form-control item-quantity"
                                                :value="itemQuantity[index]" min="1" max="1000"
                                                @change="onQtyChange($event, index)">
                                        </div>

                                        <div class="cal-total col-sm-2">
                                            <h4 class="item-total">₹{{calculateItemPrice(index)}}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div class="box-content row">
                            <router-link to="/menu" class="btn shop-btn"><i class="fa fa-arrow-left"></i>Continue
                                shopping</router-link>
                            <button class="btn check-out-btn" style="margin-left: 10px;"
                                :disabled="filterFoods.length ? false : true" @click="checkOutBtn()"><i
                                    class="fa fa fa-shopping-cart"></i>Checkout</button>
                        </div>
                    </div>


                    <div class="col-md-3">
                        <div class="box">
                            <div class="box-title">
                                <h3>Cart Summary</h3>
                            </div>

                            <div class="box-content">
                                <span>Summary</span>
                                <h3 class="font-bold total-first-price">₹{{ calculateSummaryPrice()[0] }}</h3>

                                <span>Discount</span>
                                <h3 class="font-bold total-discount">₹{{ calculateSummaryPrice()[1] }}</h3>

                                <span>Delivery fee</span>
                                <h3 class="font-bold total-delivery">₹{{ calculateSummaryPrice()[2] }}</h3>

                                <hr />

                                <span>Total</span>
                                <h2 class="font-bold total-sale">₹{{ calculateSummaryPrice()[3] }}</h2>

                                <div class="btn-group">
                                    <button class="btn check-out-btn" :disabled="filterFoods.length ? false : true"
                                        @click="checkOutBtn()"><i class="fa fa-shopping-cart"></i>
                                        Checkout</button>
                                    <button class="btn cancel-btn" @click="cancelBtn()"
                                        :disabled="filterFoods.length ? false : true">
                                        Cancel</button>
                                </div>
                            </div>
                        </div>

                        <div class="box">
                            <div class="box-title">
                                <h3>Support</h3>
                            </div>
                            <div class="box-content text-center">
                                <h3><i class="fa fa-phone"></i> +91 7340425065</h3>
                                <span class="small">
                                    Please contact with us if you have any questions. We are avalible 24h.
                                </span>
                            </div>
                        </div>
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
    name: "Cart",

    data() {
        return {
            cartItem: [],
            itemQuantity: [],
        };
    },

    // created() {
    //     this.getAllCartItem();
    // },

    mounted() {
        this.getAllCartItem();
    },

    computed: {
        ...mapState(["allFoods", "user"]),

        filterFoods: function () {
            return this.allFoods.filter(
                (f) => this.matchID(f, this.cartItem)
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

        calculateItemPrice: function (index) {
            return ((parseInt(this.filterFoods[index].food_price) - parseInt(this.filterFoods[index].food_discount)) * this.itemQuantity[index]).toString()
        },

        calculateSummaryPrice: function () {
            let subtotal = 0;
            let discount = 0;
            let delivery = 80;
            let i = 0;
            while (i < this.itemQuantity.length) {
                subtotal = subtotal + parseInt(this.filterFoods[i].food_price) * this.itemQuantity[i]
                discount = discount + parseInt(this.filterFoods[i].food_discount) * this.itemQuantity[i]
                i = i + 1
            }
            if (!this.filterFoods.length) {
                delivery = 0
            }
            let total = subtotal - discount + delivery;
            return [subtotal, discount, delivery, total];
        },

        async onQtyChange(e, i) {
            if (e.target.value < 1) {
                e.target.value = 1
                this.itemQuantity[i] = 1
            } else {
                this.itemQuantity[i] = e.target.value;
            }

            let data = {
                user_id: parseInt(this.user.user_id),
                food_id: parseInt(this.cartItem[i]),
                item_qty: this.itemQuantity[i]
            };
            await axios.put("/cartItem/", data)
        },

        async cancelBtn() {
            await axios.delete("/cartItem/" + this.user.user_id);

            this.cartItem = [];
            this.itemQuantity = [];
        },

        checkOutBtn: function () {
            this.$router.push("/checkout");
        },

        async removeBtn(index) {
            await axios.delete("/cartItem/" + this.user.user_id + "/" + this.cartItem[index]);

            this.cartItem.splice(index, 1);
            this.itemQuantity.splice(index, 1);
        },

        async getAllCartItem() {
            if (this.user) {
                let existItem = await axios.get('/cartItem/' + this.user.user_id);
                existItem.data.forEach(element => {
                    this.cartItem.push(element.food_id);
                    this.itemQuantity.push(element.item_qty);
                });
            }
        }


    }

}
</script>


<style scoped>
.shopping-cart-section {
    background: linear-gradient(135deg, #f9f9f9, #f1f1f1);
    padding: 2rem 5%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.heading {
    text-align: center;
    margin-bottom: 2rem;
}

.heading span {
    font-size: 1.8rem;
    color: #666;
}

.heading h3 {
    font-size: 2.2rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #27ae60;
    letter-spacing: 1px;
}

.container {
    width: 100%;
    max-width: 1200px;
}

.box {
    background: #fff;
    border-radius: 1.2rem;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.08);
    margin-bottom: 2rem;
    overflow: hidden;
    animation: fadeIn .5s ease-out;
}

.box-title {
    border-bottom: 2px solid #eaeaea;
    padding: 1.5rem 2rem;
    background: #fff;
}

.box-title h3 {
    font-size: 1.6rem;
    font-weight: 600;
    color: #333;
}

.box-content {
    padding: 1.5rem 2rem;
    background: #fff;
}

.cart-product-img {
    width: 100%;
    height: 125px;
    object-fit: cover;
    border-radius: 0.8rem;
}

.item-name {
    font-size: 1.6rem;
    color: #27ae60;
    margin-bottom: 0.5rem;
}

.item-desc {
    margin-bottom: 1rem;
}

.item-desc b {
    font-size: 1.2rem;
    color: #555;
}

.item-desc p {
    font-size: 1rem;
    color: #666;
}

.sale-price {
    font-size: 1.4rem;
    font-weight: 600;
    color: #27ae60;
}

.first-price {
    text-decoration: line-through;
    color: #888;
    font-size: 1.2rem;
}

.item-quantity {
    width: 60px;
    height: 35px;
    padding: 0.5rem;
    border: 2px solid #eaeaea;
    border-radius: 0.5rem;
    font-size: 1.2rem;
    transition: all 0.3s ease;
}

.item-quantity:focus {
    border-color: #27ae60;
    box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
    outline: none;
}

.remove-btn {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    background: #f8f9fa;
    color: #e74c3c;
    border: 2px solid #eaeaea;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
}

.remove-btn:hover {
    background: #fff0f0;
    border-color: #e74c3c;
}

.remove-btn i {
    margin-right: 0.5rem;
}

.cal-total h4 {
    font-size: 1.4rem;
    font-weight: 600;
    color: #333;
}

.shop-btn, .check-out-btn, .cancel-btn {
    padding: 0.8rem 1.5rem;
    border-radius: 0.5rem;
    font-size: 1.2rem;
    font-weight: 600;
    transition: all 0.3s ease;
}

.shop-btn {
    background: #f8f9fa;
    color: #27ae60;
    border: 2px solid #eaeaea;
}

.shop-btn:hover {
    background: #fff;
    border-color: #27ae60;
    transform: translateY(-2px);
}

.check-out-btn {
    background: linear-gradient(to right, #27ae60, #2ecc71);
    color: white;
    border: none;
}

.check-out-btn:hover {
    background: linear-gradient(to right, #219a52, #25a25a);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(39, 174, 96, 0.2);
}

.check-out-btn:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.cancel-btn {
    background: #f8f9fa;
    color: #e74c3c;
    border: 2px solid #eaeaea;
    margin-top: 1rem;
    width: 100%;
}

.cancel-btn:hover {
    background: #fff0f0;
    border-color: #e74c3c;
    transform: translateY(-2px);
}

.cancel-btn:disabled {
    color: #999;
    background: #f1f1f1;
    border-color: #ddd;
    cursor: not-allowed;
    transform: none;
}

.btn-group {
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
}

.font-bold {
    font-weight: 600;
}

.total-first-price, .total-discount, .total-delivery {
    font-size: 1.4rem;
    color: #666;
    margin-bottom: 1rem;
}

.total-sale {
    font-size: 1.8rem;
    color: #27ae60;
    margin-bottom: 1.5rem;
}

.no-food {
    text-align: center;
    padding: 2rem;
}

.no-food h2 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
}

.no-food .image img {
    width: 200px;
    height: 200px;
    opacity: 0.8;
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
    .box-content .item-name {
        font-size: 1.4rem;
    }

    .desc button {
        position: absolute;
        bottom: 0;
    }

    .box-content .btn-group {
        display: block;
    }

    .box-content .btn-group button {
        border-radius: .5rem !important;
    }

    .box-content .btn-group button i {
        margin-top: 3px;
    }

    .box-content .btn-group .check-out-btn {
        display: flex;
        margin-top: 10px;
        margin-bottom: 10px;
    }
}

@media (max-width: 576px) {
    .box-title {
        min-height: 48px;
    }

    .box-title.item-total {
        border: none;
    }

    .in-cart .box-content .btn-group {
        margin-top: 5px;
        display: inline-flex;
    }

    .in-cart .box-content .btn-group .check-out-btn {
        display: flex;
        margin-top: 0px;
        margin-right: 5px;
        margin-bottom: 0px;
    }

    .image-box {
        position: absolute;
        opacity: 0.8;
        max-width: 100%;
        width: 100%;
        max-height: 100%;
        filter: brightness(60%);
        padding: none;
    }

    .image-box img {
        border-radius: 15px;
    }

    .in-cart .box-content {
        color: white;
        margin-left: -25px;
        border: none;
        display: flex;
    }

    .desc .item-name {
        font-size: 16px;
        filter: brightness(160%);
    }

    .desc b {
        font-size: 10px;
    }

    .desc p {
        font-size: 12px;
    }

    .desc .remove-btn {
        font-size: 10px;
        position: relative;
    }

    .item-price {
        position: absolute;
        margin-top: 55px;
    }

    .item-price .first-price {
        display: inline;
        padding-left: 5px;
        color: red !important;
    }

    .item-qty {
        position: absolute;
        margin-top: 55px;
        padding-left: 160px;
    }

    .cal-total {
        display: none;
    }

    .in-cart .box-content .check-out-btn {
        display: none;
    }
}
</style>