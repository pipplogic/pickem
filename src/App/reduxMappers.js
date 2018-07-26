export const mapState = ({ login }) => {
  console.log({ login });
  return { loggedIn: login.status === "SUCCESS" };
};
