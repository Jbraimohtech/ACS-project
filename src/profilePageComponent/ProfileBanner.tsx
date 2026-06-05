import {useNavigate} from 'react-router-dom';


const ProfileBanner = () => {
  const navigate = useNavigate();

  const goToEditProfile = () => {
    navigate('/edit-profile-page');
  };


  return (
    <>
      <div className="auroraBannerShell">
        <button className="auroraCoverButton">
          <div className="edit-profile-cover"></div>
          Edit cover picture
        </button>
      </div>

      <div className="auroraProfileSection">
        <div className="profile-image-demo"></div>

        <div className="auroraProfileDetails">
          <div className="auroraNameRow">
            <h2>Chukwutem Emmanuel</h2>

            <span className="auroraVerified">
              <div className="verified-profile"></div>
            </span>

            <span className="auroraStatus">
              Active
              <div className="auroraStatus-circle"></div>
            </span>
          </div>

          <div className="auroraMetaRow">
            <p>Unit Coordinator</p>

            <span>
              <div className="edit-profile-location"></div>
              Ikeja, Lagos
            </span>
          </div>
        </div>

        <button className="auroraEditButton" onClick={goToEditProfile}>
          <div className="edit-profile-pen"></div>
          Edit Profile
        </button>
      </div>
    </>
  );
}

export default ProfileBanner