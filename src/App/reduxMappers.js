export const mapState = ({ login }) => {
  return { loggedIn: login.status === "SUCCESS" };
};
