import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Admin Users
  await prisma.adminUser.createMany({
    data: [
      {
        id: 1,
        username: 'admin',
        email: 'wm@sixthstar.in',
        password: '$2y$10$LupsW.OCAojxR2aaFXNISOft1fl47WcKahyJ3Y0vxgp3Qlo1gGM2G',
        createdAt: new Date('2025-02-07T05:38:58Z'),
        role: 'admin',
      },
      {
        id: 2,
        username: 'editor',
        email: 'editor@example.com',
        password: '$2a$10$xP1XEoQwRqG3h5z5T5QY5O5K5K5K5K5K5K5K5K5K5K5K5K5K5',
        createdAt: new Date('2025-02-07T05:38:58Z'),
        role: 'editor',
      },
      {
        id: 3,
        username: 'author',
        email: 'author@example.com',
        password: '$2a$10$xP1XEoQwRqG3h5z5T5QY5O5K5K5K5K5K5K5K5K5K5K5K5K5K5',
        createdAt: new Date('2025-02-07T05:38:58Z'),
        role: 'author',
      },
    ],
    skipDuplicates: true,
  });

  // Blog Categories
  await prisma.blogCategory.createMany({
    data: [
      { id: 1, name: 'Windows', slug: 'windows', createdAt: new Date('2025-02-07T05:38:58Z') },
      { id: 2, name: 'Server', slug: 'server', createdAt: new Date('2025-02-07T05:38:58Z') },
      { id: 3, name: 'Hosting', slug: 'hosting', createdAt: new Date('2025-02-07T05:38:58Z') },
      { id: 4, name: 'Email', slug: 'email', createdAt: new Date('2025-02-07T05:38:58Z') },
      { id: 5, name: 'Spam filter', slug: 'Spam-filter', createdAt: new Date('2025-02-07T05:38:58Z') },
    ],
    skipDuplicates: true,
  });

  // Blog Tags
  await prisma.blogTag.createMany({
    data: [
      { id: 1, name: 'Hosting', slug: 'hosting', createdAt: new Date('2025-02-07T05:38:58Z') },
      { id: 2, name: 'Windows', slug: 'windows', createdAt: new Date('2025-02-07T05:38:58Z') },
      { id: 3, name: 'Server', slug: 'server', createdAt: new Date('2025-02-07T05:38:58Z') },
      { id: 4, name: 'Spam filter', slug: 'spam-filter', createdAt: new Date('2025-02-07T05:38:58Z') },
    ],
    skipDuplicates: true,
  });

  // Blog Posts
  await prisma.blogPost.createMany({
    data: [
      {
        id: 1,
        title: 'Understanding Windows Licenses: What You Need to Know',
        slug: 'understanding-windows-licenses',
        excerpt: 'In the ever-evolving world of technology, Windows remains one of the most widely used operating systems globally',
        content: `<p><strong>Introduction In the ever-evolving world of technology</strong>,</p><p><br></p><p>Windows remains one of the most widely used operating systems globally.</p><p>However, understanding the different types of Windows licenses and their implications can be a bit challenging.</p><p>In this post, we\'ll break down the essentials of <a href=\"https://google.com\" rel=\"noopener noreferrer\" target=\"_blank\">Windows licenses</a> to help you make informed decisions.</p><p><br></p><p><strong>Types of Windows Licenses Retail License: </strong></p><p>Retail licenses are the most flexible type of Windows license.</p><p>They can be purchased directly from Microsoft or authorized retailers. These licenses are transferable, meaning you can move them from one computer to another, provided you deactivate the license on the old device. OEM License: Original Equipment Manufacturer (OEM) licenses are typically pre-installed on new computers by the manufacturer.</p><p><br></p><p>These licenses are tied to the hardware they are first activated on and cannot be transferred to another device. OEM licenses are often more affordable but come with the limitation of being non-transferable. Volume License: Volume licenses are designed for businesses, educational institutions, and other organizations that need multiple licenses. These licenses offer the flexibility to deploy Windows on multiple devices and often come with added benefits such as bulk pricing and extended support options. Microsoft 365 Subscription: Microsoft 365 (formerly Office 365) subscriptions often include Windows licenses as part of the package. This model provides the latest Windows updates and additional services such as Office applications and OneDrive storage. The subscription model ensures you always have access to the most recent features and security updates.</p><p><br></p><p>How to Choose the Right License Choosing the right Windows license depends on your specific needs and circumstances. Here are a few factors to consider:</p><p><strong>Purpose:</strong> Are you a home user, a business, or an educational institution? Your usage scenario will dictate the type of license you need.</p><p><br></p><p><strong>Budget:</strong> Retail licenses offer flexibility but at a higher cost. OEM licenses are cheaper but non-transferable. Volume licenses provide bulk pricing for organizations.</p><p><br></p><p><strong>Transferability:</strong> If you plan to upgrade or change your hardware frequently, a retail license might be the best choice due to its transferability.</p><p><br></p><p><strong>Updates and Support:</strong> Microsoft 365 subscriptions ensure you have the latest updates and features, along with additional services. Conclusion Understanding the different types of Windows licenses and their features can help you make informed decisions that align with your needs. Whether you\'re an individual looking for flexibility, a business needing multiple licenses, or an organization seeking cost-effective solutions, there\'s a Windows license designed for you. Stay informed, choose wisely, and make the most out of your <strong>Windows</strong> experience.</p>`,
        category: 'Windows',
        featuredImage: '/uploads/understanding-windows-licenses.jpg',
        author: 'admin',
        published: true,
        createdAt: new Date('2025-02-07T05:38:58Z'),
        updatedAt: new Date('2025-06-17T09:57:00Z'),
        scheduledFor: null,
        status: 'published',
        categoryId: 2,
      },
      // ... (add the rest of the blog posts from the SQL dump here, similar structure)
    ],
    skipDuplicates: true,
  });

  // BlogPostTags
  await prisma.blogPostTag.createMany({
    data: [
      { id: 3, postId: 2, tagId: 1 },
      { id: 4, postId: 1, tagId: 2 },
    ],
    skipDuplicates: true,
  });

  // PostTags
  await prisma.postTag.createMany({
    data: [
      { postId: 1, tagId: 2 },
      { postId: 1, tagId: 3 },
      { postId: 2, tagId: 1 },
    ],
    skipDuplicates: true,
  });

  // Permissions
  await prisma.permission.createMany({
    data: [
      { id: 1, name: 'manage_users', description: 'Can create, edit, and delete users' },
      { id: 2, name: 'manage_posts', description: 'Can create, edit, and delete any posts' },
      { id: 3, name: 'publish_posts', description: 'Can publish posts' },
      { id: 4, name: 'manage_categories', description: 'Can manage categories and tags' },
      { id: 5, name: 'edit_own_posts', description: 'Can edit own posts' },
    ],
    skipDuplicates: true,
  });

  // RolePermissions
  await prisma.rolePermission.createMany({
    data: [
      { role: 'admin', permissionId: 1 },
      { role: 'admin', permissionId: 2 },
      { role: 'admin', permissionId: 3 },
      { role: 'admin', permissionId: 4 },
      { role: 'admin', permissionId: 5 },
      { role: 'editor', permissionId: 2 },
      { role: 'editor', permissionId: 3 },
      { role: 'editor', permissionId: 4 },
      { role: 'editor', permissionId: 5 },
      { role: 'author', permissionId: 5 },
    ],
    skipDuplicates: true,
  });

  // ProductSchema
  await prisma.productSchema.createMany({
    data: [
      {
        id: 1,
        slug: 'windows-11-iot-enterprise-ltsc',
        name: 'Windows 11 IoT Enterprise LTSC 2024',
        imageUrl: 'https://res.cloudinary.com/daggx9p24/image/upload/v1743658514/windows11_bexv4r.png',
        description: 'Buy Windows 11 IoT Enterprise LTSC 2024...',
        category: 'Windows',
        year: '2024',
        features: ["10-year support", "Embedded device optimized", "Long-term servicing"],
        schemaBrand: 'Microsoft',
        schemaSku: '92NFX-8DJQP-P6BBQ-THF9C-7CG2H',
        schemaPrice: 25063.00,
        schemaPriceCurrency: 'INR',
        schemaPriceValidUntil: new Date('2025-06-30'),
        isActive: true,
        createdAt: new Date('2025-06-16T09:50:36Z'),
        updatedAt: new Date('2025-06-16T09:50:36Z'),
      },
    ],
    skipDuplicates: true,
  });

  // PageMetadata
  await prisma.pageMetadata.createMany({
    data: [
      {
        id: 61,
        pageSlug: '/',
        title: 'Buy Genuine Microsoft Licenses – Windows, Office, SQL,  server',
        description: 'WinLicense offers authentic Microsoft software licenses at competitive prices. Shop for Windows 10/11, Office 365, SQL Server, Microsoft Teams, Exchange Online, and more.',
        canonicalUrl: 'https://winlicense.in/',
        ogTitle: 'Buy Genuine Microsoft Licenses – Windows, Office, SQL, server',
        ogDescription: 'WinLicense offers authentic Microsoft software licenses at competitive prices. Shop for Windows 10/11, Office 365, SQL Server, Microsoft Teams, Exchange Online, and more.',
        ogImage: 'https://res.cloudinary.com/daggx9p24/image/upload/v1738142631/logo_ps1rd0.png',
        ogUrl: 'https://winlicense.in/',
        articleModifiedTime: null,
        createdAt: new Date('2025-05-05T09:23:41Z'),
        updatedAt: new Date('2025-05-05T09:24:18Z'),
      },
      // ... (add the rest of the page metadata from the SQL dump here, similar structure)
    ],
    skipDuplicates: true,
  });

  // Add more seed data for other tables as needed
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
