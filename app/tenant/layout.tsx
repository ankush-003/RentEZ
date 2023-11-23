"use client";
import Header1 from "@/components/HeaderBar";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";
//icons
import { GoHome, GoHomeFill } from "react-icons/go";
import { HiUsers } from "react-icons/hi";
import { HiOutlineUsers } from "react-icons/hi2";
import { BiSolidUser, BiUser } from "react-icons/bi";
import { PiNotepadFill, PiNotepad } from "react-icons/pi";
import { VscSettingsGear } from "react-icons/vsc";
import { SideNavItemType } from "@/types/sidebarProps";
import { Header1Props } from "@/types/headerProps";
import { FaFileContract } from "react-icons/fa";
import { LiaFileContractSolid } from "react-icons/lia";
import { userType } from "@/types/user";
import { useEffect, useContext, useState, createContext } from "react";
import UserContext from "@/contexts/userContext"
import { set } from "zod";
import { MdCleaningServices } from "react-icons/md";

const sidebarItmes: SideNavItemType[] = [
  {
    icon: {
      icon: <GoHome />,
      fillIcon: <GoHomeFill />,
    },
    label: "Home",
    href: "/tenant",
  },
  {
    icon: {
      icon: <PiNotepad />,
      fillIcon: <PiNotepadFill />,
    },
    label: "Payments",
    href: "/tenant/payment",
  },

  {
    icon: {
      icon: <MdCleaningServices />,
      fillIcon: <MdCleaningServices />,
    },
    label: "Maintenance",
    href: "/tenant/maintenance",
  },

  {
    icon: {
      icon: <BiUser />,
      fillIcon: <BiSolidUser />,
    },
    label: "Profile ",
    href: "/tenant/profile",
  },
  {
    icon: {
      icon: <VscSettingsGear />,
      fillIcon: <VscSettingsGear />,
    },
    label: "Settings",
    href: "/tenant/settings",
  },
  {
    icon: {
      icon: <LiaFileContractSolid />,
      fillIcon: <FaFileContract />,
    },
    label: "Contract",
    href: "/tenant/contract",
  },
];

let headerProps: Header1Props = {
  userType: "tenant",
  avatarURL: null
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<userType | null>(null);

  const isLoggedIn = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) {
      return router.push("/unauthorised");
    }
    headerProps.avatarURL = session?.user?.user_metadata?.avatar_url;
    setUser(session?.user as userType);
  };
  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    //   <main>
    //     <div className="flex h-screen overflow-hidden">
    //     <Header1 />
    //     {children}
    //   </main>
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarItems={sidebarItmes} />
        {/* <!-- ===== Sidebar End ===== --> */}
        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header1 {...headerProps} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <UserContext.Provider value={user}>
                {children}
              </UserContext.Provider>
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
    </div>
  );
}
