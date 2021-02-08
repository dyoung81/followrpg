import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    color: "primary",
  },
  dark: {
    backgroundColor: "#102A43",
    color: "#F0F4F8",
  },
  link: {
    color: "black",
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  drawer: {
    background: theme.palette.primary.main,
  },
  text: {
    color: theme.palette.text.main,
  },
}));
