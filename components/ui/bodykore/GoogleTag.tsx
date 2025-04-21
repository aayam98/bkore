import React from 'react';

export interface GoogleTagProps {
  value: number;
  tax: number;
  shipping: number;
  id: string;
  items: {
    item_id: string;
    item_name: string;
    affiliation: string;
    coupon: string;
    discount: number;
    index: number;
    item_brand: string;
    item_category: string;
    item_category2: string;
    item_category3: string;
    item_category4: string;
    item_category5: string;
    item_list_id: string;
    item_list_name: string;
    item_variant: string;
    location_id: string;
    price: number;
    quantity: number;
  }[];
}

const GoogleTag = ({ value, tax, shipping, items,id}: GoogleTagProps) => {
  return (
    <div>
      <script
        dangerouslySetInnerHTML={{
          __html:
            ` document.getElementById("purchase${id}").addEventListener("click", function () {
        gtag("event", "conversion", {
                // This purchase event uses a different transaction ID
                // from the previous purchase event so Analytics
                // doesn't deduplicate the events.
                // Learn more: https://support.google.com/analytics/answer/12313109
                transaction_id: ` +
            Math.floor(Math.random() * 10000000000) +
            `,
                value: ${value},
                tax: 0.00,
                shipping: 0.00,
                currency: "USD",
                coupon: "",
                items: ${JSON.stringify(items)},
        });
    });`,
        }}
      />
    </div>
  );
};

export default GoogleTag;
