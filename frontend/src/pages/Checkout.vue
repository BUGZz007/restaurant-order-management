<template>
    <div class="checkout-container">
        <div class="checkout-form-container">
            <div class="heading">
                <span>COMPLETE YOUR ORDER</span>
                <h3>JUST A FEW STEPS AWAY</h3>
            </div>

            <div class="icons-container">
                <div class="icons">
                    <img src="../assets/images/icon-1.png" alt="">
                    <h3>9:00AM to 10:00PM</h3>
                </div>

                <div class="icons">
                    <img src="../assets/images/icon-2.png" alt="">
                    <h3>+91 7340425065</h3>
                </div>

                <div class="icons">
                    <img src="../assets/images/icon-3.png" alt="">
                    <h3>No. 15, 4th Block, Jayanagar, Bengaluru</h3>
                </div>
            </div>

            <form id="checkoutForm" @submit="handleSubmit" novalidate autocomplete="off">
                <div class="checkout-heading">
                    <h3>Your Order Details</h3>
                    <h3 v-if="user">{{ user.user_name }}'s Order<span>₹{{ calculateSummaryPrice()[3] }}</span></h3>
                </div>

                <div class="form-group details-group">
                    <h4>Shipping Details</h4>
                    <div class="form-group">
                        <label for="coPhone">Your Phone Number</label>
                        <div class="input-wrapper">
                            <i class="fas fa-phone input-icon"></i>
                            <input type="text" name="coPhone" id="coPhone" placeholder="+91 1234567890" class="form-control"
                                v-model="checkoutObj.phone" />
                        </div>
                        <p class="error-mess" v-if="errorObj.phoneErr.length > 0">{{ errorObj.phoneErr[0] }}</p>
                    </div>

                    <div class="form-group">
                        <label for="coAddress">Delivery Address</label>
                        <div class="input-wrapper">
                            <i class="fas fa-map-marker-alt input-icon"></i>
                            <input type="text" name="coAddress" id="coAddress" placeholder="Address in Bangalore, Karnataka"
                                class="form-control" v-model="checkoutObj.address" />
                        </div>
                        <p class="error-mess" v-if="errorObj.addressErr.length > 0">{{ errorObj.addressErr[0] }}</p>
                    </div>
                </div>

                <div class="form-group details-group">
                    <h4>Payment Method</h4>
                    <div class="payment-options">
                        <div class="payment-option">
                            <input type="radio" name="payment" value="cash" id="paymentCash"
                                v-model="checkoutObj.paymentMethod" />
                            <label for="paymentCash">
                                <i class="fas fa-money-bill-wave"></i>
                                <span>Cash on Delivery</span>
                            </label>
                        </div>
                        <div class="payment-option">
                            <input type="radio" name="payment" value="card" id="paymentCard"
                                v-model="checkoutObj.paymentMethod" />
                            <label for="paymentCard">
                                <i class="fas fa-credit-card"></i>
                                <span>Card (Visa)</span>
                            </label>
                        </div>
                    </div>
                    <p class="error-mess" v-if="errorObj.payErr.length > 0">{{ errorObj.payErr[0] }}</p>

                    <div v-if="checkoutObj.paymentMethod == 'card'" class="card-details">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="coCardNum">Card Number</label>
                                <div class="input-wrapper">
                                    <i class="fas fa-credit-card input-icon"></i>
                                    <input type="text" name="coCardNum" placeholder="Enter your card number" id="coCardNum"
                                        class="form-control" v-model="cardObj.number" size="16" maxlength="16" />
                                </div>
                                <p class="error-mess" v-if="errorObj.numErr.length > 0">{{ errorObj.numErr[0] }}</p>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group half">
                                <label for="coCardName">Name on Card</label>
                                <div class="input-wrapper">
                                    <i class="fas fa-user input-icon"></i>
                                    <input v-upcase type="text" name="coCardName" placeholder="Enter the name on your card"
                                        id="coCardName" class="form-control" v-model="cardObj.name" />
                                </div>
                                <p class="error-mess" v-if="errorObj.nameErr.length > 0">{{ errorObj.nameErr[0] }}</p>
                            </div>

                            <div class="form-group half">
                                <label for="coCardCvv">CVV</label>
                                <div class="input-wrapper">
                                    <i class="fas fa-lock input-icon"></i>
                                    <input type="text" name="coCardCvv" placeholder="CVV" id="coCardCvv" class="form-control"
                                        v-model="cardObj.cvv" />
                                </div>
                                <p class="error-mess" v-if="errorObj.cvvErr.length > 0">{{ errorObj.cvvErr[0] }}</p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="coCardEx">Expiry Date</label>
                            <div class="input-wrapper">
                                <i class="fas fa-calendar-alt input-icon"></i>
                                <input type="month" name="coCardEx" id="coCardEx" class="form-control" v-model="cardObj.expiryDate"
                                    @click="availableTime()" />
                            </div>
                            <p class="error-mess" v-if="errorObj.exDateErr.length > 0">{{ errorObj.exDateErr[0] }}</p>
                        </div>
                    </div>
                </div>

                <div class="order-summary">
                    <h4>Order Summary</h4>
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span v-if="user">₹{{ calculateSummaryPrice()[0] }}</span>
                    </div>
                    <div class="summary-row">
                        <span>Discount</span>
                        <span v-if="user" class="discount">-₹{{ calculateSummaryPrice()[1] }}</span>
                    </div>
                    <div class="summary-row">
                        <span>Delivery Fee</span>
                        <span v-if="user">₹{{ calculateSummaryPrice()[2] }}</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total Amount</span>
                        <span v-if="user">₹{{ calculateSummaryPrice()[3] }}</span>
                    </div>
                </div>

                <div v-if="user" class="form-group">
                    <input type="submit" value="CONFIRM & PAY" class="btn"
                        :disabled="filterFoods.length ? false : true" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
    name: "Checkout",

    data() {
        return {
            checkoutObj: { phone: "", address: "", paymentMethod: "" },
            cardObj: { number: "", name: "", expiryDate: "", cvv: "" },
            errorObj: { phoneErr: [], addressErr: [], payErr: [], numErr: [], nameErr: [], exDateErr: [], cvvErr: [] },
            cartItem: [],
            itemQuantity: [],
        }
    },

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
        availableTime: function () {
            var now = new Date();
            var currentMonth = ("0" + (now.getMonth() + 1)).slice(-2);

            var minRange = now.getFullYear() + "-" + currentMonth;
            var maxRange = (now.getFullYear() + 10) + "-" + currentMonth;

            document.getElementById("coCardEx").setAttribute("min", minRange);
            document.getElementById("coCardEx").setAttribute("max", maxRange);
        },

        matchID: function (food, cartArray) {
            let temp = "";
            cartArray.forEach(element => {
                if (parseInt(food.food_id) == element) {
                    temp = food
                }
            });
            return temp
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

        async getAllCartItem() {
            if (this.user) {
                let existItem = await axios.get('/cartItem/' + this.user.user_id);
                existItem.data.forEach(element => {
                    this.cartItem.push(element.food_id);
                    this.itemQuantity.push(element.item_qty);
                });
            }
        },

        resetCheckErr: function () {
            this.errorObj.phoneErr = [];
            this.errorObj.addressErr = [];
            this.errorObj.payErr = [];
            this.errorObj.numErr = [];
            this.errorObj.nameErr = [];
            this.errorObj.exDateErr = [];
            this.errorObj.cvvErr = [];
        },

        checkEmptyErr: function () {
            for (var typeErr in this.errorObj) {
                if (this.errorObj[typeErr].length != 0) {
                    return false;
                }
            }
            return true;
        },

        inputUpcase: function (e) {
            e.target.value = e.target.value.toUpperCase()
        },

        checkForm: function () {
            this.resetCheckErr();

            // Phone validate
            if (!this.checkoutObj.phone) {
                this.errorObj.phoneErr.push('Entering phone number is required');
            }
            else {
                if (!this.checkoutObj.phone.startsWith('+91')) {
                    this.errorObj.phoneErr.push('Phone numbers must start with +91');
                }

                if (this.checkoutObj.phone.length !== 13) {
                    this.errorObj.phoneErr.push('Phone number must be +91 followed by 10 digits');
                }

                if (!/[0-9]{11}/.test(this.checkoutObj.phone)) {
                    this.errorObj.phoneErr.push('Phone numbers can only contain numbers');
                }
            }

            // Address validate
            if (!this.checkoutObj.address) {
                this.errorObj.addressErr.push('Entering address is required');
            }

            // Card validate
            if (!this.checkoutObj.paymentMethod) {
                this.errorObj.payErr.push('Selecting payment method is required');
            }
            else if (this.checkoutObj.paymentMethod == "card") {
                if (!this.cardObj.number) {
                    this.errorObj.numErr.push('Entering card number is required');
                }
                else {
                    if (!this.cardObj.number.startsWith('4')) {
                        this.errorObj.numErr.push('Visa card numbers must start with 4');
                    }

                    if (this.cardObj.number.length != 16) {
                        this.errorObj.numErr.push('Visa card numbers must have exactly 16 digits');
                    }

                    if (!/[0-9]{16}/.test(this.cardObj.number)) {
                        this.errorObj.numErr.push('Visa card numbers can only contain numbers');
                    }
                }

                if (!this.cardObj.name) {
                    this.errorObj.nameErr.push('Entering name is required');
                }
                else {
                    if (!/^[A-Za-z]+$/.test(this.cardObj.name.replace(/\s/g, ""))) {
                        this.errorObj.nameErr.push('A name can only contain letters');
                    }
                }

                if (!this.cardObj.expiryDate) {
                    this.errorObj.exDateErr.push('Entering expiry date is required');
                }

                if (!this.cardObj.cvv) {
                    this.errorObj.cvvErr.push('Entering cvv code is required');
                }
                else {
                    if (this.cardObj.cvv.length != 3) {
                        this.errorObj.cvvErr.push('Cvv code must have exactly 3 digits');
                    }

                    if (!/[0-9]{3}/.test(this.cardObj.cvv)) {
                        this.errorObj.cvvErr.push('Cvv code can only contain numbers');
                    }
                }
            } else if (this.checkoutObj.paymentMethod == "cash") {
                this.cardObj.number = "";
                this.cardObj.name = "";
                this.cardObj.expiryDate = "";
                this.cardObj.cvv = "";

                this.errorObj.numErr = [];
                this.errorObj.nameErr = [];
                this.errorObj.exDateErr = [];
                this.errorObj.cvvErr = [];
            }
        },

        isPaid: function () {
            if (this.checkoutObj.paymentMethod == "cash") {
                return "false"
            }
            else if (this.checkoutObj.paymentMethod == "card") {
                return "true"
            }
        },

        async sendBillDetails(billId, foodId, qty) {
            let billDetails = {
                bill_id: parseInt(billId),
                food_id: parseInt(foodId),
                item_qty: parseInt(qty)
            }

            await axios.post("/billdetails", billDetails);
        },

        async handleSubmit(e) {
            this.checkForm();

            if (!this.checkEmptyErr()) {
                e.preventDefault();
            } else {
                e.preventDefault();
                let billId = (await axios.get("/billstatus/new")).data;

                if (billId == "") {
                    billId = 1
                } else {
                    billId = parseInt(billId.bill_id) + 1
                }

                this.cartItem.forEach((foodId, index) => {
                    this.sendBillDetails(billId, foodId, this.itemQuantity[index])
                });

                var now = new Date();
                var day = ("0" + now.getDate()).slice(-2);
                var month = ("0" + (now.getMonth() + 1)).slice(-2);
                var hour = ("0" + (now.getHours())).slice(-2);
                var min = ("0" + (now.getMinutes())).slice(-2);
                var currentTime = now.getFullYear() + "-" + month + "-" + day + "T" + hour + ":" + min;

                let billStatus = {
                    bill_id: parseInt(billId),
                    user_id: parseInt(this.user.user_id),
                    bill_phone: this.checkoutObj.phone,
                    bill_address: this.checkoutObj.address,
                    bill_when: currentTime,
                    bill_method: this.checkoutObj.paymentMethod,
                    bill_discount: parseInt(this.calculateSummaryPrice()[1]),
                    bill_delivery: parseInt(this.calculateSummaryPrice()[2]),
                    bill_total: parseInt(this.calculateSummaryPrice()[3]),
                    bill_paid: this.isPaid(),
                    bill_status: 1
                }

                axios.post("/billstatus", billStatus);
                axios.delete("/cartItem/" + this.user.user_id);

                this.cartItem = [];
                this.itemQuantity = [];

                this.$router.push("/thank");
            }
        }
    }
};
</script>

