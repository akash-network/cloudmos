import React, { ReactNode } from "react";
import { AppBar, Box, Button, Container, lighten, Toolbar, useTheme } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { customColors } from "@src/utils/colors";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import LaunchIcon from "@mui/icons-material/RocketLaunch";
import { headerHeight, mobileHeaderHeight } from "@src/utils/constants";

type Props = {
  children?: ReactNode;
};

const useStyles = makeStyles()(theme => ({
  toolbar: {
    minHeight: headerHeight,
    alignItems: "center",
    backgroundColor: theme.palette.mode === "dark" ? customColors.dark : customColors.lightBg,
    [theme.breakpoints.down("sm")]: {
      minHeight: mobileHeaderHeight
    }
  }
}));

export const Header: React.FunctionComponent<Props> = () => {
  const { classes } = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const isHome = router.pathname === "/";

  return (
    <AppBar position="fixed" sx={{ boxShadow: "none" }}>
      <Toolbar className={classes.toolbar}>
        <Container sx={{ padding: { xs: 0, sm: "inherit" } }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ height: "40px", width: "160px" }}>
              <Link href="/">
                <a>
                  <Image
                    alt="Cloudmos Logo"
                    src={theme.palette.mode === "dark" ? "/images/cloudmos-logo.png" : "/images/cloudmos-logo-light.png"}
                    layout="responsive"
                    quality={100}
                    width={160}
                    height={40}
                    priority
                  />
                </a>
              </Link>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button color="secondary" variant="contained" endIcon={<LaunchIcon />} component="a" href={"https://deploy.cloudmos.io"} target="_blank">
                Deploy
              </Button>
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
