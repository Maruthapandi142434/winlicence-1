import React from 'react'
import Head from 'next/head';

export async function getServerSideProps(context) {
    const { slug } = context.params;
    // Fetch product from database
    const product = await db.query('SELECT * FROM products WHERE slug = ?', [slug]);
    
    return {
      props: {
        product: JSON.parse(JSON.stringify(product[0])) // Convert to plain object
      }
    };
  }
  

function ProductSchema() {
  return (
    <div>
        <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": product.name,
              "image": product.image_url,
              "description": product.description,
              "brand": {
                "@type": "Brand",
                "name": product.schema_brand
              },
              "sku": product.schema_sku,
              "offers": {
                "@type": "Offer",
                "url": `https://winlicense.in/product/${product.slug}`,
                "priceCurrency": product.schema_price_currency,
                "price": product.schema_price,
                "priceValidUntil": product.schema_price_valid_until,
                "availability": "https://schema.org/OnlineOnly",
                "itemCondition": "https://schema.org/NewCondition"
              }
            })
          }}
          key="product-schema"
        />
      </Head>
    </div>
  )
}

export default ProductSchema