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
import { useAuth } from "@/modules/auth/contexts";
import { Box, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import SubmitButton from "./ui/submitButton";
import { FiUser } from "react-icons/fi";
import {
  IoIosArrowDown,
  IoIosLogOut,
  IoIosSettings,
  IoMdListBox,
} from "react-icons/io";
import { FaUser } from "react-icons/fa";

const NAV_LINKS = [
  { href: "/car-problems-feed", labelKey: "Problemlər", icon: HiOutlineTruck },
  {
    href: "/mechanic-service-listing",
    labelKey: "Xidmətlər",
    icon: HiOutlineWrenchScrewdriver,
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
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/car-problems-feed"
            className="flex items-center gap-2.5 shrink-0"
          >
            <AppLogo size={36} />
            <span className="font-bold text-lg text-navy-DEFAULT tracking-tight hidden sm:block">
              AutoFixHub
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
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
          </nav>
          <div className="flex items-center gap-2">
            {user ? (
              <Box>
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
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <IoIosSettings size={20} />
                      </ListItemIcon>
                      Usta paneli
                    </MenuItem>
                  ) : (
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <IoMdListBox size={20} />
                      </ListItemIcon>
                      Müştəri paneli
                    </MenuItem>
                  )}
                  <MenuItem onClick={onLogout}>
                    <ListItemIcon>
                      <IoIosLogOut size={20} color="red" />
                    </ListItemIcon>
                    <Typography color="error">Çıxış</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-brand-muted-fg hover:bg-brand-muted transition-all duration-150"
                >
                  <HiOutlineArrowRightOnRectangle size={15} />
                  Daxil ol
                </Link>
                <Link
                  href="/auth/register"
                  className="btn-primary flex items-center gap-1.5"
                >
                  <HiOutlineUserPlus size={15} />
                  Qeydiyyat
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-brand-muted transition-colors duration-150"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <HiOutlineXMark size={20} />
              ) : (
                <HiOutlineBars3 size={20} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-brand-border bg-white animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={`mobile-nav-${link.href}`}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    active
                      ? "bg-primary-DEFAULT/10 text-primary-DEFAULT"
                      : "text-brand-fg hover:bg-brand-muted"
                  }`}
                >
                  <Icon size={18} />
                  {link.labelKey}
                </Link>
              );
            })}
            {!user && (
              <div className="pt-2 border-t border-brand-border space-y-2">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full btn-secondary"
                >
                  <HiOutlineArrowRightOnRectangle size={15} /> Daxil ol
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full btn-primary"
                >
                  <HiOutlineUserPlus size={15} /> Qeydiyyat
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
