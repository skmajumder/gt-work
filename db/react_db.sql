-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 02, 2024 at 07:19 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `form_data`
--

CREATE TABLE `form_data` (
  `id` int(11) NOT NULL,
  `uploadDate` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `permitNo` varchar(255) DEFAULT NULL,
  `loto` varchar(3) DEFAULT NULL,
  `nameDesignation` varchar(255) DEFAULT NULL,
  `signature_filename` varchar(255) DEFAULT NULL,
  `permit_date` date DEFAULT NULL,
  `permit_time` time DEFAULT NULL,
  `workDescription` text DEFAULT NULL,
  `safetyRequester` varchar(3) DEFAULT NULL,
  `hazards` text DEFAULT NULL,
  `ppe` text DEFAULT NULL,
  `permitIssuing` varchar(255) DEFAULT NULL,
  `permitIssuingSignature_filename` varchar(255) DEFAULT NULL,
  `permitValidity` int(11) DEFAULT NULL,
  `permitIssuingDate` date DEFAULT NULL,
  `permitAccepting` varchar(255) DEFAULT NULL,
  `permitAcceptingSignature_filename` varchar(255) DEFAULT NULL,
  `permitTimeStart` time DEFAULT NULL,
  `permitTimeEnd` time DEFAULT NULL,
  `extendedPermitValidity` int(11) DEFAULT NULL,
  `extendedPermitDate` date DEFAULT NULL,
  `extendedPermitTimeStart` time DEFAULT NULL,
  `extendedPermitTimeEnd` time DEFAULT NULL,
  `extendedPermitIssuing` varchar(255) DEFAULT NULL,
  `extendedPermitIssuingSignature_filename` varchar(255) DEFAULT NULL,
  `extendedPermitAccepting` varchar(255) DEFAULT NULL,
  `extendedPermitSignature_filename` varchar(255) DEFAULT NULL,
  `permitCloserName` varchar(255) DEFAULT NULL,
  `permitCloserSignature_filename` varchar(255) DEFAULT NULL,
  `permitClosingAccepting` varchar(255) DEFAULT NULL,
  `permitClosingAcceptingSignature_filename` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `form_data`
--

INSERT INTO `form_data` (`id`, `uploadDate`, `location`, `permitNo`, `loto`, `nameDesignation`, `signature_filename`, `permit_date`, `permit_time`, `workDescription`, `safetyRequester`, `hazards`, `ppe`, `permitIssuing`, `permitIssuingSignature_filename`, `permitValidity`, `permitIssuingDate`, `permitAccepting`, `permitAcceptingSignature_filename`, `permitTimeStart`, `permitTimeEnd`, `extendedPermitValidity`, `extendedPermitDate`, `extendedPermitTimeStart`, `extendedPermitTimeEnd`, `extendedPermitIssuing`, `extendedPermitIssuingSignature_filename`, `extendedPermitAccepting`, `extendedPermitSignature_filename`, `permitCloserName`, `permitCloserSignature_filename`, `permitClosingAccepting`, `permitClosingAcceptingSignature_filename`) VALUES
(1, '0000-00-00', 'Chattogram', '112', 'Yes', 'John Deo', 'signature.jpg', '2024-02-01', '22:00:00', 'Joint site visit by safety and requester', 'Yes', 'Overhead Work (Dropped Objects), Wind, Weather, Sea, Fire safety', 'Fire Hamlet', 'John Donald', 'signature.jpg', 2, '2024-02-01', 'John Neo', 'signature.jpg', '13:01:00', '15:01:00', 0, '0000-00-00', '00:00:00', '00:00:00', '', NULL, '', NULL, 'John Donald', 'signature.jpg', 'John Neo', 'signature.jpg'),
(2, '2024-02-01', 'Chattogram', '777', 'Yes', 'Neraj', 'signature.jpg', '2024-02-02', '11:41:00', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Yes', 'Overhead Work (Dropped Objects), Moving parts, Fire hazard, Grit blasting, Pressure Washing Activities, Fire safety', 'Boiler suit, Chemical Suit, Ear Plug, Fire Hamlet', 'Mishuk Ahmed', 'signature.jpg', 2, '2024-02-04', 'Megh Chowdhury', 'signature.jpg', '11:00:00', '15:00:00', 0, '0000-00-00', '00:00:00', '00:00:00', '', NULL, '', NULL, 'Mishuk Ahmed', 'signature.jpg', 'Megh Chowdhury', 'signature.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`) VALUES
(1, 'SK Majumder', 'skm', 'skm@gmail.com'),
(2, 'Amy Adams', 'ame00', 'ame99@gmail.com'),
(3, 'Elizabeth Olsen', 'olsen22', 'olsennyc@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `form_data`
--
ALTER TABLE `form_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`) USING HASH;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `form_data`
--
ALTER TABLE `form_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
