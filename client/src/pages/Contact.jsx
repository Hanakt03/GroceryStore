import React from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
const Contact = () => {
  return (
    <>
      <div className="container mx-auto bg-gray-100 px-5 py-3 rounded-md">
        <ol className="list-reset flex">
          <li>
            <Link to="/Home" className="text-blue-600 hover:text-blue-700">
              Trang chủ
            </Link>
          </li>
          <li>
            <span className="text-gray-500 mx-2">/</span>
          </li>
          <li className="text-gray-500">Liên hệ</li>
        </ol>
      </div>
      <div className="container mx-auto py-12 grid grid-cols-2 gap-16 px-4">
        <div>
          <iframe title="Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.688829930281!2d106.67763864992875!3d10.75844759205651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b7c3ed289%3A0xa06651894598e488!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTw6BpIEfDsm4!5e0!3m2!1svi!2s!4v1667753510053!5m2!1svi!2s"
              width="600"
              height="450"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
          />
          <h2 className="text-xl font-bold mb-6 mt-12">VỊ TRÍ & CHI TIẾT</h2>
          <div className="flex items-center mb-6">
            <FontAwesomeIcon
              icon={faLocationDot}
              size="xl"
              color="blue"
              className="mr-4"
            />
            <p>273 An Dương Vương - Phường 3 - Quận 5 - TP Hồ Chí Minh</p>
          </div>
          <div className="flex items-center mb-6">
            <FontAwesomeIcon
              icon={faEnvelope}
              size="xl"
              color="red"
              className="mr-4"
            />
            <p>Sanjifood@gmail.com</p>
          </div>
          <div className="flex items-center mb-6">
            <FontAwesomeIcon icon={faPhone} size="xl" className="mr-4" />
            <p> 0123 456 789</p>
          </div>
        </div>
        
          <section className="bg-white dark:bg-gray-900 py-6">
            <div className="py-6 px-4 mx-auto max-w-screen-md">
              <h2 className="mb-4 text-xl tracking-tight font-bold text-center text-white">Gửi thông tin liên lạc cho chúng tôi</h2>
              <p className="mb-8 font-light text-justify text-white text-base">Quý khách có thể gửi liên hệ tới chúng tôi bằng cách hoàn tất biểu mẫu dưới đây. Chúng tôi sẽ trả lời thư của quý khách, xin vui lòng khai báo đầy đủ. Hân hạnh phục vụ và chân thành cảm ơn sự quan tâm, đóng góp ý kiến đến SanjiFood.</p>
              <form className="space-y-8">
                <div>
                  <label for="email" className="block mb-2 text-sm font-medium text-white">Địa chỉ Email</label>
                  <input type="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="example@gmail.com" required />
                </div>
                <div>
                  <label for="subject" className="block mb-2 text-sm font-medium text-white">Chủ đề</label>
                  <input type="text" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required  />
                </div>
                <div className="sm:col-span-2">
                  <label for="message" className="block mb-2 text-sm font-medium text-white">Thông điệp</label>
                  <textarea rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Để lại bình luận ..."></textarea>
                </div>
                <button type="submit" className="py-3 px-5 ml-48 text-base font-bold text-center rounded-lg bg-white hover:bg-green-600 hover:text-white">Gửi thông tin liên hệ</button>
              </form>
            </div>
          </section>  
      </div>
    </>
  );
};

export default Contact;
