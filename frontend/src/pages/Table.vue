<template>
    <vue-basic-alert :duration="300" :closeIn="2000" ref="alert" />
    <div class="booking-container">
        <div class="booking-form-container">
            <div class="heading">
                <span>BOOK A TABLE</span>
                <h3>ENJOY YOUR MOMENT</h3>
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

            <!-- booking form -->
            <form id="bookTableForm" @submit="handleBooking" novalidate autocomplete="off">
                <!-- Removed the top error box -->

                <div class="form-group">
                    <label for="uName">Your Name</label>
                    <div class="input-wrapper">
                        <i class="fas fa-user input-icon"></i>
                        <input type="text" name="uName" id="uName" class="form-control" placeholder="Your Full Name" v-model="orderObj.name">
                    </div>
                    <p class="error-mess" v-if="errorObj.nameErr.length > 0">{{ errorObj.nameErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="uPhone">Your Phone Number</label>
                    <div class="input-wrapper">
                        <i class="fas fa-phone input-icon"></i>
                        <input type="text" name="uPhone" id="uPhone" class="form-control" placeholder="+91 1234567890" v-model="orderObj.phone">
                    </div>
                    <p class="error-mess" v-if="errorObj.phoneErr.length > 0">{{ errorObj.phoneErr[0] }}</p>
                </div>

                <div class="form-row">
                    <div class="form-group half">
                        <label for="oPeople">How Many People</label>
                        <div class="input-wrapper">
                            <i class="fas fa-users input-icon"></i>
                            <input type="number" name="oPeople" id="oPeople" class="form-control" placeholder="Number of people" v-model="orderObj.people">
                        </div>
                        <p class="error-mess" v-if="errorObj.peopleErr.length > 0">{{ errorObj.peopleErr[0] }}</p>
                    </div>

                    <div class="form-group half">
                        <label for="oTables">How Many Tables</label>
                        <div class="input-wrapper">
                            <i class="fas fa-chair input-icon"></i>
                            <input type="number" name="oTables" id="oTables" class="form-control" placeholder="Number of tables" v-model="orderObj.tables">
                        </div>
                        <p class="error-mess" v-if="errorObj.tablesErr.length > 0">{{ errorObj.tablesErr[0] }}</p>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group half">
                        <label for="uCard">Your Membership Card</label>
                        <div class="input-wrapper">
                            <i class="fas fa-id-card input-icon"></i>
                            <input type="text" name="uCard" id="uCard" class="form-control" placeholder="10-digit card number" v-model="orderObj.card">
                        </div>
                        <p class="error-mess" v-if="errorObj.cardErr.length > 0">{{ errorObj.cardErr[0] }}</p>
                    </div>

                    <div class="form-group half">
                        <label for="oWhen">When</label>
                        <div class="input-wrapper">
                            <i class="fas fa-calendar-alt input-icon"></i>
                            <input type="datetime-local" name="oWhen" id="oWhen" class="form-control" v-model="orderObj.when" ref="whenDateInput" @click="setupDateTimeLimits" @focus="setupDateTimeLimits">
                        </div>
                        <p class="error-mess" v-if="errorObj.whenErr.length > 0">{{ errorObj.whenErr[0] }}</p>
                    </div>
                </div>

                <div class="form-group">
                    <label for="uMessage">Special Requests</label>
                    <div class="input-wrapper textarea-wrapper">
                        <i class="fas fa-comment input-icon textarea-icon"></i>
                        <textarea placeholder="Do you want to decorate your table or have any special requests?" name="uMessage" id="uMessage" class="form-control" v-model="orderObj.note"></textarea>
                    </div>
                </div>

                <div class="map-container">
                    <iframe class="map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.947785014526!2d77.58052681482155!3d12.930391019180103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15b5e078c2c5%3A0xe70121dd8a7e78ea!2sJayanagar%204th%20Block%2C%20Bengaluru%2C%20Karnataka%20560011%2C%20India!5e0!3m2!1sen!2sin!4v1715231415790!5m2!1sen!2sin"
                        loading="lazy"></iframe>
                </div>

                <input type="submit" value="Book Now" class="btn">
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import VueBasicAlert from 'vue-basic-alert'

export default {
    name: "Table",

    data() {
        return {
            orderObj: { name: "", phone: "", people: "", tables: "", card: "", when: "", note: "" },
            errorObj: { nameErr: [], phoneErr: [], peopleErr: [], tablesErr: [], cardErr: [], whenErr: [] },
        }
    },

    mounted() {
        // Set date-time limits when component mounts
        this.setupDateTimeLimits();
    },

    computed: {
        ...mapGetters(['getAllBookings'])
    },

    methods: {
        ...mapActions(['addBooking']), // Add this line to map Vuex actions

        setupDateTimeLimits: function () {
            var now = new Date();
            var day = ("0" + now.getDate()).slice(-2);
            var currentMonth = ("0" + (now.getMonth() + 1)).slice(-2);
            var maxMonth = ("0" + (now.getMonth() + 3)).slice(-2);
            var hour = ("0" + (now.getHours())).slice(-2);
            var min = ("0" + (now.getMinutes())).slice(-2);
            var minRange = now.getFullYear() + "-" + currentMonth + "-" + day + "T" + hour + ":" + min;
            var maxRange = now.getFullYear() + "-" + maxMonth + "-" + day + "T" + hour + ":" + min;

            // Make sure date input element exists
            if (this.$refs.whenDateInput) {
                this.$refs.whenDateInput.setAttribute("min", minRange);
                this.$refs.whenDateInput.setAttribute("max", maxRange);
            }
        },

        resetCheckErr: function () {
            this.errorObj.nameErr = [];
            this.errorObj.phoneErr = [];
            this.errorObj.peopleErr = [];
            this.errorObj.tablesErr = [];
            this.errorObj.cardErr = [];
            this.errorObj.whenErr = [];
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
                if (this.errorObj[key].length > 0) {
                    allErrors = [...allErrors, ...this.errorObj[key]];
                }
            }
            return allErrors;
        },

        checkForm: function () {
            this.resetCheckErr();

            // Name validate
            if (!this.orderObj.name) {
                this.errorObj.nameErr.push("Entering a name is required");
            }
            else {
                if (!/^[A-Za-z]+$/.test(this.orderObj.name.replace(/\s/g, ""))) {
                    this.errorObj.nameErr.push('A name can only contain letters');
                }
            }

            // Phone validate
            if (!this.orderObj.phone) {
                this.errorObj.phoneErr.push('Entering phone number is required');
            } else {
                if (!this.orderObj.phone.startsWith('+91')) {
                    this.errorObj.phoneErr.push('Phone numbers must start with +91');
                }

                // Check if the part after +91 contains exactly 10 digits
                const digitsOnly = this.orderObj.phone.replace('+91', '');
                if (!/^[0-9]{10}$/.test(digitsOnly)) {
                    this.errorObj.phoneErr.push('Phone numbers can only contain 10 digits after +91');
                }

                if (this.orderObj.phone.length !== 13) {
                    this.errorObj.phoneErr.push('Phone number must be +91 followed by 10 digits');
                }
            }

            if (!this.orderObj.people) {
                this.errorObj.peopleErr.push("Entering number of people is required");
            }
            else {
                if (parseInt(this.orderObj.people) > 100) {
                    this.errorObj.peopleErr.push("Each store can only serve 100 people at a time");
                }

                if (parseInt(this.orderObj.people) < 1) {
                    this.errorObj.peopleErr.push("Number of people must be greater than or equal to 1");
                }
            }

            if (!this.orderObj.tables) {
                this.errorObj.tablesErr.push("Entering number of tables is required");
            }
            else {
                if (parseInt(this.orderObj.tables) > 50) {
                    this.errorObj.tablesErr.push("Each store can only have maximum 50 tables");
                }

                if (parseInt(this.orderObj.tables) < 1) {
                    this.errorObj.tablesErr.push("Number of tables must be greater than or equal to 1");
                }

                if (parseInt(this.orderObj.people) < parseInt(this.orderObj.tables)) {
                    this.errorObj.tablesErr.push("The number of tables must be less than the number of people");
                }
            }

            if (this.orderObj.card) {
                if (!/[0-9]{10}/.test(this.orderObj.card)) {
                    this.errorObj.cardErr.push('Card numbers can only contain numbers');
                }

                if (this.orderObj.card.length != 10) {
                    this.errorObj.cardErr.push('Card number must have exactly 10 digits');
                }
            }

            if (!this.orderObj.when) {
                this.errorObj.whenErr.push("Entering when to serve is required");
            }
            else {
                let minRange = this.$refs.whenDateInput.getAttribute("min");
                let maxRange = this.$refs.whenDateInput.getAttribute("max");
                let dateMin = new Date(minRange);
                let dateMax = new Date(maxRange);
                let dateInput = new Date(this.orderObj.when);

                if (dateInput === "Invalid Date") {
                    this.errorObj.whenErr.push("Invalid date input");
                }

                if (dateInput.getTime() < dateMin.getTime() || dateInput.getTime() > dateMax.getTime()) {
                    this.errorObj.whenErr.push("Available reservation range is from now to next two months");
                }

                if (dateInput.getHours() < 7 || dateInput.getHours() > 22) {
                    this.errorObj.whenErr.push("Store open from 7:00 AM to 10:00 PM everyday");
                }
            }
        },

        checkAuth() {
            if (!this.$store.state.user) {
                this.$refs.alert.showAlert(
                    'warning',
                    'Please login first to book a table',
                    'Authentication Required'
                );
                setTimeout(() => {
                    this.$router.push('/login');
                }, 2000);
                return false;
            }
            return true;
        },

        async handleBooking(e) {
            e.preventDefault();
            if (!this.checkAuth()) {
                return;
            }
            this.checkForm();

            if (this.checkEmptyErr()) {
                try {
                    const bookingData = {
                        name: this.orderObj.name,
                        phone: this.orderObj.phone,
                        people: parseInt(this.orderObj.people),
                        tables: parseInt(this.orderObj.tables),
                        card: this.orderObj.card || '',
                        when: this.orderObj.when,
                        note: this.orderObj.note || '',
                        userId: this.$store.state.user.user_id // Add user ID
                    };

                    // Call Vuex action and await its completion
                    const result = await this.addBooking(bookingData);

                    if (result) {
                        this.$refs.alert.showAlert(
                            'success',
                            'Your booking has been saved successfully!',
                            'Booking Confirmed!'
                        );

                        // Reset form
                        this.resetForm();
                    } else {
                        throw new Error('Booking failed');
                    }
                } catch (error) {
                    console.error('Booking error:', error);
                    this.$refs.alert.showAlert(
                        'error',
                        'There was an error saving your booking. Please try again.',
                        'Booking Failed!'
                    );
                }
            } else {
                // Show validation errors
                const errors = this.getAllErrors();
                if (errors.length > 0) {
                    this.$refs.alert.showAlert(
                        'warning',
                        errors[0],
                        'Validation Error'
                    );
                }
            }
        },

        resetForm() {
            this.orderObj = {
                name: "",
                phone: "",
                people: "",
                tables: "",
                card: "",
                when: "",
                note: ""
            };
            document.getElementById("bookTableForm").reset();
        }
    },

    components: {
        VueBasicAlert
    }
}
</script>

<style scoped>
/* Base Container */
.booking-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #f9f9f9, #f1f1f1);
    padding: 2rem;
    font-family: 'Poppins', sans-serif;
}

.booking-form-container {
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

.textarea-icon {
    top: 2rem;
    transform: none;
}

/* Input Styling */
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

.form-control.error {
    border-color: #e74c3c;
}

textarea.form-control {
    height: 12rem;
    resize: none;
    padding-top: 1.6rem;
}

/* Error messages */
.error-mess {
    color: #e74c3c;
    font-size: 1.3rem;
    margin-top: 0.5rem;
    margin-bottom: 0;
    font-weight: 500;
}

/* Map Container */
.map-container {
    width: 100%;
    height: 25rem;
    margin: 2rem 0;
    border-radius: 0.8rem;
    overflow: hidden;
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.08);
}

.map {
    width: 100%;
    height: 100%;
    border: none;
}

/* Button Styling */
.btn {
    width: 100%;
    padding: 1.5rem;
    margin-top: 1rem;
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

/* Date picker specific styles */
input[type="datetime-local"] {
    cursor: pointer;
}

input[type="datetime-local"]::-webkit-calendar-picker-indicator {
    cursor: pointer;
    opacity: 0.8;
    position: absolute;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 2rem;
    height: 2rem;
}

input[type="datetime-local"]::-webkit-calendar-picker-indicator:hover {
    opacity: 1;
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
    .booking-container {
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
}
</style>