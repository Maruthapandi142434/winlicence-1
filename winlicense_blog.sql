-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 08, 2025 at 07:10 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `winlicense_blog`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `role` enum('admin','editor','author') NOT NULL DEFAULT 'author'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `email`, `password`, `created_at`, `role`) VALUES
(1, 'admin', 'wm@sixthstar.in', '$2y$10$LupsW.OCAojxR2aaFXNISOft1fl47WcKahyJ3Y0vxgp3Qlo1gGM2G', '2025-02-07 05:38:58.000', 'admin'),
(2, 'editor', 'editor@example.com', '$2a$10$xP1XEoQwRqG3h5z5T5QY5O5K5K5K5K5K5K5K5K5K5K5K5K5K5', '2025-02-07 05:38:58.000', 'editor'),
(3, 'author', 'author@example.com', '$2a$10$xP1XEoQwRqG3h5z5T5QY5O5K5K5K5K5K5K5K5K5K5K5K5K5K5', '2025-02-07 05:38:58.000', 'author');

-- --------------------------------------------------------

--
-- Table structure for table `blog_categories`
--

CREATE TABLE `blog_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_categories`
--

INSERT INTO `blog_categories` (`id`, `name`, `slug`, `created_at`) VALUES
(1, 'Windows', 'windows', '2025-02-07 05:38:58'),
(2, 'Servers', 'server', '2025-02-07 05:38:58'),
(3, 'Hosting', 'hosting', '2025-02-07 05:38:58'),
(4, 'Email', 'email', '2025-02-07 05:38:58'),
(5, 'Spam filter', 'Spam-filter', '2025-02-07 05:38:58'),
(6, 'new', 'new', '2025-07-07 23:22:48');

-- --------------------------------------------------------

