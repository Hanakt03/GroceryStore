export const convertOrderStatus = (status) => {
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
      break;
  }
};
