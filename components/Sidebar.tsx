/** @format */
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { usePathname } from "next/navigation";
import Logo from "@/public/rentez.svg";

// icons
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import { HiOutlineUsers } from "react-icons/hi2";
import { BiSolidUser, BiUser } from "react-icons/bi";
import { PiNotepadFill, PiNotepad } from "react-icons/pi";
import { VscSettingsGear } from "react-icons/vsc";
import { SiGooglehome } from "react-icons/si";

interface SideNavItemType {
  icon?: {
    icon: React.ReactNode;
    fillIcon: React.ReactNode;
  };
  label: string;
  href: string;
}

type Props = {
  sidebarItems: SideNavItemType[];
};

export default function Sidebar({ sidebarItems }: Props) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div
      className={cn(
        "min-h-screen max-h-screen overflow-y-auto w-fit md:pr-8 pr-3 pt-2 flex flex-col gap-3 border-r-[1px] pl-[50px]",
        isSidebarOpen && "md:w-[300px]"
      )}
    >
      {/* logo */}
      {isSidebarOpen && (
        <HoverContainer className="my-8">
          <Link href={"/"}>
            {/* <SiGooglehome className="text-4xl" /> */}
            <p className="font-bold text-5xl">
              Rent <span className="font-bold text-green-400 text-5xl">EZ</span>
            </p>
          </Link>
        </HoverContainer>
      )}

      {/* sidenavitems */}
      {sidebarItems.map((d, i) => (
        <HoverContainer key={i}>
          <SideNavItem
            icon={d.icon}
            href={d.href}
            isSidebarOpen={isSidebarOpen}
            label={d.label}
          />
        </HoverContainer>
      ))}

      {/* toggle button  */}
      <section
        className={cn(
          "hidden md:flex w-ful  justify-end",
          !isSidebarOpen && "justify-start"
        )}
      >
        <HoverContainer>
          <RiArrowLeftDoubleFill
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className={cn(
              "text-gray-400 transition-all text-4xl",
              !isSidebarOpen && "rotate-180"
            )}
          />
        </HoverContainer>
      </section>
    </div>
  );
}

function SideNavItem({
  href,
  isSidebarOpen,
  icon,
  label,
}: SideNavItemType & { isSidebarOpen: boolean }) {
  const [animationParent] = useAutoAnimate();
  const pathname = usePathname();
  const isActivePage = pathname == href;
  return (
    <Link
      ref={animationParent}
      href={href}
      className="flex gap-2 items-center cursor-pointer"
    >
      {/* icon */}
      <div className="w-[35px] h-[35px] text-3xl">
        {isActivePage ? icon?.fillIcon : icon?.icon}
      </div>
      {/* label */}
      {isSidebarOpen && (
        <p
          className={cn(
            "text-xl hidden md:block pr-4  transition-all ",
            isActivePage && "font-bold"
          )}
        >
          {label}
        </p>
      )}
    </Link>
  );
}

function HoverContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="p-3 transition-all rounded-full cursor-pointer hover:bg-gray-200 w-fit dark:hover:bg-zinc-900 group-hover:dark:bg-zinc-900 group-hover:bg-gray-200">
      {children}
    </div>
  );
}
