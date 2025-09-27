const SHOPIFY_STORE_DOMAIN = 'hnbmq0-kw.myshopify.com';
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = 'a4ec88fefd6c25311dd27b93fbe80719';

async function testShopifyAPI() {
  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/2023-01/graphql.json`;
  
  const query = `
    query {
      shop {
        name
        primaryDomain {
          url
        }
      }
      products(first: 5) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
    } else {
      console.log('Shop Info:', JSON.stringify(data.data, null, 2));
    }
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}

testShopifyAPI();
