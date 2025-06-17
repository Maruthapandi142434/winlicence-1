import Link from "next/link"
import Image from "next/image"

export default function ProductGrid() {
  return (
    <section className="py-6 ">
      <div className=" px-2">
        <div className="max-w-7xl mx-auto">
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature Card - Larger (spans 3 rows) */}
            <div className="rounded-3xl md:row-span-3 flex flex-col justify-between product-grid-1 transition-all duration-300hover:shadow-xl hover:-translate-y-1">
                     <Image src="https://res.cloudinary.com/daggx9p24/image/upload/v1748406824/windows-product_cew5cz.png" width={412} height={552} className="product-grid-img" alt=""  />
                     <div className="p-8">
                <span className="text-sm font-medium text-gray-800">Build</span>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">Grow Your Business</h2>
                <p className="mt-4 text-black text-left">
                  Use trusted Microsoft apps to build your business, enhance productivity, and deliver more value to your customers.
                </p>
                <div className="mt-8">
                <Link
                  href="/product"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  View all
                </Link>
              </div>
              </div>
              
            </div>

            {/* Product Card - Windows 10 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border hover:border-blue-100">
              <div className="mb-4">
                <Image
                  src="https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png"
                  alt="Windows Server 2025"
                  width={60}
                  height={60}
                  className="rounded-lg transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">Windows Server 2025
Windows Server 2025</h3>
              <p className="mt-2 text-gray-800 text-wrap2 text-left">server operating system designed for secure, scalable enterprise solutions...</p>
              <Link 
                href="/product/category/windows-server-2025" 
                className="mt-2 inline-block text-blue-600 font-medium hover:underline hover:text-blue-700"
              >
                Buy Now
              </Link>
            </div>

            {/* Product Card - Windows 10/11 Enterprise */}
            <div className="bg-white rounded-3xl p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border hover:border-blue-100">
              <div className="mb-4">
                <Image
                  src="https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png"
                  alt="Windows Server 2025 RDS CAL"
                  width={60}
                  height={60}
                  className="rounded-lg transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">Windows Server 2025 RDS CAL</h3>
              <p className="mt-2 text-gray-800 text-wrap2 text-left">Remote Desktop Services Client Access License for streamlined business connectivity...</p>
              <Link 
                href="/product/category/windows-server-2025-rds" 
                className="mt-2 inline-block text-blue-600 font-medium hover:underline hover:text-blue-700"
              >
                Buy Now
              </Link>
            </div>

            {/* Product Card - Windows Server RDS */}
            <div className="bg-white rounded-3xl p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border hover:border-blue-100">
              <div className="mb-4">
                <Image
                  src="https://res.cloudinary.com/daggx9p24/image/upload/v1743659055/Windows_Server_ndgvzy.png"
                  alt="Windows 11"
                  width={60}
                  height={60}
                  className="rounded-lg transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">Windows Server 2025 CAL</h3>
              <p className="mt-2 text-gray-800 text-wrap2 text-left">Essential access licenses enabling users to connect to Windows Server 2025 securely...</p>
              <Link 
                href="/product/category/windows-server-2025-cal" 
                className="mt-2 inline-block text-blue-600 font-medium hover:underline hover:text-blue-700"
              >
                Buy Now
              </Link>
            </div>

            {/* Product Card - SQL Server 2022 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border hover:border-blue-100">
              <div className="mb-4">
                <Image
                  src="https://res.cloudinary.com/daggx9p24/image/upload/v1743658890/sql-server_o2hve2.png"
                  alt="SQL Server 2022"
                  width={60}
                  height={60}
                  className="rounded-lg transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">SQL Server 2022</h3>
              <p className="mt-2 text-gray-800 text-wrap2 text-left">A high-performance database management system for reliable data processing and analytics...</p>
              <Link 
                href="/product/category/sql-server-2022" 
                className="mt-2 inline-block text-blue-600 font-medium hover:underline hover:text-blue-700"
              >
                Buy Now
              </Link>
            </div>

            {/* Product Card - Windows Server 2019/2022 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border hover:border-blue-100">
              <div className="mb-4">
                <Image
                  src="https://res.cloudinary.com/daggx9p24/image/upload/v1743658514/windows11_bexv4r.png"
                  alt="Microsoft Teams Premium"
                  width={60}
                  height={60}
                  className="rounded-lg transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 te">Windows 10/11</h3>
              <p className="mt-2 text-gray-800 text-wrap2 text-left">The latest Windows OS, delivering modern UI and powerful performance....</p>
              <Link 
                href="/product/category/windows-11" 
                className="mt-2 inline-block text-blue-600 font-medium hover:underline hover:text-blue-700"
              >
                Buy Now
              </Link>
            </div>

            {/* Product Card - Office 365 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border hover:border-blue-100">
              <div className="mb-4">
                <Image
                  src="https://res.cloudinary.com/daggx9p24/image/upload/v1743658514/windows11_bexv4r.png"
                  alt="Office 365"
                  width={60}
                  height={60}
                  className="rounded-lg transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">Windows 11 Enterprise</h3>
              <p className="mt-2 text-gray-800 text-wrap2 text-left">A business-focused operating system offering advanced security, productivity tools, and IT management features for large organizations. Let me know if you need further refinements
...</p>
              <Link 
                href="/product/category/windows-11" 
                className="mt-2 inline-block text-blue-600 font-medium hover:underline hover:text-blue-700"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}