--
-- Table structure for table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `featured_image` varchar(255) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `published` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `scheduled_for` datetime DEFAULT NULL,
  `status` enum('draft','published','scheduled') DEFAULT 'draft',
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_posts`
--

INSERT INTO `blog_posts` (`id`, `title`, `slug`, `excerpt`, `content`, `category`, `featured_image`, `author`, `published`, `created_at`, `updated_at`, `scheduled_for`, `status`, `category_id`) VALUES
(1, 'Understanding Windows Licenses: What You Need to Know', 'understanding-windows-licenses:-what-you-need-to-know', 'In the ever-evolving world of technology, Windows remains one of the most widely used operating systems globally', '<p><strong>Introduction In the ever-evolving world of technology</strong></p><p><br></p><p>Windows remains one of the most widely used operating systems globally.</p><p>However, understanding the different types of Windows licenses and their implications can be a bit challenging.</p><p>In this post, we\'ll break down the essentials of <a href=\"https://google.com\" rel=\"noopener noreferrer\" target=\"_blank\">Windows licenses</a> to help you make informed decisions.</p><p><br></p><p><strong>Types of Windows Licenses Retail License: </strong></p><p>Retail licenses are the most flexible type of Windows license</p><p>They can be purchased directly from Microsoft or authorized retailers. These licenses are transferable, meaning you can move them from one computer to another, provided you deactivate the license on the old device. OEM License: Original Equipment Manufacturer (OEM) licenses are typically pre-installed on new computers by the manufacturer.</p><p><br></p><p>These licenses are tied to the hardware they are first activated on and cannot be transferred to another device. OEM licenses are often more affordable but come with the limitation of being non-transferable. Volume License: Volume licenses are designed for businesses, educational institutions, and other organizations that need multiple licenses. These licenses offer the flexibility to deploy Windows on multiple devices and often come with added benefits such as bulk pricing and extended support options. Microsoft 365 Subscription: Microsoft 365 (formerly Office 365) subscriptions often include Windows licenses as part of the package. This model provides the latest Windows updates and additional services such as Office applications and OneDrive storage. The subscription model ensures you always have access to the most recent features and security updates.</p><p><br></p><p>How to Choose the Right License Choosing the right Windows license depends on your specific needs and circumstances. Here are a few factors to consider:</p><p><strong>Purpose:</strong> Are you a home user, a business, or an educational institution? Your usage scenario will dictate the type of license you need.</p><p><br></p><p><strong>Budget:</strong> Retail licenses offer flexibility but at a higher cost. OEM licenses are cheaper but non-transferable. Volume licenses provide bulk pricing for organizations.</p><p><br></p><p><strong>Transferability:</strong> If you plan to upgrade or change your hardware frequently, a retail license might be the best choice due to its transferability.</p><p><br></p><p><strong>Updates and Support:</strong> Microsoft 365 subscriptions ensure you have the latest updates and features, along with additional services. Conclusion Understanding the different types of Windows licenses and their features can help you make informed decisions that align with your needs. Whether you\'re an individual looking for flexibility, a business needing multiple licenses, or an organization seeking cost-effective solutions, there\'s a Windows license designed for you. Stay informed, choose wisely, and make the most out of your <strong>Windows</strong> experience.</p>', 'Windows', 'https://res.cloudinary.com/daggx9p24/image/upload/v1751625032/understanding-windows-licenses_ywlfze.jpg', 'admin', 1, '2025-02-07 05:38:58', '2025-07-07 23:22:32', NULL, 'published', 2),
(2, 'How to Upgrade Your Windows License: A Step-by-Step Guide', 'how-to-upgrade-your-windows-license', 'Upgrading your Windows license can unlock new features, provide better security, and improve your overall computing experience', '<h2>Introduction:</h2><p>Upgrading your Windows license can unlock new features, provide better security, and improve your overall computing experience.</p><p>Whether you\'re looking to switch from Windows Home to Pro, or upgrade to the latest version, this guide will walk you through the process.</p><p><br></p><h2>Steps to Upgrade Your Windows License Check Current License:</h2><p>Before upgrading, determine which Windows version you are currently using.</p><p>Go to Settings &gt; System &gt; About to find your version information.</p><p><br></p><h2>Purchase a New License:</h2><p>Visit the Microsoft Store or an authorized retailer to purchase the new Windows license you need. You will receive a product key that will be used during the upgrade process.</p><p><br></p><h2>Backup Your Data:</h2><p>It\'s always a good idea to backup your important files before making significant changes to your system. Use an external hard drive or cloud storage service.</p><p><br></p><h2>Enter the New Product Key:</h2><p>Navigate to Settings &gt; Update &amp; Security &gt; Activation. Click on Change product key and enter the new product key you received.</p><p><br></p><h2>Follow the Upgrade Prompts:</h2><p>Windows will guide you through the upgrade process. Follow the on-screen instructions to complete the upgrade.</p><p><br></p><h2>Verify the Upgrade:</h2><p>Once the upgrade is complete, go back to Settings &gt; System &gt; About to ensure that the new version is installed and activated.</p><p><br></p><h2>Conclusion</h2><p>Upgrading your Windows license is a straightforward process that can significantly enhance your computing experience. By following these steps, you can unlock new features and ensure your system remains secure and up-to-date.</p>', 'Windows', 'https://res.cloudinary.com/daggx9p24/image/upload/v1751625031/how-to-upgrade-your-windows-license_np5taz.jpg', 'editor', 1, '2025-02-07 05:38:58', '2025-07-04 10:32:14', NULL, 'published', 3),
(3, 'The Benefits of a Windows Pro License for Businesses', 'benefits-of-a-windows-pro-license-for-businesses', 'Windows Pro offers a range of features tailored specifically for professional use.', '<h2>Introduction:</h2><p>For businesses, choosing the right operating system is crucial for productivity and security. </p><p>Windows Pro offers a range of features tailored specifically for professional use. In this post, we\'ll explore the benefits of a Windows Pro license for businesses. </p><p><br></p><h2>Key Features of Windows Pro Advanced Security: </h2><p>Windows Pro includes BitLocker, a powerful encryption tool that helps protect sensitive data from unauthorized access. It also offers Windows Defender Antivirus, providing real-time protection against malware. </p><p><br></p><h2>Remote Desktop: </h2><p>With Windows Pro, you can remotely access your PC from anywhere, making it easier to work from home or while traveling. This feature is particularly beneficial for IT administrators and remote teams. </p><p><br></p><h2>Group Policy Management: </h2><p>Windows Pro allows administrators to manage and configure settings for multiple devices within the organization. This feature simplifies the management of security policies, software installations, and updates. </p><p><br></p><h2>Hyper-V for Virtualization: </h2><p>Hyper-V, a built-in virtualization tool, enables businesses to create and manage virtual machines. This feature is useful for testing software, running legacy applications, and improving resource utilization. </p><p><br></p><h2>Windows Update for Business: </h2><p>Businesses can manage and schedule updates to ensure that critical patches and features are deployed at the most convenient times. This helps minimize downtime and disruptions. </p><p><br></p><h2>Conclusion:</h2><p>Investing in a Windows Pro license can provide businesses with enhanced security, greater flexibility, and improved management capabilities. By leveraging these features, organizations can optimize their IT infrastructure and support a more productive work environment.</p>', 'Windows', 'https://res.cloudinary.com/daggx9p24/image/upload/v1751625032/benefits-of-a-windows-pro-license-for-businesses_lkr5ex.jpg', 'author', 1, '2025-02-07 05:38:58', '2025-07-04 10:32:27', NULL, 'published', 1),
(4, 'Choosing the Right Server for Your Business', 'choosing-the-right-server-for-your-business', 'Selecting the right server is crucial for your business\'s IT infrastructure. With various options available.', '<h2>Introduction: </h2><p>Selecting the right server is crucial for your business\'s IT infrastructure. With various options available, it can be challenging to decide which server best suits your needs. This guide will help you understand the different types of servers and how to choose the right one for your business. </p><p><br></p><h2>Types of Servers Dedicated Servers: </h2><p>Dedicated servers provide exclusive resources to your business. They offer high performance, reliability, and security. Ideal for businesses with high traffic and resource-intensive applications. </p><p><br></p><h2>Virtual Private Servers (VPS): </h2><p>VPS servers offer a balance between cost and performance. They provide dedicated resources within a shared environment, making them suitable for growing businesses that need scalability. </p><p><br></p><h2>Cloud Servers: </h2><p>Cloud servers offer flexibility and scalability. They allow you to pay for what you use and can easily scale up or down based on your business\'s needs. Ideal for businesses with fluctuating workloads. </p><p><br></p><h2>Managed Servers: </h2><p>Managed servers come with management services, including maintenance, monitoring, and support. These servers are perfect for businesses that want to focus on their core activities without worrying about server management. </p><p><br></p><h2>How to Choose the Right Server Assess Your Needs: </h2><p>Identify your business requirements, including performance, storage, and security needs. Consider Scalability: Choose a server that can grow with your business. Cloud servers and VPS offer excellent scalability options. </p><p><br></p><h2>Evaluate Budget: </h2><p>Determine your budget and find a server that fits within your financial constraints without compromising on essential features. </p><p><br></p><h2>Check Support and Management: </h2><p>Ensure that the server provider offers reliable support and management services, especially if you opt for a managed server. </p><p><br></p><h2>Conclusion:</h2><p>Choosing the right server is essential for your business\'s success. By understanding the different types of servers and evaluating your needs, you can make an informed decision that aligns with your business goals.</p>', 'Server', 'https://res.cloudinary.com/daggx9p24/image/upload/v1751625032/choosing-the-right-server-for-your-business_ew82fv.jpg', 'editor', 1, '2025-02-07 05:38:58', '2025-07-04 10:32:42', NULL, 'draft', 2),
(5, 'A Beginner\'s Guide to Web Hosting: What You Need to Know', 'beginner-guide-to-web-hosting', 'Web hosting is a crucial aspect of building and maintaining a website. With various hosting options available.', '<h2>Introduction:</h2><p>Web hosting is a crucial aspect of building and maintaining a website. With various hosting options available, it can be overwhelming for beginners to choose the right one. In this post, we\'ll explore the basics of web hosting and help you make an informed decision. </p><p><br></p><h2>Types of Web Hosting Shared Hosting: </h2><p>Shared hosting is the most affordable option, where multiple websites share the same server resources. It\'s suitable for small websites and blogs with low to moderate traffic. </p><p><br></p><h2>VPS Hosting: </h2><p>Virtual Private Server (VPS) hosting provides dedicated resources within a shared environment. It offers better performance and scalability than shared hosting, making it ideal for growing websites. </p><p><br></p><h2>Dedicated Hosting: </h2><p>Dedicated hosting offers exclusive server resources to a single website. It provides high performance, security, and customization options, suitable for large websites with high traffic. </p><h2><br></h2><h2>Cloud Hosting: </h2><p>Cloud hosting uses a network of servers to distribute resources and ensure high availability. It offers scalability and flexibility, making it ideal for websites with fluctuating traffic. </p><h2><br></h2><h2>Managed Hosting: </h2><p>Managed hosting includes management services such as maintenance, security, and support. It\'s perfect for businesses that want to focus on their core activities without worrying about server management. </p><h2><br></h2><h2>How to Choose the Right Web Hosting Identify Your Needs: </h2><p>Determine your website\'s requirements, including traffic, storage, and security needs. Consider Scalability: Choose a hosting option that can grow with your website. Cloud hosting and VPS offer excellent scalability. Evaluate Budget: Set a budget and find a hosting plan that fits within your financial constraints without compromising on essential features. Check Support and Uptime: Ensure that the hosting provider offers reliable support and guarantees high uptime to keep your website running smoothly. </p><h2><br></h2><h2>Conclusion: </h2><p>Understanding the different types of web hosting and evaluating your needs can help you choose the right hosting plan for your website. By making an informed decision, you can ensure your website\'s success and provide a better experience for your visitors.</p>', 'Hosting', 'https://res.cloudinary.com/daggx9p24/image/upload/v1751625032/beginner-guide-to-web-hosting_uupd4e.jpg', 'admin', 1, '2025-02-07 05:38:58', '2025-07-04 10:32:49', NULL, 'published', 3),
(6, 'Setting Up a Professional Email for Your Business: A Step-by-Step Guide', 'setting-up-a-professional-email-for-your-business', 'A professional email address is essential for building trust and credibility with your clients and partners', '<h2>Introduction: </h2><p>A professional email address is essential for building trust and credibility with your clients and partners. In this guide, we\'ll walk you through the process of setting up a professional email for your business. </p><p><br></p><h2>Steps to Set Up a Professional Email </h2><h2><br></h2><h3>Choose a Domain Name: </h3><p>Select a domain name that reflects your business\'s identity. You can register a domain through a domain registrar like GoDaddy or Namecheap. Select an Email Hosting Provider: Choose an email hosting provider that offers professional email services. Popular options include Google Workspace, Microsoft 365, and Zoho Mail. </p><p><br></p><h3>Create Email Accounts: </h3><p>Log in to your email hosting provider\'s control panel and create email accounts for your business. Use professional formats like [yourname]@[yourbusiness].com. </p><p><br></p><h3>Configure Email Settings: </h3><p>Set up email forwarding, aliases, and signatures to enhance your email communication. Ensure that your email settings are optimized for security and spam protection. </p><p><br></p><h3>Integrate with Email Clients: </h3><p>Integrate your professional email with email clients like Outlook or Gmail for seamless access. Follow the provider\'s instructions for configuration. </p><p><br></p><h3>Set Up Email Security: </h3><p>Implement email security measures such as SPF, DKIM, and DMARC to protect your business email from phishing and spam. </p><p><br></p><h3>Benefits of a Professional Email Credibility: </h3><p>A professional email address boosts your business\'s credibility and trustworthiness. Branding: Consistent email addresses with your domain name reinforce your brand identity. </p><p><br></p><h3>Security: </h3><p>Professional email hosting providers offer advanced security features to protect your business communication. Collaboration: Many email hosting providers offer collaboration tools such as shared calendars and cloud storage.</p><p><br></p><h3>Conclusion: </h3><p>Setting up a professional email for your business is a straightforward process that can enhance your communication and brand image. By following these steps, you can establish a professional email presence and build trust with your clients and partners.</p>', 'Email', 'https://res.cloudinary.com/daggx9p24/image/upload/v1751625032/setting-up-a-professional-email-for-your-business_ldeuuu.jpg', 'admin', 1, '2025-02-07 05:38:58', '2025-07-04 10:32:55', NULL, 'published', 4);

-- --------------------------------------------------------

--
-- Table structure for table `blog_post_tags`
--

CREATE TABLE `blog_post_tags` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_post_tags`
--

