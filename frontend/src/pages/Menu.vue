<template>
    <div class="menu-section">
        <!-- Search and Filter Row -->
        <div class="search-filter-container">
            <div class="left-group">
                <div class="search-box">
                    <input type="text" class="search-input" v-model.trim="foodObj.name" placeholder="Search dishes..." />
                    <i class="fas fa-search search-icon"></i>
                </div>
                
                <div class="sort-filter">
                    <select v-model="foodObj.sort" class="sort-select">
                        <option value="default">Sort By</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="best-seller">Best Seller</option>
                        <option value="discounted">Discounted</option>
                    </select>
                </div>
            </div>

            <div class="right-group">
                <div class="diet-filter">
                    <button class="filter-btn" :class="{ active: foodObj.type === 'all' }" @click="setDietFilter('all')">
                        All
                    </button>
                    <button 
                        class="filter-btn" 
                        :class="{ active: foodObj.type === 'meat' }" 
                        @click="setDietFilter('meat')"
                        data-type="meat"
                    >
                        <i class="fas fa-drumstick-bite"></i> Meat
                    </button>
                    <button class="filter-btn" :class="{ active: foodObj.type === 'vegan' }" @click="setDietFilter('vegan')">
                        <i class="fas fa-leaf"></i> Vegan
                    </button>
                </div>
            </div>
        </div>

        <!-- Category Tabs -->
        <div class="menu-tabs">
            <input v-for="category in foodCategories" :key="category.value" type="button" :id="category.id"
                class="menu-tab-item" :class="{ active: foodObj.category === category.value }" :value="category.value"
                @click="filterFoodBtn($event)" />
        </div>

        <!-- Food Items Grid -->
        <div class="box-container">
            <template v-for="(food, index) in currentPageItems" :key="food.food_id">
                <div class="box">
                    <div class="food-type-badge" :class="food.food_type">
                        <i :class="food.food_type === 'vegan' ? 'fas fa-leaf' : 'fas fa-drumstick-bite'"></i>
                    </div>
                    <div class="image">
                        <img :src="require(`../assets/images/${food.food_src}`)" :alt="food.food_name" />
                    </div>
                    <div class="stars">
                        <i v-for="s in Math.floor(parseFloat(food.food_star))" :key="s" class="fas fa-star"></i>
                        <i v-if="parseFloat(food.food_star) % 1 >= 0.5" class="fas fa-star-half-alt"></i>
                        <span>({{ food.food_vote }})</span>
                    </div>
                    <div class="content">
                        <h3>{{ food.food_name }}</h3>
                        <div class="desc">
                            <p>{{ food.food_desc }}</p>
                        </div>
                        <div class="price">
                            ₹{{ parseFloat(food.food_price) - parseFloat(food.food_discount) }}
                            <span v-if="parseFloat(food.food_discount) > 0">₹{{ parseFloat(food.food_price) }}</span>
                        </div>
                        <button class="btn" @click="addItem(index)">Add to cart</button>
                    </div>
                </div>
            </template>

            <!-- No results message -->
            <div v-if="!filterFoods.length" class="no-results">
                <div class="content">
                    <h1>No match found!</h1>
                    <p>Try adjusting your search or filters</p>
                </div>
                <div class="image">
                    <img src="../assets/images/notfound.png" alt="No results found" />
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <div v-if="calculatePages > 1" class="pagination">
            <button v-if="pageNum > 0" @click="pageNum--" class="page-btn">&lt;</button>
            <span v-for="p in calculatePages" :key="p - 1" :class="{ active: p - 1 === pageNum }" @click="pageNum = p - 1">{{
                p }}</span>
            <button v-if="pageNum < calculatePages - 1" @click="pageNum++" class="page-btn">&gt;</button>
        </div>

        <!-- Quick View Modal -->
        <QuickView 
            v-if="showQuickView" 
            :food="sendId"
            :modelValue="showQuickView"
            @update:modelValue="showQuickView = $event"
            @close="showQuickView = false" 
        />
        
    </div>
</template>

<script>
import QuickView from "@/components/QuickView.vue";

