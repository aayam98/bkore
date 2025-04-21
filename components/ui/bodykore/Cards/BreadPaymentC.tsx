import TruemedWidget from "./TruemedWidget";

const BreadPaymentsButton = ({ id, price }: { id: string; price: number }) => {
  return (
    <div className="grid  grid-cols-1 gap-2">
    
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
      <TruemedWidget publicId={'tm_qual_vv55x2sebi'} />
    </div>
  );
};

export default BreadPaymentsButton;
