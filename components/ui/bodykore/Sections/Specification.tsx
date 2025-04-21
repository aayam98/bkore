import { imageNotFound, mediaUrl } from '@utils/baseUrls';
import Image from 'next/image';
import React from 'react';
import Lightbox from 'react-image-lightbox';
import Slider from 'react-slick';
import styled from 'styled-components';
import SpecImage from './SpecImage';

interface SpecificationsProps {
  specifications: {
    dimensions: string;
    weight: string;
    footprint: string;
    frame: string;
    frameColor: string;
    weightStack: string;
    platformSize: string;
    ofAdjustableHeightPositions: string;
    ofWeightPegs: string;
    counterBalancedSmithMachine: string;
    halfRackFunction: string;
    dualPulleySystem: string;
    accessoryStorage: string;
    multiGripPullUpHandles: string;
    barStorage: string;
    bodyGroupTarget: string;
    ofWorkouts: string;
    assemblyTime: string;
    ofAdjustableBackPositions: string;
    ofFoamRollerAdjustments: string;
    cushionMaterial: string;
    cushionDimensions: string;
    angles: string;
    wheels: string;
    footrest: string;
    handle: string;
    ofAdjustableSeatPositions: string;
    image: {
      data: {
        attributes: {
          name: string;
          url: string;
          height: number;
          width: number;
        };
      };
    };
  }[];
  featuredImage: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-300 text-black cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="currentColor"
      >
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
      </svg>
    </button>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-300 text-black cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="currentColor"
      >
        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
      </svg>
    </button>
  );
};

