import { Link } from 'react-router-dom';
import useAppSelector from '../../hooks/useAppSelector';
import { selectUser } from '../../store/userSlice';

export default function UserCard() {
  const user = useAppSelector(selectUser);
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
          src={user.picUrl}
          alt=""
        />
        <span>
          {user.name}
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
