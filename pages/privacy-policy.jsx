import Head from "next/head";

const PrivacyPolicy = () => {
  return (
    <> 
    <Head>
        <title>Learn About Our Privacy Policy | WinLicense</title>
        <meta
          name="description"
          content="Discover WinLicense's commitment to privacy protection for your data"
        />
        <link rel="canonical" href="https://winlicense.in/privacy-policy" />
      </Head>
    <main className="bg-white text-neutral-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-600">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            <strong>Effective Date:</strong> July 11, 2025
          </p>
        </div>

        {/* Intro */}
        <section className="text-base leading-relaxed space-y-4">
          <p>
            At WinLicense.in, your privacy is a top priority. This Privacy
            Policy explains how we collect, use, and protect your personal
            information. By using our website, you agree to the terms of this
            policy.
          </p>
        </section>

        {/* Content Sections */}
        <div className="space-y-12 text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              What Information We Collect
            </h2>
            <p>
             We collect basic information needed to deliver our services. This includes your name, company name, address, email, phone number, GST number (if applicable), and payment details. We may also collect information related to domain or software licenses.
            </p>
            <p className="mt-2">
              When you use our website, we automatically gather data like your IP address, browser type, pages you visit, and the date and time of your visit. This helps us understand how our website is used and improve your experience
            </p>
            <p className="mt-2">
              We also use Google Analytics to track site performance, and social media plugins like Facebook buttons. These tools may collect additional data such as your IP address and browser activity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              How We Use Your Information
            </h2>
            <p>
              Your data helps us process orders, send confirmations, and
              provide customer support. We may notify you of critical service
              changes or legal updates — but we do not send promotional emails.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Who We Share Your Information With
            </h2>
            <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
              <li>Trusted service providers who help us process payments, host our website, or support our systems.</li>
              <li>Authorized resellers,if you purchase software through a third-party Windows reseller</li>
              <li>Licensing authorities like Microsoft or ICANN are required for registration or product activation.</li>
              <li>Legal authorities may only when required by law, court order, or to protect our rights.</li>
            </ul>
            <p className="mt-2 text-gray-700">
              We do <strong>not</strong> sell your information to third parties
              or advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              How We Protect Your Data
            </h2>
            <p>
              Sensitive information is encrypted with SSL and protected using
              firewalls, access controls, and security best practices. However,
              no system is 100% secure — we recommend using strong passwords and
              safe browsing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Payments and Account Suspension
            </h2>
            <p>
             If a payment is missed or delayed, your services may be paused or restricted. This means license delivery could be delayed, or access may be temporarily revoked until payment is completed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              How Long We Keep Your Data
            </h2>
            <p>
             We keep your data only as long as necessary to deliver our services or to meet legal requirements. If you stop using our services, you can ask us to delete your data—unless the law requires us to keep it longer for things like audits or taxes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Reseller Clients
            </h2>
            <p>
              If you bought from a certified Windows reseller, they may access
              your data for support and processing. We only access such data
              when required. All resellers are expected to follow strict privacy
              standards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your Privacy Rights (India & Abroad)
            </h2>
            <p>
              If you're in India, we follow the Information Technology Act, 2000, which includes rules on the secure handling of personal data.
            </p>
            <p className="mt-2">
              If you're outside India, we respect your local privacy laws, including the GDPR in the European Union. We use secure methods when transferring data across borders and keep your privacy protected globally.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Cookies and Tracking Tools
            </h2>
            <p>
             We use cookies to make your experience better. Cookies help us remember your preferences and analyze how you use our website. Tools like Google Analytics use cookies for tracking
            </p>
            <p className="mt-2">
              You can manage or delete cookies through your browser settings at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy in the future. If we do, we’ll post the updated version on our website and change the effective date at the top. We recommend checking this page regularly to stay informed.
            </p>
          </section>

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
      </div>
    </main>
    </>
  );
};

export default PrivacyPolicy;