INSERT INTO `blog_post_tags` (`id`, `post_id`, `tag_id`) VALUES
(3, 2, 1),
(4, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `blog_tags`
--

CREATE TABLE `blog_tags` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_tags`
--

INSERT INTO `blog_tags` (`id`, `name`, `slug`, `created_at`) VALUES
(1, 'Hosting', 'hosting', '2025-02-07 05:38:58'),
(2, 'Windows', 'windows', '2025-02-07 05:38:58'),
(3, 'Server', 'server', '2025-02-07 05:38:58'),
(4, 'Spam filter', 'spam-filter', '2025-02-07 05:38:58');

-- --------------------------------------------------------

--
-- Table structure for table `emailotp`
--

CREATE TABLE `emailotp` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `otp` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `used` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `emailotp`
--

INSERT INTO `emailotp` (`id`, `email`, `otp`, `type`, `expiresAt`, `used`, `createdAt`) VALUES
(1, 'sixsatarseo@gmail.com', '862280', 'register', '2025-07-03 07:43:57.155', 1, '2025-07-03 07:38:57.159'),
(2, 'sixsatarseo@gmail.com', '983169', 'register', '2025-07-03 07:53:35.284', 1, '2025-07-03 07:48:35.286'),
(3, 'sixsatarseo@gmail.com', '166236', 'register', '2025-07-03 07:53:50.710', 0, '2025-07-03 07:48:50.711'),
(4, 'sixthstardigitalmarketingteam@gmail.com', '813548', 'register', '2025-07-03 08:32:30.697', 1, '2025-07-03 08:27:30.699'),
(5, 'sixsatarseo@gmail.com', '842643', 'reset', '2025-07-04 04:29:59.007', 1, '2025-07-04 04:24:59.011');

-- --------------------------------------------------------

--
-- Table structure for table `initiated_orders`
--

CREATE TABLE `initiated_orders` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `product` varchar(100) DEFAULT NULL,
  `package` varchar(100) DEFAULT NULL,
  `billing` varchar(50) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `license_type` varchar(50) DEFAULT NULL,
  `cores` varchar(20) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `userId` int(11) DEFAULT NULL,
  `status` enum('PENDING','PROCESSING','ACTIVE','COMPLETED','CANCELLED') NOT NULL DEFAULT 'PENDING',
  `purchasedAt` datetime(3) DEFAULT NULL,
  `renewalAt` datetime(3) DEFAULT NULL,
  `paymentStatus` enum('PENDING','PAID','FAILED') NOT NULL DEFAULT 'PENDING'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `initiated_orders`
--

INSERT INTO `initiated_orders` (`id`, `name`, `email`, `phone`, `company`, `subject`, `product`, `package`, `billing`, `quantity`, `total`, `license_type`, `cores`, `product_id`, `created_at`, `userId`, `status`, `purchasedAt`, `renewalAt`, `paymentStatus`) VALUES
(15, 'gangadharan', 'sixsatarseo@gmail.com', '9176647399', 'sixthstartech', 'Order for Windows RDS', 'Windows RDS', '1 Year License', 'yearlyCommitMonthlyBilling', 1, 642.00, 'NA', 'NA', 3, '2025-07-04 07:51:01.148', 2, 'PENDING', '2025-07-04 00:00:00.000', '2025-08-04 00:00:00.000', 'PAID'),
(16, 'gangadharan', 'sixsatarseo@gmail.com', '9176647399', 'sixthstartech', 'Order for Standard', 'Standard', '', 'yearlyCommitMonthlyBilling', 1, 13191.00, 'Licensed', '2', 11, '2025-07-08 05:02:23.287', 2, 'ACTIVE', '2025-07-08 00:00:00.000', '2025-08-08 00:00:00.000', 'PAID');

-- --------------------------------------------------------

--
-- Table structure for table `page_metadata`
--

CREATE TABLE `page_metadata` (
  `id` int(11) NOT NULL,
  `page_slug` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `canonical_url` varchar(255) DEFAULT NULL,
  `og_title` varchar(255) DEFAULT NULL,
  `og_description` text DEFAULT NULL,
  `og_image` varchar(255) DEFAULT NULL,
  `og_url` varchar(255) DEFAULT NULL,
  `article_modified_time` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `page_metadata`
--

INSERT INTO `page_metadata` (`id`, `page_slug`, `title`, `description`, `canonical_url`, `og_title`, `og_description`, `og_image`, `og_url`, `article_modified_time`, `created_at`, `updated_at`) VALUES
(61, '/', 'Buy Genuine Microsoft Licenses – Windows, Office, SQL,  server', 'WinLicense offers authentic Microsoft software licenses at competitive prices. Shop for Windows 10/11, Office 365, SQL Server, Microsoft Teams, Exchange Online, and more.', 'https://winlicense.in/', 'Buy Genuine Microsoft Licenses – Windows, Office, SQL, server', 'WinLicense offers authentic Microsoft software licenses at competitive prices. Shop for Windows 10/11, Office 365, SQL Server, Microsoft Teams, Exchange Online, and more.', 'https://res.cloudinary.com/daggx9p24/image/upload/v1738142631/logo_ps1rd0.png', 'https://winlicense.in/', NULL, '2025-05-05 09:23:41', '2025-05-05 09:24:18'),
(62, 'about/about-us', 'About Us – Trusted Microsoft Software | WinLicense India', 'Learn about WinLicense – a trusted Microsoft software license reseller in India. We provide genuine, affordable, and fast-license delivery for individuals and businesses.', 'https://winlicense.in/about/about-us', 'About Us – Trusted Microsoft Software | WinLicense India', 'Learn about WinLicense – a trusted Microsoft software license reseller in India. We provide genuine, affordable, and fast-license delivery for individuals and businesses.', '	https://res.cloudinary.com/daggx9p24/image/upload/…55/about-image_cufvgi-removebg-preview_umpxaz.png', 'https://winlicense.in/about/about-us', NULL, '2025-05-05 09:32:19', '2025-06-16 05:23:13'),
(63, 'about/mission-vision', 'Our Mission & Vision – Empowering Digital Growth | WinLicense', 'At WinLicense, our mission is to deliver secure, cost-effective Microsoft licenses. Our vision is to simplify digital access for every individual and business across India.', 'https://winlicense.in/about/mission-vision', 'Our Mission & Vision – Empowering Digital Growth | WinLicense', 'At WinLicense, our mission is to deliver secure, cost-effective Microsoft licenses. Our vision is to simplify digital access for every individual and business across India.', '	https://res.cloudinary.com/daggx9p24/image/upload/v1738665909/mission-image_i7zklz.png', 'https://winlicense.in/about/mission-vision', NULL, '2025-05-05 09:33:32', '2025-05-05 09:38:32'),
(64, 'about/why-microsoft', 'Why Choose Microsoft Software? – WinLicense India', 'Discover why Microsoft is the trusted choice for OS, productivity, and cloud solutions. Learn how licensed Microsoft products boost performance and security.', 'https://winlicense.in/about/why-microsoft', 'Why Choose Microsoft Software? – WinLicense India', 'Discover why Microsoft is the trusted choice for OS, productivity, and cloud solutions. Learn how licensed Microsoft products boost performance and security.', '	https://res.cloudinary.com/daggx9p24/image/upload/…55/about-image_cufvgi-removebg-preview_umpxaz.png', 'https://winlicense.in/about/why-microsoft', NULL, '2025-05-05 09:40:40', '2025-05-05 09:40:40'),
(65, 'about/business-models', 'Our Business Models – License Solutions for Every Need', 'Explore flexible business models at WinLicense – from volume licensing to cloud subscriptions. Find tailored Microsoft software solutions for your organization', 'https://winlicense.in/about/business-models', 'Our Business Models – License Solutions for Every Need | WinLicense', 'Explore flexible business models at WinLicense – from volume licensing to cloud subscriptions. Find tailored Microsoft software solutions for your organization', '	https://res.cloudinary.com/daggx9p24/image/upload/v1738758094/business-image_ncaa50.png', 'https://winlicense.in/about/business-models', NULL, '2025-05-05 09:42:16', '2025-05-05 09:42:52'),
(66, 'about/methodology', 'Our Methodology – How We Deliver Software Licenses | WinLicense', 'See how WinLicense ensures secure, fast, and genuine Microsoft license delivery through our customer-first methodology and streamlined processes.', 'https://winlicense.in/about/methodology', 'Our Methodology – How We Deliver Software Licenses | WinLicense', 'See how WinLicense ensures secure, fast, and genuine Microsoft license delivery through our customer-first methodology and streamlined processes.', 'https://res.cloudinary.com/daggx9p24/image/upload/…ed-wheels-gear-mechanism-schema-poster_lfymp0.png', 'https://winlicense.in/about/methodology', NULL, '2025-05-05 09:44:55', '2025-05-05 09:44:55'),
(67, 'about/testimonials', 'Customer Testimonials – What Clients Say About WinLicense', 'Read reviews and testimonials from happy clients who trust WinLicense for Microsoft software licenses in India. Customer satisfaction is our priority.', 'https://winlicense.in/about/testimonials', 'Customer Testimonials – What Clients Say About WinLicense', 'Read reviews and testimonials from happy clients who trust WinLicense for Microsoft software licenses in India. Customer satisfaction is our priority.', 'https://res.cloudinary.com/daggx9p24/image/upload/v1738142631/logo_ps1rd0.png', 'https://winlicense.in/about/testimonials', NULL, '2025-05-05 09:46:48', '2025-05-05 09:47:26'),
(68, 'about/faq', 'Frequently Asked Questions – Microsoft Licensing Help', 'Find answers to common questions about buying, activating, and managing Microsoft software licenses. Browse our FAQ section for quick support.', 'https://winlicense.in/about/faq', 'Frequently Asked Questions – Microsoft Licensing Help', 'Find answers to common questions about buying, activating, and managing Microsoft software licenses. Browse our FAQ section for quick support.', 'https://res.cloudinary.com/daggx9p24/image/upload/v1738142631/logo_ps1rd0.png', 'https://winlicense.in/about/faq', NULL, '2025-05-05 09:49:05', '2025-05-05 09:49:05'),
(69, 'service', 'Our Services – Genuine Microsoft Licensing Solutions - winlicense', 'WinLicense offers expert Microsoft software licensing services, including consultation, license procurement, activation support, and post-purchase assistance for Windows, Office, SQL, and more.', 'https://winlicense.in/service', 'Our Services – Genuine Microsoft Licensing Solutions', 'WinLicense offers expert Microsoft software licensing services, including consultation, license procurement, activation support, and post-purchase assistance for Windows, Office, SQL, and more.', 'https://res.cloudinary.com/daggx9p24/image/upload/v1738142631/logo_ps1rd0.png', 'https://winlicense.in/service', NULL, '2025-05-05 09:51:41', '2025-07-08 04:54:18'),
(70, 'product', 'Buy Microsoft Licenses – Windows, Office, SQL, Server & More', 'Microsoft software licenses, buy Windows 11 license, Visual Studio 2022, SQL Server 2022, Microsoft 365, Teams Premium, Power BI, Exchange Online, Microsoft Intune, WinLicense India', 'https://winlicense.in/product', 'Buy Microsoft Licenses – Windows, Office, SQL, Server & More', 'Microsoft software licenses, buy Windows 11 license, Visual Studio 2022, SQL Server 2022, Microsoft 365, Teams Premium, Power BI, Exchange Online, Microsoft Intune, WinLicense India', 'https://res.cloudinary.com/daggx9p24/image/upload/v1738142631/logo_ps1rd0.png', 'https://winlicense.in/product', NULL, '2025-05-05 09:54:52', '2025-06-16 04:34:41'),
(71, 'clients', 'Our Clients – Trusted by Businesses Across India | WinLicense', 'Discover the businesses and organizations that trust WinLicense for genuine Microsoft software licenses. We proudly serve clients from diverse industries across India.', 'https://winlicense.in/clients', 'Our Clients – Trusted by Businesses Across India | WinLicense', 'Discover the businesses and organizations that trust WinLicense for genuine Microsoft software licenses. We proudly serve clients from diverse industries across India.', 'https://res.cloudinary.com/daggx9p24/image/upload/v1738142631/logo_ps1rd0.png', 'https://winlicense.in/clients', NULL, '2025-05-05 09:57:29', '2025-05-05 09:57:29'),
(72, 'contact', 'Contact Us – Get in Touch with - WinLicense', 'Have questions about Microsoft software licenses? Contact WinLicense for product inquiries, support, or partnership opportunities. We\'re here to help.', 'https://winlicense.in/contact', 'Contact Us – Get in Touch with - WinLicense', 'Have questions about Microsoft software licenses? Contact WinLicense for product inquiries, support, or partnership opportunities. We\'re here to help.', 'https://res.cloudinary.com/daggx9p24/image/upload/v1738142631/logo_ps1rd0.png', 'https://winlicense.in/contact', NULL, '2025-05-05 09:59:41', '2025-05-05 09:59:41'),
(73, 'blog', 'WinLicense Blog – Microsoft Licensing Tips, Updates & News', 'Read the latest articles from WinLicense on Microsoft product updates, licensing tips, software news, and tech insights to stay informed and secure.', 'https://winlicense.in/blog', 'WinLicense Blog – Microsoft Licensing Tips, Updates & News', 'Read the latest articles from WinLicense on Microsoft product updates, licensing tips, software news, and tech insights to stay informed and secure.', 'https://res.cloudinary.com/daggx9p24/image/upload/v1738142631/logo_ps1rd0.png', 'https://winlicense.in/blog', NULL, '2025-05-05 10:02:21', '2025-05-05 10:02:21'),
(74, 'product/category/windows-server-2025', 'Windows Server 2019 / 2022 / 2025 – Powerful Server OS.', 'Explore Windows Server 2019, 2022, and 2025 – advanced server operating systems for secure, scalable, and flexible IT infrastructure management.', 'https://winlicense.in/product/category/windows-server-2025', 'Windows Server 2019 / 2022 / 2025 – Powerful Server OS Solutions', 'Explore Windows Server 2019, 2022, and 2025 – advanced server operating systems for secure, scalable, and flexible IT infrastructure management.', 'https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png', 'https://winlicense.in/product/category/windows-server-2025', NULL, '2025-06-13 11:20:19', '2025-06-16 04:19:05'),
(75, '/product/category/windows-server-2025-rds', 'Windows Server RDS 2019 / 2022 / 2025 – Remote Desktop Services CAL', 'Get Client Access Licenses (CALs) for Windows Server RDS 2019, 2022, and 2025 to enable secure and efficient remote desktop access for users.', 'https://winlicense.in/product/category/windows-server-2025-rds', 'Windows Server RDS 2019 / 2022 / 2025 – Remote Desktop Services CAL', 'Get Client Access Licenses (CALs) for Windows Server RDS 2019, 2022, and 2025 to enable secure and efficient remote desktop access for users.', 'https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png', 'https://winlicense.in/product/category/windows-server-2025-rds', NULL, '2025-06-13 12:02:59', '2025-06-16 07:54:45'),
(76, '/product/category/windows-server-2025-cal', 'Windows Server CAL 2019 / 2022 / 2025 – Client Access Licenses', 'Purchase Windows Server CALs for 2019, 2022, and 2025 to provide licensed access for users and devices to connect to Windows Server environments.', 'https://winlicense.in/product/category/windows-server-2025-cal', 'Windows Server CAL 2019 / 2022 / 2025 – Client Access Licenses', 'Purchase Windows Server CALs for 2019, 2022, and 2025 to provide licensed access for users and devices to connect to Windows Server environments.', 'https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png', 'https://winlicense.in/product/category/windows-server-2025-cal', NULL, '2025-06-13 12:04:04', '2025-06-13 12:04:04'),
(77, '/product/category/sql-server-2022', 'Microsoft SQL Server 2019 and 2022 - winlicense', 'Discover Microsoft SQL Server 2019 and 2022 – robust database platforms for efficient data storage, analysis, and business intelligence.', 'https://winlicense.in/product/category/sql-server-2022', 'Microsoft SQL Server 2019 and 2022 - winlicense', 'Discover Microsoft SQL Server 2019 and 2022 – robust database platforms for efficient data storage, analysis, and business intelligence.', 'https://res.cloudinary.com/daggx9p24/image/upload/v1743658890/sql-server_o2hve2.png', 'https://winlicense.in/product/category/sql-server-2022', NULL, '2025-06-13 12:05:30', '2025-06-16 07:57:44'),
(78, '/product/category/windows-11', 'Meta Title: Windows 11 – Modern and Secure Operating System.', 'Upgrade to Windows 11 – the latest Microsoft OS with a redesigned interface, improved performance, and advanced security features for all users.', 'https://winlicense.in/product/category/windows-11', 'Meta Title: Windows 11 – Modern and Secure Operating System', 'Upgrade to Windows 11 – the latest Microsoft OS with a redesigned interface, improved performance, and advanced security features for all users.', 'https://res.cloudinary.com/daggx9p24/image/upload/v1743658514/windows11_bexv4r.png', 'https://winlicense.in/product/category/windows-11', NULL, '2025-06-13 12:06:18', '2025-07-08 04:54:01');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `description`) VALUES
(1, 'manage_users', 'Can create, edit, and delete users'),
(2, 'manage_posts', 'Can create, edit, and delete any posts'),
(3, 'publish_posts', 'Can publish posts'),
(4, 'manage_categories', 'Can manage categories and tags'),
(5, 'edit_own_posts', 'Can edit own posts');

-- --------------------------------------------------------

--
-- Table structure for table `post_tags`
--

CREATE TABLE `post_tags` (
  `post_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post_tags`
--

INSERT INTO `post_tags` (`post_id`, `tag_id`) VALUES
(1, 2),
(1, 3),
(2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_schema`
--

CREATE TABLE `product_schema` (
  `id` int(11) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `year` varchar(20) DEFAULT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `schema_brand` varchar(100) DEFAULT NULL,
  `schema_sku` varchar(100) DEFAULT NULL,
  `schema_price` decimal(10,2) DEFAULT NULL,
  `schema_price_currency` varchar(10) DEFAULT NULL,
  `schema_price_valid_until` datetime(3) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_schema`
--

INSERT INTO `product_schema` (`id`, `slug`, `name`, `image_url`, `description`, `category`, `year`, `features`, `schema_brand`, `schema_sku`, `schema_price`, `schema_price_currency`, `schema_price_valid_until`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'windows-11-iot-enterprise-ltsc', 'Windows 11 IoT Enterprise LTSC 2024', 'https://res.cloudinary.com/daggx9p24/image/upload/v1743658514/windows11_bexv4r.png', 'Buy Windows 11 IoT Enterprise LTSC 2024...', 'Windows', '2024', '[\"10-year support\",\"Embedded device optimized\",\"Long-term servicing\"]', 'Microsoft', '92NFX-8DJQP-P6BBQ-THF9C-7CG2H', 25063.00, 'INR', '2025-06-30 00:00:00.000', 1, '2025-06-16 09:50:36.000', '2025-06-16 09:50:36.000');

-- --------------------------------------------------------

--
-- Table structure for table `role_permissions`
--

CREATE TABLE `role_permissions` (
  `role` enum('admin','editor','author') NOT NULL,
  `permissionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_permissions`
--

INSERT INTO `role_permissions` (`role`, `permissionId`) VALUES
('admin', 1),
('admin', 2),
('admin', 3),
('admin', 4),
('admin', 5),
('editor', 2),
('editor', 3),
('editor', 4),
('editor', 5),
('author', 5);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `name` varchar(191) DEFAULT NULL,
  `mobile` varchar(191) DEFAULT NULL,
  `company` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `createdAt`, `name`, `mobile`, `company`) VALUES
(2, 'gangadharan', 'sixsatarseo@gmail.com', '$2a$10$9COsB/ws.QcPAgy2yKYSRe500IOMB/e8aPzB4EY//oTFl0l9DzqQC', '2025-07-03 07:48:52.415', 'gangadharan', '9176647399', 'sixthstartech'),
(3, 'sixthstar', 'sixthstardigitalmarketingteam@gmail.com', '$2a$10$S/0oygDLHe1PNkEGCtY/COYYpC4cR38cCKHvUBYqeH0IquWLvvUr.', '2025-07-03 08:27:43.035', 'sixthstar', '9176647399', 'sixthstar');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('1701571f-06bd-4c12-b48d-80f393592328', 'a16d54367a0ba0bf8bff5f4c7b366583c5e027c7ae89852c60bb4b3ecc928448', '2025-07-03 12:54:51.806', '20250703125451_add_payment_status_to_order', NULL, NULL, '2025-07-03 12:54:51.798', 1),
('bf8a7813-3a6c-44b9-8b80-06b4ef604f4b', 'e74a3cca5de32a77523036c4090720a164df01bdfabea7668d410f0f9e839813', '2025-07-03 07:37:13.656', '20250703073713_add_user_profile_fields', NULL, NULL, '2025-07-03 07:37:13.363', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_users_username_key` (`username`),
  ADD UNIQUE KEY `admin_users_email_key` (`email`);

--
-- Indexes for table `blog_categories`
--
ALTER TABLE `blog_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `slug_2` (`slug`),
  ADD KEY `category` (`category`),
  ADD KEY `fk_category` (`category_id`);

--
-- Indexes for table `blog_post_tags`
--
ALTER TABLE `blog_post_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indexes for table `blog_tags`
--
ALTER TABLE `blog_tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `emailotp`
--
ALTER TABLE `emailotp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `initiated_orders`
--
ALTER TABLE `initiated_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `initiated_orders_userId_fkey` (`userId`);

--
-- Indexes for table `page_metadata`
--
ALTER TABLE `page_metadata`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `page_slug` (`page_slug`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_key` (`name`);

--
-- Indexes for table `post_tags`
--
ALTER TABLE `post_tags`
  ADD PRIMARY KEY (`post_id`,`tag_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indexes for table `product_schema`
--
ALTER TABLE `product_schema`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_schema_slug_key` (`slug`);

--
-- Indexes for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`role`,`permissionId`),
  ADD KEY `role_permissions_permissionId_fkey` (`permissionId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_username_key` (`username`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `blog_categories`
--
ALTER TABLE `blog_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `blog_post_tags`
--
ALTER TABLE `blog_post_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `blog_tags`
--
ALTER TABLE `blog_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `emailotp`
--
ALTER TABLE `emailotp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `initiated_orders`
--
ALTER TABLE `initiated_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `page_metadata`
--
ALTER TABLE `page_metadata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product_schema`
--
ALTER TABLE `product_schema`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `blog_categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `blog_post_tags`
--
ALTER TABLE `blog_post_tags`
  ADD CONSTRAINT `blog_post_tags_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blog_post_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `blog_tags` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `initiated_orders`
--
ALTER TABLE `initiated_orders`
  ADD CONSTRAINT `initiated_orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `post_tags`
--
ALTER TABLE `post_tags`
  ADD CONSTRAINT `post_tags_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `blog_tags` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `role_permissions_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
