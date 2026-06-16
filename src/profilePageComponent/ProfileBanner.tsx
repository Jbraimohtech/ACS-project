
import {useNavigate} from 'react-router-dom';
import type { User } from "../types/User";

interface Props {
  user: User | null;
}

const ProfileBanner = ({
  user,
}: Props) => {
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
        <img
          src={
            user?.profile_image
              ? `https://ambchapcorps.org/storage/${user.profile_image}`
              : "/profile.jpg"
          }
          alt="Profile"
          className="profile-image-demo"
          onError={(e) => {
            e.currentTarget.src =
              "/profile.jpg";
          }}
        />

        <div className="auroraProfileDetails">
          <div className="auroraNameRow">
            <h2>
              {user?.first_name}
              {" "}
              {user?.last_name}
            </h2>

            <span className="auroraVerified">
              <div className="verified-profile"></div>
            </span>

            <span className="auroraStatus">
              {user?.status}
              <div className="auroraStatus-circle"></div>
              <div className="auroraStatus-circle"></div>
            </span>
              
            
          </div>

          <div className="auroraMetaRow">
            <p>Unit Coordinator</p>

            <span>
              <span>
                <div className="edit-profile-location"></div>

                {user?.zone?.name ??
                  "No Zone Assigned"}
              </span>
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