function Orders({ orders, onStatusChange, onDelete }) {
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      onDelete(id);
    }
  };

  return (
    <div>
      <div className="welcome-section">
        <div>
          <h2>Order Management</h2>
          <p>View customer orders and manage their status.</p>
        </div>

        <div className="order-count">
          Total Orders: <strong>{orders.length}</strong>
        </div>
      </div>

      <section className="content-card">
        <div className="section-heading">
          <div>
            <h3>All Orders</h3>
            <p>Manage your restaurant orders here.</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <p className="empty-message">No orders available yet.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Food Item</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td className="food-name">{order.customer_name}</td>
                    <td>{order.food_name}</td>
                    <td>{order.quantity}</td>
                    <td>₹{order.total_amount}</td>
                    <td>
                      <select
                        className="status-select"
                        value={order.status}
                        onChange={(event) =>
                          onStatusChange(order.id, event.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(order.id)}
                      >
                        Delete
                      </button>
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

export default Orders;