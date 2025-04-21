const BreadPaymentsButton = ({ id, price }: { id: string; price: number }) => {
  return (
    <>
    {/* {price >= 50 &&  <div
      className=""
      dangerouslySetInnerHTML={{
        __html: `<div class="breadbtnedit bg-red-bc2026 hover:bg-red-hover text-center text-white px-3 py-3 w-auto mb-2 rounded-lg" id="bread-checkout-btn-${
          id.split('/')[id.split('/').length - 1]
        }"> loading...</div>
        `,
      }}
    ></div>} */}
      {/* <p className="price-item">${price.toFixed(2)}</p> */}
      <p
            className="text-sm affirm-as-low-as text-black-500 underline-child-anchor"
            data-affirm-color="black"
            data-amount={(price) * 100}
          >
            As low as with{' '}
            <span className="__affirm-logo __affirm-logo-black __ligature__affirm_full_logo__ __processed">
              Affirm
            </span>
            .{' '}
            <a
              className="affirm-modal-trigger"
              aria-label="Learn more about Affirm Financing (opens in modal)"
              href="javascript:void(0)"
            >
              Learn more
            </a>
          </p>

    </>
  );
};

export default BreadPaymentsButton;
