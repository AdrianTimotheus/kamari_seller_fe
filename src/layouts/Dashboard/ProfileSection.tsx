type props = {
  merchant: any,
}
export default function ProfileSection({ merchant }:props) {
  return (
    <div className="page-content profile-section">
      <div>
        <img src={merchant.profile_picture || 'https://img.freepik.com/free-photo/woman-with-balloon-image-torn-paper-style_53876-128762.jpg'} alt="" />
      </div>
      <div>
        <h5>{merchant.name}</h5>
        <span>{merchant.description}</span>
      </div>
    </div>
  );
}
