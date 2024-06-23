CREATE TABLE `lager` (
  `ProductID` int(11) NOT NULL,
  `Amount` int(11) NOT NULL,
  `LastPurchase` text NOT NULL,
  `ExpiryDate` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `produkte` (
  `ProductID` int(11) NOT NULL,
  `ProductName` varchar(255) NOT NULL,
  `Category` varchar(100) NOT NULL,
  `Brand` varchar(100) NOT NULL,
  `Description` text NOT NULL,
  `UnitSize` varchar(20) NOT NULL,
  `SupplierID` int(11) NOT NULL,
  `SupplierName` varchar(255) NOT NULL,
  `ContactInformation` text NOT NULL,
  `Barcode` bigint(20) NOT NULL,
  `Location` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;