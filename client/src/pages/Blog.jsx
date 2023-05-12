import React from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Blog = () => {
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
          <li className="text-gray-500">Tin tức</li>
        </ol>
      </div>

      
      <div id="blog" className="bg-gray-100 dark:bg-gray-900 px-4 xl:px-4 py-12 mx-auto container">
        <div className="mx-auto container">
          <span role="contentinfo">
          <h1 tabindex="0" className="focus:outline-none text-center text-xl tracking-wider text-white font-bold">Thông tin mới nhất từ Blog của chúng tôi</h1>
            </span>
              <div className="focus:outline-none mt-12">
                <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                  <div className="focus:outline-none">
                    <img className="focus:outline-none w-full" src="https://cdn.tgdd.vn/2020/08/CookProduct/58-1200x676-1.jpg" alt="" />   
                    <div className="bg-white dark:bg-gray-800 px-10 py-6 rounded-bl-3xl rounded-br-3xl">
                      <h1 className="focus:outline-none text-3xl text-white font-semibold tracking-wider">Thực phẩm hữu cơ là gì? Lợi ích và cách nhận biết thực phẩm hữu cơ</h1>
                      <div className="w-full flex justify-end">    
                          <button className="focus:outline-none text-green-600 mt-4 justify-end flex items-center cursor-pointer">
                          {/* https://www.dienmayxanh.com/vao-bep/thuc-pham-huu-co-la-gi-loi-ich-va-cach-nhan-biet-thuc-pham-03695 */}
                          <span className=" text-base tracking-wide text-green-600">Read more</span>
                          <FontAwesomeIcon icon={faArrowRight} size="sm" color="white" className="ml-2"
                          />
                        </button>
                      </div>
                      <div className="h-5 w-2"></div>
                    </div>
                  </div>
                  <div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                      <div className="focus:outline-none" >
                        <img className="focus:outline-none w-full" src="https://cafebiz.cafebizcdn.vn/zoom/260_162/2016/nong-nghiep-hu-co-viet-nam-4-1463054967645.jpg" alt="" />  
                        <div className="bg-white dark:bg-gray-800 px-3 lg:px-6 py-4 rounded-bl-3xl rounded-br-3xl">
                          <h1 tabindex="0" className="focus:outline-none text-base text-gray-900 dark:text-white font-semibold tracking-wider">Việt Nam có rau hữu cơ sạch, thịt sạch, nhưng đa phần đều mang đi xuất khẩu</h1>
                          <div className="w-full flex justify-end">    
                          <button className="focus:outline-none text-green-600 mt-4 justify-end flex items-center cursor-pointer">
                            {/* https://cafebiz.vn/viet-nam-co-rau-huu-co-sach-thit-sach-nhung-da-phan-deu-mang-di-xuat-khau-20160512194320187.chn */}
                            <span className=" text-base tracking-wide text-green-600">Read more</span>
                            <FontAwesomeIcon icon={faArrowRight} size="sm" color="white" className="ml-2"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="focus:outline-none" aria-label="card 3">
                      <img className="focus:outline-none focus:outline-none w-full" src="https://bacsi.ai/uploads/news/05_2019/thumbs/1080_crop__nhung-hieu-lam-dang-so-ve-dinh-duong-cua-rau-xanh.jpg" alt="" />                                
                      <div className="bg-white dark:bg-gray-800 px-3 lg:px-6 py-4 rounded-bl-3xl rounded-br-3xl">
                        <h1 className="focus:outline-none text-lg text-gray-900 dark:text-white font-semibold tracking-wider">Những hiểu lầm đáng sợ về dinh dưỡng của rau xanh</h1>
                        <div className="w-full flex justify-end">    
                          <button className="focus:outline-none text-green-600 mt-4 justify-end flex items-center cursor-pointer">
                            {/* https://bacsi.ai/nhung-hieu-lam-dang-so-ve-dinh-duong-cua-rau-xanh.html */}
                            <span className=" text-base tracking-wide text-green-600">Read more</span>
                            <FontAwesomeIcon icon={faArrowRight} size="sm" color="white" className="ml-2"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
    
                  <div className="mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                    <div tabindex="0" className="focus:outline-none " aria-label="card 4">
                      <img tabindex="0" className="focus:outline-none w-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN2di616M5f8kDpM3aOaiVPf_kTmKXSAoZxnqkquKK4sbHUrfgkugHQoVrRDXSnX05WrM&usqp=CAU" alt=""/> 
                      <div className="bg-white dark:bg-gray-800 px-3 lg:px-6 py-4 rounded-bl-3xl rounded-br-3xl">
                        <h1 tabindex="0" className="focus:outline-none text-lg text-gray-900 dark:text-white font-semibold tracking-wider">Bật mí, cách bảo quản rau củ quả tươi lâu giữ vitamin tốt nhất an toàn</h1>
                      <div className="w-full flex justify-end">    
                        <button className="focus:outline-none text-green-600 mt-4 justify-end flex items-center cursor-pointer">
                          {/* https://www.google.com/imgres?imgurl=https%3A%2F%2Fcachlamhay.vn%2Fupload%2Fimages%2Farticle%2F2021%2F11%2F6%2Fimg-bgt-2021-photo1617791603648-16177916038611142149268-1635608123-width650height405.jpeg&imgrefurl=https%3A%2F%2Fcachlamhay.vn%2Fbat-mi-cach-bao-quan-rau-cu-qua-tuoi-lau-giu-vitamin-tot-nhat.html&tbnid=t_Cy4aUhyC9pHM&vet=10CAUQxiAoBGoXChMI4JvorrKc-wIVAAAAAB0AAAAAEAw..i&docid=o1JV7T5Wy08CpM&w=650&h=405&itg=1&q=tin%20t%E1%BB%A9c%20v%E1%BB%81%20rau%20c%E1%BB%A7%20qu%E1%BA%A3%20an%20to%C3%A0n&ved=0CAUQxiAoBGoXChMI4JvorrKc-wIVAAAAAB0AAAAAEAw */}
                          <span className=" text-base tracking-wide text-green-600">Read more</span>
                          <FontAwesomeIcon icon={faArrowRight} size="sm" color="white" className="ml-2"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="focus:outline-none" aria-label="card 5">
                    <img className="focus:outline-none w-full" src="http://thanhphoxanh.vn/uploads/thanhphoxanh/news/2019/10/30/e1e6409e23dc9a6b5e66169d988b38f1.jpeg" alt="" /> 
                      <div className="bg-white dark:bg-gray-800 px-3 lg:px-6 py-4 rounded-bl-3xl rounded-br-3xl">
                        <h1 className="focus:outline-none  text-lg text-gray-900 dark:text-white font-semibold tracking-wider">Trăm ngàn lợi ích của việc ăn rau xanh, không phải ai cũng biết</h1>
                      <div className="w-full flex justify-end">    
                        <button className="focus:outline-none text-green-600 mt-4 justify-end flex items-center cursor-pointer">
                          {/* http://thanhphoxanh.vn/tram-ngan-loi-ich-cua-viec-an-rau-xanh-khong-phai-ai-cung-biet-n584.html */}
                          <span className=" text-base tracking-wide text-green-600">Read more</span>
                          <FontAwesomeIcon icon={faArrowRight} size="sm" color="white" className="ml-2"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </>
  );
};

export default Blog;
