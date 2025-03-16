import Nav from "@/components/nav/nav";

import Profile from "@/components/settings/profile";

import { getServerSession } from "next-auth";

const Settings = async () => {
  

  return (
    <Nav>
      <Profile  />
      
    </Nav>
  );
};

export default Settings;
