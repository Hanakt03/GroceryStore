export const convertUserStatus = (status) => {
  console.log(status);
  switch (status) {
    case 1:
      return "đang hoạt động";
    case 2:
      return "khóa tài khoản";
    default:
      break;
  }
};
