// import ProfilePage from "../profilePageComponent/ProfilePage"

import { Helmet } from "react-helmet"
import LoginPage from "../loginComponents/LoginPage"

const Login = () => {
  return (
    <div className='login'>
      <Helmet>
        <title>Login - Ambassadors Chaplain Corps</title>
        <meta name="description" content="Login to access your account and manage your profile with the Ambassadors Chaplain Corps." />
        <meta name="keywords" content="login, account, profile, ambassadors, chaplain, corps" />
      </Helmet>
      {/* <ProfilePage /> */}
      <LoginPage />
    </div>
  )
}
export default Login
