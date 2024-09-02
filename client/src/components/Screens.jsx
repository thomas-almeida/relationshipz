
/* eslint-disable react/prop-types */

import ExibitionPage from "../views/modules/ExibitionPage";
import Settings from "../views/modules/Settings";

export default function Screens({
  activeScreen,
  setActiveScreen,
  userData,
  refreshUserData

}) {
  return (
    <>
      {
        activeScreen === 'exibition' &&
        <ExibitionPage
          visible={true}
          setActiveScreen={setActiveScreen}
          userData={userData}
        />
      }
      {
        activeScreen === 'settings' &&
        <Settings
          visible={true}
          setActiveScreen={setActiveScreen}
          userData={userData}
          refreshUserData={refreshUserData}
        />
      }
    </>
  )
}