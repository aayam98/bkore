interface BreadPaymentProps {
  title: string;
  price: number;
  id: string;
  image: string;
}
export default function BreadPayment({
  title,
  price,
  id,
  image,
}: BreadPaymentProps) {
  return (
    <>
      <div
        className="flex flex-wrap"
        dangerouslySetInnerHTML={{
          __html: `<div id="bread-checkout-btn-${
            id.split('/')[id.split('/').length - 1]
          }" style="height:50px;width:250px;color:#fff!important;"></div>`,
        }}
      ></div>

      <script
        type="application/javascript"
        dangerouslySetInnerHTML={{
          __html: `
                              var opts = {
                                buttonId: 'bread-checkout-btn-${
                                  id.split('/')[id.split('/').length - 1]
                                }',
                                actAsLabel: false,
                                asLowAs: true,
                                items: [
                                {
                                  name:'${title}',
                                  price:${price * 100},
                                  sku:'${
                                    id.split('/')[id.split('/').length - 1]
                                  }',
                                  imageUrl:'[${image}]',
                                  detailUrl:'[REPLACEMEWITHAREALURL]',
                                  quantity: 1
                                }],
                                done: function(){
                                  //add some code to run when a customer completes their Bread checkout
                                  //done function is expanded on in STEP 3
                                }
                              };
                              bread.checkout(opts);
                              `,
        }}
      />
    </>
  );
}
