import Head from "next/head";


const RefundPolicy = () => {
  return (<>  
  <Head>
        <title>No Refunds on Activated Licenses: WinLicense Policy</title>
        <meta
          name="description"
          content="Discover WinLicense's refund and subscription cancellation policies. No refunds are available post-license issuance."
        />
        <link rel="canonical" href="https://winlicense.in/refund-policy" />
      </Head>
    <main className="bg-white text-neutral-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-600">
            Refund Policy
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            <strong>Effective Date:</strong> July 11, 2025
          </p>
        </div>

        {/* Intro */}
        <section className="text-base leading-relaxed space-y-4">
          <p>
            At WinLicense.in, we offer genuine software licenses and
            subscription-based services. Please read this policy carefully to
            understand our terms related to refunds and cancellations.
          </p>
        </section>

        {/* Sections */}
        <div className="space-y-12 text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              1. Digital Products Are Non-Refundable
            </h2>
            <p className="text-gray-700 mb-2">
              
          All license purchases are for digital products. Once your payment is completed and activation details are shared with you (via email or client dashboard), no refund will be issued under any circumstances
               
            </p>
            <h2>You agree and acknowledge that:</h2>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2 text-gray-700">
              <li>License keys are non-returnable digital goods</li>
              <li>Once activation details are provided, the sale is final.</li>
              <li>
                No refunds for change of mind, wrong product, or incompatibility.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              2. Subscription Cancellation Terms
            </h2>
            <p className="text-gray-700 mb-2">If you are subscribed to a monthly or yearly plan, you can cancel your subscription at any time before the next billing cycle starts. The service will remain active until the end of your current paid period.</p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2 text-gray-700">
              <li>No refunds on canceled subscriptions</li>
              <li>Cancel before renewal date to avoid automatic billing</li>
              <li>Mid-term cancellations apply from the next cycle</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              3. Yearly Subscription with Monthly Payouts
            </h2>
            <p className="text-gray-700 mb-2">If you choose a yearly subscription with a monthly payment plan, you commit to the full one-year term. Canceling early may result in early termination charges.</p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2 text-gray-700">
              <li>
                You may cancel anytime, but if canceled early, dues or exit fees
                apply
              </li>
              <li>
                Early cancellation = Remaining unpaid months or pre-agreed exit
                fee
              </li>
              <li>These charges are final and non-negotiable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              4. No Refund in the Following Cases
            </h2>
            <h2>Refunds are not applicable in the following scenarios:</h2>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2 text-gray-700">
              <li>License key has been activated or shared</li>
              <li>Wrong product selection</li>
              <li>Incompatibility with system</li>
              <li>Failure to follow activation steps</li>
              <li>Refusal to cooperate with support</li>
              <li>Chargeback after license delivery</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              5. Chargebacks
            </h2>
            <p className="text-gray-700 mb-2">
              Initiating a chargeback after receiving a valid license violates our
              policy and may result in:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2 text-gray-700">
              <li>Account suspension</li>
              <li>License deactivation</li>
              <li>Legal action</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              6. Contact for Support or Cancellations
            </h2>
            <p className="text-gray-700">
              Email:{' '}
              <a
                className="text-blue-600 underline hover:text-blue-800"
                href="mailto:support@sixthstar.in"
              >
                support@sixthstar.in
              </a>
              <br />
              If you have any issues with your subscription or want to cancel it, reach out to us with your order ID and reason for cancellation.
            </p>
          </section>
        </div>
      </div>
    </main>
    </>
  );
};

export default RefundPolicy;
