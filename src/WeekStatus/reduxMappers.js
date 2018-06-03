import { Autorenew, Error } from "@material-ui/icons";

const getInfo = status => {
  switch (status) {
    case "loading":
      return {
        Icon: Autorenew,
        color: "primary",
        className: "load",
        text: "Loading..."
      };
    case "error":
      return {
        Icon: Error,
        color: "error",
        className: "",
        text: "Error"
      };
    default:
      return {
        Icon: Error,
        color: "error",
        className: "",

        text: "Error"
      };
  }
};

export const mapState = (state, { status }) => ({ info: getInfo(status) });