export default {
    name: "Menu",
    components: { QuickView },

    data() {
        return {
            foodObj: {
                name: "",
                category: "all",
                type: "all",
                sort: "default"  // Add this new property
            },
            showQuickView: false,
            sendId: null,
            perPage: 8,
            pageNum: 0,
            allFoods: [], // will be populated from API

            foodCategories: [
                { id: "allFilterFoodBtn", value: "all" },
                { id: "tacoFilterFoodBtn", value: "taco" },
                { id: "burritoFilterFoodBtn", value: "burrito" },
                { id: "nachosFilterFoodBtn", value: "nachos" },
                { id: "sidesFilterFoodBtn", value: "sides" },
                { id: "dessertFilterFoodBtn", value: "dessert" },
                { id: "drinkFilterFoodBtn", value: "drink" }
            ]
        };
    },

    computed: {
        filterFoods() {
            let filtered = this.allFoods.filter(food => {
                // Name filter
                if (!food.food_name.toLowerCase().includes(this.foodObj.name.toLowerCase())) {
                    return false;
                }

                // Category filter
                if (this.foodObj.category && this.foodObj.category !== "all" &&
                    food.food_category !== this.foodObj.category) {
                    return false;
                }

                // Type filter (meat/vegan)
                if (this.foodObj.type && this.foodObj.type !== "all" &&
                    food.food_type !== this.foodObj.type) {
                    return false;
                }

                return true;
            });

            // Apply sorting
            switch (this.foodObj.sort) {
                case 'price-low':
                    filtered.sort((a, b) => parseFloat(a.food_price) - parseFloat(b.food_price));
                    break;
                case 'price-high':
                    filtered.sort((a, b) => parseFloat(b.food_price) - parseFloat(a.food_price));
                    break;
                case 'best-seller':
                    filtered = filtered.filter(food => food.food_status === 'best seller');
                    break;
                case 'discounted':
                    filtered = filtered.filter(food => parseFloat(food.food_discount) > 0);
                    break;
            }

            return filtered;
        },

        currentPageItems() {
            const start = this.pageNum * this.perPage;
            return this.filterFoods.slice(start, start + this.perPage);
        },

        calculatePages() {
            return Math.ceil(this.filterFoods.length / this.perPage) || 1;
        }
    },

    methods: {
        async fetchAllFoods() {
            try {
                // In production, replace with actual API call
                const response = await fetch("/api/foods");
                if (response.ok) {
                    this.allFoods = await response.json();
                } else {
                    console.error("Failed to fetch foods");
                    // For demo purposes, populate with sample data
                    this.loadSampleData();
                }
            } catch (error) {
                console.error("Error fetching foods: ", error);
                // For demo purposes, populate with sample data
                this.loadSampleData();
            }
        },

        loadSampleData() {
            // Sample data for demonstration
            this.allFoods = [
                {
                    food_id: 1,
                    food_name: "Veggie Tacos",
                    food_category: "taco",
                    food_type: "vegan",
                    food_price: "180",
                    food_discount: "20",
                    food_star: "4.5",
                    food_vote: "128",
                    food_desc: "Fresh vegetables and guacamole in soft corn tortillas",
                    food_src: "placeholder.jpg",
                    food_status: "best seller"
                },
                {
                    food_id: 2,
                    food_name: "Beef Burrito",
                    food_category: "burrito",
                    food_type: "meat",
                    food_price: "250",
                    food_discount: "0",
                    food_star: "4.8",
                    food_vote: "96",
                    food_desc: "Slow-cooked beef with rice, beans and cheese",
                    food_src: "placeholder.jpg",
                    food_status: "best seller"
                }
                // Add more items as needed
            ];
        },

        setDietFilter(type) {
            this.pageNum = 0;
            this.foodObj.type = type;
        },

        filterFoodBtn(e) {
            this.pageNum = 0;
            this.foodObj.category = e.target.value;
        },

        addItem(index) {
            this.sendId = this.currentPageItems[index].food_id;
            this.showQuickView = true;
        }
    },

    mounted() {
        this.fetchAllFoods();
    }
};
</script>

<style scoped>
/* Custom Font Import */
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

/* General Styling */
.menu-section {
    padding: 2rem 5%;
    background: linear-gradient(135deg, #f9f9f9, #f1f1f1);
}

/* Search and Filter Container */
.search-filter-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    gap: 2rem;
}

.left-group {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
}

.right-group {
    display: flex;
    align-items: center;
}

/* Search Box Styles */
.search-box {
    position: relative;
    min-width: 300px;
}

.search-input {
    width: 100%;
    padding: 12px 20px;
    padding-right: 40px;
    border: 2px solid #ddd;
    border-radius: 25px;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.search-input:focus {
    outline: none;
    border-color: #27ae60;
    box-shadow: 0 4px 10px rgba(39, 174, 96, 0.2);
}

.search-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
}

/* Diet Filter Buttons */
.diet-filter {
    display: flex;
    gap: 0.5rem;
}

