import SectionTitle from '../../components/Text/SectionTitle';
import EditProfileModal from '../Modal/Profile/EditProfileModal';

type props = {
  merchant: any,
}
export default function ProfileDetailInfo({ merchant }:props) {
  return (
    <div className="page-content">
      <EditProfileModal
        merchant={merchant}
      />
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div>
          <SectionTitle text="Informasi Dasar" />
        </div>
        <button
          type="button"
          className="icon-mini icon-mini-orange"
          data-bs-toggle="modal"
          data-bs-target="#editProfileModal"
        >
          <i className="bi bi-pencil" />
        </button>
      </div>

      <div className="d-flex flex-column gap-3">

        <div className="row">
          <div className="col-12 col-sm-3 text-grey2">
            Nama Toko
          </div>
          <div className="col-12 col-sm-9">
            {merchant.name}
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-sm-3 text-grey2">
            Deskripsi Toko
          </div>
          <div className="col-12 col-sm-9">
            {merchant.description}
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-sm-3 text-grey2">
            Foto Profil Toko
          </div>
          <div className="col-12 col-sm-9">
            <img src={merchant.profile_picture} alt="" className="profile-pic" />
          </div>
        </div>

      </div>
    </div>

  );
}
