
import {useNavigate} from 'react-router-dom';
import type { User } from "../types/User";
import { getProfileImageUrl } from "../utils/auth";

interface Props {
  user: User | null;
}

const ProfileBanner = ({
  user,
}: Props) => {
  const navigate = useNavigate();
  const roleLabel = user?.role || user?.role_name || "Member";
  const zoneLabel = user?.zone?.name || user?.zone_name || "No Zone Assigned";

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
            getProfileImageUrl(user?.profile_image)
          }
          alt="Profile"
          className="profile-image-demo"
          onError={(e) => {
            e.currentTarget.src =
              "../assets/images/imageProfile-demo.jpeg";
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
            <p>{roleLabel}</p>

            <span>
              <span>
                <div className="edit-profile-location"></div>

                {zoneLabel}
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