<script setup>
// enables v-focus in templates
const vUpcase = {
    mounted(el) {
        el.style.textTransform = "uppercase";
    }
}
</script>

<style scoped>
/* Base Container */
.checkout-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #f9f9f9, #f1f1f1);
    padding: 2rem;
    font-family: 'Poppins', sans-serif;
}

.checkout-form-container {
    width: 100%;
    max-width: 90rem;
    margin: 0 auto;
}

/* Heading Styles */
.heading {
    text-align: center;
    margin-bottom: 3rem;
}

.heading span {
    font-size: 1.8rem;
    font-weight: 600;
    color: #27ae60;
    letter-spacing: 2px;
    display: block;
    font-weight: normal; 
    margin-bottom: 0.5rem;
}

.heading h3 {
    font-size: 2.8rem;
    font-weight: 700;
    color: #666666;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
}

/* Icons Container */
.icons-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.icons {
    background: #fff;
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.08);
    border-radius: 0.8rem;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
    border-bottom: 3px solid transparent;
}

.icons:hover {
    transform: translateY(-5px);
    border-bottom: 3px solid #27ae60;
}

.icons img {
    height: 6rem;
    margin-bottom: 1rem;
}

.icons h3 {
    font-size: 1.4rem;
    color: #333;
    font-weight: 500;
}

