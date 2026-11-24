function Header({ activePage }) {
  return (
    <header className="top-header">
      <div>
        <h1>{activePage}</h1>
        <p>Welcome back! Manage your restaurant efficiently.</p>
      </div>

      <div className="header-right">
        <div className="header-date">
          <span>●</span> Restaurant Admin
        </div>
        <div className="header-avatar">A</div>
      </div>
    </header>
  );
}

export default Header;