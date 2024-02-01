"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UrlService } from "@src/utils/urlUtils";
import { useCustomUser } from "@src/hooks/useCustomUser";
import Spinner from "../shared/Spinner";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "iconoir-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuIconItem } from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Settings, MediaImageList, Star, Bell, Book, LogOut } from "iconoir-react";
import { CustomDropdownLinkItem } from "../shared/CustomDropdownLinkItem";

export function AccountMenu({}: React.PropsWithChildren<{}>) {
  const [open, setOpen] = useState(false);
  const { user, error, isLoading } = useCustomUser();
  const username = user?.username;
  const router = useRouter();

  return (
    <React.Fragment>
      <div className="flex items-center text-center">
        {isLoading ? (
          <div className="pl-2 pr-2">
            <Spinner size="small" />
          </div>
        ) : (
          <div className="pl-2 pr-2">
            <DropdownMenu modal={false} open={open}>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => (username ? router.push(UrlService.userProfile(username)) : null)}
                  onMouseOver={() => setOpen(true)}
                >
                  <Avatar className="h-[2rem] w-[2rem]">
                    <AvatarFallback>{username ? username[0].toUpperCase() : <User />}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" onMouseLeave={() => setOpen(false)}>
                {!isLoading && user ? (
                  <div>
                    <CustomDropdownLinkItem
                      onClick={() => router.push(UrlService.userProfile(username))}
                      icon={
                        <Avatar className="h-4 w-4">
                          <AvatarFallback className="text-xs">{username ? username[0].toUpperCase() : <User />}</AvatarFallback>
                        </Avatar>
                      }
                    >
                      {username}
                    </CustomDropdownLinkItem>
                    <DropdownMenuSeparator />
                    <CustomDropdownLinkItem onClick={() => router.push(UrlService.userSettings())} icon={<Settings />}>
                      Settings
                    </CustomDropdownLinkItem>
                    <CustomDropdownLinkItem onClick={() => router.push(UrlService.userProfile(username))} icon={<MediaImageList />}>
                      Templates
                    </CustomDropdownLinkItem>
                    <CustomDropdownLinkItem onClick={() => router.push(UrlService.userFavorites())} icon={<Star />}>
                      Favorites
                    </CustomDropdownLinkItem>
                    <CustomDropdownLinkItem onClick={() => window.open("https://blockspy.io", "_blank")?.focus()} icon={<Bell />}>
                      My Alerts
                    </CustomDropdownLinkItem>
                    <CustomDropdownLinkItem onClick={() => router.push(UrlService.userAddressBook())} icon={<Book />}>
                      Addresses
                    </CustomDropdownLinkItem>
                    <DropdownMenuSeparator />
                    <CustomDropdownLinkItem onClick={() => router.push(UrlService.logout())} icon={<LogOut />}>
                      Logout
                    </CustomDropdownLinkItem>
                  </div>
                ) : (
                  <div>
                    <DropdownMenuItem className="hover:bg-primary-dark bg-primary text-white" onClick={() => router.push(UrlService.signup())}>
                      Sign up
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(UrlService.login())}>Sign in</DropdownMenuItem>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
