import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    isLoadingOrder: true,
    orders: [],
    orderActive: null,
  },
  reducers: {
    onSetOrderEvent: (state, { payload }) => {
      state.orderActive = payload;
    },
    onAddOrderEvent: (state, { payload }) => {
      state.orders.push(payload);
      state.orderActive = null;
    },
    onUpdateOrderEvent: (state, { payload }) => {
      state.orders = state.orders.map((order) => {
        if (order.order_id === payload.order_id) {
          return payload;
        }
        return order;
      });
      state.orderActive = null;
    },
    onDeleteOrderEvent: (state, { payload }) => {
      state.orders = state.orders.filter(
        (order) => order.order_id !== payload.order_id
      );
      state.orderActive = null;
    },

    ongetOrdersEvents: (state, { payload = [] }) => {
      payload.forEach((order) => {
        state.isLoadingOrder = false;
        const exists = state.orders.some(
          (dbOrder) => dbOrder.order_id === order.order_id
        );

        if (!exists) {
          state.orders.push(order);
        }
      });
    },
    onLogoutOrder: (state) => {
      state.isLoadingOrder = true;
      state.orders = [];
    },
    searchOrder: (state, { payload }) => {
      const searchQuery = payload.toLowerCase();
      state.orders = state.orders.filter((order) => {
        const userNameMatch = order.user_name
          .toLowerCase()
          .includes(searchQuery);
        const orderIdMatch = order.order_id.toString().includes(searchQuery);

        return userNameMatch || orderIdMatch;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  ongetOrdersEvents,
  onLogoutOrder,
  onSetOrderEvent,
  onAddOrderEvent,
  onDeleteOrderEvent,
  onUpdateOrderEvent,
} = orderSlice.actions;
