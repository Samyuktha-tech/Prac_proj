function Dashboard({ menuItems, orders, stats, onNavigate }) {
  const statCards = [
    {
      title: "Total Menu Items",
      value: stats.total_menu_items ?? 0,
      icon: "☷",
    },
    {
      title: "Total Orders",
      value: stats.total_orders ?? 0,
      icon: "▤",
    },
    {
      title: "Pending Orders",
      value: stats.pending_orders ?? 0,
      icon: "◷",
    },
    {
      title: "Completed Orders",
      value: stats.completed_orders ?? 0,
      icon: "✓",
    },
  ];

  const recentOrders = [...orders].slice(-5).reverse();

  return (
    <div>
      <div className="welcome-section">
        <div>
          <h2>Restaurant Overview</h2>
          <p>Here's what's happening in your restaurant today.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => onNavigate("Create Order")}
        >
          + Create Order
        </button>
      </div>

      <div className="stats-grid">
        {statCards.map((stat) => (
          <div className="stat-card" key={stat.title}>
            <div className="stat-icon">{stat.icon}</div>
            <p>{stat.title}</p>
            <h2>{stat.value}</h2>
          </div>
        ))}
      </div>

      <section className="content-card">
        <div className="section-heading">
          <div>
            <h3>Recent Orders</h3>
            <p>Latest customer orders</p>
          </div>

          <button
            className="text-button"
            onClick={() => onNavigate("Orders")}
          >
            View all
          </button>
        </div>

        {recentOrders.length === 0 ? (
          <p className="empty-message">No orders available yet.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Food Item</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customer_name}</td>
                    <td>{order.food_name}</td>
                    <td>₹{order.total_amount}</td>
                    <td>
                      <span
                        className={`status-badge ${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;