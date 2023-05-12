const passwordPattern = `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$`;
export const inputs = [
  {
    id: 0,
    name: "firstName",
    type: "text",
    placeholder: "Nhập họ",
    errorMessage: "Mời bạn hãy nhập họ",
    label: "Họ",
    required: true,
  },
  {
    id: 1,
    name: "lastName",
    type: "text",
    placeholder: "Nhập tên",
    errorMessage: "Mời bạn hãy nhập tên",
    label: "Tên",
    required: true,
  },
  {
    id: 2,
    name: "username",
    type: "text",
    placeholder: "Nhập tài khoản",
    errorMessage:
      "Tên tài khoảng phải có độ dài từ 3 đến 16 kí tự và không được có kí tự đặc biệt",
    label: "Tài khoản",
    pattern: "^[A-Za-z0-9]{3,16}$",
    required: true,
  },
  {
    id: 3,
    name: "password",
    type: "password",
    placeholder: "Nhập mật khẩu",
    errorMessage:
      "Mật khẩu nên có ít nhất 8 kí tự và có ít nhất 1 chữ cái, 1 số và 1 kí tự đặc biệt",
    label: "Mật khẩu",
    pattern: passwordPattern,
    required: true,
  },
  {
    id: 4,
    name: "confirmPassword",
    type: "password",
    placeholder: "Nhập xác thực mật khẩu",
    errorMessage: "Mật khẩu không giống với mật khẩu trước đó",
    label: "Xác thực mật khẩu",
    pattern: passwordPattern,
    required: true,
  },
  {
    id: 5,
    name: "email",
    type: "email",
    placeholder: "Nhập email",
    errorMessage: "Mời bạn nhập đúng Email",
    label: "Email",
    required: true,
  },
  {
    id: 6,
    name: "phone",
    type: "text",
    placeholder: "Nhập điện thoại",
    pattern: "(84|0[3|5|7|8|9])+([0-9]{8})",
    errorMessage: "Mời bạn nhập đúng điện thoại",
    label: "Điện thoại",
    required: true,
  },
  {
    id: 7,
    name: "address",
    type: "text",
    placeholder: "Nhập địa chỉ",
    errorMessage: "Mời bạn nhập địa chỉ",
    label: "Địa chỉ",
    required: true,
  },
  {
    id: 8,
    name: "terms",
    type: "checkbox",
    errorMessage: "Mời bạn chấp nhận trước khi đăng ký",
    required: true,
  },
];
