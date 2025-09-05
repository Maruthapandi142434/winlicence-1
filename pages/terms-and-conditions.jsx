import Head from "next/head";

const Terms = () => {
  return (
    <>
     <Head>
        <title>Terms & Conditions - WinLicense</title>
        <meta
          name="description"
          content="Read the Terms and Conditions for using WinLicense's website and services, including software license policies, user obligations, and liabilities.."
        />
        <link rel="canonical" href="https://winlicense.in/terms-and-conditions" />
      </Head>
    <main className="bg-white text-neutral-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-600">
            Terms & Conditions
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            <strong>Effective Date:</strong> July 11, 2025
          </p>
        </div>

        {/* Intro */}
        <section className="text-base leading-relaxed">
          <p>
            Welcome to WinLicense. These Terms & Conditions outline the rules
            and guidelines for using our website and services. By accessing or
            purchasing from our site, you agree to these terms. Please read
            them carefully.
          </p>
        </section>

        {/* Sections */}
        <div className="space-y-12">
          {[
            {
              heading: "1. About Our Services",
              content: [
                "WinLicense.in offers genuine software licenses for Microsoft Windows Server and related products. These licenses are delivered digitally via email or client dashboard after order confirmation and payment.",
                "All products listed are subject to availability and verification.",
              ],
            },
            {
              heading: "2. User Responsibilities",
              content: [
                "When using our website, you agree to:",
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Provide accurate and up-to-date information</li>
                  <li>Use our products and services only for lawful purposes</li>
                  <li>Not misuse or attempt unauthorized access to our systems</li>
                  <li>Maintain the confidentiality of your account login details</li>
                </ul>,
              ],
            },
            {
              heading: "3. Order & Payment Terms",
              content: [
                "All purchases are confirmed only after full payment is received. Payment must be made through the approved methods listed on our website. WinLicense.in reserves the right to cancel or delay orders for any reason, including verification failures.",
                "Once payment is confirmed, license keys are typically delivered within the promised timeframe, unless there is a technical delay.",
              ],
            },
            {
              heading: "4. License Usage",
              content: [
                "Licenses sold through our platform are subject to the terms and conditions of the software vendor (e.g., Microsoft). By using a license key, you agree to those third-party terms.",
                "You may not resell, redistribute, or use license keys in ways not authorized by the vendor.",
              ],
            },
            {
              heading: "5. Limitation of Liability",
              content: [
                "WinLicense.in is not liable for:",
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Losses resulting from incorrect software usage</li>
                  <li>Compatibility issues with unsupported hardware or systems</li>
                  <li>Data loss due to improper installation or software misuse</li>
                  <li>Delays caused by third-party services or vendors</li>
                </ul>,
                "Our liability is limited strictly to the amount paid for the license purchased.",
              ],
            },
            {
              heading: "6. Intellectual Property",
              content: [
                "All content on WinLicense.in, including logos, product listings, text, and graphics, is the property of Sixth Star Technologies or its licensors. You may not copy, modify, or distribute our content without written permission.",
              ],
            },
            {
              heading: "7. Termination",
              content: [
                "We reserve the right to suspend or terminate your account or access to services if you violate any of these terms. In such cases, no refunds will be provided unless legally required.",
              ],
            },
            {
              heading: "8. Changes to Terms",
              content: [
                "We may update these terms from time to time. Updated versions will be posted on this page, and continued use of our services implies acceptance of the revised terms.",
              ],
            },
          ].map((section, idx) => (
            <section key={idx} className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">{section.heading}</h2>
              {section.content.map((para, i) => (
                <p key={i} className="text-gray-700">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* Contact */}
        <section className="pt-8 border-t mt-10">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Contact Us</h2>
          <p className="text-gray-700">
            Have questions about these terms? Reach us at:
          </p>
          <p className="mt-1">
            Email:{" "}
            <a
              href="mailto:sales@sixthstar.in"
              className="text-blue-600 underline hover:text-blue-800"
            >
              sales@sixthstar.in
            </a>{" "}
            |{" "}
            <a
              href="mailto:support@sixthstar.in"
              className="text-blue-600 underline hover:text-blue-800"
            >
              support@sixthstar.in
            </a>
          </p>
        </section>
      </div>
    </main>
    </>
  );
};

export default Terms;
