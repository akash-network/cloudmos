import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip enterDelay={0} enterTouchDelay={0} {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.grey[200],
    color: theme.palette.mode === "dark" ? theme.palette.primary.contrastText : theme.palette.primary.main,
    fontSize: ".9rem"
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.grey[200]
  }
}));
