import { ReactNode } from "react";
import PageContainer from "@src/components/shared/PageContainer";
import { Box, Typography, useTheme } from "@mui/material";
import { Title } from "@src/components/shared/Title";
import { NextSeo } from "next-seo";
import ConstructionIcon from "@mui/icons-material/Construction";

type Props = {
  children?: ReactNode;
};

const Maintenance: React.FunctionComponent<Props> = ({}) => {
  const theme = useTheme();

  return (
    <div>
      <NextSeo title="Maintenance" />

      <PageContainer>
        <Box sx={{ textAlign: "center", padding: "3rem 0" }}>
          <Typography variant="h1" sx={{ color: theme.palette.grey[400], fontSize: { xs: "2rem", sm: "4rem" }, marginBottom: "1rem" }}>
            Maintenance
          </Typography>

          <Title value="We'll be right back!" />

          <Box sx={{ paddingTop: "1rem" }}>
            <ConstructionIcon fontSize="large" />
          </Box>
        </Box>
      </PageContainer>
    </div>
  );
};

export default Maintenance;
