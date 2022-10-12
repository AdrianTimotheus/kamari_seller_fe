import { Link } from 'react-router-dom';

export default function UserCard() {
  return (
    <div>
      <button
        type="button"
        className="header-user"
        data-bs-toggle="collapse"
        data-bs-target="#collapseUserMenu"
        aria-expanded="false"
        aria-controls="collapseUserMenu"
      >
        <img
          src="https://www.pngitem.com/pimgs/m/579-5798505_user-placeholder-svg-hd-png-download.png"
          alt="User profile"
        />
        <span>
          Nama user
        </span>
      </button>
      <div className="collapse header-user-menu" id="collapseUserMenu">
        <Link to="/logout" className="link-primary-1">
          Keluar
        </Link>
      </div>
    </div>
  );
}
