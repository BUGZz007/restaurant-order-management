import {createStore} from "vuex"
import axios from "axios"

const store = createStore({
    state() {
        return {
            allFoods: [],
            user: JSON.parse(localStorage.getItem('user')) || undefined,
            admin: undefined,
            tableBookings: JSON.parse(localStorage.getItem('tableBookings')) || [],
            bookingNotifications: []
        }
    },
    mutations: {
        setFoodsData(state, payload){
            state.allFoods = payload;
        },
        setUser(state, payload){
            state.user = payload;
            // Store user data in localStorage when setting
            if (payload) {
                localStorage.setItem('user', JSON.stringify(payload));
            } else {
                localStorage.removeItem('user');
            }
        },
        setAdmin(state, payload){
            state.admin = payload;
        },
        ADD_BOOKING(state, booking) {
            if (!Array.isArray(state.tableBookings)) {
                state.tableBookings = [];
            }
            state.tableBookings.push(booking);
            // Add notification
            state.bookingNotifications.push({
                id: booking.id,
                type: 'new',
                message: `New booking from ${booking.name}`,
                createdAt: new Date().toISOString()
            });
            localStorage.setItem('tableBookings', JSON.stringify(state.tableBookings));
        },
        UPDATE_BOOKING_STATUS(state, { bookingId, status }) {
            const booking = state.tableBookings.find(b => b.id === bookingId);
            if (booking) {
                booking.status = status;
                localStorage.setItem('tableBookings', JSON.stringify(state.tableBookings));
            }
        },
        REMOVE_BOOKING(state, bookingId) {
            state.tableBookings = state.tableBookings.filter(b => b.id !== bookingId);
            localStorage.setItem('tableBookings', JSON.stringify(state.tableBookings));
        }
    },
    actions: {
        async getFoodsData(context){
            await axios.get('/foods')
            .then(function (response) {
                context.commit("setFoodsData", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        addBooking({ commit }, bookingData) {
            try {
                const newBooking = {
                    ...bookingData,
                    id: Date.now(),
                    status: 'pending',
                    createdAt: new Date().toISOString()
                };

                commit('ADD_BOOKING', newBooking);
                return Promise.resolve(newBooking);
            } catch (error) {
                return Promise.reject(error);
            }
        },
        updateBookingStatus({ commit }, { bookingId, status }) {
            commit('UPDATE_BOOKING_STATUS', { bookingId, status });
        },
        removeBooking({ commit }, bookingId) {
            commit('REMOVE_BOOKING', bookingId);
        }
    },
    getters: {
        getAllBookings: state => Array.isArray(state.tableBookings) ? state.tableBookings : [],
        getPendingBookings: state => {
            return Array.isArray(state.tableBookings) 
                ? state.tableBookings.filter(b => b.status === 'pending')
                : [];
        },
        getConfirmedBookings: state => {
            return Array.isArray(state.tableBookings)
                ? state.tableBookings.filter(b => b.status === 'confirmed')
                : [];
        },
        getBookingNotifications: state => state.bookingNotifications || []
    }
})

export default store;