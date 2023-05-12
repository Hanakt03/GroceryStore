-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 22, 2022 lúc 07:26 AM
-- Phiên bản máy phục vụ: 10.4.25-MariaDB
-- Phiên bản PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `grocerystore`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `ID` int(11) NOT NULL,
  `Username` varchar(25) NOT NULL,
  `Password` varchar(300) NOT NULL,
  `Status` int(11) NOT NULL,
  `ID_Role` int(11) NOT NULL,
  `Email` varchar(200) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Phone` varchar(12) DEFAULT NULL,
  `Address` varchar(400) DEFAULT NULL,
  `Email_verified_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`ID`, `Username`, `Password`, `Status`, `ID_Role`, `Email`, `Name`, `Phone`, `Address`, `Email_verified_at`) VALUES
(1, 'admin', '$2a$10$9lHGVBhjbehd7l2kP18RaejUP2IJVFRA1hpmMlPqgW3OD2gHh6zCW', 1, 2, '', '', NULL, NULL, '2022-11-22 06:25:08'),
(125, 'du888', '$2b$10$NQ2rolZ.rjiOE1InIRVhauojtSPXnXyMcjM8Agb6FDvWE0JNsGSii', 1, 1, 'lamthienbao0106@gmail.com', 'Phạm Du', '1', '1', '0000-00-00 00:00:00'),
(127, 'bao123', '$2b$10$pRQBbZWed4Zumy1BsJ85a.RcnCoJm8ChC.7RsYCll2IhhVKxPu5Ze', 1, 1, 'dpines25@yahoo.com.vn', 'thien bao', '0388888888', '177 Nguyễn Tri Phương', '2022-11-17 12:28:45'),
(128, 'bao123456', '$2b$10$R4BZ2.IQF9xXy7VTCRnG3Ov0TRNJYRnQfnpcgyv5OvTXo8bvdXK4O', 1, 1, 'thienbao010601@gmail.com', 'Lâm Bảo', '0388888888', '177 Nguyễn Tri Phương', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`ID`, `Name`, `Status`) VALUES
(50, 'Rau', 1),
(51, 'Đồ uống', 1),
(52, 'Trái cây', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `import`
--

CREATE TABLE `import` (
  `ID` int(11) NOT NULL,
  `ID_Staff` int(11) NOT NULL,
  `Date` date NOT NULL,
  `TotalPrice` double NOT NULL,
  `TotalQuantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `importdetail`
--

CREATE TABLE `importdetail` (
  `ID` int(11) NOT NULL,
  `ID_Import` int(11) NOT NULL,
  `ID_Product` int(11) NOT NULL,
  `Quantity` int(15) NOT NULL,
  `Price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order`
--

CREATE TABLE `order` (
  `ID` int(11) NOT NULL,
  `ID_Customer` int(11) NOT NULL,
  `TotalQuantity` int(11) NOT NULL,
  `TotalPrice` double NOT NULL,
  `Location` varchar(500) DEFAULT NULL,
  `Note` varchar(1000) DEFAULT NULL,
  `DateOrder` timestamp NULL DEFAULT NULL,
  `Status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `order`
--

INSERT INTO `order` (`ID`, `ID_Customer`, `TotalQuantity`, `TotalPrice`, `Location`, `Note`, `DateOrder`, `Status`) VALUES
(146, 125, 1, 200000, '1', '', '2022-11-16 13:57:57', 1),
(147, 125, 3, 600000, '1', '', '2022-11-16 14:01:47', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orderdetail`
--

CREATE TABLE `orderdetail` (
  `ID_order` int(11) NOT NULL,
  `ID_product` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `orderdetail`
--

INSERT INTO `orderdetail` (`ID_order`, `ID_product`, `Quantity`, `Price`) VALUES
(146, 95, 1, 200000),
(147, 92, 3, 600000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `producer`
--

CREATE TABLE `producer` (
  `ID` int(10) NOT NULL,
  `Name` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Phone` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Image` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `producer`
--

INSERT INTO `producer` (`ID`, `Name`, `Address`, `Phone`, `Image`) VALUES
(1, 'Đông Á Food', '177 Nguyễn Tri Phương', '09333333', 'test.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Price` int(11) NOT NULL,
  `ID_Producer` int(11) NOT NULL,
  `Image` varchar(100) NOT NULL,
  `ID_Category` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`ID`, `Name`, `Price`, `ID_Producer`, `Image`, `ID_Category`, `Quantity`, `Description`) VALUES
(1, 'Rau má', 52000, 1, 'rauma.jpg', 50, 19, NULL),
(2, 'Chanh không hạt', 36000, 1, 'chanhkhonghat.jpg', 52, 10, NULL),
(42, 'Cải thìa', 38000, 1, 'caithia.jpg', 50, 15, NULL),
(43, 'Nước Lựu Hữu Cơ Georgia\'s Natural', 89000, 1, 'nuocluu.jpg', 51, 11, NULL),
(44, 'Cần tây', 84000, 1, 'cantay.jpg', 50, 10, NULL),
(45, 'Chanh vàng', 39000, 1, 'chanhvang.jpg', 52, 10, NULL),
(46, 'Cải bẹ xanh', 38000, 1, 'caibexanh.jpg', 50, 10, NULL),
(47, 'Nước Ép Dâu Tằm Hữu Cơ Georgia\'s Natural ', 95000, 1, 'nuocepdau.jpg', 51, 10, NULL),
(48, 'Xà lách', 45000, 1, 'xalach.jpg', 50, 10, NULL),
(49, 'Bắp cải trắng', 77000, 1, 'bapcaitrang.jpg', 50, 15, NULL),
(50, 'Hành lá', 21000, 1, 'hanhla.jpg', 50, 15, NULL),
(51, 'Nước Ép Cherry Hữu Cơ Georgia\'s Natural', 95000, 1, 'nuocepcherry.jpg', 51, 15, NULL),
(52, 'Ngò rí', 29000, 1, 'ngori.jpg', 50, 15, NULL),
(53, 'Cải thảo', 33000, 1, 'caithao.jpg', 50, 15, NULL),
(54, 'Nước Mận Hữu Cơ Taylor', 259000, 1, 'nuocman.jpg', 51, 15, NULL),
(55, 'Bầu xanh', 60000, 1, 'bauxanh.jpg', 52, 15, NULL),
(56, 'Bông cải xanh', 57000, 1, 'bongcaixanh.jpg', 50, 15, NULL),
(57, 'Cà chua bee ngọt', 40000, 1, 'cachua.jpg', 52, 15, NULL),
(58, 'Nước năng lượng tự nhiên', 24000, 1, 'nuocnangluongtunhien.jpg', 51, 15, NULL),
(59, 'Cà rốt', 43000, 1, 'carot.jpg', 52, 15, NULL),
(60, 'Bắp ngọt', 58000, 1, 'bapngot.jpg', 52, 15, NULL),
(61, 'Bí đao', 57000, 1, 'bidao.jpg', 52, 15, NULL),
(62, 'Trà KomBuCha Hữu Cơ The Gutsy Captain Vị Dưa Hấu B', 95000, 1, 'tra.jpg', 51, 15, NULL),
(63, 'Nước ép nho', 139000, 1, 'nuocepnho.jpg', 51, 14, NULL),
(64, 'Bí đỏ hạt đậu', 96000, 1, 'bidohatdau.jpg', 52, 15, NULL),
(65, 'Mướp hương', 60000, 1, 'muophuong.jpg', 52, 15, NULL),
(66, 'Rau thì là', 27000, 1, 'rauthila.jpg', 50, 15, NULL),
(67, 'Việt Quất Mỹ', 119000, 1, 'vietquatmy.jpg', 52, 15, NULL),
(68, 'Trà KomBuCha', 95000, 1, 'trakombucha.jpg', 51, 13, NULL),
(69, 'Mồng tơi', 37000, 1, 'mongtoi.jpg', 50, 15, NULL),
(70, 'Nước tinh chất phúc bồn tử', 590000, 1, 'nuoctinhchatphucbontu.jpg', 51, 15, NULL),
(71, 'Lê Má Hồng Nam Phi', 145000, 1, 'lemahongnamphi.jpg', 52, 15, NULL),
(72, 'Rau kinh giới', 13000, 1, 'raukinhgioi.jpg', 50, 15, NULL),
(73, 'Cà phê hòa tan NaturGreen', 209000, 1, 'caphehoatan.jpg', 51, 15, NULL),
(74, 'Rau rền', 38000, 1, 'rauren.jpg', 50, 15, NULL),
(75, 'Kiwi', 228000, 1, 'kiwi.jpg', 52, 15, NULL),
(76, 'Cà phê rang nguyên hạt', 185000, 1, 'capherang.jpg', 51, 15, NULL),
(77, 'Việt Quất Jumbo', 159000, 1, 'vietquatjumbo.jpg', 52, 15, NULL),
(78, 'Đu đủ', 75000, 1, 'dudu.jpg', 52, 15, NULL),
(79, 'Cải ngồng', 38000, 1, 'caingong.jpg', 50, 15, NULL),
(80, 'Trà cúc nguyên bông', 178000, 1, 'tracucnguyenbong.jpg', 51, 15, NULL),
(81, 'Khổ qua', 34000, 1, 'khoqua.jpg', 52, 15, NULL),
(82, 'Trà xanh gừng', 200000, 1, 'traxanhgung.jpg', 51, 15, NULL),
(83, 'Lá bạc hà', 30000, 1, 'labacha.jpg', 50, 15, NULL),
(84, 'Tần Ô', 37000, 1, 'tano.jpg', 50, 15, NULL),
(85, 'Rau tía tô', 15000, 1, 'rautiato.jpg', 50, 15, NULL),
(86, 'Cải Kale', 62000, 1, 'caikale.jpg', 50, 12, NULL),
(87, 'Nho xanh Ninh Thuận', 165000, 1, 'nhoxanh.jpg', 52, 15, NULL),
(88, 'Nước ép táo', 139000, 1, 'nuoceptao.jpg', 51, 9, NULL),
(89, 'Bơ sáp', 119000, 1, 'bosap.jpg', 52, 11, NULL),
(90, 'Xoài Cát ', 145000, 1, 'xoaicat.jpg', 52, 15, NULL),
(91, 'Hồng trà', 53000, 1, 'hongtra.jpg', 51, 15, NULL),
(92, 'Dưa hấu không hạt', 144000, 1, 'duahaukhonghat.jpg', 52, 8, NULL),
(93, 'Bưởi da xanh', 110000, 1, 'buoidaxanh.jpg', 52, 1, NULL),
(94, 'Trà nụ hoa hồng Sonnentor ', 215000, 1, 'tranuhoahong.jpg', 51, 0, NULL),
(95, 'Dưa lưới', 110000, 1, 'dualuoi.jpg', 52, 0, NULL),
(96, 'Húng lủi', 15000, 1, 'hunglui.jpg', 50, 0, NULL),
(97, 'Nước mía tươi sấy', 149000, 1, 'nuocmia.jpg', 51, 1, NULL),
(98, 'Trà dưỡng sinh Kombucha', 95000, 1, 'traduongsinh.jpg', 51, 0, NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `import`
--
ALTER TABLE `import`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Staff` (`ID_Staff`);

--
-- Chỉ mục cho bảng `importdetail`
--
ALTER TABLE `importdetail`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Import` (`ID_Import`),
  ADD KEY `ID_Product` (`ID_Product`);

--
-- Chỉ mục cho bảng `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Customer` (`ID_Customer`);

--
-- Chỉ mục cho bảng `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD KEY `ID_order` (`ID_order`),
  ADD KEY `ID_product` (`ID_product`);

--
-- Chỉ mục cho bảng `producer`
--
ALTER TABLE `producer`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Category` (`ID_Category`),
  ADD KEY `ID_Producer` (`ID_Producer`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT cho bảng `import`
--
ALTER TABLE `import`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `importdetail`
--
ALTER TABLE `importdetail`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `order`
--
ALTER TABLE `order`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

--
-- AUTO_INCREMENT cho bảng `producer`
--
ALTER TABLE `producer`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `import`
--
ALTER TABLE `import`
  ADD CONSTRAINT `import_ibfk_1` FOREIGN KEY (`ID_Staff`) REFERENCES `account` (`ID`);

--
-- Các ràng buộc cho bảng `importdetail`
--
ALTER TABLE `importdetail`
  ADD CONSTRAINT `importdetail_ibfk_1` FOREIGN KEY (`ID_Import`) REFERENCES `import` (`ID`),
  ADD CONSTRAINT `importdetail_ibfk_2` FOREIGN KEY (`ID_Product`) REFERENCES `import` (`ID`);

--
-- Các ràng buộc cho bảng `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`ID_Customer`) REFERENCES `account` (`ID`);

--
-- Các ràng buộc cho bảng `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD CONSTRAINT `orderdetail_ibfk_1` FOREIGN KEY (`ID_order`) REFERENCES `order` (`ID`),
  ADD CONSTRAINT `orderdetail_ibfk_2` FOREIGN KEY (`ID_product`) REFERENCES `product` (`ID`);

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`ID_Category`) REFERENCES `category` (`ID`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`ID_Producer`) REFERENCES `producer` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
