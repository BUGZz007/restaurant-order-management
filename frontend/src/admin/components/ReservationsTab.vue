# I'll write the optimized reservations tab content here
<template>
  <div class="tab-content">
    <div class="table-responsive">
      <h2>Table Reservations</h2>
      <div class="booking-stats">
        <div class="stat-card">
          <h4>Total Bookings</h4>
          <p>{{ getAllBookings.length }}</p>
        </div>
        <div class="stat-card">
          <h4>Today's Bookings</h4>
          <p>{{ todayBookings }}</p>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>People</th>
            <th>Tables</th>
            <th>When</th>
            <th>Note</th>
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
            <td>{{ booking.note }}</td>
            <td>
              <span :class="getStatusClass(booking.status)">
                {{ booking.status || 'Pending' }}
              </span>
            </td>
            <td>
              <button v-if="!booking.status || booking.status === 'pending'" 
                      class="action-btn" 
                      @click="confirmBooking(booking.id)">
                Confirm
              </button>
              <button class="cancel-btn" 
                      @click="cancelBooking(booking.id)">
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'ReservationsTab',
  computed: {
    ...mapGetters(['getAllBookings']),
    sortedBookings() {
      return [...this.getAllBookings].sort((a, b) => b.id - a.id);
    },
    todayBookings() {
      const today = new Date().toISOString().split('T')[0];
      return this.getAllBookings.filter(booking => 
        booking.when && booking.when.startsWith(today)
      ).length;
    }
  },
  methods: {
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
    async confirmBooking(id) {
      const booking = this.getAllBookings.find(b => b.id === id);
      if (booking) {
        booking.status = 'confirmed';
        await axios.put(`/api/booktable/${id}`, { status: 'confirmed' });
      }
    },
    async cancelBooking(id) {
      await axios.delete(`/api/booktable/${id}`);
      this.$store.commit('REMOVE_BOOKING', id);
    },
    async refreshReservations() {
      try {
        const response = await axios.get('/api/booktable');
        this.$store.commit('SET_BOOKINGS', response.data);
      } catch (error) {
        console.error('Error refreshing reservations:', error);
      }
    }
  },
  mounted() {
    this.refreshReservations();
    this.interval = setInterval(this.refreshReservations, 1000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  }
}
</script>

<style scoped>
.booking-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.stat-card h4 {
  color: #666;
  margin-bottom: 1rem;
}

.stat-card p {
  font-size: 2rem;
  color: #27ae60;
  font-weight: bold;
}

.status-confirmed,
.status-pending,
.status-cancelled {
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.status-confirmed { background: #27ae60; color: white; }
.status-pending { background: #f39c12; color: white; }
.status-cancelled { background: #e74c3c; color: white; }

.action-btn, .cancel-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  margin: 0 0.3rem;
  transition: all 0.3s;
}

.action-btn { background: #27ae60; }
.cancel-btn { background: #e74c3c; }

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
</style>
