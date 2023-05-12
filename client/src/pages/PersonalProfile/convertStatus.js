export const convertStatus = (status) => {
  switch (status) {
    case 1:
      return "Vừa nhận đơn hàng";
    case 2:
      return "Đơn hàng đang chuẩn bị vận chuẩn";
    case 3:
      return "Sản phẩm chuẩn bị đang đến chỗ bạn";
    case 4:
      return "Giao hàng thành công";
    default:
      return "Đã giao thành công";
  }
};

export const convertDate = (date) => {
  if (!date) return "";
  const newDate = new Date(date);
  return `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`;
};
