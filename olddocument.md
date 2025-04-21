import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US" className="scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
        <Head>
          <script src="https://fonts.googleapis.com" />
          <script src="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400;1,500;1,700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
            rel="stylesheet"
          />
          {/*Acumin Pro bold*/}
          <meta
            name="google-site-verification"
            content="4VVvpFYR9--o412QXNXTHzUrUQz4qNHteDTjWSrebSk"
          />
          <script src="https://www.googletagmanager.com/gtag/js?id=G-JCVEXQQ5LC" />
          <script
            dangerouslySetInnerHTML={{
              __html: ` window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-JCVEXQQ5LC', {'debug_mode':true});`,
            }}
          />

          {/* <link
            href="https://ppe.wegetfinancing.com/index.css"
            rel="stylesheet"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
   // In case there are no config.json file the widget configuration can be added here
   const ppeConfiguration = {
     priceSelector: ".price-item", // the class name of the html element containing the prices on the page (REQUIRED) (string)
     productNameSelector: ".name-item", // if applyNow is set to true, this selector is REQUIRED (string)
     debug: false, // if true, prints debug messages on the console (boolean)
     token: "OWNmNGNiNWFjMTdlZDRmNWZhNzc0ZGFiZmZiMGI5NGI=", // Merchants need to add their WeGetFinancing's access token as a string (REQUIRED)
     applyNow: false, // If set to true, a link to the simple loan form will be added (boolean)
     branded: true, // If true, WeGetFinancing branding will be rendered (boolean)
     minAmount: 10, // we will not show the PPE if the amount is below this number (REQUIRED) (number)
     customText: "As low as", // Add any text before the monthly payment in the message under the price (string)
     position: "leading" // positions the widget horizontally. The options are the following string options : 'equalSpacing' | 'leading' | 'trailing' | 'center' | 'fill' | 'fillEvenly'
   }
   window.ppeConfiguration = ppeConfiguration
 `,
            }}
          /> */}
          {/* <script src="https://connect.breadpayments.com/sdk.js" />


          <script
            dangerouslySetInnerHTML={{
              __html: `
const buyer = {
givenName: "",
familyName: "",
additionalName: "",
birthDate: "",
email: "",
phone: "",
billingAddress: {
address1: "",
address2: "",
country: "",
locality: "",
region: "",
postalCode: "",
},
shippingAddress: {
address1: "",
address2: "",
country: "",
locality: "",
region: "",
postalCode: "",
},
};
BreadPayments.setup({
integrationKey: "3b76e624-7832-4957-93d0-19a24caba2ed",
buyer: buyer,
});



// callback runs after customer application result
BreadPayments.on("INSTALLMENT:APPLICATION_DECISIONED", (installmentResult) => {
console.log(installmentResult);
});

// callback runs after customer completes checkout 
BreadPayments.on("INSTALLMENT:APPLICATION_CHECKOUT", (installmentResult) => {
console.log(installmentResult);
});

`,
            }}
          /> */}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              _affirm_config = {
                public_api_key:  "PJSNAFYP69A1N289",
              script:"https://cdn1.affirm.com/js/v2/affirm.js"
   };
              (function(m,g,n,d,a,e,h,c){var b=m[n]||{ },k=document.createElement(e),p=document.getElementsByTagName(e)[0],l=function(a,b,c){return function(){a[b]._.push([c, arguments])}};b[d]=l(b,d,"set");var f=b[d];b[a]={ };b[a]._=[];f._=[];b._=[];b[a][h]=l(b,a,h);b[c]=function(){b._.push([h, arguments])};a=0;for(c="set add save post open empty reset on off trigger ready setProduct".split(" ");a<c.length;a++)f[c[a]]=l(b,d,c[a]);a=0;for(c=["get","token","url","items"];a<c.length;a++)f[c[a]]=function(){ };k.async=
  !0;k.src=g[e];p.parentNode.insertBefore(k,p);delete g[e];f(g);m[n]=b})(window,_affirm_config,"affirm","checkout","ui","script","ready","jsReady");
              `,
            }}
          />
        </Head>
        <body className="loading">
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-5L5VCV3"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>

          <Main />
          <NextScript />
          <script
            type="text/javascript"
            src="//cdn.callrail.com/companies/244755155/b60062f44887822c3c5c/12/swap.js"
          ></script>
          <script
            type="text/javascript"
            id="zsiqchat"
            dangerouslySetInnerHTML={{
              __html: `var $zoho=$zoho || { };$zoho.salesiq = $zoho.salesiq || {widgetcode: "siq2aefb659ae7d593db1cee4f5e958c6fb0b7012b0d6e912ac060195d6ed2de365", values:{ },ready:function(){ }};var d=document;s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;s.src="https://salesiq.zohopublic.com/widget";t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);`,
            }}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':

new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],

j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5L5VCV3');`,
            }}
          />
          {/* <script src="https://ppe.wegetfinancing.com/index.js" /> */}
        </body>
      </Html>
    );
  }
}
export default MyDocument;
