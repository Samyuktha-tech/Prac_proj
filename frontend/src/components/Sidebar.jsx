const navigation = [
  { name: "Dashboard", icon: "▦" },
  { name: "Menu", icon: "☷" },
  { name: "Orders", icon: "▤" },
  { name: "Create Order", icon: "+" },
];

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">T</div>
        <div>
          <h2>TiffinDesk</h2>
          <p>Restaurant Management</p>
        </div>
      </div>

      <div className="sidebar-label">MENU</div>

      <nav className="sidebar-nav">
        {navigation.map((item) => (
          <button
            key={item.name}
            className={`nav-item ${
              activePage === item.name ? "active" : ""
            }`}
            onClick={() => setActivePage(item.name)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="profile-avatar">A</div>
        <div>
          <strong>Admin</strong>
          <p>Administrator</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;