.filter-btn {
    padding: 10px 20px;
    border-radius: 25px;
    background: white;
    border: 2px solid #ddd;
    color: #666;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    height: 45px;
}

.filter-btn i {
    font-size: 14px;
}

.filter-btn:hover,
.filter-btn.active {
    background: linear-gradient(to right, #057835, #27ae60);
    border-color: #27ae60;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(39, 174, 96, 0.2);
}

/* Update the filter button styles in your <style> section */
.filter-btn[data-type="meat"].active,
.filter-btn[data-type="meat"]:hover {
    background: linear-gradient(to right, #ff0000, #e74c3c);
    border-color: #e74c3c;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(231, 76, 60, 0.2);
}

/* Keep vegan button style separate */
.filter-btn[data-type="vegan"].active,
.filter-btn[data-type="vegan"]:hover {
    background: linear-gradient(to right, #057835, #27ae60);
    border-color: #27ae60;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(39, 174, 96, 0.2);
}

/* Menu Tabs */
.menu-tabs {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
    padding: 5px;
    background: linear-gradient(to right, #057835, #27ae60);
    border-radius: 30px;
    box-shadow: 0 4px 12px rgba(39, 174, 96, 0.2);
}

.menu-tab-item {
    padding: 8px 16px;
    border-radius: 20px;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.8);
    text-transform: capitalize;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.menu-tab-item:hover,
.menu-tab-item.active {
    background: #f38609;
    color: white;
    box-shadow: 0 4px 10px rgba(243, 134, 9, 0.3);
}

/* Food Box Container */
.box-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr); /* 5 columns */
    gap: 1.2rem; /* smaller gap for more compact look */
    width: 100%;
    margin: 0 auto;
    /* Optional: set a max-width for better centering on large screens */
    max-width: 1400px;
}

/* Make each card a bit smaller */
.box {
    position: relative;
    min-width: 0;
    min-height: 0;
    /* Remove or comment out the fixed height */
    /* height: 340px; */
    padding: 0.8rem;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}

.image {
    width: 100%;
    height: 160px;
    overflow: hidden;
    border-radius: 16px;
    margin-bottom: 1rem;
}

.image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 16px;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;      /* Reduced space between items */
    padding: 0 0.5rem;
    flex: 1 1 auto;
}

.content h3 {
    font-size: 1.1rem;
    color: #057835;
    font-weight: 700;
    margin: 0 0 0.1rem 0; /* Only a little space below */
}

.stars {
    position: absolute;
    top: 18px;
    right: 18px;
    background: #fff;
    padding: 0.2rem 0.7rem;
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(39, 174, 96, 0.07);
    color: #f7b731;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    z-index: 3;
}

.desc {
    font-size: 1rem;
    color: #666;
    margin: 0 0 0.1rem 0; /* Less space below */
}

.price {
    font-size: 1.2rem;
    font-weight: bold;
    color: #057835;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 0.2rem; /* Less space below */
}

.price span {
    font-size: 1rem;
    color: #999;
    text-decoration: line-through;
    font-weight: normal;
}

.btn {
    margin-top: 1.2rem;
    width: 100%;
}

/* Responsive: 3 columns on medium, 2 on small, 1 on mobile */
@media (max-width: 1200px) {
    .box-container {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 900px) {
    .box-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 576px) {
    .box-container {
        grid-template-columns: 1fr;
    }
    .box {
        height: auto;
    }
}

.box:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, #057835, #27ae60);
    z-index: 1;
}

/* Consistent Button Style */
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
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn:hover {
    background: linear-gradient(to right, #f38609, #f7b731);
    transform: translateY(-3px);
    box-shadow: 0 7px 14px rgba(39, 174, 96, 0.2);
}

.btn:active {
    transform: translateY(-1px);
}

/* Food Type Badge */
.food-type-badge {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

.food-type-badge.vegan {
    background: #27ae60;
    color: white;
}

.food-type-badge.meat {
    background: #e74c3c;
    color: white;
}

/* Food Image */
.image {
    width: 100%;
    height: 160px;
    overflow: hidden;
    border-radius: 16px;
    margin-bottom: 1rem;
}

.image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 16px;
    transition: all 0.5s ease;
}

.box:hover .image img {
    transform: scale(1.05);
}

/* Food Content */
.content {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;      /* Reduced space between items */
    padding: 0 0.5rem;
    flex: 1 1 auto;
}

.content h3 {
    font-size: 1.1rem;
    color: #057835;
    font-weight: 700;
    margin: 0 0 0.1rem 0; /* Only a little space below */
}

.stars {
    position: absolute;
    top: 18px;
    right: 18px;
    background: #fff;
    padding: 0.2rem 0.7rem;
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(39, 174, 96, 0.07);
    color: #f7b731;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    z-index: 3;
}

.desc {
    font-size: 1rem;
    color: #666;
    margin: 0 0 0.1rem 0; /* Less space below */
}

.price {
    font-size: 1.2rem;
    font-weight: bold;
    color: #057835;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 0.2rem; /* Less space below */
}

.price span {
    font-size: 1rem;
    color: #999;
    text-decoration: line-through;
    font-weight: normal;
}

.btn {
    margin-top: 1.2rem;
    width: 100%;
}

/* No Results */
.no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.no-results h1 {
    color: #057835;
    margin-bottom: 1rem;
}

.no-results p {
    color: #666;
    margin-bottom: 2rem;
}

.no-results img {
    max-width: 200px;
}

/* Pagination */
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
    gap: 8px;
}

.pagination span {
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
}

.pagination span:hover {
    background: #f5f5f5;
    color: #057835;
}

.pagination span.active {
    background: #f38609;
    color: white;
    box-shadow: 0 3px 8px rgba(243, 134, 9, 0.3);
}

.page-btn {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: none;
    background: linear-gradient(to right, #057835, #27ae60);
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 3px 8px rgba(39, 174, 96, 0.2);
}

.page-btn:hover {
    background: linear-gradient(to right, #f38609, #f7b731);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(243, 134, 9, 0.3);
}

/* Close Button for Modal */
.close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: #f5f5f5;
    border: none;
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.close-btn:hover {
    background: #ff5252;
    color: white;
}

/* Sort Filter Styles */
.sort-filter {
    position: relative;
    min-width: 150px;
}

.sort-select {
    width: 100%;
    padding: 10px 15px;
    border-radius: 25px;
    border: 2px solid #ddd;
    background: white;
    color: #666;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23666' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: calc(100% - 15px) center;
    padding-right: 35px;
}

.sort-select:hover {
    border-color: #27ae60;
    box-shadow: 0 4px 10px rgba(39, 174, 96, 0.2);
}

.sort-select:focus {
    outline: none;
    border-color: #27ae60;
    box-shadow: 0 4px 10px rgba(39, 174, 96, 0.2);
}

/* Responsive Styles */
@media (max-width: 768px) {
    .search-filter-container {
        flex-direction: column;
        gap: 1rem;
    }

    .left-group {
        flex-direction: column;
        width: 100%;
    }

    .right-group {
        width: 100%;
    }

    .search-box {
        min-width: 100%;
    }

    .diet-filter {
        justify-content: center;
        width: 100%;
    }

    .filter-btn {
        flex: 1;
    }

    .sort-filter {
        order: 2;
        margin-bottom: 1rem;
    }

    .search-box {
        max-width: 100%;
        margin-bottom: 1rem;
    }

    .menu-tabs {
        overflow-x: auto;
        justify-content: flex-start;
        padding: 5px 10px;
    }

    .menu-tab-item {
        white-space: nowrap;
    }

    .box-container {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1.5rem;
    }
}

@media (max-width: 576px) {
    .menu-section {
        padding: 1.5rem 3%;
    }

    .diet-filter {
        width: 100%;
        justify-content: space-between;
    }

    .filter-btn {
        flex: 1;
        padding: 8px 10px;
        font-size: 14px;
    }

    .box-container {
        grid-template-columns: 1fr;
    }

    .image {
        height: 200px; /* Slightly smaller on mobile */
    }

    .content h3 {
        font-size: 1.3rem;
    }
}

/* Card/Box Style */
.card, .box, .promo-card, .box-content {
    background: #fff;
    border-radius: 1.2rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover, .box:hover, .promo-card:hover, .box-content:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(39, 174, 96, 0.1);
}

/* Modal/Quick View Style */
.modal-overlay, .quick-view {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 99;
    background-color: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content, .quick-view-inner {
    background: #fff;
    border-radius: 1.2rem;
    box-shadow: 0 1rem 3rem rgba(0,0,0,0.1);
    padding: 3rem;
    max-width: 90vw;
    animation: fadeIn .5s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px);}
    to { opacity: 1; transform: translateY(0);}
}

/* Back Button */
.back-btn {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 80px;
    height: 35px;
    border-radius: 25px;
    background: #f5f5f5;
    border: none;
    font-size: 16px;
    color: #057835;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.back-btn:hover {
    background: #f38609;
    color: #fff;
}
</style>