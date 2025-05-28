# I'll write the optimized orders tab content here
<template>
  <div class="tab-content">
    <div class="table-responsive">
      <h2>Orders Received</h2>
      <table class="table">
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
          <tr v-for="b in filterBills" :key="b.bill_id">
            <td>{{ b.bill_id }}</td>
            <td>{{ b.user_id }}</td>
            <td>{{ b.bill_phone }}</td>
            <td>{{ b.bill_address }}</td>
            <td>{{ b.bill_when }}</td>
            <td>{{ b.bill_paid }}</td>
            <td>₹{{ b.bill_total }}</td>
            <td>{{ avaiableStatus[b.bill_status] }}</td>
            <td>
              <button v-if="b.bill_status < 5" class="action-btn" @click="nextStatus(b.bill_id)">
                {{ avaiableStatus[b.bill_status + 1] }}
              </button>
              <button v-if="b.bill_status == 1" class="cancel-btn" @click="cancelOrder(b.bill_id)">
                Cancel
              </button>
              <button v-else-if="b.bill_status == 5 && b.bill_paid == 'false'" 
                      class="paid-btn" @click="markPaid(b.bill_id)">
                Paid
              </button>
              <button v-else-if="b.bill_status == 5 && b.bill_paid == 'true'" 
                      class="action-btn" @click="nextStatus(b.bill_id)">
                {{ avaiableStatus[b.bill_status + 1] }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'OrdersTab',
  data() {
    return {
      allBills: [],
      avaiableStatus: ["cancel", "confirmed", "preparing", "checking", "delivering", "delivered", "completed"]
    }
  },
  computed: {
    filterBills() {
      return this.allBills.filter(b => b.bill_status < 6 && b.bill_status > 0).slice().reverse();
    }
  },
  methods: {
    async getAllBills() {
      try {
        const response = await axios.get('/billstatus');
        this.allBills = response.data;
      } catch (error) {
        console.error('Error fetching bills:', error);
      }
    },
    async nextStatus(id) {
      await axios.put('/billstatus/' + id);
      this.getAllBills();
    },
    async markPaid(id) {
      await axios.put('/billstatus/paid/' + id);
      this.getAllBills();
    },
    async cancelOrder(id) {
      await axios.put('/billstatus/cancel/' + id);
      this.getAllBills();
    }
  },
  mounted() {
    this.getAllBills();
    setInterval(this.getAllBills, 1000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  }
}
</script>

<style scoped>
.table-responsive {
  background: white;
  border-radius: 1.2rem;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.action-btn, .cancel-btn, .paid-btn {
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
.paid-btn { background: #f39c12; }

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
</style>
