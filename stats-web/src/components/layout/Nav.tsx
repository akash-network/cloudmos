"use client";
import { ModeToggle } from "../ModeToggle";
import { FaGithub, FaBars, FaXTwitter } from "react-icons/fa6";
import { Button } from "../ui/button";
import { AkashConsoleDarkLogo, AkashConsoleLightLogo } from "../icons/AkashConsoleLogo";
import Link from "next/link";
import NetworkSelect from "./NetworkSelect";
import useCookieTheme from "@/hooks/useTheme";
import { MobileNav } from "./MobileNav";

export const Nav = () => {
  const theme = useCookieTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            {theme === "light" ? <AkashConsoleLightLogo className="h-[25px] max-w-[180px]" /> : <AkashConsoleDarkLogo className="h-[25px] max-w-[180px]" />}
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end">
          <div className="md:hidden">
            <MobileNav />
          </div>

          <nav className="hidden items-center md:flex">
            <div className="mr-2">
              <NetworkSelect />
            </div>

            <a target="_blank" rel="noreferrer" href="https://github.com/akash-network/cloudmos">
              <Button variant="ghost" size="icon">
                <FaGithub />
                <span className="sr-only">GitHub</span>
              </Button>
            </a>
            <a target="_blank" rel="noreferrer" href="https://twitter.com/akashnet_">
              <Button variant="ghost" size="icon">
                <FaXTwitter />
                <span className="sr-only">Twitter</span>
              </Button>
            </a>

            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};