import { useCallback, useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import CreateOrder from "./pages/CreateOrder";

import {
  getDashboardStats,
  getMenu,
  getOrders,
  createMenu,
  updateMenu,
  deleteMenu,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} from "./services/api";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data from backend
  const loadData = useCallback(async () => {
    setError("");

    const [menuData, orderData, statsData] = await Promise.all([
      getMenu(),
      getOrders(),
      getDashboardStats(),
    ]);

    setMenuItems(menuData);
    setOrders(orderData);
    setStats(statsData);
  }, []);

  // Load data when application starts
  useEffect(() => {
    loadData()
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [loadData]);

  // Common function for handling API operations
  const runMutation = async (operation) => {
    try {
      setError("");

      await operation();

      // Get updated data from backend
      await loadData();

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Add or update menu item
  const saveMenuItem = async (item) => {
    if (item.id) {
      return runMutation(() =>
        updateMenu(item.id, {
          name: item.name,
          price: Number(item.price),
          category: item.category,
        })
      );
    }

    return runMutation(() =>
      createMenu({
        name: item.name,
        price: Number(item.price),
        category: item.category,
      })
    );
  };

  // Delete menu item
  const removeMenuItem = async (id) => {
    return runMutation(() => deleteMenu(id));
  };

  // Create order
  const addNewOrder = async (orderData) => {
    const success = await runMutation(() =>
      createOrder({
        customer_name: orderData.customer_name,
        menu_item_id: Number(orderData.menu_item_id),
        quantity: Number(orderData.quantity),
      })
    );

    if (success) {
      setActivePage("Orders");
    }

    return success;
  };

  // Update order status
  const changeOrderStatus = async (id, status) => {
    return runMutation(() => updateOrderStatus(id, status));
  };

  // Delete order
  const removeOrder = async (id) => {
    return runMutation(() => deleteOrder(id));
  };

  // Display loading message
  if (loading) {
    return <div className="loading-screen">Loading TiffinDesk...</div>;
  }

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return (
          <Dashboard
            menuItems={menuItems}
            orders={orders}
            stats={stats}
            onNavigate={setActivePage}
          />
        );

      case "Menu":
        return (
          <Menu
            menuItems={menuItems}
            onSave={saveMenuItem}
            onDelete={removeMenuItem}
          />
        );

      case "Orders":
        return (
          <Orders
            orders={orders}
            onStatusChange={changeOrderStatus}
            onDelete={removeOrder}
          />
        );

      case "Create Order":
        return (
          <CreateOrder
            menuItems={menuItems}
            onCreateOrder={addNewOrder}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-content">
        <Header activePage={activePage} />

        <div className="page-content">
          {error && (
            <div className="error-message">
              <span>{error}</span>
              <button onClick={() => loadData().catch((err) => setError(err.message))}>
                Retry
              </button>
            </div>
          )}

          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;