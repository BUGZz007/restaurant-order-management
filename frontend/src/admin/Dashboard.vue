<template>
    <div class="admin-container">
        <div class="d-flex justify-content-start align-items-center mb-4">
            <img src="../assets/images/taco-logo.png" alt="Logo" class="dashboard-logo" />
            <h1>Vedeshi Khana</h1>
            
            <!-- Navigation in header -->
            <div class="header-nav">
                <button 
                    class="nav-item" 
                    :class="{ active: activeTab === 'orders' }"
                    @click="handleTabChange('orders')">
                    <i class="fas fa-shopping-bag"></i>
                    Orders
                </button>
                <button 
                    class="nav-item" 
                    :class="{ active: activeTab === 'reservations' }"
                    @click="handleTabChange('reservations')">
                    <i class="fas fa-calendar-check"></i>
                    Reservations
                </button>
                <button 
                    class="nav-item" 
                    :class="{ active: activeTab === 'menu' }"
                    @click="handleTabChange('menu')">
                    <i class="fas fa-utensils"></i>
                    Menu
                </button>
            </div>
            
            <!-- Logout button -->
            <button class="logout-btn" @click="handleLogout">
                <i class="fas fa-sign-out-alt"></i>
                Logout
            </button>
        </div>

       
        <!-- Orders Tab -->
        <div v-if="activeTab === 'orders'" class="tab-content">
            <div class="table-responsive">
                <h2>Orders Received</h2>
                <table class="table colored-header datatable project-list">
                    <thead>
                        <tr>
                            <th>Bill Id</th>
                            <th>User Id</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>When</th>
                            <th>Paid</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(b) in filterBills.slice().reverse()" :key="b.bill_id">
                            <td>{{ b.bill_id }}</td>
                            <td>{{ b.user_id }}</td>
                            <td>{{ b.bill_phone }}</td>
                            <td>{{ b.bill_address }}</td>
                            <td>{{ b.bill_when }}</td>
                            <td>{{ b.bill_paid }}</td>
                            <td>₹{{ b.bill_total }}</td>
                            <td>{{ avaiableStatus[b.bill_status] }}</td>
                            <td>
                                <button v-if="b.bill_status < 5" class="action-btn" @click="nextStatusBtn(b.bill_id)">
                                    {{ avaiableStatus[b.bill_status + 1] }}
                                </button>

                                <button v-if="b.bill_status == 1" class="cancel-btn" @click="cancelBtn(b.bill_id)">
                                    Cancel
                                </button>

                                <button v-else-if="b.bill_status == 5 && b.bill_paid == 'false'" class="paid-btn"
                                    @click="paidBtn(b.bill_id)">
                                    Paid
                                </button>

                                <button v-else-if="b.bill_status == 5 && b.bill_paid == 'true'" class="action-btn"
                                    @click="nextStatusBtn(b.bill_id)">
                                    {{ avaiableStatus[b.bill_status + 1] }}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Reservations Tab -->
        <div v-if="activeTab === 'reservations'" class="tab-content">
            <!-- Stats Cards -->
            <div class="booking-stats">
                <div class="stat-card">
                    <h4>Total Bookings</h4>
                    <p>{{ getAllBookings ? getAllBookings.length : 0 }}</p>
                </div>
                <div class="stat-card">
                    <h4>Pending Bookings</h4>
                    <p>{{ getPendingBookings ? getPendingBookings.length : 0 }}</p>
                </div>
            </div>

            <!-- Table -->
            <div class="table-responsive">
                <table class="table" v-if="sortedBookings && sortedBookings.length > 0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>People</th>
                            <th>Tables</th>
                            <th>Date & Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="booking in sortedBookings" :key="booking.id">
                            <td>#{{ booking.id }}</td>
                            <td>{{ booking.name }}</td>
                            <td>{{ booking.phone }}</td>
                            <td>{{ booking.people }}</td>
                            <td>{{ booking.tables }}</td>
                            <td>{{ formatDateTime(booking.when) }}</td>
                            <td>
                                <span :class="getStatusClass(booking.status)">
                                    {{ booking.status || 'Pending' }}
                                </span>
                            </td>
                            <td>
                                <button 
                                    v-if="booking.status === 'pending'"
                                    class="action-btn" 
                                    @click="confirmBooking(booking.id)">
                                    Confirm
                                </button>
                                <button 
                                    class="cancel-btn" 
                                    @click="cancelBooking(booking.id)">
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-else class="no-bookings-message">
                    <p>No table bookings available</p>
                </div>
            </div>
        </div>

        <!-- Menu Management Tab -->
        <div v-if="activeTab === 'menu'" class="tab-content">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h2>Menu Management</h2>
            </div>

            <!-- Food Categories Tabs -->
            <div class="menu-tabs mb-4">
                <button v-for="category in foodCategories" :key="category.value" type="button" class="menu-tab-item"
                    :class="{ active: currentCategory === category.value }" @click="filterByCategory(category.value)">
                    {{ category.label }}
                </button>
            </div>

            <div class="table-responsive">
                <table class="table colored-header datatable project-list">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dish) in filteredFoods" :key="dish.food_id">
                            <td>
                                <div class="menu-item-img-container">
                                    <img 
                                        :src="require(`../assets/images/${dish.food_src}`)" 
                                        :alt="dish.food_name"
                                        @error="handleImageError"
                                        class="menu-item-img"
                                    >
                                </div>
                            </td>
                            <td>{{ dish.food_name }}</td>
                            <td>{{ dish.food_category }}</td>
                            <td>
                                <span
                                    :class="{ 'food-type-veg': dish.food_type === 'vegan', 'food-type-nonveg': dish.food_type === 'meat' }">
                                    {{ dish.food_type === 'vegan' ? 'Vegan' : 'Meat' }}
                                </span>
                            </td>
                            <td>₹{{ dish.food_price }}</td>
                           
                            <td>
                                <button class="edit-btn" @click="editDish(dish)">
                                    <i class="fas fa-edit"></i>
                                    Edit
                                </button>
                                <button class="delete-btn" @click="confirmDeleteDish(dish.food_id)">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Delete Confirmation Modal -->
            <div v-if="showDeleteConfirmation" class="modal-overlay">
                <div class="modal-content delete-confirmation">
                    <h3>Confirm Delete</h3>
                    <p>Are you sure you want to delete this dish from the menu? This action cannot be undone.</p>
                    <div class="modal-actions">
                        <button class="cancel-btn" @click="showDeleteConfirmation = false">Cancel</button>
                        <button class="delete-btn" @click="deleteDish">Delete</button>
                    </div>
                </div>
            </div>

            <!-- Quick View / Add/Edit Dish Modal -->
            <div v-if="showQuickView" class="modal-overlay">
                <div class="quick-view-modal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>Edit Dish</h2>
                            <button class="close-modal-btn" @click="closeQuickView">×</button>
                        </div>

                        <div class="dish-form">
                            <div class="form-content">
                                <div class="form-group">
                                    <label>Dish Name</label>
                                    <div class="input-wrapper">
                                        <i class="fas fa-utensils input-icon"></i>
                                        <input type="text" 
                                               class="form-control"
                                               v-model="newDish.food_name" 
                                               placeholder="Enter dish name"
                                               required>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Price (₹)</label>
                                    <div class="input-wrapper">
                                        <i class="fas fa-rupee-sign input-icon"></i>
                                        <input type="number" 
                                               class="form-control"
                                               v-model="newDish.food_price" 
                                               placeholder="Enter price"
                                               required>
                                    </div>
                                </div>

                                <button class="submit-btn" @click="updateDish()">
                                    <i class="fas fa-save"></i>
                                    Update Dish
                                </button>
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
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
    name: 'Dashboard',

    data() {
        return {
            activeTab: 'orders', // Set orders as default tab
            avaiableStatus: ["cancel", "confirmed", "preparing", "checking", "delivering", "delivered", "completed"],
            allBills: [],
            showOrderDetails: false,
            sendId: undefined,
            interval: "",
            currentCategory: "all",
            menuInterval: "", // Add this for menu updates
            reservationInterval: null, // Add this for reservation updates

            // Table reservations data
            showAddReservationModal: false,
            newReservation: {
                name: '',
                phone: '',
                date: '',
                time: '',
                table_number: null,
                party_size: 1,
                status: 'pending'
            },
            availableTables: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

            // Menu management data
            showDeleteConfirmation: false,
            editMode: true, // Always set to true since we only want edit functionality
            dishToDeleteId: null,

            // Food categories
            foodCategories: [
                { value: "taco", label: "Tacos" },
                { value: "burrito", label: "Burritos" },
                { value: "nachos", label: "Nachos" },
                { value: "sides", label: "Sides" },
                { value: "dessert", label: "Desserts" },
                { value: "drink", label: "Drinks" }
            ],

            errors: [], // Add this for form validation

            // Quick view / add/edit dish
            showQuickView: false,
            imagePreview: null,
            newDish: {
                food_name: '',
                food_category: 'taco',
                food_price: 0,
                food_description: '',
                food_image: '',
                food_type: 'vegan', // Changed from 'veg' to 'vegan'
                discount: 0
            }
        }
    },

    mounted() {
        // Update mounted to always start with orders tab
        this.activeTab = 'orders';
        this.getAllBills();
        this.startAllUpdates();

        try {
            const adminData = JSON.parse(localStorage.getItem('adminData'));
            
            if (!adminData || !adminData.token) {
                this.$router.push("/");
                return;
            }

            // Set admin state if not already set
            if (!this.admin) {
                this.setAdmin(adminData.token);
            }

            // Initial data load
            if (this.activeTab === 'orders') {
                this.getAllBills();
            } else if (this.activeTab === 'reservations') {
                this.refreshReservations();
            }

            // Start automatic updates
            this.startAllUpdates();

        } catch (error) {
            console.error('Session validation error:', error);
            this.$router.push("/");
        }
    },

    beforeUnmount() {
        this.clearAllIntervals();
    },

    computed: {
        ...mapState(["allFoods", "admin"]),
        ...mapGetters(["getAllBookings", "getPendingBookings", "getConfirmedBookings"]),

        filterBills: function () {
            return this.allBills.filter((b) => b.bill_status < 6 && b.bill_status > 0);
        },

        // Filter foods based on selected category
        filteredFoods: function () {
            if (this.currentCategory === "all") {
                return this.allFoods;
            } else {
                return this.allFoods.filter(food => food.food_category === this.currentCategory);
            }
        },

        sortedBookings() {
            const bookings = this.getAllBookings || [];
            return Array.isArray(bookings) 
                ? [...bookings].sort((a, b) => b.id - a.id)
                : [];
        },

        todayBookings() {
            const today = new Date().toISOString().split('T')[0];
            return this.getAllBookings.filter(booking => 
                booking.when && booking.when.startsWith(today)
            ).length;
        }
    },

    created() {
        // Initialize tableBookings if empty
        if (!Array.isArray(this.$store.state.tableBookings)) {
            this.$store.state.tableBookings = [];
        }
    },

    methods: {
        ...mapMutations(["setAdmin", "setAllFoods", "REMOVE_BOOKING"]),
        ...mapActions(['updateBookingStatus', 'removeBooking']),
        
        // Filter dishes by category
        filterByCategory(category) {
            this.currentCategory = category;
        },

        // Order Management Methods
        async getAllBills() {
            try {
                const response = await axios.get('/billstatus');
                this.allBills = response.data;
            } catch (error) {
                console.error('Error fetching bills:', error);
            }
        },

        sendBillId: function (id) {
            this.sendId = id
            this.showOrderDetails = !this.showOrderDetails;
        },

        closeView: function () {
            this.showOrderDetails = !this.showOrderDetails;
        },

        handleLogout() {
            localStorage.removeItem('adminData');
            this.setAdmin("");
            this.$router.push("/");
        },

        async nextStatusBtn(id) {
            await axios.put('/billstatus/' + id);
            this.getAllBills();
        },

        async paidBtn(id) {
            await axios.put('/billstatus/paid/' + id);
            this.getAllBills();
        },

        async cancelBtn(id) {
            await axios.put('/billstatus/cancel/' + id);
            this.getAllBills();
        },

        // Reservation Management Methods
        confirmBooking(id) {
            this.updateBookingStatus({ bookingId: id, status: 'confirmed' });
        },
        
        cancelBooking(id) {
            this.removeBooking(id);
        },

        formatDateTime(dateTime) {
            if (!dateTime) return '';
            const date = new Date(dateTime);
            return date.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        },

        getStatusClass(status) {
            switch(status) {
                case 'confirmed': return 'status-confirmed';
                case 'cancelled': return 'status-cancelled';
                default: return 'status-pending';
            }
        },

        async refreshReservations() {
            try {
                const response = await axios.get('/api/booktable');
                const bookings = response.data;
                this.$store.commit('SET_BOOKINGS', bookings);
            } catch (error) {
                console.error('Error refreshing reservations:', error);
            }
        },

        // Menu Management Methods
        editDish(dish) {
            this.newDish = { ...dish };
            this.showQuickView = true;
        },

        closeQuickView() {
            this.showQuickView = false;
            this.resetDishForm();
        },

        resetDishForm() {
            this.newDish = {
                food_name: '',
                food_category: 'taco',
                food_price: 0,
                food_description: '',
                food_image: '',
                food_type: 'vegan', // Changed from 'veg' to 'vegan'
                discount: 0
            };
            this.imagePreview = null;
        },

        async updateDish() {
            try {
                await axios.put(`/foods/${this.newDish.food_id}`, this.newDish);
                // Update store with updated food item
                const updatedFoods = this.allFoods.map(food =>
                    food.food_id === this.newDish.food_id ? this.newDish : food
                );
                this.setAllFoods(updatedFoods);
                this.showAddDishModal = false;
                this.editMode = false;
                this.resetDishForm();
            } catch (error) {
                console.error('Error updating dish:', error);
            }
        },

        confirmDeleteDish(id) {
            this.dishToDeleteId = id;
            this.showDeleteConfirmation = true;
        },

        async deleteDish() {
            try {
                await axios.delete(`/foods/${this.dishToDeleteId}`);
                // Update store with filtered foods list
                const updatedFoods = this.allFoods.filter(food => food.food_id !== this.dishToDeleteId);
                this.setAllFoods(updatedFoods);
                this.showDeleteConfirmation = false;
                this.dishToDeleteId = null;
            } catch (error) {
                console.error('Error deleting dish:', error);
            }
        },

        // Dashboard Data Methods
        loadDashboardData() {
            if (this.activeTab === 'orders') {
                this.getAllBills();
            } else if (this.activeTab === 'menu') {
                this.refreshMenuItems();
            }
        },

        getTodayBookings() {
            const bookings = this.$store.getters.getAllBookings || [];
            const today = new Date().toISOString().split('T')[0];
            return bookings.filter(booking => 
                booking.when && booking.when.startsWith(today)
            ).length;
        },

        async refreshMenuItems() {
            try {
                const response = await axios.get('/foods');
                this.setAllFoods(response.data);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        },

        loadAllData() {
            if (this.activeTab === 'orders') {
                this.getAllBills();
            } else if (this.activeTab === 'reservations') {
                this.refreshReservations();
            } else if (this.activeTab === 'menu') {
                this.refreshMenuItems();
            }
        },

        startAllUpdates() {
            // Clear any existing intervals
            this.clearAllIntervals();
            
            // Set up auto-update similar to MyOrder.vue
            this.interval = setInterval(() => {
                if (this.activeTab === 'orders') {
                    this.getAllBills();
                } else if (this.activeTab === 'reservations') {
                    this.refreshReservations();
                }
            }, 1000); // Update every second like MyOrder.vue
        },

        clearAllIntervals() {
            if (this.interval) clearInterval(this.interval);
            if (this.reservationInterval) clearInterval(this.reservationInterval);
            if (this.menuInterval) clearInterval(this.menuInterval);
        },

        handleTabChange(tabName) {
            this.activeTab = tabName;
            localStorage.setItem('activeTab', tabName);
            
            // Immediate data load on tab change
            if (tabName === 'orders') {
                this.getAllBills();
            } else if (tabName === 'reservations') {
                this.refreshReservations();
            }
            
            // Restart the auto-update
            this.startAllUpdates();
        },

        // Add to your existing methods
        getCategoryLabel(category) {
            const found = this.foodCategories.find(cat => cat.value === category);
            return found ? found.label : '';
        },
        
        getCategoryIcon(category) {
            const icons = {
                taco: 'fas fa-hamburger',
                burrito: 'fas fa-sandwich',
                nachos: 'fas fa-cookie',
                sides: 'fas fa-utensils',
                dessert: 'fas fa-ice-cream',
                drink: 'fas fa-glass-martini-alt',
                all: 'fas fa-th-large'
            };
            return icons[category] || 'fas fa-utensils';
        },

        editFood(dish) {
            this.editDish = {
                ...dish,
                food_category: dish.food_category || ''  // Ensure category is set
            };
            // Show modal logic here
        }
    },
}
</script>

