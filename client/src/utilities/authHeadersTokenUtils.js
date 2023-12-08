export const getAuthHeadersToken = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  return user ? user.token : null;
};