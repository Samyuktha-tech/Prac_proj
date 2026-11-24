import { useState } from "react";

function Menu({ menuItems, onSave, onDelete }) {
  const emptyForm = {
    name: "",
    price: "",
    category: "Breakfast",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

 const handleSubmit = async (event) => {
  event.preventDefault();

  const success = await onSave({
    id: editingId,
    name: formData.name.trim(),
    price: Number(formData.price),
    category: formData.category,
  });

  if (success) {
    closeForm();
  }
};

  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      name: item.name,
      price: item.price,
      category: item.category,
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this food item?")) {
      onDelete(id);
    }
  };

  return (
    <div>
      <div className="welcome-section">
        <div>
          <h2>Food Menu</h2>
          <p>Manage your restaurant food items and prices.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setEditingId(null);
            setFormData(emptyForm);
            setShowForm(true);
          }}
        >
          + Add Food Item
        </button>
      </div>

      {showForm && (
        <section className="content-card form-card">
          <div className="section-heading">
            <h3>{editingId ? "Edit Food Item" : "Add New Food Item"}</h3>
            <button className="close-button" onClick={closeForm}>
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Food Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter food name"
                  minLength={2}
                  required
                />
              </div>

              <div className="form-group">
                <label>Price (₹)</label>
                <input
                  name="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Snacks</option>
                  <option>Beverages</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={closeForm}
              >
                Cancel
              </button>

              <button type="submit" className="primary-button">
                {editingId ? "Update Item" : "Save Item"}
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="content-card">
        <div className="section-heading">
          <div>
            <h3>All Food Items</h3>
            <p>{menuItems.length} items available</p>
          </div>
        </div>

        {menuItems.length === 0 ? (
          <p className="empty-message">No food items available. Add one to get started.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Food Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {menuItems.map((item) => (
                  <tr key={item.id}>
                    <td>#{item.id}</td>
                    <td className="food-name">{item.name}</td>
                    <td>
                      <span className="category-badge">
                        {item.category}
                      </span>
                    </td>
                    <td>₹{item.price}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="edit-button"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-button"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </div>
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

export default Menu;