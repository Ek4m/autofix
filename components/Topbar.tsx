"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppLogo from "@/components/ui/AppLogo";
import {
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineWrenchScrewdriver,
  HiOutlineTruck,
  HiOutlineArrowRightOnRectangle,
  HiOutlineUserPlus,
} from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import { useAuth } from "@/modules/auth/contexts";
import { IoIosArrowDown, IoIosSettings, IoMdListBox } from "react-icons/io";
import { GoInfo } from "react-icons/go";
import { IoLogOut, IoNewspaperOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { BsEnvelope } from "react-icons/bs";

import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import SubmitButton from "./ui/submitButton";

const NAV_LINKS = [
  { href: "/", labelKey: "Problemlər", icon: HiOutlineTruck },
  {
    href: "/mechanic-service-listing",
    labelKey: "Xidmətlər",
    icon: HiOutlineWrenchScrewdriver,
  },
  {
    href: "/about-us",
    labelKey: "Haqqımızda",
    icon: GoInfo,
  },
  {
    href: "/blogs",
    labelKey: "Xəbərlər",
    icon: IoNewspaperOutline,
  },
  {
    href: "/contact",
    labelKey: "Əlaqə",
    icon: BsEnvelope,
  },
];

export default function Topbar() {
  const pathname = usePathname();
  const { user, isMechanic, onLogout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-brand-border shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between p-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <AppLogo size={36} />
          </Link>

          {/* Desktop nav */}
          <Stack
            sx={{ flexDirection: "row", display: { xs: "none", lg: "flex" } }}
            component={"nav"}
          >
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={`nav-${link.href}`}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    active
                      ? "bg-primary-DEFAULT/10 text-primary-DEFAULT"
                      : "text-brand-muted-fg hover:bg-brand-muted hover:text-brand-fg"
                  }`}
                >
                  <Icon size={16} />
                  {link.labelKey}
                </Link>
              );
            })}
          </Stack>
          <div className="flex items-center gap-2">
            {user ? (
              <Box sx={{ display: { xs: "none", lg: "block" } }}>
                <SubmitButton
                  variant="text"
                  startIcon={<FiUser />}
                  endIcon={<IoIosArrowDown size={15} />}
                  onClick={handleClick}
                  title={`${user.fullName} ${isMechanic ? "(Usta)" : ""}`}
                />
                <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleClose}>
                  <Link href="/profile">
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <FaUser size={20} />
                      </ListItemIcon>
                      Hesab
                    </MenuItem>
                  </Link>

                  {isMechanic ? (
                    <Link href="/profile/mechanic/panel">
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <IoIosSettings size={22} />
                        </ListItemIcon>
                        Usta paneli
                      </MenuItem>
                    </Link>
                  ) : (
                    <Link href="/profile/user-problems">
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <IoMdListBox size={24} />
                        </ListItemIcon>
                        Müştəri paneli
                      </MenuItem>
                    </Link>
                  )}
                  <MenuItem onClick={onLogout}>
                    <ListItemIcon>
                      <IoLogOut size={25} color="red" />
                    </ListItemIcon>
                    <Typography color="error">Çıxış</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Stack
                direction="row"
                spacing={1}
                sx={{ display: { xs: "none", lg: "flex" } }}
              >
                <SubmitButton
                  component={Link}
                  href="/auth/login"
                  startIcon={<HiOutlineArrowRightOnRectangle size={16} />}
                  title=" Daxil ol"
                />
                <SubmitButton
                  component={Link}
                  href="/auth/register"
                  variant="contained"
                  startIcon={<HiOutlineUserPlus size={16} />}
                  title="Qeydiyyat"
                />
              </Stack>
            )}

            {/* Mobile hamburger */}
            <IconButton
              sx={{ display: { xs: "block", lg: "none" } }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <HiOutlineBars3 size={20} />
            </IconButton>
          </div>
        </div>
      </div>
      <Drawer
        sx={{
          "& .MuiPaper-elevation": {
            p: 2,
          },
        }}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Stack
          sx={{ width: "250px", justifyContent: "space-between" }}
          direction={"row"}
        >
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <AppLogo size={36} />
          </Link>
          <IconButton onClick={() => setMobileOpen(false)}>
            <HiOutlineXMark size={20} />
          </IconButton>
        </Stack>
        <List>
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <ListItem
                href={link.href}
                component={Link}
                sx={{ gap: 1 }}
                key={link.href}
              >
                <Icon size={16} />
                <Typography sx={{ fontSize: 12 }}>{link.labelKey}</Typography>
              </ListItem>
            );
          })}
          {user ? (
            <>
              <ListItem href="/profile" component={Link} sx={{ gap: 1 }}>
                <FaUser size={16} />
                <Typography sx={{ fontSize: 12 }}>Hesab</Typography>
              </ListItem>
              {isMechanic ? (
                <ListItem
                  href="/profile/mechanic/panel"
                  component={Link}
                  sx={{ gap: 1 }}
                >
                  <IoIosSettings size={18} />
                  <Typography sx={{ fontSize: 12 }}>Usta paneli</Typography>
                </ListItem>
              ) : (
                <ListItem
                  href="/profile/user-problems"
                  component={Link}
                  sx={{ gap: 1 }}
                >
                  <IoMdListBox size={18} />
                  <Typography sx={{ fontSize: 12 }}>Müştəri paneli</Typography>
                </ListItem>
              )}
            </>
          ) : (
            <>
              <ListItem href="/auth/login" component={Link} sx={{ gap: 1 }}>
                <HiOutlineArrowRightOnRectangle size={16} />
                <Typography sx={{ fontSize: 12 }}>Daxil ol</Typography>
              </ListItem>
              <ListItem href="/auth/register" component={Link} sx={{ gap: 1 }}>
                <HiOutlineUserPlus size={16} />
                <Typography sx={{ fontSize: 12 }}>Qeydiyyat</Typography>
              </ListItem>
            </>
          )}
        </List>
        {user && (
          <Box sx={{ position: "absolute", bottom: 0 }}>
            <SubmitButton
              title="Çıxış"
              startIcon={<IoLogOut />}
              onClick={onLogout}
            />
          </Box>
        )}
      </Drawer>
    </header>
  );
}