<style scoped>
/* Main Container */
.admin-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 2rem;
    font-family: 'Poppins', sans-serif;
}

/* Header Styling */
.d-flex.justify-content-start {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 1.5rem;
    padding: 1.5rem 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    margin-bottom: 3rem;
}

.dashboard-logo {
    width: 50px;
    height: auto;
    margin-right: 1.5rem;
    transition: none;  /* Remove transition */
}

.dashboard-logo:hover {
    transform: none;  /* Remove transform */
}

h1 {
    font-size: 2.8rem;
    font-weight: 800;
    background: linear-gradient(45deg, #27ae60, #f39c12);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
}

/* Header Navigation */
.header-nav {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-left: auto;
    margin-right: 2rem;
}

.nav-item {
    padding: 1rem 2rem;
    font-size: 1.4rem;
    font-weight: 500;
    border: none;
    outline: none;
    cursor: pointer;
    transition: none;  /* Remove transition */
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: none;
    color: #666;
    background: transparent;
    border-radius: 0.8rem;
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.nav-item:focus {
    outline: none;
    border: none;
    box-shadow: none;
}

.nav-item:active {
    transform: none;  /* Remove transform */
}

.nav-item:hover {
    transform: none;  /* Remove transform */
    box-shadow: none;
}

.nav-item.active {
    color: #27ae60;
    background: transparent;
    box-shadow: none;
}

/* Logout Button */
.logout-btn {
    padding: 1rem 2rem;
    font-size: 1.4rem;
    font-weight: 500;
    border: none;
    outline: none;
    cursor: pointer;
    transition: none;  /* Remove transition */
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    color: white;
    border-radius: 0.8rem;
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: #e74c3c;
}

.logout-btn:focus {
    outline: none;
    border: none;
    box-shadow: none;
}

.logout-btn:active {
    transform: translateY(1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    outline: none;
    border: none;
}

.logout-btn:hover {
    transform: none;  /* Remove transform */
}

/* Navigation Tabs */
.admin-tabs {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 3rem;
}

.tab {
    padding: 1.2rem 2.4rem;
    font-size: 1.6rem;
    background: white;
    border: none;
    border-radius: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    color: #555;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.tab::before {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
}

.tab:nth-child(1)::before { content: '\f48b'; } /* Orders icon */
.tab:nth-child(2)::before { content: '\f0ce'; } /* Table icon */
.tab:nth-child(3)::before { content: '\f805'; } /* Menu icon */

.tab-active {
    background: linear-gradient(45deg, #27ae60, #2ecc71);
    color: white;
    transform: translateY(-3px);
}

.tab:hover:not(.tab-active) {
    transform: translateY(-2px);
    background: #f8f9fa;
}

/* Content Areas */
.tab-content {
    background: white;
    border-radius: 1.5rem;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
    animation: none;  /* Remove animation */
}

/* Section Headers Styling */
.tab-content h2 {
    font-size: 2.4rem;
    font-weight: 700;
    color: #38A169;  /* Green color for all section headers */
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
}

/* Stats Cards */
.booking-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.stat-card {
    background: linear-gradient(135deg, #fff, #f8f9fa);
    border-radius: 1.2rem;
    padding: 2rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: none;  /* Remove transition */
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.stat-card:hover {
    transform: none;  /* Remove transform */
}

.stat-card h4 {
    font-size: 1.6rem;
    color: #666;
    margin-bottom: 1rem;
}

.stat-card p {
    font-size: 3rem;
    font-weight: 700;
    color: #27ae60;
    margin: 0;
}

/* Table Styling */
.table-responsive {
    background: white;
    border-radius: 1.2rem;
    padding: 2rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.table {
    width: 100%;
    border-spacing: 0;
    border-collapse: separate;
    border-radius: 1rem;
    overflow: hidden;
}

.table th {
    background: #f8f9fa;
    padding: 1.5rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: #444;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.table td {
    padding: 1.5rem;
    font-size: 1.4rem;
    color: #666;
    border-bottom: 1px solid #eee;
    transition: all 0.3s ease;
}

.table td:last-child {
    display: flex;
    gap: 1rem;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
}

.table tr:hover td {
    background: #f8f9fa;
}

/* Status Badges */
.status-confirmed, .status-pending, .status-cancelled {
    padding: 0.6rem 1.2rem;
    border-radius: 2rem;
    font-size: 1.2rem;
    font-weight: 500;
    text-transform: uppercase;
}

.status-confirmed {
    background: #27ae60;
    color: white;
}

.status-pending {
    background: #f39c12;
    color: white;
}

.status-cancelled {
    background: #e74c3c;
    color: white;
}

/* Buttons */
.btn, 
.action-btn, 
.cancel-btn, 
.paid-btn, 
.edit-btn, 
.delete-btn, 
.add-btn {
    padding: 1.2rem 2.4rem;
    font-size: 1.4rem;
    font-weight: 500;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    color: white;
    border-radius: 0.8rem;
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0 0.8rem;
}

/* Button States */
.btn:focus, 
.action-btn:focus, 
.cancel-btn:focus, 
.paid-btn:focus, 
.edit-btn:focus, 
.delete-btn:focus, 
.add-btn:focus {
    outline: none;
    border: none;
    box-shadow: none;
}

.btn:active, 
.action-btn:active, 
.cancel-btn:active, 
.paid-btn:active, 
.edit-btn:active, 
.delete-btn:active, 
.add-btn:active {
    transform: translateY(1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    outline: none;
    border: none;
}

/* Button Hover Effects */
.btn:hover, 
.action-btn:hover, 
.cancel-btn:hover, 
.paid-btn:hover,
.edit-btn:hover,
.delete-btn:hover,
.add-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* Button Colors */
.action-btn {
    background: #27ae60;
}

.cancel-btn {
    background: #e74c3c;
}

.paid-btn {
    background: #f39c12;
}

.edit-btn {
    background: #3498db;
}

.delete-btn {
    background: #e74c3c;
}

.add-btn {
    background: #38A169;  /* Match the green from image */
    color: white;
    padding: 1.2rem 2.4rem;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.3s ease;
    border: none;
    outline: none;
}

/* Menu Management Header */
.d-flex.justify-content-between h2 {
    font-size: 2.4rem;
    font-weight: 700;
    color: #38A169;  /* Updated to match the green color from image */
    background: none;
    -webkit-background-clip: initial;
    -webkit-text-fill-color: initial;
}

/* Food Categories Tabs */
.menu-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 3rem;
    padding: 1rem;
    background: transparent;
    box-shadow: none;
}

.menu-tab-item {
    padding: 1rem 2rem;
    font-size: 1.4rem;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.3s ease;
    background: white;
    color: #4A5568;
    font-weight: 500;
    border-radius: 0.5rem;
    margin: 0.5rem;
    box-shadow: none;
}

.menu-tab-item:focus {
    outline: none;
    border: none;
    box-shadow: none;
}

.menu-tab-item:active {
    transform: translateY(1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    outline: none;
    border: none;
}

.menu-tab-item:hover {
    transform: translateY(-2px);
    background: #F7FAFC;
}

.menu-tab-item.active {
    background: #38A169;
    color: white;
}

/* Menu Item Image */
.menu-item-img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 1rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    transition: none;  /* Remove transition */
}

.menu-item-img:hover {
    transform: none;  /* Remove transform */
}

/* Food Type Badges */
.food-type-veg, 
.food-type-nonveg {
    padding: 0.6rem 1.2rem;
    border-radius: 2rem;
    font-size: 1.2rem;
    font-weight: 500;
    text-transform: uppercase;
}

.food-type-veg {
    background: linear-gradient(45deg, #27ae60, #2ecc71);
    color: white;
}

.food-type-nonveg {
    background: linear-gradient(45deg, #e74c3c, #c0392b);
    color: white;
}

/* Responsive Design for Menu Tabs */
@media (max-width: 768px) {
    .menu-tabs {
        justify-content: center;
        gap: 1rem;
    }

    .menu-tab-item {
        width: calc(50% - 1rem);
        text-align: center;
        padding: 1rem 1.5rem;
    }
}

@media (max-width: 480px) {
    .menu-tab-item {
        width: 100%;
    }

    .d-flex.justify-content-between {
        flex-direction: column;
        gap: 1.5rem;
    }

    .add-btn {
        width: 100%;
        justify-content: center;
    }
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .table td:last-child {
        gap: 0.8rem;
    }

    .btn, 
    .action-btn, 
    .cancel-btn, 
    .paid-btn, 
    .edit-btn, 
    .delete-btn, 
    .add-btn {
        padding: 1rem 1.8rem;
        margin: 0.4rem;
    }
}

/* Responsive Design */
@media (max-width: 1200px) {
    .admin-container {
        padding: 1.5rem;
    }
}

@media (max-width: 768px) {
    .admin-tabs {
        flex-direction: column;
    }

    .tab {
        width: 100%;
        justify-content: center;
    }

    .booking-stats {
        grid-template-columns: 1fr;
    }
}

/* Simple Form Styling */
.simple-form {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    width: 90%;
    max-width: 400px;
    position: relative;
}

.simple-form h3 {
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 2rem;
    text-align: center;
}

.simple-add-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.simple-add-form input,
.simple-add-form select {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.close-btn {
    position: absolute;
    right: 1rem;
    top: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
}

.submit-btn {
    background: #38A169;
    color: white;
    padding: 0.8rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    width: 100%;
    margin-top: 1rem;
}

.submit-btn:hover {
    background: #2F855A;
}


/* Image upload styles */
.image-upload-preview {
    width: 150px;
    height: 150px;
    margin: 0 auto 2rem;
    border-radius: 1rem;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    background: #f8f9fa;
    border: 2px dashed #ddd;
}

.image-upload-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.upload-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    opacity: 0;
    transition: none;  /* Remove transition */
}

.upload-overlay:hover {
    opacity: 1;
}

@media (max-width: 768px) {
    .modal-form {
        padding: 2.5rem 2rem;
    }
}

.quick-view-container {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    animation: modalSlideIn 0.4s ease-out;
}

.quick-view-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    z-index: 1000;
    width: 90%;
    max-width: 50rem;
    max-height: 90vh;
    border-radius: 1.2rem;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.08);
    animation: none;  /* Remove animation */
    overflow: auto;
}

.modal-content {
    padding: 3.5rem 3rem;
}

.modal-header {
    text-align: center;
    margin-bottom: 2rem;
}

.modal-header h2 {
    font-size: 2.2rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #27ae60;
    letter-spacing: 2px;
    margin: 0.5rem 0;
}

.section-label {
    font-size: 1.4rem;
    color: #666;
}

.dish-form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.form-group {
    margin-bottom: 1.5rem;
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

.food-type-buttons {
    display: flex;
    gap: 2rem;
    margin: 1rem 0;
}

.food-type-btn {
    flex: 1;
    padding: 1.2rem;
    font-size: 1.5rem;
    border: 2px solid #eaeaea;
    border-radius: 0.8rem;
    background: #f8f9fa;
    color: #555;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.food-type-btn i {
    margin-right: 0.8rem;
    font-size: 1.6rem;
}

.food-type-btn.active {
    background: #27ae60;
    color: white;
    border-color: #27ae60;
    box-shadow: 0 4px 8px rgba(39, 174, 96, 0.2);
}

.submit-btn {
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

.submit-btn:hover {
    background: linear-gradient(to right, #219a52, #25a25a);
    transform: translateY(-3px);
    box-shadow: 0 7px 14px rgba(39, 174, 96, 0.2);
}

.image-upload-container {
    width: 100%;
    margin-bottom: 2rem;
}

.image-upload-preview {
    width: 100%;
    height: 200px;
    border-radius: 1rem;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    background: #f8f9fa;
    border: 2px dashed #eaeaea;
    transition: none;  /* Remove transition */
}

.image-upload-preview:hover {
    border-color: #27ae60;
}

.image-upload-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.upload-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    opacity: 0;
    transition: none;  /* Remove transition */
}

.upload-overlay:hover {
    opacity: 1;
}

.close-modal-btn {
    position: absolute;
    right: 2rem;
    top: 2rem;
    background: none;
    border: none;
    font-size: 2rem;
    color: #666;
    cursor: pointer;
    transition: color 0.3s;
}

.close-modal-btn:hover {
    color: #e74c3c;
}

/* No Bookings Message */
.no-bookings-message {
    text-align: center;
    padding: 2rem;
    color: #666;
    font-size: 1.4rem;
}
</style>