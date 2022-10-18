import { Dispatch, SetStateAction } from 'react';
import UserCard from '../../components/Card/UserCard';

type props = {
  showSidebar: boolean,
  setShowSidebar: Dispatch<SetStateAction<boolean>>,
}

export default function Header({ showSidebar, setShowSidebar }:props) {
  const handleControl = () => {
    if (showSidebar) setShowSidebar(false);
    else setShowSidebar(true);
  };
  return (
    <header className="header">
      <div className="header-control">
        <button
          type="button"
          onClick={() => handleControl()}
        >
          <i className="bi bi-list" />
          <span>
            Kamari for Seller
          </span>
        </button>
      </div>
      <div>
        <UserCard />
      </div>
    </header>
  );
}