const Specifications = ({
  specifications,
  featuredImage,
}: SpecificationsProps) => {
  const validateToShow = (data: string) => {
    return data && data.length > 0;
  };
  const [isOpenFeature, setIsOpenFeature] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: specifications.length >= 1 ? 1 : specifications.length,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: specifications.length >= 2 ? 2 : specifications.length,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: specifications.length >= 2 ? 2 : specifications.length,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: specifications.length >= 1 ? 1 : specifications.length,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  let slider1 = React.useRef() as
    | React.MutableRefObject<HTMLInputElement>
    | any;
  return (
    <>
      <div className="">
        <Slider {...settings} ref={(el) => (slider1 = el)}>
          {specifications.map((spec, index) => {
            return (
              <div className='' key={index}>
                <div className="m-auto w-full flex justify-center pb-2">
                  {spec.image.data && (
                    <>
                      <SpecImage image={spec.image.data} />
                    </>
                  )}
                </div>
               
                 {spec.dimensions && <div className="bg-gray-300 px-5 py-5 lg:mx-6 mx-2">
                    <ListSepecification className="">
                      {validateToShow(spec.dimensions) && (
                        <li>
                          <span> Dimensions : </span>
                          {spec.dimensions}
                        </li>
                      )}
                      {validateToShow(spec.weight) && (
                        <li>
                          <span> Weight : </span>
                          {spec.weight}
                        </li>
                      )}
                      {validateToShow(spec.footprint) && (
                        <li>
                          <span> Footprint : </span>
                          {spec.footprint}
                        </li>
                      )}
                      {validateToShow(spec.frame) && (
                        <li>
                          <span>Frame : </span>
                          {spec.frame}
                        </li>
                      )}
                      {validateToShow(spec.frameColor) && (
                        <li>
                          <span>Frame Color : </span>
                          {spec.frameColor}
                        </li>
                      )}
                       {validateToShow(spec.platformSize) && (
                        <li>
                          <span>Platform Size : </span>
                          {spec.platformSize}
                        </li>
                      )}
                      {validateToShow(spec.weightStack) && (
                        <li>
                          <span>Weight Stack : </span>
                          {spec.weightStack}
                        </li>
                      )}
                      {validateToShow(spec.ofAdjustableHeightPositions) && (
                        <li>
                          <span># of Adjustable Height Positions : </span>
                          {spec.ofAdjustableHeightPositions}
                        </li>
                      )}
                      {validateToShow(spec.ofWeightPegs) && (
                        <li>
                          <span># Of Weight Pegs : </span>
                          {spec.ofWeightPegs}
                        </li>
                      )}
                      {validateToShow(spec.counterBalancedSmithMachine) && (
                        <li>
                          <span>Counter Balanced Smith Machine : </span>
                          {spec.counterBalancedSmithMachine}
                        </li>
                      )}
                      {validateToShow(spec.halfRackFunction) && (
                        <li>
                          <span>Half Rack Function : </span>
                          {spec.halfRackFunction}
                        </li>
                      )}
                      {validateToShow(spec.dualPulleySystem) && (
                        <li>
                          <span>Dual Pulley System : </span>
                          {spec.dualPulleySystem}
                        </li>
                      )}
                      {validateToShow(spec.accessoryStorage) && (
                        <li>
                          <span>Accessory Storage : </span>
                          {spec.accessoryStorage}
                        </li>
                      )}
                      {validateToShow(spec.multiGripPullUpHandles) && (
                        <li>
                          <span>Multi Grip Pull Up Handles : </span>
                          {spec.multiGripPullUpHandles}
                        </li>
                      )}
                      {validateToShow(spec.barStorage) && (
                        <li>
                          <span>Bar Storage : </span>
                          {spec.barStorage}
                        </li>
                      )}
                      {validateToShow(spec.bodyGroupTarget) && (
                        <li>
                          <span>Body Group Target : </span>
                          {spec.bodyGroupTarget}
                        </li>
                      )}

                      {validateToShow(spec.ofWorkouts) && (
                        <li>
                          <span># of Workouts : </span>
                          {spec.ofWorkouts}
                        </li>
                      )}

                      {validateToShow(spec.assemblyTime) && (
                        <li>
                          <span>Assembly Time : </span>
                          {spec.assemblyTime}
                        </li>
                      )}
                      {validateToShow(spec.ofAdjustableBackPositions) && (
                        <li>
                          <span># of Adjustable Back Positions : </span>
                          {spec.ofAdjustableBackPositions}
                        </li>
                      )}
                      {validateToShow(spec.ofFoamRollerAdjustments) && (
                        <li>
                          <span># of Foam Roller Adjustments : </span>
                          {spec.ofFoamRollerAdjustments}
                        </li>
                      )}
                      {validateToShow(spec.cushionMaterial) && (
                        <li>
                          <span>Cushion Material : </span>
                          {spec.cushionMaterial}
                        </li>
                      )}
                      {validateToShow(spec.cushionDimensions) && (
                        <li>
                          <span>Cushion Dimensions : </span>
                          {spec.cushionDimensions}
                        </li>
                      )}
                      {validateToShow(spec.angles) && (
                        <li>
                          <span>Footplate Adjustment Angles : </span>
                          {spec.angles}
                        </li>
                      )}
                      {validateToShow(spec.wheels) && (
                        <li>
                          <span>Wheels : </span>
                          {spec.wheels}
                        </li>
                      )}
                      {validateToShow(spec.footrest) && (
                        <li>
                          <span>Foot Rest : </span>
                          {spec.footrest}
                        </li>
                      )}
                      {validateToShow(spec.handle) && (
                        <li>
                          <span>Handle : </span>
                          {spec.handle}
                        </li>
                      )}
                      {validateToShow(spec.ofAdjustableSeatPositions) && (
                        <li>
                          <span># of Adjustable Seat Positions : </span>
                          {spec.ofAdjustableSeatPositions}
                        </li>
                      )}
                    </ListSepecification>
                  
                </div>}
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default Specifications;

const ListSepecification = styled.ul`
  display: flex;
  flex-flow: column;
  li {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    text-transform: capitalize;
    border-bottom: 1px solid #fff;
    padding-bottom: 5px;
    margin-bottom: 5px;
    span {
      margin-right: 25px;
      font-weight: 600;
    }
  }
`;