/* Form Styling */
form {
    width: 100%;
    background: #fff;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.08);
    border-radius: 1.2rem;
    padding: 3.5rem 3rem;
    animation: fadeIn .5s ease-out;
}

/* Checkout heading */
.checkout-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
}

.checkout-heading h3 {
    font-size: 2rem;
    color: #333;
    font-weight: 600;
    margin: 0;
}

.checkout-heading h3 span {
    color: #f38609;
    font-weight: 700;
}

/* Form Group */
.form-group {
    margin-bottom: 2rem;
}

.form-row {
    display: flex;
    gap: 2rem;
    margin-bottom: 0.5rem;
}

.form-group.half {
    flex: 1;
}

.form-group.details-group {
    margin-top: 2.5rem;
    background: #f9f9f9;
    padding: 2rem;
    border-radius: 0.8rem;
    box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.03);
}

.form-group.details-group h4 {
    font-size: 1.8rem;
    color: #333;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #eee;
}

/* Label Styling */
form label {
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
.form-control {
    width: 100%;
    padding: 1.6rem 1.5rem 1.6rem 4rem;
    font-size: 1.5rem;
    color: #333;
    background: #fff;
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

/* Payment Options */
.payment-options {
    display: flex;
    gap: 2rem;
    margin-bottom: 1.5rem;
}

.payment-option {
    flex: 1;
}

.payment-option input[type="radio"] {
    display: none;
}

.payment-option label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: #fff;
    border: 2px solid #eaeaea;
    border-radius: 0.8rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.payment-option input[type="radio"]:checked + label {
    border-color: #27ae60;
    background: rgba(39, 174, 96, 0.05);
}

.payment-option label i {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #666;
}

.payment-option input[type="radio"]:checked + label i {
    color: #27ae60;
}

.payment-option label span {
    font-size: 1.4rem;
    font-weight: 600;
    color: #555;
}

/* Card Details */
.card-details {
    margin-top: 2rem;
    padding: 2rem;
    background: #fff;
    border-radius: 0.8rem;
    border: 1px solid #eee;
    animation: fadeIn 0.3s ease-out;
}

/* Order Summary */
.order-summary {
    margin-top: 3rem;
    padding: 2rem;
    background: #f9f9f9;
    border-radius: 0.8rem;
}

.order-summary h4 {
    font-size: 1.8rem;
    color: #333;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #eee;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: #555;
}

.summary-row.total {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
    font-weight: 700;
    font-size: 1.8rem;
    color: #333;
}

.summary-row .discount {
    color: #e74c3c;
}

/* Error messages */
.error-mess {
    color: #e74c3c;
    font-size: 1.3rem;
    margin-top: 0.5rem;
    margin-bottom: 0;
    font-weight: 500;
}

/* Button Styling */
.btn {
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

.btn:hover {
    background: linear-gradient(to right, #219a52, #25a25a);
    transform: translateY(-3px);
    box-shadow: 0 7px 14px rgba(39, 174, 96, 0.2);
}

.btn:active {
    transform: translateY(-1px);
}

.btn:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
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

/* Responsive Design */
@media (max-width: 992px) {
    .checkout-container {
        padding: 2rem;
    }
}

@media (max-width: 768px) {
    .icons-container {
        grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    }
    
    .form-row {
        flex-direction: column;
        gap: 0;
    }
    
    .heading h3 {
        font-size: 2.5rem;
    }
    
    .payment-options {
        flex-direction: column;
        gap: 1rem;
    }
}

@media (max-width: 576px) {
    form {
        padding: 2.5rem 2rem;
    }
    
    .heading span {
        font-size: 1.5rem;
    }
    
    .heading h3 {
        font-size: 2.2rem;
    }
    
    .checkout-heading {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .checkout-heading h3:last-child {
        margin-top: 1rem;
    }
}
</style>