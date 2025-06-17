export const HomeLocalSchema =[
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Winlicense",
      "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1738142631/logo_ps1rd0.png",
      "url": "https://winlicense.in",
      "telephone": "+91 9962107399, +91 9383996666",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1st Floor, Siri Towers, 3 & 4, Fourrts Ave, Annani Indira Nagar, Muttukkaranchavadi, Thoraipakkam",
        "addressLocality": "Chennai",
        "addressRegion": "Tamil Nadu",
        "postalCode": "600097",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "12.929736569845844",
        "longitude": "80.23359138184487"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        }
      ],
    }];

    export const organizations =

        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "WinLicense",
            "url": "https://winlicense.in/",
            "logo": "https://res.cloudinary.com/daggx9p24/image/upload/v1738142631/logo_ps1rd0.png",
            "description": "WinLicense is a leading Microsoft authorized partner providing genuine software licenses, cloud solutions, hosting, and IT support.",
            "foundingDate": "2006",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Chennai",
              "addressRegion": "Tamil Nadu",
              "addressCountry": "IN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Support",
              "email": "support@sixthstar.in",
              "telephone": "+91 9383996666",
              "areaServed": "IN",
              "availableLanguage": ["English", "Tamil"]
            },
          }

    export const productPageSchema = [
        {
            "@context": "https://schema.org", 
            "name": "Digital Products Listing",
            "description": "Official digital licenses for Microsoft Windows Server, SQL Server, and other software.",
             "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "url": "https://winlicense.in/product/windows-server-2025-datacenter?quantity=1",
                "item": {
                  "@type": "Product",
                  "name": "Windows Server 2025 Windows Server 2025 Datacenter",
                  "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
                  "description": "Microsoft Windows Server 2025 Datacenter Edition Built for enterprise needs, this edition offers unlimited virtualization, advanced cloud integration, and top-tier security — delivering powerful performance and scalability for modern datacenters.",
                  "brand": {
                    "@type": "Brand",
                    "name": "microsoft"
                  },
                  "sku": "WIN-SRV-2025-DATA-16C",
                  "offers": {
                    "@type": "Offer",
                    "url": "https://winlicense.in/product/windows-server-2025-datacenter?quantity=1",
                    "priceCurrency": "INR",
                    "price": "3388",
                    "priceValidUntil": "2025-06-30",
                    "availability": "https://schema.org/OnlineOnly"
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "url": "https://winlicense.in/product/windows-server-2025-standard?quantity=1",
                "item": {
                  "@type": "Product",
                  "name": "Windows Server 2025 Windows Server 2025 Standard",
                  "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
                  "description": "A reliable, secure, and scalable server OS designed for businesses, offering essential capabilities for modern workloads, hybrid cloud integration, and advanced security.",
                  "brand": {
                    "@type": "Brand",
                    "name": "microsoft"
                  },
                  "sku": "P77104-B21",
                  "offers": {
                    "@type": "Offer",
                    "url": "https://winlicense.in/product/windows-server-2025-standard?quantity=1",
                    "priceCurrency": "INR",
                    "price": "487",
                    "priceValidUntil": "2025-06-30",
                    "availability": "https://schema.org/OnlineOnly",
                    "itemCondition": "https://schema.org/NewCondition"
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "url": "https://winlicense.in/product/remote-desktop-services?quantity=1",
                "item": {
                  "@type": "Product",
                  "name": "Windows Server RDS - 2019 /2022 /2025",
                  "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
                  "description": "A reliable, secure, and scalable server OS designed for businesses, offering essential capabilities for modern workloads, hybrid cloud integration, and advanced security.",
                  "brand": {
                    "@type": "Brand",
                    "name": "microsoft"
                  },
                  "sku": "6VC-03748",
                  "offers": {
                    "@type": "Offer",
                    "url": "https://winlicense.in/product/remote-desktop-services?quantity=1",
                    "priceCurrency": "INR",
                    "price": "642",
                    "priceValidUntil": "2025-06-30",
                    "availability": "https://schema.org/OnlineOnly",
                    "itemCondition": "https://schema.org/NewCondition"
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 4,
                "url": "https://winlicense.in/product/windows-server-2025-rms-device-cal?quantity=1",
                "item": {
                  "@type": "Product",
                  "name": "Microsoft Windows Server RMS Device CAL-2019 /2022 /2025 ",
                  "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
                  "description": "Windows Server Client Access Licenses (CALs). Perfect for businesses using Windows Server environments — choose User CALs or Device CALs to suit your team size and IT needs.",
                  "brand": {
                    "@type": "Brand",
                    "name": "microsoft"
                  },
                  "sku": "CSP-DG7GMGF0PWHF-0002",
                  "offers": {
                    "@type": "Offer",
                    "url": "https://winlicense.in/product/windows-server-2025-rms-device-cal?quantity=1",
                    "priceCurrency": "INR",
                    "price": "148",
                    "priceValidUntil": "2025-06-30",
                    "availability": "https://schema.org/OnlineOnly",
                    "itemCondition": "https://schema.org/NewCondition"
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 5,
                "url": "https://winlicense.in/product/windows-server-2025-rms-device-cal?quantity=1",
                "item": {
                  "@type": "Product",
                  "name": "Microsoft Windows Server RMS user CAL-2019 /2022 /2025",
                  "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
                  "description": "This license allows individual users to access and manage protected resources on your Windows Server, ensuring compliance and data protection across your organization.",
                  "brand": {
                    "@type": "Brand",
                    "name": "microsoft"
                  },
                  "sku": "CSP-DG7GMGF0PWHF-0002",
                  "offers": {
                    "@type": "Offer",
                    "url": "https://winlicense.in/product/windows-server-2025-rms-device-cal?quantity=1",
                    "priceCurrency": "INR",
                    "price": "180",
                    "priceValidUntil": "2025-06-30",
                    "availability": "https://schema.org/OnlineOnly",
                    "itemCondition": "https://schema.org/NewCondition"
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 6,
                "url": "https://winlicense.in/product/windows-server-2025-1-device-cal-license?quantity=1",
                "item": {
                  "@type": "Product",
                  "name": "Microsoft Windows Server 1 Device CAL-2019 /2022 /2025",
                  "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
                  "description": "Windows Server 1 Device Client Access License (CAL) . Ideal for organizations managing shared or fixed workstations, this CAL ensures compliance and secure access to server resources like files, apps, and network services.",
                  "brand": {
                    "@type": "Brand",
                    "name": "microsoft"
                  },
                  "sku": "CSP-DG7GMGF0PWHF-0002",
                  "offers": {
                    "@type": "Offer",
                    "url": "https://winlicense.in/product/windows-server-2025-1-device-cal-license?quantity=1",
                    "priceCurrency": "INR",
                    "price": "86",
                    "priceValidUntil": "2025-06-30",
                    "availability": "https://schema.org/OnlineOnly",
                    "itemCondition": "https://schema.org/NewCondition"
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 7,
                "url": "https://winlicense.in/product/windows-server-2025-1-user-cal-license?quantity=1",
                "item": {
                  "@type": "Product",
                  "name": "Microsoft Windows Server 1 user CAL-2019 /2022 /2025",
                  "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
                  "description": "Windows Server 1 User Client Access License (CAL) . Ideal for organizations managing user-based access, this CAL ensures compliance and secure connectivity to server resources like files, apps, and services.",
                  "brand": {
                    "@type": "Brand",
                    "name": "microsoft"
                  },
                  "sku": "CSP-DG7GMGF0PWHF-0002",
                  "offers": {
                    "@type": "Offer",
                    "url": "https://winlicense.in/product/windows-server-2025-1-user-cal-license?quantity=1",
                    "priceCurrency": "INR",
                    "price": "102",
                    "priceValidUntil": "2025-06-30",
                    "availability": "https://schema.org/OnlineOnly",
                    "itemCondition": "https://schema.org/NewCondition"
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 8,
                "url": "https://winlicense.in/product/windows-server-2025-1-user-cal?quantity=1",
                "item": {
                  "@type": "Product",
                  "name": "Microsoft Windows Server 1 user CAL-2019 /2022 /2025 one time",
                  "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
                  "description": "Get permanent access with a one-time purchase of the Microsoft Windows Server 1 User Client Access License (CAL) . This license allows one user to legally connect to your Windows Server environment",
                  "brand": {
                    "@type": "Brand",
                    "name": "microsoft"
                  },
                  "sku": "CSP-DG7GMGF0PWHF-0002",
                  "offers": {
                    "@type": "Offer",
                    "url": "https://winlicense.in/product/windows-server-2025-1-user-cal?quantity=1",
                    "priceCurrency": "INR",
                    "price": "4299",
                    "priceValidUntil": "2025-06-30",
                    "availability": "https://schema.org/OnlineOnly",
                    "itemCondition": "https://schema.org/NewCondition"
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 9,
                "url": "https://winlicense.in/product/windows-server-2025-1-device-cal?quantity=1",
                "item": {
                  "@type": "Product",
                  "name": "Microsoft Windows Server 1 device CAL-2019 /2022 /2025 one time",
                  "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
                  "description": "permanent access with a one-time purchase of the Microsoft Windows Server 1 Device Client Access License (CAL) . This license allows one device to legally connect to your Windows Server environment",
                  "brand": {
                    "@type": "Brand",
                    "name": "microsoft"
                  },
                  "sku": "CSP-DG7GMGF0PWHF-0002",
                  "offers": {
                    "@type": "Offer",
                    "url": "https://winlicense.in/product/windows-server-2025-1-device-cal?quantity=1",
                    "priceCurrency": "INR",
                    "price": "3364",
                    "priceValidUntil": "2025-06-30",
                    "availability": "https://schema.org/OnlineOnly",
                    "itemCondition": "https://schema.org/NewCondition"
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 10,
                "url": "https://winlicense.in/product/sql-server-2022-enterprise?quantity=1",
                "item": {
                  "@type": "Product",
                  "name": "Microsoft SQL Server Enterprise 2019 /2022",
                  "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743658890/sql-server_o2hve2.png",
                  "description": "Powerful database platform for enterprise use. Buy genuine licenses at winlicense.in – Official Microsoft Reseller",
                  "brand": {
                    "@type": "Brand",
                    "name": "microsoft"
                  },
                  "sku": "DG7GMGF0FKZV",
                  "offers": {
                    "@type": "Offer",
                    "url": "https://winlicense.in/product/sql-server-2022-enterprise?quantity=1",
                    "priceCurrency": "INR",
                    "price": "50571",
                    "priceValidUntil": "2025-06-30",
                    "availability": "https://schema.org/OnlineOnly",
                    "itemCondition": "https://schema.org/NewCondition"
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 11,
                "url": "https://winlicense.in/product/sql-server-2022-standard?quantity=1",
                "item": {
                  "@type": "Product",
                  "name": "Microsoft SQL Server Standard 2019 /2022",
                  "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743658890/sql-server_o2hve2.png",
                  "description": "Microsoft SQL Server Standard Edition (2019 / 2022) – Reliable database solution for mid-sized businesses. Buy genuine licenses at winlicense.in – Official Microsoft Reseller.",
                  "brand": {
                    "@type": "Brand",
                    "name": "microsoft"
                  },
                  "sku": "DG7GMGF0FKZV",
                  "offers": {
                    "@type": "Offer",
                    "url": "https://winlicense.in/product/sql-server-2022-standard?quantity=1",
                    "priceCurrency": "INR",
                    "price": "13191",
                    "priceValidUntil": "2025-06-30",
                    "availability": "https://schema.org/OnlineOnly",
                    "itemCondition": "https://schema.org/NewCondition"
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 12,
                "url": "https://winlicense.in/product/sql-server-2022-standard?quantity=1",
                "item": {
                  "@type": "Product",
                  "name": "Windows 11 Enterprise LTSC 2024",
                  "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743658514/windows11_bexv4r.png",
                  "description": "Buy Windows 11 Enterprise LTSC 2024 – A stable, long-term version for critical systems. 10-year support. Available at winlicense.in – Official Microsoft Licensing Partner",
                  "brand": {
                    "@type": "Brand",
                    "name": "microsoft"
                  },
                  "sku": "92NFX-8DJQP-P6BBQ-THF9C-7CG2H",
                  "offers": {
                    "@type": "Offer",
                    "url": "https://winlicense.in/product/sql-server-2022-standard?quantity=1",
                    "priceCurrency": "INR",
                    "price": "25063",
                    "priceValidUntil": "2025-06-30",
                    "availability": "https://schema.org/OnlineOnly",
                    "itemCondition": "https://schema.org/NewCondition"
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 13,
                "url": "https://winlicense.in/product/windows-11-iot-enterprise-ltsc?quantity=1",
                "item": {
                  "@type": "Product",
                  "name": "Windows 11 IoT Enterprise LTSC 2024",
                  "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743658514/windows11_bexv4r.png",
                  "description": "Buy Windows 11 IoT Enterprise LTSC 2024 – A secure, long-term version for embedded and industrial devices. 10-year support. Available at winlicense.in – Official Microsoft Licensing Partner",
                  "brand": {
                    "@type": "Brand",
                    "name": "microsoft"
                  },
                  "sku": "92NFX-8DJQP-P6BBQ-THF9C-7CG2H",
                  "offers": {
                    "@type": "Offer",
                    "url": "https://winlicense.in/product/windows-11-iot-enterprise-ltsc?quantity=1",
                    "priceCurrency": "INR",
                    "price": "25063",
                    "priceValidUntil": "2025-06-30",
                    "availability": "https://schema.org/OnlineOnly",
                    "itemCondition": "https://schema.org/NewCondition"
                  }
                }
              }
            ]
          }
    ]
    export const productcategorySchema = {
      windows_server_2025: [
        {
            "@context": "https://schema.org", 
            "@type": "ItemList",
            "name": "Windows Server 2025 Editions",
            "description": "Editions of Windows Server 2025 available for purchase.",
            "itemListElement": [
              {
                "@type": "Product",
                "name": "Windows Server 2025 Windows Server 2025 Datacenter",
                "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png", 
                "description": "Datacenter Edition\nBuilt for enterprise needs, this edition offers unlimited virtualization, advanced cloud integration, and top-tier security — delivering powerful performance and scalability for modern datacenters",
                "brand": {
                  "@type": "Brand",
                  "name": "microsoft"
                },
                "sku": "WIN-SRV-2025-DATA-16C",
                "offers": {
                  "@type": "Offer",
                  "url": "https://winlicense.in/product/windows-server-2025-datacenter?quantity=1",
                  "priceCurrency": "INR",
                  "price": "3388",
                  "priceValidUntil": "2025-06-30",
                  "availability": "https://schema.org/InStock",
                  "itemCondition": "https://schema.org/NewCondition"
                }
              },
              {
                "@type": "Product",
                "name": "Windows Server 2025 Windows Server 2025 Standard",
                "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
                "description": "A reliable, secure, and scalable server OS designed for businesses, offering essential capabilities for modern workloads, hybrid cloud integration, and advanced security.",
                "brand": {
                  "@type": "Brand",
                  "name": "microsoft"
                },
                "sku": "P77104-B21",
                "offers": {
                  "@type": "Offer",
                  "url": "https://winlicense.in/product/windows-server-2025-standard?quantity=1",
                  "priceCurrency": "INR",
                  "price": "487",
                  "priceValidUntil": "2025-06-30",
                  "availability": "https://schema.org/OnlineOnly",
                  "itemCondition": "https://schema.org/NewCondition"
                }
              }
            ]
        }
      ],
      windows_server_2025_rds: [
        {
            "@context": "https://schema.org", 
            "@type": "ItemList",
            "name": "Windows Server RDS Editions",
            "description": "Remote Desktop Services licenses compatible with Windows Server 2019, 2022, and 2025.",
            "itemListElement": [
              {
                "@type": "Product",
                "name": "Windows Server RDS - 2019 /2022 /2025",
                "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png", 
                "description": "A reliable, secure, and scalable server OS designed for businesses, offering essential capabilities for modern workloads, hybrid cloud integration, and advanced security.",
                "brand": {
                  "@type": "Brand",
                  "name": "microsoft"
                },
                "sku": "6VC-03748",
                "offers": {
                  "@type": "Offer",
                  "url": "https://winlicense.in/product/remote-desktop-services?quantity=1",
                  "priceCurrency": "INR",
                  "price": "642",
                  "priceValidUntil": "2025-06-30",
                  "availability": "https://schema.org/OnlineOnly",
                  "itemCondition": "https://schema.org/NewCondition"
                }
              }
            ]
          }
          
      ],
      windows_server_2025_cal: [
        {
            "@context": "https://schema.org", 
            "@type": "ItemList",
            "name": "Windows Server 2025 CAL Licenses",
            "description": "Client Access Licenses (CALs) for Windows Server 2025, including User and Device CALs for RMS and general server access.",
            "itemListElement": [
              {
                "@type": "Product",
                "name": "Microsoft Windows Server RMS Device CAL-2019 /2022 /2025",
                "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png", 
                "description": "Windows Server Client Access Licenses (CALs). Perfect for businesses using Windows Server environments — choose User CALs or Device CALs to suit your team size and IT needs.",
                "brand": {
                  "@type": "Brand",
                  "name": "microsoft"
                },
                "sku": "CSP-DG7GMGF0PWHF-0002",
                "offers": {
                  "@type": "Offer",
                  "url": "https://winlicense.in/product/windows-server-2025-rms-device-cal?quantity=1",
                  "priceCurrency": "INR",
                  "price": "148",
                  "priceValidUntil": "2025-06-30",
                  "availability": "https://schema.org/OnlineOnly",
                  "itemCondition": "https://schema.org/NewCondition"
                }
              },
              {
                "@type": "Product",
                "name": "Microsoft Windows Server RMS User CAL-2019 /2022 /2025",
                "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
                "description": "This license allows individual users to access and manage protected resources on your Windows Server, ensuring compliance and data protection across your organization.",
                "brand": {
                  "@type": "Brand",
                  "name": "microsoft"
                },
                "sku": "CSP-DG7GMGF0PWHF-0002",
                "offers": {
                  "@type": "Offer",
                  "url": "https://winlicense.in/product/windows-server-2025-rms-device-cal?quantity=1",
                  "priceCurrency": "INR",
                  "price": "180",
                  "priceValidUntil": "2025-06-30",
                  "availability": "https://schema.org/OnlineOnly",
                  "itemCondition": "https://schema.org/NewCondition"
                }
              },
              {
                "@type": "Product",
                "name": "Microsoft Windows Server 1 Device CAL-2019 /2022 /2025",
                "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
                "description": "Windows Server 1 Device Client Access License (CAL). Ideal for organizations managing shared or fixed workstations, this CAL ensures compliance and secure access to server resources like files, apps, and network services.",
                "brand": {
                  "@type": "Brand",
                  "name": "microsoft"
                },
                "sku": "CSP-DG7GMGF0PWHF-0002",
                "offers": {
                  "@type": "Offer",
                  "url": "https://winlicense.in/product/windows-server-2025-1-device-cal-license?quantity=1",
                  "priceCurrency": "INR",
                  "price": "86",
                  "priceValidUntil": "2025-06-30",
                  "availability": "https://schema.org/OnlineOnly",
                  "itemCondition": "https://schema.org/NewCondition"
                }
              },
              {
                "@type": "Product",
                "name": "Microsoft Windows Server 1 User CAL-2019 /2022 /2025",
                "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
                "description": "Windows Server 1 User Client Access License (CAL). Ideal for organizations managing user-based access, this CAL ensures compliance and secure connectivity to server resources like files, apps, and services.",
                "brand": {
                  "@type": "Brand",
                  "name": "microsoft"
                },
                "sku": "CSP-DG7GMGF0PWHF-0002",
                "offers": {
                  "@type": "Offer",
                  "url": "https://winlicense.in/product/windows-server-2025-1-user-cal-license?quantity=1",
                  "priceCurrency": "INR",
                  "price": "102",
                  "priceValidUntil": "2025-06-30",
                  "availability": "https://schema.org/OnlineOnly",
                  "itemCondition": "https://schema.org/NewCondition"
                }
              },
              {
                "@type": "Product",
                "name": "Microsoft Windows Server 1 User CAL-2019 /2022 /2025 One Time",
                "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
                "description": "Get permanent access with a one-time purchase of the Microsoft Windows Server 1 User Client Access License (CAL). This license allows one user to legally connect to your Windows Server environment.",
                "brand": {
                  "@type": "Brand",
                  "name": "microsoft"
                },
                "sku": "CSP-DG7GMGF0PWHF-0002",
                "offers": {
                  "@type": "Offer",
                  "url": "https://winlicense.in/product/windows-server-2025-1-user-cal?quantity=1",
                  "priceCurrency": "INR",
                  "price": "4299",
                  "priceValidUntil": "2025-06-30",
                  "availability": "https://schema.org/OnlineOnly",
                  "itemCondition": "https://schema.org/NewCondition"
                }
              },
              {
                "@type": "Product",
                "name": "Microsoft Windows Server 1 Device CAL-2019 /2022 /2025 One Time",
                "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
                "description": "Get permanent access with a one-time purchase of the Microsoft Windows Server 1 Device Client Access License (CAL). This license allows one device to legally connect to your Windows Server environment.",
                "brand": {
                  "@type": "Brand",
                  "name": "microsoft"
                },
                "sku": "CSP-DG7GMGF0PWHF-0002",
                "offers": {
                  "@type": "Offer",
                  "url": "https://winlicense.in/product/windows-server-2025-1-device-cal?quantity=1",
                  "priceCurrency": "INR",
                  "price": "3364",
                  "priceValidUntil": "2025-06-30",
                  "availability": "https://schema.org/OnlineOnly",
                  "itemCondition": "https://schema.org/NewCondition"
                }
              }
            ]
          }
          
      ],
      sql_server_2022: [{
        "@context": "https://schema.org", 
        "@type": "ItemList",
        "name": "SQL Server 2022 Editions",
        "description": "Genuine Microsoft SQL Server 2022 licenses – available in Enterprise and Standard editions. Buy from winlicense.in, an official Microsoft Reseller.",
        "itemListElement": [
          {
            "@type": "Product",
            "name": "Microsoft SQL Server Enterprise 2019 /2022",
            "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743658890/sql-server_o2hve2.png", 
            "description": "Powerful database platform for enterprise use. Buy genuine licenses at winlicense.in – Official Microsoft Reseller",
            "brand": {
              "@type": "Brand",
              "name": "microsoft"
            },
            "sku": "DG7GMGF0FKZV",
            "offers": {
              "@type": "Offer",
              "url": "https://winlicense.in/product/sql-server-2022-enterprise?quantity=1",
              "priceCurrency": "INR",
              "price": "50571",
              "priceValidUntil": "2025-06-30",
              "availability": "https://schema.org/OnlineOnly",
              "itemCondition": "https://schema.org/NewCondition"
            }
          },
          {
            "@type": "Product",
            "name": "Microsoft SQL Server Standard 2019 /2022",
            "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743658890/sql-server_o2hve2.png",
            "description": "Microsoft SQL Server Standard Edition (2019 / 2022) – Reliable database solution for mid-sized businesses. Buy genuine licenses at winlicense.in – Official Microsoft Reseller.",
            "brand": {
              "@type": "Brand",
              "name": "microsoft"
            },
            "sku": "DG7GMGF0FKZV",
            "offers": {
              "@type": "Offer",
              "url": "https://winlicense.in/product/sql-server-2022-standard?quantity=1",
              "priceCurrency": "INR",
              "price": "13191",
              "priceValidUntil": "2025-06-30",
              "availability": "https://schema.org/OnlineOnly",
              "itemCondition": "https://schema.org/NewCondition"
            }
          }
        ]
      }
      ],
      windows_11: [
        {
            "@context": "https://schema.org", 
            "@type": "ItemList",
            "name": "Windows 11 LTSC 2024 Editions",
            "description": "Genuine Microsoft Windows 11 LTSC 2024 licenses – available in Enterprise and IoT Enterprise editions. Long-term supported versions with 10-year lifecycle. Buy from winlicense.in, an official Microsoft Licensing Partner.",
            "itemListElement": [
              {
                "@type": "Product",
                "name": "Windows 11 Enterprise LTSC 2024",
                "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743658514/windows11_bexv4r.png", 
                "description": "Buy Windows 11 Enterprise LTSC 2024 – A stable, long-term version for critical systems. 10-year support. Available at winlicense.in – Official Microsoft Licensing Partner",
                "brand": {
                  "@type": "Brand",
                  "name": "microsoft"
                },
                "sku": "92NFX-8DJQP-P6BBQ-THF9C-7CG2H",
                "offers": {
                  "@type": "Offer",
                  "url": "https://winlicense.in/product/sql-server-2022-standard?quantity=1",
                  "priceCurrency": "INR",
                  "price": "25063",
                  "priceValidUntil": "2025-06-30",
                  "availability": "https://schema.org/OnlineOnly",
                  "itemCondition": "https://schema.org/NewCondition"
                }
              },
              {
                "@type": "Product",
                "name": "Windows 11 IoT Enterprise LTSC 2024",
                "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743658514/windows11_bexv4r.png",
                "description": "Buy Windows 11 IoT Enterprise LTSC 2024 – A secure, long-term version for embedded and industrial devices. 10-year support. Available at winlicense.in – Official Microsoft Licensing Partner",
                "brand": {
                  "@type": "Brand",
                  "name": "microsoft"
                },
                "sku": "92NFX-8DJQP-P6BBQ-THF9C-7CG2H",
                "offers": {
                  "@type": "Offer",
                  "url": "https://winlicense.in/product/windows-11-iot-enterprise-ltsc?quantity=1",
                  "priceCurrency": "INR",
                  "price": "25063",
                  "priceValidUntil": "2025-06-30",
                  "availability": "https://schema.org/OnlineOnly",
                  "itemCondition": "https://schema.org/NewCondition"
                }
              }
            ]
          }
          
      ]
      // Add other category schemas here
    };

    export const productSchema = {
        windows_server_2025_datacenter: [
            {
                "@context": "https://schema.org/", 
                "@type": "Product", 
                "name": "Windows Server 2025 Windows Server 2025 Datacenter",
                "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
                "description": "Datacenter Edition Built for enterprise needs, this edition offers unlimited virtualization, advanced cloud integration, and top-tier security — delivering powerful performance and scalability for modern datacenters",
                "brand": {
                  "@type": "Brand",
                  "name": "microsoft"
                },
                "sku": "WIN-SRV-2025-DATA-16C",
                "offers": {
                  "@type": "Offer",
                  "url": "https://winlicense.in/product/windows-server-2025-datacenter",
                  "priceCurrency": "INR",
                  "price": "3388",
                  "priceValidUntil": "2025-06-30",
                  "availability": "https://schema.org/InStock",
                  "itemCondition": "https://schema.org/NewCondition"
                }
              }    
    ],
    windows_server_2025_standard: [
        {
            "@context": "https://schema.org/", 
            "@type": "Product", 
            "name": "Windows Server 2025 Windows Server 2025 Standard",
            "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
            "description": "A reliable, secure, and scalable server OS designed for businesses, offering essential capabilities for modern workloads, hybrid cloud integration, and advanced security.",
            "brand": {
              "@type": "Brand",
              "name": "microsoft"
            },
            "sku": "P77104-B21",
            "offers": {
              "@type": "Offer",
              "url": "https://winlicense.in/product/windows-server-2025-standard",
              "priceCurrency": "INR",
              "price": "487",
              "priceValidUntil": "2025-06-30",
              "availability": "https://schema.org/OnlineOnly",
              "itemCondition": "https://schema.org/NewCondition"
            }
          }          
    ],
    remote_desktop_services:[
        {
            "@context": "https://schema.org/", 
            "@type": "Product", 
            "name": "Windows Server RDS - 2019 /2022 /2025",
            "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
            "description": "A reliable, secure, and scalable server OS designed for businesses, offering essential capabilities for modern workloads, hybrid cloud integration, and advanced security.",
            "brand": {
              "@type": "Brand",
              "name": "microsoft"
            },
            "sku": "6VC-03748",
            "offers": {
              "@type": "Offer",
              "url": "https://winlicense.in/product/remote-desktop-services",
              "priceCurrency": "INR",
              "price": "642",
              "priceValidUntil": "2025-06-30",
              "availability": "https://schema.org/OnlineOnly",
              "itemCondition": "https://schema.org/NewCondition"
            }
          }
          
    ],
    windows_server_2025_rms_device_cal: [{
        "@context": "https://schema.org/", 
        "@type": "Product", 
        "name": "Microsoft Windows Server RMS Device CAL-2019 /2022 /2025 ",
        "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
        "description": "Windows Server Client Access Licenses (CALs). Perfect for businesses using Windows Server environments — choose User CALs or Device CALs to suit your team size and IT needs.",
        "brand": {
          "@type": "Brand",
          "name": "microsoft"
        },
        "sku": "CSP-DG7GMGF0PWHF-0002",
        "offers": {
          "@type": "Offer",
          "url": "https://winlicense.in/product/windows-server-2025-rms-device-cal",
          "priceCurrency": "INR",
          "price": "148",
          "priceValidUntil": "2025-06-30",
          "availability": "https://schema.org/OnlineOnly",
          "itemCondition": "https://schema.org/NewCondition"
        }
      }
      ],
    windows_server_2025_rds_user_cal:[
        {
            "@context": "https://schema.org/", 
            "@type": "Product", 
            "name": "Microsoft Windows Server RMS user CAL-2019 /2022 /2025",
            "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
            "description": "This license allows individual users to access and manage protected resources on your Windows Server, ensuring compliance and data protection across your organization.",
            "brand": {
              "@type": "Brand",
              "name": "microsoft"
            },
            "sku": "CSP-DG7GMGF0PWHF-0002",
            "offers": {
              "@type": "Offer",
              "url": "https://winlicense.in/product/windows-server-2025-rds-user-cal",
              "priceCurrency": "INR",
              "price": "180",
              "priceValidUntil": "2025-06-30",
              "availability": "https://schema.org/OnlineOnly",
              "itemCondition": "https://schema.org/NewCondition"
            }
          }
          
      ],
    windows_server_2025_1_device_cal_license:[
        {
            "@context": "https://schema.org/", 
            "@type": "Product", 
            "name": "Microsoft Windows Server 1 Device CAL-2019 /2022 /2025",
            "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
            "description": "Windows Server 1 Device Client Access License (CAL) . Ideal for organizations managing shared or fixed workstations, this CAL ensures compliance and secure access to server resources like files, apps, and network services.",
            "brand": {
              "@type": "Brand",
              "name": "microsoft"
            },
            "sku": "CSP-DG7GMGF0PWHF-0002",
            "offers": {
              "@type": "Offer",
              "url": "https://winlicense.in/product/windows-server-2025-1-device-cal-license",
              "priceCurrency": "INR",
              "price": "86",
              "priceValidUntil": "2025-06-30",
              "availability": "https://schema.org/OnlineOnly",
              "itemCondition": "https://schema.org/NewCondition"
            }
          }
          
    ],
    windows_server_2025_1_user_cal_license:[
        {
            "@context": "https://schema.org/", 
            "@type": "Product", 
            "name": "Microsoft Windows Server 1 user CAL-2019 /2022 /2025",
            "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
            "description": "Windows Server 1 User Client Access License (CAL) . Ideal for organizations managing user-based access, this CAL ensures compliance and secure connectivity to server resources like files, apps, and services.",
            "brand": {
              "@type": "Brand",
              "name": "microsoft"
            },
            "sku": "CSP-DG7GMGF0PWHF-0002",
            "offers": {
              "@type": "Offer",
              "url": "https://winlicense.in/product/windows-server-2025-1-user-cal-license",
              "priceCurrency": "INR",
              "price": "102",
              "priceValidUntil": "2025-06-30",
              "availability": "https://schema.org/OnlineOnly",
              "itemCondition": "https://schema.org/NewCondition"
            }
          }
          
    ],
    windows_server_2025_1_device_cal:[
        {
            "@context": "https://schema.org/", 
            "@type": "Product", 
            "name": "Microsoft Windows Server 1 device CAL-2019 /2022 /2025 one time",
            "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
            "description": "permanent access with a one-time purchase of the Microsoft Windows Server 1 Device Client Access License (CAL) . This license allows one device to legally connect to your Windows Server environment",
            "brand": {
              "@type": "Brand",
              "name": "microsoft"
            },
            "sku": "CSP-DG7GMGF0PWHF-0002",
            "offers": {
              "@type": "Offer",
              "url": "https://winlicense.in/product/windows-server-2025-1-device-cal",
              "priceCurrency": "INR",
              "price": "3364",
              "priceValidUntil": "2025-06-30",
              "availability": "https://schema.org/OnlineOnly",
              "itemCondition": "https://schema.org/NewCondition"
            }
          }
          
    ],
    windows_server_2025_1_user_cal:[
        {
            "@context": "https://schema.org/", 
            "@type": "Product", 
            "name": "Microsoft Windows Server 1 user CAL-2019 /2022 /2025 one time",
            "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
            "description": "Get permanent access with a one-time purchase of the Microsoft Windows Server 1 User Client Access License (CAL) . This license allows one user to legally connect to your Windows Server environment",
            "brand": {
              "@type": "Brand",
              "name": "microsoft"
            },
            "sku": "CSP-DG7GMGF0PWHF-0002",
            "offers": {
              "@type": "Offer",
              "url": "https://winlicense.in/product/windows-server-2025-1-user-cal",
              "priceCurrency": "INR",
              "price": "4299",
              "priceValidUntil": "2025-06-30",
              "availability": "https://schema.org/OnlineOnly",
              "itemCondition": "https://schema.org/NewCondition"
            }
          }
    ],
    sql_server_2022_enterprise:[
        {
            "@context": "https://schema.org/", 
            "@type": "Product", 
            "name": "Microsoft SQL Server Enterprise 2019 /2022",
            "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743658890/sql-server_o2hve2.png",
            "description": "Powerful database platform for enterprise use. Buy genuine licenses at winlicense.in – Official Microsoft Reseller",
            "brand": {
              "@type": "Brand",
              "name": "microsoft"
            },
            "sku": "DG7GMGF0FKZV",
            "offers": {
              "@type": "Offer",
              "url": "https://winlicense.in/product/sql-server-2022-enterprise",
              "priceCurrency": "INR",
              "price": "50571",
              "priceValidUntil": "2025-06-30",
              "availability": "https://schema.org/OnlineOnly",
              "itemCondition": "https://schema.org/NewCondition"
            }
          }          
    ],
    sql_server_2022_standard:[
        {
            "@context": "https://schema.org/", 
            "@type": "Product", 
            "name": "Microsoft SQL Server Standard 2019 /2022",
            "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743658890/sql-server_o2hve2.png",
            "description": "Microsoft SQL Server Standard Edition (2019 / 2022) – Reliable database solution for mid-sized businesses. Buy genuine licenses at winlicense.in – Official Microsoft Reseller.",
            "brand": {
              "@type": "Brand",
              "name": "microsoft"
            },
            "sku": "DG7GMGF0FKZV",
            "offers": {
              "@type": "Offer",
              "url": "https://winlicense.in/product/sql-server-2022-standard",
              "priceCurrency": "INR",
              "price": "13191",
              "priceValidUntil": "2025-06-30",
              "availability": "https://schema.org/OnlineOnly",
              "itemCondition": "https://schema.org/NewCondition"
            }
          }
          
    ],
    windows_11_ltsc_2024_upgrade:[
        {
            "@context": "https://schema.org/", 
            "@type": "Product", 
            "name": "Windows 11 Enterprise LTSC 2024",
            "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743658514/windows11_bexv4r.png",
            "description": "Buy Windows 11 Enterprise LTSC 2024 – A stable, long-term version for critical systems. 10-year support. Available at winlicense.in – Official Microsoft Licensing Partner",
            "brand": {
              "@type": "Brand",
              "name": "microsoft"
            },
            "sku": "92NFX-8DJQP-P6BBQ-THF9C-7CG2H",
            "offers": {
              "@type": "Offer",
              "url": "https://winlicense.in/product/sql-server-2022-standard",
              "priceCurrency": "INR",
              "price": "25063",
              "priceValidUntil": "2025-06-30",
              "availability": "https://schema.org/OnlineOnly",
              "itemCondition": "https://schema.org/NewCondition"
            }
          }          
    ],
    windows_11_iot_enterprise_ltsc:[
        {
            "@context": "https://schema.org/", 
            "@type": "Product", 
            "name": "Windows 11 IoT Enterprise LTSC 2024",
            "image": "https://res.cloudinary.com/daggx9p24/image/upload/v1743658514/windows11_bexv4r.png",
            "description": "Buy Windows 11 IoT Enterprise LTSC 2024 – A secure, long-term version for embedded and industrial devices. 10-year support. Available at winlicense.in – Official Microsoft Licensing Partner",
            "brand": {
              "@type": "Brand",
              "name": "microsoft"
            },
            "sku": "92NFX-8DJQP-P6BBQ-THF9C-7CG2H",
            "offers": {
              "@type": "Offer",
              "url": "https://winlicense.in/product/windows-11-iot-enterprise-ltsc",
              "priceCurrency": "INR",
              "price": "25063",
              "priceValidUntil": "2025-06-30",
              "availability": "https://schema.org/OnlineOnly",
              "itemCondition": "https://schema.org/NewCondition"
            }
          }
    ]
}