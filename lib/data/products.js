export const products = [
  {
    id: 1,
    name: "Datacenter",
    Year: "2019 /2022 /2025",
    description: "Optimized for heavily virtualized datacenters and scalable cloud deployments",
    metadescription: "Windows Server 2025 Datacenter is designed for heavily virtualized datacenters and scalable cloud deployments, offering advanced features and high scalability.",
    img: "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
    productimg:"https://res.cloudinary.com/daggx9p24/image/upload/v1749789465/windows-server-2025-_ddst0c.png",
    slug: "windows-server-2025-datacenter",
    pricingModel: "core-based",
    category: "Windows Server",
    sku:"WIN-SRV-2025-DATA-16C",
    min:1,
    max: 10000000,
    license: {
      minCores: 2,
      maxCores: 10000000,
      coreIncrement: 2,
      label: "Cores",
      coresPerLicense: 2
    },
    licenseTypes: {
       "Licensed": {
        basePricePer2Cores: 71898,
        billingOptions: {
          yearlyCommitMonthlyBilling: 3388,
          yearlyCommitYearlyBilling: 40651,
          threeYearCommitYearlyBilling: 28320,
          threeYearCommitThreeYearsBilling: 84961,

        }
      },
      "Perpetual": {
        basePricePer2Cores: 71898,
        billingOptions: {}
      }
    },
    features: [
      "4 PB for hosts that support 5-level paging",
      "256 TB for hosts that support 4-level paging",
      "2 virtual machines, plus 1 Hyper-V host per license",
      "Unlimited Windows containers and up to two Hyper-V containers",
      "1 partnership and 1 resource group with a single 2TB volume",
    ]
  },
  {
    id: 2,
    name: "Standard",
    Year: "2019 /2022 /2025",
    description: "Optimized for physical setups and lightly virtualized workloads",
    metadescription: "Windows Server 2025 Standard is designed for physical setups and lightly virtualized workloads, offering basic features and low cost.",
    img: "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
    productimg:"https://res.cloudinary.com/daggx9p24/image/upload/v1749789510/generate_product_standard_ima_jo1huc.png",
    slug: "windows-server-2025-standard",
    category: "Windows Server",
    sku:"P77104-B21",
    min:1,
    max: 10000000,
    license: {

      minCores: 2,
      maxCores: 10000000,
      coreIncrement: 2,
      label: "Cores",
      coresPerLicense: 2
    },
    pricingModel: "core-based",
    licenseTypes: {
      "Licensed": {
        basePricePer2Cores: 12523,
        billingOptions: {
          yearlyCommitMonthlyBilling: 487,
          yearlyCommitYearlyBilling: 5841,
          threeYearCommitYearlyBilling: 4977,
          threeYearCommitThreeYearsBilling: 14929
        }
      },
            "Perpetual": {
        basePricePer2Cores: 12523,
        billingOptions: {}
      },
    },
    features: [
      "4 PB for hosts that support 5-level paging",
      "256 TB for hosts that support 4-level paging",
      "unlimited virtual machines, plus 1 Hyper-V host per license",
      "Unlimited Windows containers and Hyper-V containers",
      "unlimited partnerships and resource groups",
    ]
  },
   {
    id: 3,
    name: "Windows RDS",
    metatitle: "Windows Server RMS User CAL 2019/2022/2025 - Rights Management License",
    Year: "2019 /2022 /2025",
    description: "CAL for Remote Desktop Services per user",
    metadescription: "Windows Server 2025 Remote Desktop Services User CAL allows users to access Remote Desktop Services, providing secure remote access to applications and desktops.",
    img: "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
    productimg:"https://res.cloudinary.com/daggx9p24/image/upload/v1749732610/product_image_for_Wi_jq0xpj.png",
    slug: "remote-desktop-services",
    pricingModel: "fixed",
    category: "Windows Server RDS",
    sku:"6VC-03748",
    min:1,
    max: 10000000,
    users: {
      min: 1,
      max: 10000000
    },
    packages: [
      {
        type: "1 Year License",
        billingOptions: {
          yearlyCommitMonthlyBilling: 642,
          yearlyCommitYearlyBilling: 7700,
          threeYearCommitYearlyBilling: 5709,
          threeYearCommitThreeYearsBilling: 17128
        },
      }
    ],
    features: [
      "Securely connect remote users",
      "Get access from managed or unmanaged devices",
      "Connect to session-based or virtual-machine-based desktops",
      "Use datacenter apps within corporate networks or from the internet",
    ]
  },
  {
    id: 4,
    name: "RMS - Device CAL",
    Year: "2019 /2022 /2025",
    description: "Rights Management Services license for device",
    metadescription: "Windows Server 2025 Remote Desktop Services Device CAL allows devices to access Remote Desktop Services, providing secure remote access to applications and desktops.",
    img: "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
    productimg:"https://res.cloudinary.com/daggx9p24/image/upload/v1749732960/generate_product_ima_kf3mpf.png",
    slug: "windows-server-2025-rms-device-cal",
    pricingModel: "fixed",
    category: "Windows Server CAL",
    sku: "CSP-DG7GMGF0PWHF-0002",
    min:1,
    max: 10000000,
    device: {
      min: 1,
      max: 10000000
    },
    packages: [
      {
        type: "1 Year License",
        billingOptions: {
          yearlyCommitMonthlyBilling: 148,
          yearlyCommitYearlyBilling: 1775,
          threeYearCommitYearlyBilling: 1745,
          threeYearCommitThreeYearsBilling: 5233
        },
        
      }
    ],
    features: [
      "Securely connect remote users",
      "Get access from managed or unmanaged devices",
      "Connect to session-based or virtual-machine-based desktops",
      "Use datacenter apps within corporate networks or from the internet",
    ]
  },
    {
    id: 5,
    name: "RMS - User CAL",
    Year: "2019 /2022 /2025",
    description: "Rights Management Services license for device",
    metadescription: "Windows Server 2025 Remote Desktop Services User CAL allows users to access Remote Desktop Services, providing secure remote access to applications and desktops.",
    img: "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
    productimg:"https://res.cloudinary.com/daggx9p24/image/upload/v1749733050/generate_product_user_cal_ima_ozoept.png",
    slug: "windows-server-2025-rds-user-cal",
    pricingModel: "fixed",
    sku:"CSP-DG7GMGF0PWHF-0002",
    category: "Windows Server CAL",
     min:1,
    max: 10000000,
    device: {
      min: 1,
      max: 10000000
    },
    packages: [
      {
        type: "1 Year License",
        billingOptions: {
          yearlyCommitMonthlyBilling: 180,
          yearlyCommitYearlyBilling: 2150,
          threeYearCommitYearlyBilling: 2150,
          threeYearCommitThreeYearsBilling: 6448
        },
        
      }
    ],
    features: [
       "Securely connect remote users",
      "Get access from managed or unmanaged devices",
      "Connect to session-based or virtual-machine-based desktops",
      "Use datacenter apps within corporate networks or from the internet",
    ]
  },
  {
    id: 6,
    name: "1 Device CAL",
    Year: "2019 /2022 /2025",
    description: "Client Access License for one device to access Windows Server - yearly license",
    metadescription: "Windows Server 2025 Device CAL allows a single device to access Windows Server, providing secure remote access to applications and desktops.",
    img: "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
    productimg:"https://res.cloudinary.com/daggx9p24/image/upload/v1749732960/generate_product_ima_kf3mpf.png",
    slug: "windows-server-2025-1-device-cal-license",
    category: "Windows Server CAL",
    sku: "CSP-DG7GMGF0PWHF-0002",
    pricingModel: "fixed",
     min:1,
    max: 10000000,
    license: {
      min: 1,
      max: 10000000
    },
    packages: [
      {
        type: "1 Year License",
        billingOptions: {
          yearlyCommitMonthlyBilling: 86,
          yearlyCommitYearlyBilling: 1028,
          threeYearCommitYearlyBilling: 1028,
        },
        
      }
    ],
    features: [
          "Securely connect remote users",
      "Get access from managed or unmanaged devices",
      "Connect to session-based or virtual-machine-based desktops",
      "Use datacenter apps within corporate networks or from the internet",
        ]
  },
  {
    id: 7,
    name: "1 User CAL",
    Year: "2019 /2022 /2025",
    description: "Client Access License for one user to access Windows Server - yearly license",
    metadescription: "Windows Server 2025 User CAL allows a single user to access Windows Server, providing secure remote access to applications and desktops.",
    img: "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
    productimg:"https://res.cloudinary.com/daggx9p24/image/upload/v1749733050/generate_product_user_cal_ima_ozoept.png",
    slug: "windows-server-2025-1-user-cal-license",
    category: "Windows Server CAL",
    sku: "CSP-DG7GMGF0PWHF-0002",
    pricingModel: "fixed",
     min:1,
    max: 10000000,
    license: {
      min: 1,
      max: 10000000
    },
    packages: [
       {
        type: "1 Year License",
        billingOptions: {
          yearlyCommitMonthlyBilling: 102,
          yearlyCommitYearlyBilling: 1214,
          threeYearCommitYearlyBilling: 1217
        },
        
      }

    ],
    features: [
           "Securely connect remote users",
      "Get access from managed or unmanaged devices",
      "Connect to session-based or virtual-machine-based desktops",
      "Use datacenter apps within corporate networks or from the internet",
        ]
  },
  {
    id: 8,
    name: "1 Device CAL",
    Year: "2019 /2022 /2025",
    description: "Client Access License for one device to access Windows Server",
    metadescription: "Windows Server 2025 Device CAL allows a single device to access Windows Server, providing secure remote access to applications and desktops.",
    img: "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
    productimg:"https://res.cloudinary.com/daggx9p24/image/upload/v1749732960/generate_product_ima_kf3mpf.png",
    slug: "windows-server-2025-1-device-cal",
    category: "Windows Server CAL",
    sku:"CSP-DG7GMGF0PWHF-0002",
    pricingModel: "fixed",
     min:1,
    max: 10000000,
    license: {
      min: 1,
      max: 10000000
    },
    packages: [
      {
        type: "Perpetual License",
        oneTime: 3364,
        
      }
    ],
    features: [
          "Securely connect remote users",
      "Get access from managed or unmanaged devices",
      "Connect to session-based or virtual-machine-based desktops",
      "Use datacenter apps within corporate networks or from the internet",
        ]
  },
  {
    id: 9,
    name: "1 User CAL",
    Year: "2019 /2022 /2025",
    description: "Client Access License for one user to access Windows Server",
    metadescription: "Windows Server 2025 User CAL allows a single user to access Windows Server, providing secure remote access to applications and desktops.",
    img: "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png",
    productimg:"https://res.cloudinary.com/daggx9p24/image/upload/v1749733050/generate_product_user_cal_ima_ozoept.png",
    slug: "windows-server-2025-1-user-cal",
    category: "Windows Server CAL",
    sku:"CSP-DG7GMGF0PWHF-0002",
    pricingModel: "fixed",
     min:1,
    max: 10000000,
    license: {
      min: 1,
      max: 10000000
    },
    packages: [
      {
        type: "Perpetual License",
        oneTime: 4299,
        
      },

    ],
    features: [
           "Securely connect remote users",
      "Get access from managed or unmanaged devices",
      "Connect to session-based or virtual-machine-based desktops",
      "Use datacenter apps within corporate networks or from the internet",
        ]
  },
  {
    id: 10,
    name: "Enterprise",
    Year: "2019 /2022",
    description: "Designed for organizations needing maximum scalability.",
    metadescription: "SQL Server 2022 Enterprise is designed for organizations needing maximum scalability, offering advanced features and high performance for large databases.",
    img: "https://res.cloudinary.com/daggx9p24/image/upload/v1743658890/sql-server_o2hve2.png",
    productimg:"https://res.cloudinary.com/daggx9p24/image/upload/v1749733593/generate_an_image_fo_tucpig.png",
    slug: "sql-server-2022-enterprise",
   pricingModel: "core-based",
    category: "SQL Server",
    sku:"DG7GMGF0FKZV",
     min:1,
    max: 10000000,
    license: {
      minCores: 2,
      maxCores: 10000000,
      coreIncrement: 2,
      label: "Cores",
      coresPerLicense: 2
    },
    licenseTypes: {
       "Licensed": {
        basePricePer2Cores: 1284859,
        billingOptions: {
          yearlyCommitMonthlyBilling: 50571,
          yearlyCommitYearlyBilling: 606841,
        }
      },
      "Perpetual": {
        basePricePer2Cores: 1284859,
        billingOptions: {}
      }
    },
    features: [
      "Operating system maximum compute capacity",
    "Advanced memory buffer pool support",
    "Unlimited Columnstore segment cache",
    "Optimized for large relational databases",
    "Comprehensive Reporting & Analysis Services"

    ]
  },
  {
    id: 11,
    name: "Standard",
    Year: "2019 /2022",
    description: "Optimized for businesses requiring reliable performance.",
    metadescription: "SQL Server 2022 Standard is optimized for businesses requiring reliable performance, offering essential features for mid-range relational databases.",
    img: "https://res.cloudinary.com/daggx9p24/image/upload/v1743658890/sql-server_o2hve2.png",
    productimg:"https://res.cloudinary.com/daggx9p24/image/upload/v1749733282/generate_image_for_S_cs8vrr.png",
    slug: "sql-server-2022-standard",
   pricingModel: "core-based",
    category: "SQL Server",
    sku:"DG7GMGF0FKZV",
     min:1,
    max: 10000000,
    license: {
      minCores: 2,
      maxCores: 10000000,
      coreIncrement: 2,
      label: "Cores",
      coresPerLicense: 2
    },
    licenseTypes: {
       "Licensed": {
        basePricePer2Cores: 83925,
        billingOptions: {
          yearlyCommitMonthlyBilling: 13191,
          yearlyCommitYearlyBilling: 158284,
        }
      },
      "Perpetual": {
        basePricePer2Cores: 83925,
        billingOptions: {}
      }
    },
    features: [
       "Limited to 4 sockets or 16 cores compute capacity",
    "128 GB memory buffer pool support",
    "32 GB Columnstore segment cache",
    "Optimized for mid-range relational databases",
    "Robust Reporting & Analysis Services"

    ]
  },
   {
    id: 12,
    name: "Enterprise LTSC 2024 Upgrade",
    description: "Long-Term Servicing Channel version of Windows 11",
    metadescription: "Windows 11 Enterprise LTSC 2024 Upgrade is the Long-Term Servicing Channel version of Windows 11, designed for specialized devices and environments requiring long-term stability.",
    img: "https://res.cloudinary.com/daggx9p24/image/upload/v1743658514/windows11_bexv4r.png",
    productimg:"https://res.cloudinary.com/daggx9p24/image/upload/v1749788926/Enterprise_LTSC_2024_gqccul.png",
    slug: "windows-11-ltsc-2024-upgrade",
    pricingModel: "fixed",
    category: "Windows 11",
    sku: "92NFX-8DJQP-P6BBQ-THF9C-7CG2H",
    Year: "2024 /2025",
     min:1,
    max: 10000000,
    license: {
      min: 1,
      max: 10000000
    },
    packages: [
      {
        type: "Perpetual License",
        oneTime: 25063,
        
      }
    ],
    features: ["advanced protection against modern security threats", "comprehensive device management", "app management", "control capabilities"]
  },
  {
    id: 13,
    name: "IoT Enterprise LTSC 2024",
    description: "Windows for embedded and IoT devices",
    metadescription: "Windows 11 IoT Enterprise LTSC 2024 is designed for embedded and IoT devices, providing long-term support and specialized features for industrial applications.",
    img: "https://res.cloudinary.com/daggx9p24/image/upload/v1743658514/windows11_bexv4r.png",
    productimg:"https://res.cloudinary.com/daggx9p24/image/upload/v1749789263/IoT_Enterprise_LTSC_j2sgio.png",
    slug: "windows-11-iot-enterprise-ltsc",
    pricingModel: "fixed",
    Year: "2024 /2025",
    category: "Windows 11",
    sku:"92NFX-8DJQP-P6BBQ-THF9C-7CG2H",
     min:1,
    max: 10000000,
    license: {
      min: 1,
      max: 10000000
    },
    packages: [
      {
        type: "Perpetual License",
        oneTime: 25063,
        
      }
    ],
    features: ["advanced protection against modern security threats", "comprehensive device management", "app management", "control capabilities"]
  }
  
];

