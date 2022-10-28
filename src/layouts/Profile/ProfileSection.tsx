type props = {
  merchant: any,
}
export default function ProfileSection({ merchant }:props) {
  return (
    <div className="page-content profile-section">
      <div>
        <img src={merchant.profile_picture} alt="" />
      </div>
      <div>
        <h5>{merchant.name}</h5>
        <span>{merchant.description}</span>
      </div>
    </div>
  );
}
