import { useState } from "react";

function CreateOrder({ menuItems, onCreateOrder }) {
  const [customerName, setCustomerName] = useState("");
  const [menuItemId, setMenuItemId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const selectedItem = menuItems.find(
    (item) => item.id === Number(menuItemId)
  );

  const totalAmount = selectedItem
    ? selectedItem.price * Number(quantity)
    : 0;

const handleSubmit = async (event) => {
  event.preventDefault();

  if (!selectedItem) {
    alert("Please select a food item.");
    return;
  }

  const success = await onCreateOrder({
    customer_name: customerName.trim(),
    menu_item_id: Number(menuItemId),
    quantity: Number(quantity),
  });

  if (success) {
    setCustomerName("");
    setMenuItemId("");
    setQuantity(1);
  }
};

  return (
    <div>
      <div className="welcome-section">
        <div>
          <h2>Create New Order</h2>
          <p>Enter customer details and select food items.</p>
        </div>
      </div>

      <section className="content-card create-order-card">
        {menuItems.length === 0 ? (
          <p className="empty-message">
            Please add food items to the menu before creating an order.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Customer Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  placeholder="Enter customer name"
                  minLength={2}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Select Food Item</label>
                <select
                  value={menuItemId}
                  onChange={(event) => setMenuItemId(event.target.value)}
                  required
                >
                  <option value="">Choose a food item</option>

                  {menuItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} — ₹{item.price}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label>Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="order-total">
              <span>Total Amount</span>
              <strong>₹{totalAmount.toFixed(2)}</strong>
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-button">
                Create Order
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

export default CreateOrder;