import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAsync } from "../redux/authSlice";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";


// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon:  <UserCircleIcon className="text-gray-light h-5 w-5" />,
    link: '/profile'
  },
  // {
  //   label: "Edit Profile",
  //   icon:  <Cog6ToothIcon className="text-gray-light h-5 w-5" />,
  //   link: '/profile/edit'
  // },
  {
    label: "Sign Out",
    icon:  <PowerIcon className="text-red-500 h-5 w-5" />,
  },
];

export const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const closeMenu = () => setIsMenuOpen(false);

  const onClickLogout = () => {
    dispatch(logoutAsync());
    setIsMenuOpen(false);
  }
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, link }, index) => {
          const isLastItem = index !== profileMenuItems.length - 1;
          if(isLastItem) {
            return (
              <Link
                key={label}
                to={link}
                className="focus:outline-none"
              >
                <ProfileMenuItem
                  label={label}
                  icon={icon}
                  isLastItem
                  closeMenu={closeMenu}
                />
              </Link>
            );
          }
          return (
            <ProfileMenuItem
              key={label}
              label={label}
              icon={icon}
              closeMenu={(e) => { onClickLogout() }}
            />
          );
        })}
      </MenuList>
    </Menu>
  );
};
 
const ProfileMenuItem = ({
  label,
  icon,
  isLastItem,
  closeMenu,
}) => {
  return (
    <MenuItem
      onClick={closeMenu}
      className={`flex items-center gap-2 rounded ${
        isLastItem? "" : "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
      }`}
    >
      { icon }
      <Typography
        as="span"
        variant="small"
        className="font-normal"
        color={isLastItem ? "inherit" : "red"}
      >
        { label }
      </Typography>
    </MenuItem>
  );
}
