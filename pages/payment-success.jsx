export default function PaymentSuccess() {
    return (
      <div className="text-center p-20">
        <h1 className="text-2xl font-bold text-green-600">🎉 Payment Successful!</h1>
        <p className="mt-4">Thank you for your purchase. We will contact you shortly.</p>
      </div>
    );
  }
  
  export async function getServerSideProps() {
    return {
      props: {},
    };
  }  