export const categories = [
  {
    name: "Windows Server",
    metatitle:"Windows Server 2019 / 2022 / 2025 – Powerful Server OS Solutions",
    metadescription:"Explore Windows Server 2019, 2022, and 2025 – advanced server operating systems for secure, scalable, and flexible IT infrastructure management.",
    slug: "windows-server-2025",
    Year: "2019 /2022 /2025",
    description: "Server operating systems and services",
    img: "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png"
  },
  {
    name: "Windows Server RDS",
    metatitle:"Windows Server RDS 2019 / 2022 / 2025 – Remote Desktop Services CAL",
    metadescription:"Get Client Access Licenses (CALs) for Windows Server RDS 2019, 2022, and 2025 to enable secure and efficient remote desktop access for users.",
    Year: "2019 /2022 /2025",
    slug: "windows-server-2025-rds",
    description: "Client Access Licenses for Windows Server",
    img: "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png"
  },
  {
    name: "Windows Server CAL",
    metatitle:"Windows Server CAL 2019 / 2022 / 2025 – Client Access Licenses",
    metadescription:"Purchase Windows Server CALs for 2019, 2022, and 2025 to provide licensed access for users and devices to connect to Windows Server environments.",
    Year: "2019 /2022 /2025",
    slug: "windows-server-2025-cal",
    description: "Client Access Licenses for Windows Server",
    img: "https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png"
  },
  {
    name: "SQL Server",
    metatitle:"SQL Server 2019 / 2022 – Reliable Database Management Solutions",
    metadescription:"Discover Microsoft SQL Server 2019 and 2022 – robust database platforms for efficient data storage, analysis, and business intelligence.",
    slug: "sql-server-2022",
    Year: "2019 /2022",
    description: "Database management systems",
    img: "https://res.cloudinary.com/daggx9p24/image/upload/v1743658890/sql-server_o2hve2.png"
  },
  {
    name: "Windows 11",
    metatitle:"Meta Title: Windows 11 – Modern and Secure Operating System",
    metadescription:"Upgrade to Windows 11 – the latest Microsoft OS with a redesigned interface, improved performance, and advanced security features for all users.",
    slug: "windows-11",
    description: "Latest Windows operating system",
    img: "https://res.cloudinary.com/daggx9p24/image/upload/v1743658514/windows11_bexv4r.png"
  }
];