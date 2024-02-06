"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";
import { MediaImage } from "iconoir-react";

// const useStyles = makeStyles()(theme => ({
//   root: {
//     cursor: "pointer",
//     minHeight: "100px",
//     "&:hover": {
//       backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[100]
//     }
//   }
// }));

type Props = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  imageUrl?: string;
  onClick: () => void;
  children?: React.ReactNode;
};

export const DeployOptionBox: React.FunctionComponent<Props> = ({ title, description, icon, imageUrl, onClick }) => {
  return (
    <Card className="min-h-[100px] cursor-pointer hover:bg-primary/10" onClick={onClick}>
      <CardHeader>
        <div className="flex items-center">
          {icon ? (
            <Avatar className="h-10 w-10">
              <AvatarFallback>{icon}</AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className="h-10 w-10">
              <AvatarImage src={imageUrl} alt={title} />
              <AvatarFallback>
                <MediaImage />
              </AvatarFallback>
            </Avatar>
          )}

          <div className="ml-4 font-bold">{title}</div>
        </div>
      </CardHeader>
      <CardContent className="pb-4 pt-0">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};
