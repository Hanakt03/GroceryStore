import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <div className="container mx-auto bg-gray-100 px-5 py-3 rounded-md">
        <ol className="list-reset flex">
          <li>
            <Link to="/Home" class="text-blue-600 hover:text-blue-700">
              Trang chủ
            </Link>
          </li>
          <li>
            <span className="text-gray-500 mx-2">/</span>
          </li>
          <li className="text-gray-500">Giới thiệu</li>
        </ol>
      </div>

      <section className="bg-lime-400 py-6 mx-auto container">
        <div className="px-4 mx-auto max-w-screen-md">
          <p className="mb-4 font-bold text-base text-white text-center">
            SanjiFood là một chuỗi thực phẩm sạch được truy xuất nguồn gốc rõ
            ràng
          </p>
          <p className="font-bold text-4xl text-white text-center">
            Thực phẩm SanjiFood
          </p>
          <p className="mb-4 font-bold text-base text-4xl text-white text-center">
            Giá trị vàng cho sức khỏe
          </p>
          <p className="font-bold text-base text-base text-white text-center">
            SanjiFood là đơn vị trực tiếp sản xuất và giám sát từng khâu một để
            tạo ra các sản phẩm thực phẩm sạch. SanjiFood là nơi cung cấp nguồn
            thực phẩm sạch dồi dào và tin cậy.
          </p>
        </div>
      </section>

      <section className="py-6 mx-auto container">
        <div className="px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-xl tracking-tight font-bold text-center text-black">
            Chào Mừng Đến Với SanjiFood
          </h2>
          <p className="mb-8 text-justify text-black text-base">
            SanjiFood là công ty thương mại điện tử chuyên cung cấp các thực
            phẩm hữu cơ và tự nhiên với chuỗi cửa hàng thực phẩm hữu cơ với mục
            tiêu giúp người tiêu dùng Việt Nam có một cuộc sống khỏe mạnh hơn
            thông qua những loại thực phẩm hữu cơ có chứng nhận, thực phẩm tự
            nhiên và không có nguồn gốc biến đổi gene (GMO). Chúng tôi lựa chọn
            các loại thực phẩm hữu cơ, thực phẩm tự nhiên từ các nhà sản xuất,
            các công ty trong và ngoài nước thông qua quá trình lựa chọn kỹ càng
            về khả năng cung ứng, các giấy chứng nhận tiêu chuẩn do các tổ chức
            uy tín thế giới cấp. Chúng tôi yêu thích những gì chúng tôi làm và
            chúng tôi đam mê những lợi ích của một lối sống lành mạnh, tìm nguồn
            cung cấp sản phẩm hữu cơ chất lượng cao nhất cho khách hàng và cung
            cấp dịch vụ giao hàng tận nhà tốt nhất. Chúng tôi hoàn toàn tin
            tưởng rằng những sản phẩm tạo ra từ quá trình canh tác và sản xuất
            theo phương thức hữu cơ và tự nhiên tốt cho cơ thể mọi người, tốt
            hơn cho cộng đồng và tốt hơn cho hành tinh mà chúng ta đang sống.
          </p>
          <p className="mb-8 text-justify font-bold text-black text-base">
            SỨ MỆNH VÀ TẦM NHÌN
          </p>
          <p className="text-justify text-black text-base">
            Sứ mệnh của SanjiFood đó là mang sự đảm bảo an toàn tuyệt đối về sức
            khỏe cho Người tiêu dùng. Không chỉ cung cấp các sản phẩm chuẩn
            hướng hữu cơ, chúng tôi còn đem đến những thông tin hữu ích về sức
            khỏe mà thực phẩm hữu cơ đem lại cho con người và cộng đồng. Mỗi
            người có nhu cầu và cách tiếp cận với thực phẩm hữu cơ, thực phẩm tự
            nhiên theo một cách khác nhau, vì vậy, chúng tôi có mặt ở đây để hỗ
            trợ bạn bằng cách:
          </p>
          <p className="text-justify text-black text-base">
            – Chỉ cung cấp những loại thực phẩm chuẩn hướng hữu cơ, thực phẩm tự
            nhiên đạt những chứng nhận uy tín nói chung và được kiểm chứng bởi
            SanjiFood nói riêng.
          </p>
          <p className="text-justify text-black text-base">
            – Khởi tạo những mối quan hệ tích cực, lâu dài và tin tưởng giữa
            SanjiFood với khách hàng, nhân viên, nhà cung cấp và cộng đồng.
          </p>
          <p className="mb-8 text-justify text-black text-base">
            – Hỗ trợ phát triển các trang trại, cộng đồng nhỏ vùng sâu vùng xa,
            vùng dân tộc ít người và các đối tượng dễ bị tổn thương trong xã hội
            canh tác theo phương thức chuẩn hướng hữu cơ, phương thức tự nhiên
            để có cuộc sống tốt đẹp hơn.
          </p>
          <p className="mb-8 text-justify text-black text-base">
            Tại SanjiFood, chúng tôi đang đem đến cho khách hàng một cuộc sống
            khỏe mạnh, an toàn thông qua việc cung cấp những sản phẩm chuẩn
            hướng hữu cơ chất lượng cao với giá cả phải chăng.
          </p>
          <p className="mb-8 text-justify text-black text-base">
            Với SLOGAN: "Giá trị vàng cho sức khỏe" SanjiFood được xây dựng với
            ước mơ đem đến thực phẩm sạch, ngon và chuẩn hướng hữu cơ, không hoá
            chất cho mỗi gia đình Việt Nam. Trước thực trạng thực phẩm bẩn lan
            tràn, SanjiFood muốn truyền đến cho mọi người thói quen sử dụng các
            thực phẩm sạch và chuẩn hướng hữu cơ trong mỗi bữa ăn hàng ngày. Đó
            chính là sự đầu tư và đảm bảo an toàn tốt nhất về sức khỏe với mỗi
            cá nhân và những người thân yêu. Một lần nữa, SanjiFood.vn được sáng
            lập bởi các nhà sáng lập muốn tạo dựng một cộng đồng thực phẩm sạch,
            dựa trên nền tảng hữu cơ (organic) và thuần từ thiên nhiên, nhằm
            mang lại sức khoẻ tốt nhất cho cộng đồng.
          </p>
          <Link to="/Contact">
            <button
              type="submit"
              className="py-3 px-5 ml-64 text-base font-bold text-center rounded-lg bg-green-600 hover:bg-blue-600 hover:text-black"
            >
              Liên hệ chúng tôi
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default About;
