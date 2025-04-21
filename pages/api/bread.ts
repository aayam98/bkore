import { NextApiRequest, NextApiResponse } from 'next';

export default async function Wishlist(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const html = `
    <html>
    <head>
    <script
    type="text/javascript"
    src="https://connect.breadpayments.com/sdk.js"
  ></script>
  </head>
  <body>
  <script
    type="text/javascript"
>
          const buyer = {
            givenName: "John",
            familyName: "Smith",
            additionalName: "C.",
            birthDate: "1974-08-21",
            email: "jsmith@breadfinance.com",
            phone: "2123344141",
            billingAddress: {
              address1: "323 something lane",
              address2: "apt. B",
              country: "US",
              locality: "NYC",
              region: "NY",
              postalCode: "11222",
            },
            shippingAddress: {
              address1: "323 something lane",
              address2: "apt. B",
              country: "US",
              locality: "NYC",
              region: "NY",
              postalCode: "11222",
            },
          };
          

          BreadPayments.setup({
            integrationKey: "3b76e624-7832-4957-93d0-19a24caba2ed",
            buyer: buyer,
            });
</script>
  <div id="bread-checkout-btn" style="height:50px;width:250px;"></div>

  <script
    type="text/javascript"
 
>
      BreadPayments.registerPlacements([
        {
          financingType: "installment",
          locationType: "checkout",
          domID: "bread-checkout-btn",
          allowCheckout: false,
          order: {
            items: [
              {
                name: "${req.query.title}",
                sku:"${req.query.sku}",
                category: "",
                unitPrice: {
                  value:${req.query.price},
                  currency: "USD",
                },
                unitTax: {
                  value: 0,
                  currency: "USD",
                },
                brand: "${req.query.title}",
                quantity: 1,
                shippingDescription: "Ground",
                shippingProvider: "UPS",
                shippingCost: {
                  value: 0,
                  currency: "USD",
                },
              },
            ],
            subTotal: {
              value: ${req.query.price},
              currency: "USD",
            },
            totalTax: {
              value: 0,
              currency: "USD",
            },
            totalShipping: {
              value: 0,
              currency: "USD",
            },
            totalDiscounts: {
              value: 0,
              currency: "USD",
            },
            totalPrice: {
              value:${req.query.price},
              currency: "USD",
            },
          },
        },
      ]);

    
      
      </script>
      <script>
      BreadPayments.on("INSTALLMENT:APPLICATION_DECISIONED", (installmentResult) => {
        console.log(installmentResult);
      });   
      BreadPayments.on("INSTALLMENT:APPLICATION_CHECKOUT", (installmentResult) => {
        console.log("Checkout Successful");
        console.log(installmentResult);
      });
      </script>
      </body>
      </html>
      `;

    return res.send(html);
    // return res.status(200).json(html);
  } catch (error) {
    console.log(error);
  }
}
