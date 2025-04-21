import { Dialog, Transition } from '@headlessui/react';
import { useAtom, useSetAtom } from 'jotai';
import { menuSidebarOpenState, searchOpenState } from '../state/atoms';
import { FormEventHandler, useEffect, useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';
import { CategoryData } from '@utils/header';
import routes from '@config/routes';
import Image from 'next/image';
import { SearchItem } from './ui/bodykore/SearchModal';
import SearchBox from './ui/bodykore/SearchBox';
import { ProductMenuProps } from './ui/bodykore/Sections/MegamenuVerticle';
import information from '../public/Banners_Informational.jpg';
import category from '../public/Banners_Catalog.jpg';
import feature from '../public/Banners_Features.jpg';
import industry from '../public/Banners_Industries.jpg';
import order from '../public/Banners_Order Support.jpg';
import service from '../public/Banners_Services.jpg';
import { StaticImageData } from 'next/image';

interface CategoriesProps {
  title: string;
  icon: string;
}

interface Categories1Props {
  title: string;
  icon: string;
}

interface LinksProps {
  title: string;
  href: string;
}

interface LinksImgProps {
  title: string;
  icon?: string;
  href: string;
}

interface SearchFormProps {
  search: SearchItem[];
  categories: CategoriesProps[];
  categories1: CategoryData[];
  links: LinksProps[];
  linksImg: LinksImgProps[];
}

// interface SubCategory {
//   title: string;
//   slug: string;
//   subCategories: ThirdCategory[];
//   image?: string;
// }
interface SubCategory {
  title: string;
  slug: string;
  subCategories: ThirdCategory[];
  image?: StaticImageData;
}

interface ThirdCategory {
  name: string;
  slug: string;
  type: string;
  image?: string;
}

export default function MobileMenu({
  search,
  categories,
  categories1,
  links,
  linksImg,
}: SearchFormProps) {
  const [sidebarOpen, setSidebarOpen] = useAtom(menuSidebarOpenState);

  let productCatsInit: Array<SubCategory> = [];
  let thirdCatInit: Array<ThirdCategory> = [];

  const [mainShow, setMainShow] = useState(true);
  const [secondMenu, setSecondMenu] = useState(false);
  const [thirdMenu, setThirdMenu] = useState(false);
  const [subMenu, setSubMenu] = useState(productCatsInit);
  const [subSubMenu, setSubsubMenu] = useState(thirdCatInit);
  const setSearchOpen = useSetAtom(searchOpenState);

  let productCats: Array<SubCategory> = [];
  categories1.map((ele) => {
    let thirdCat: Array<ThirdCategory> = [];
    ele.subcategories.map((el) => {
      return thirdCat.push({
        name: el.name,
        slug:
          ele.slug != 'packages'
            ? `/product?category=${ele.title}&subcategory=${el.name}`
            : `/product/${el.slug}`,
        type: 'menu',
        image: el.image,
      });
    });
    productCats.push({
      title: ele.title,
      subCategories: thirdCat,
      slug:
        ele.slug != 'packages'
          ? `/product-category/${ele.slug}`
          : `/product-category/${ele.slug}`,
    });
  });
  const [products, setProducts] = useState<ProductMenuProps[]>([]);
  useEffect(() => {
    setProducts([
      {
        title: 'Universal Trainer',
        text: 'Universal Trainer MX1162',
        slug: '/product/universal-trainer',
        image: ''
      },
      {
        title: 'Universal Trainer',
        text: 'Dynamic Trainer MX1161FX',
        slug: '/product/mx1161fx-all-in-one-versatile-unit',
        image: ''
      },
      {
        title: 'Universal Trainer',
        text: 'Dual Adjustable Pulley System- Functional Trainer MX1161',
        slug: '/product/dual-adjustable-pulley-system',
        image: ''
      },
     
      {
        title: 'Cable Machines',
        text: ' Selectorized Chest Press GR601',
        slug: '/product/selectorized-chest-press-gr601',
        image: ''
      },
      {
        title: 'Cable Machines',
        text: 'Dual Adjustable Pulley System- Functional Trainer- MX1161',
        slug: '/product/dual-adjustable-pulley-system',
        image: ''
      },
      {
        title: 'Cable Machines',
        text: 'Isolation Series - MultiPress GR640',
        slug: '/product/isolation-series-multipress',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/GR640.jpg'
      },
      {
        title: 'Cable Machines',
        text: 'Isolation Series- Hip Adductor/Abductor- GR632',
        slug: '/product/isolation-series-hip-adductor-abductor',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/GR632-2.jpg'
      },
      {
        title: 'Cable Machines',
        text: 'Isolation Series - Chin/Dip Assist - GR636',
        slug: '/product/isolation-series-chin-dip-assist',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/GR636-B.jpg'
      },
      {
        title: 'Cable Machines',
        text: 'Stacked Series- Plate Loaded Pull Down - GR806',
        slug: '/product/gr806-pull-down',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/GR806.jpg'
      },
      {
        title: 'Cable Machines',
        text: 'Isolation Series - Leg Curl/Extension - GR639',
        slug: '/product/isolation-series-leg-curl-extension',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/GR639.jpg'
      },
      {
        title: 'Cable Machines',
        text: 'Isolation Series - Bicep/Tricep - GR634',
        slug: '/product/isolation-series-selectorized-biceps-curl-triceps-extension-gr634',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/GR634-2.jpg'
      },
      {
        title: 'Squat Racks',
        text: 'Foundation Series - Squat Cage',
        slug: '/product/foundation-series-squat-cage',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G703-2.jpg'
      },
      {
        title: 'Squat Racks',
        text: 'Foundation Series - Half Rack G701',
        slug: '/product/half-rack',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G701.jpg'
      },
      {
        title: 'Squat Racks',
        text: 'Lunge Rack G255',
        slug: '/product/signature-series-open-squat-rack-g255',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G703-2.jpg'
      },
      {
        title: 'Squat Racks',
        text: 'Full Squat Cage G256',
        slug: '/product/signature-series-full-cage',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G256-2.jpg'
      },
      {
        title: 'Smith Machines',
        text: 'Universal Trainer MX1162',
        slug: '/product/universal-trainer',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/MX1162.jpg'
      },
      {
        title: 'Smith Machines',
        text: 'Smith Machine G271',
        slug: '/product/smith-machine',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G271-2.jpg'
      },
      {
        title: 'Leg Machines',
        text: 'Hip Adductor/Abductor GR632',
        slug: '/product/isolation-series-hip-adductor-abductor',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/GR632-2.jpg'
      },
      {
        title: 'Leg Machines',
        text: 'Leg Extension & Leg Curl GR639',
        slug: '/product/isolation-series-leg-curl-extension',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/GR639.jpg'
      },
      {
        title: 'Leg Machines',
        text: 'Selectorized Rotary Hip GR635',
        slug: '/product/isolation-series-selectorized-rotary-hip-gr635',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/GR639.jpg'
      },
      {
        title: 'Leg Machines',
        text: 'Prone Leg Curl GR608',
        slug: '/product/isolation-series-prone-leg-curl-gr608',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/GR635-B.jpg'
      },
      {
        title: 'Leg Presses',
        text: 'Seated Leg & Calf Press GR631',
        slug: '/product/isolation-series-leg-press-calf-extension',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/GR608.jpg'
      },
      {
        title: 'Leg Presses',
        text: 'Super squat FL1806',
        slug: '/product/super-squat-fl1806',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/FL1806_6623c716-d504-44d0-b04a-be252ff224eb.jpg'
      },
      {
        title: 'Leg Presses',
        text: 'Pendulam squat CF8137',
        slug: '/product/pendulum-squat-cf8137',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/CF8137-B.jpg'
      },
      {
        title: 'Leg Presses',
        text: 'GR606 - Seated leg extension',
        slug: '/product/gr606-seated-leg-extension',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/GR606-cover.png'
      },
      {
        title: 'Leg Presses',
        text: 'Isolateral Horizontal Swing Leg Press FL1809',
        slug: '/product/isolateral-horizontal-swing-leg-press-fl1809',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/cover.jpg'
      },
      {
        title: 'Leg Presses',
        text: 'Stacked Series- Squat Press- GR808',
        slug: '/product/stacked-series-squat-press',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/GR808.jpg'
      },
      {
        title: 'Leg Presses',
        text: 'Seated Leg Press GR614',
        slug: '/product/isolation-series-seated-leg-press-commercial-selectorized-strength-gr614',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/GR614.jpg'
      },
      {
        title: 'Leg Presses',
        text: 'Adjustable Hack Squat FL1811',
        slug: '/product/adjustable-hack-squat-fl1811',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/FL1811_403103ce-f758-4750-abe9-563d95791d1d.jpg'
      },
      {
        title: 'Glute Machines',
        text: 'Selectorized Rear Kick GR618',
        slug: '/product/isolation-series-selectorized-rear-kick-gr618',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/GR618.jpg'
      },
      {
        title: 'Glute Machines',
        text: 'Glute Press CF8131',
        slug: '/product/glute-press-cf8131',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/PAKS6061.jpg'
      },
      {
        title: 'Glute Machines',
        text: 'Pendulum Squat CF8137',
        slug: '/product/pendulum-squat-cf8137',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/CF8137-B.jpg'
      },
      {
        title: 'Glute Machines',
        text: 'Hip Thrust FL1844',
        slug: '/product/hip-thrust-fl1844',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/FL1844_41c1e128-ced2-4d12-b4a2-b4864fd72293.jpg'
      },
      {
        title: 'Glute Machines',
        text: 'Stacked Series - Rear Kick GR810',
        slug: '/product/stacked-series-gr810-rear-kick',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/GR810.jpg'
      },
      {
        title: 'Plate Loaded',
        text: 'Standing T-Bar Row CF2173',
        slug: '/product/elite-series-standing-row-cf2173',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/CF2173.jpg'
      },
      {
        title: 'Plate Loaded',
        text: 'Isolateral leg press FL1801',
        slug: '/product/fl1801-isolateral-leg-press',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/FL1801_67190ea1-0029-49ad-80b2-1298a5d7a30f.jpg'
      },
      {
        title: 'Plate Loaded',
        text: 'Signature series 45 degree leg press - G277',
        slug: '/product/signature-series-45-degree-leg-press',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/G277_a0c98d73-1998-44bf-999c-f92e5a5cfb0e.jpg'
      },
      {
        title: 'Plate Loaded',
        text: 'T Bar Row G273',
        slug: '/product/signature-series-t-bar-row-g273',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G273.jpg'
      },
      {
        title: 'Plate Loaded',
        text: 'Adjustable Hack Squat FL1811',
        slug: '/product/adjustable-hack-squat-fl1811',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/FL1811_403103ce-f758-4750-abe9-563d95791d1d.jpg'
      },
      {
        title: 'Plate Loaded',
        text: 'Belt Squat FL1834',
        slug: '/product/belt-squat-fl1834',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/FL1834.jpg'
      },
      {
        title: 'Multi Gyms',
        text: 'Four Positions GM5003',
        slug: '/product/alliance-series-four-positions-gm5003',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/6-ALLIANCE-SERIES.jpg'
      },
      {
        title: 'Multi Gyms',
        text: 'Multi-gym MTI4201',
        slug: '/product/multi-gym-mti4201',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/PAKS6054.jpg'
      },
      {
        title: 'Multi Gyms',
        text: 'Five Position GM5005',
        slug: '/product/gm5005-five-position',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/GM5005_cover.jpg'
      },
      {
        title: 'Multi Gyms',
        text: '3 Station Multi-Gym MTI4005',
        slug: '/product/3-station-multi-gym-mti4005',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/MTI4005.jpg'
      },
      {
        title: 'Adjustable Benches',
        text: 'Adjustable Bench G206',
        slug: '/product/signature-series-adjustable-bench',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G206.jpg'
      },
      {
        title: 'Adjustable Benches',
        text: 'Flat/Incline/Decline MX1169',
        slug: '/product/universal-trainer-flat-incline-decline',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/MX1169.jpg'
      },
      {
        title: 'Adjustable Benches',
        text: 'Adjustable Bench CF2106',
        slug: '/product/adjustable-bench',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/CF2106.jpg'
      },
      {
        title: 'Ab Benches',
        text: 'Adjustable Ab Crunch Bench CF2103',
        slug: '/product/elite-series-mutli-ab-bench-cf2103',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/CF2103.jpg'
      },
      {
        title: 'Ab Benches',
        text: 'Signature Series - Adjustable Ab Bench - G205',
        slug: '/product/signature-series-adjustable-ab-bench-g205',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G205.jpg'
      },
      {
        title: 'Ab Benches',
        text: 'G278 Signature Series Ab Slider',
        slug: '/product/g278-signature-series-ab-slider',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/G278.jpg'
      },
      {
        title: 'Ab Benches',
        text: 'Chin Dip Tower CF2110',
        slug: '/product/elite-series-chin-dip-tower-cf2110',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/CF2110-1.jpg'
      },
      {
        title: 'Ab Benches',
        text: 'Vertical Knee Raise CF2107',
        slug: '/product/vertical-knee-raise',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/CF2107.jpg'
      },
      {
        title: 'Ab Benches',
        text: 'Ab Bench G208',
        slug: '/product/ab-bench-g208',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G208.jpg'
      },

      {
        title: 'Specialty Benches',
        text: 'Sissy Squat FL1213',
        slug: '/product/fl1213-sissy-squat',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/FL1213.jpg'
      },
      {
        title: 'Specialty Benches',
        text: 'Elite Series - Utility Bench - CF2102',
        slug: '/product/elite-series-utility-bench-cf2102',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/CF2102.webp'
      },
      {
        title: 'Specialty Benches',
        text: 'Standing T-Bar Row CF2173',
        slug: '/product/elite-series-standing-row-cf2173',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/CF2173.jpg'
      },
      {
        title: 'Specialty Benches',
        text: 'Signature Series - Preacher Curl - G257',
        slug: '/product/signature-series-preacher-curl-g257',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G257.jpg'
      },
      {
        title: 'Specialty Benches',
        text: 'Seated Row Bench G214',
        slug: '/product/seated-row-bench-g214',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/G214.jpg'
      },
      {
        title: 'Specialty Benches',
        text: 'Utility Bench G202',
        slug: '/product/signature-series-utility-bench-g202',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G202.jpg'
      },
      {
        title: 'Flat benches',
        text: 'Flat Bench G201',
        slug: '/product/signature-series-flat-bench-g201',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G201.jpg'
      },
      {
        title: 'Flat benches',
        text: 'Elite Series - Olympic Flat Bench - CF2151',
        slug: '/product/elite-series-olympic-flat-bench-cf2151',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/CF2151-cover.webp'
      },
      {
        title: 'Flat benches',
        text: 'Flat Bench CF2101',
        slug: '/product/elite-series-flat-bench-cf2101',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/CF2101.jpg'
      },
      {
        title: 'Row Bench',
        text: 'Seated Row Bench G214',
        slug: '/product/seated-row-bench-g214',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/G214.jpg'
      },
      {
        title: 'Row Bench',
        text: 'Standing T-Bar Row CF2173',
        slug: '/product/elite-series-standing-row-cf2173',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/CF2173.jpg'
      },
      {
        title: 'Row Bench',
        text: 'T Bar Row G273',
        slug: '/product/signature-series-t-bar-row-g273',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G273.jpg'
      },
      {
        title: 'Dumbbells',
        text: '2 Tier Pro Dumbbell Rack G231',
        slug: '/product/signature-series-bodykore-10-pair-2-tier-commercial-pro-style-dumbbell-rack-club-series-g231',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G231.jpg'
      },
      {
        title: 'Dumbbells',
        text: 'RB550 RUBBER HEX DUMBBELL SET 5-50LB W/G241',
        slug: '/product/rb550-rubber-hex-dumbbell-set-5-50lb-w-g241',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/5-50SET.jpg'
      },
      {
        title: 'Dumbbells',
        text: '5-100lb Rubber Hex Dumbbell Set',
        slug: '/product/5-100lb-rubber-hex-dumbbell-set',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/5-100LB_Rubber_Hex_Set_1.png'
      },
      {
        title: 'Dumbbells',
        text: 'RB5570 - 55-70lb Rubber Hex Dumbbell w/ Upgraded G242 Rack',
        slug: '/product/55-70lb-rubber-hex-dumbbell-w-upgraded-g242-rack',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/5570.jpg'
      },
      {
        title: 'Dumbbells',
        text: 'PRO550 - PRO DUMBBELLS 5-50LB SET W/G231',
        slug: '/product/pro550-pro-dumbbells-5-50lb-set-w-g231',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/PRO550.jpg'
      },
      {
        title: 'Dumbbells',
        text: 'Vertical Dumbbell Rack G233',
        slug: '/product/signature-series-vertical-dumbbell-rack-g233',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G233.jpg'
      },
      {
        title: 'Dumbbells',
        text: '5-100lb Dumbbell Rack G243',
        slug: '/product/5-100lb-dumbbell-rack-g243',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G233.jpg'
      },
      {
        title: 'Dumbbells',
        text: '5-70lb Rubber Hex Dumbbell Set',
        slug: '/product/5-70lb-rubber-dumbbell-set',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/5-70SET-2.jpg'
      },
      {
        title: 'Bars',
        text: 'EZ Curl Bar',
        slug: '/product/ez-curl-bar-chrome-47',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/EZ_Curl_Bar_3.jpg'
      },
      {
        title: 'Bars',
        text: '300lb Olympic Weight Set',
        slug: '/product/300lb-olympic-weight-set',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/300LB.jpg'
      },
      {
        title: 'Bars',
        text: '260lb Bumper Plate and Bar Package',
        slug: '/product/260lb-bumper-plate-and-bar-package',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/260lb.jpg'
      },
      {
        title: 'Bars',
        text: 'Hexagon Trap Bar',
        slug: '/product/open-trap-bar',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/Hexagon_2.jpg'
      },
      {
        title: 'Bars',
        text: 'Pro Barbell Rack G236',
        slug: '/product/pro-barbell-rack-g236',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G236.jpg'
      },
      {
        title: 'Storage Racks',
        text: '2 Tier Pro Dumbbell Rack G231',
        slug: '/product/signature-series-bodykore-10-pair-2-tier-commercial-pro-style-dumbbell-rack-club-series-g231',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G231.jpg?v=1670443896'
      },
      {
        title: 'Storage Racks',
        text: 'Signature Series - Vertical Dumbbell Rack - G233',
        slug: '/product/signature-series-vertical-dumbbell-rack-g233',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G233.jpg?v=1670361961'
      },
      {
        title: 'Storage Racks',
        text: 'Signature Series - Olympic Weight Tree - G234',
        slug: '/product/signature-series-olympic-weight-tress-g234',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G234-2.jpg?v=1670361913'
      },
      {
        title: 'Storage Racks',
        text: 'Pro Barbell Rack G236',
        slug: '/product/pro-barbell-rack-g236',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G236.jpg?v=1670361817'
      },
      {
        title: 'Storage Racks',
        text: '5-50lb Dumbbell Rack- G241',
        slug: '/product/5-50lb-dumbbell-rack',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G241.jpg?v=1670444008'
      },
      {
        title: 'Storage Racks',
        text: 'G242 Dumbbell Rack (Fits 5-70lb Rubber Hex Dumbbell Set)',
        slug: '/product/g242-dumbbell-rack-fits-5-70lb-rubber-hex-dumbbell-set',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G242.jpg?v=1670361309'
      },
      {
        title: 'Storage Racks',
        text: '5-100lb Dumbbell Rack G243',
        slug: '/product/5-100lb-dumbbell-rack-g243',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/G243.jpg?v=1700162204'
      },
      {
        title: 'Storage Racks',
        text: 'Weight Plate Tree - CF2134',
        slug: '/product/weight-plate-tree-cf2134',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/CF2134-B.jpg?v=1736912866'
      },
      {
        title: 'Storage Racks',
        text: 'Linx Rack- Single Bay VFCR1701A',
        slug: '/product/linx-rack-single-bay-vfcr1701a',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/VFCR1701A.jpg?v=1725293180'
      },
      {
        title: 'Storage Racks',
        text: 'Smith Machine - VFCR1701B',
        slug: '/product/smith-machine-vfcr1701b',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/VFCR1701B.jpg?v=1670362278'
      },
      {
        title: 'Storage Racks',
        text: 'Storage Rack - VFCR1701D',
        slug: '/product/storage-rack-vfcr1701d',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/VFCR1701D_cover.jpg?v=1690497377'
      },


      {
        title: 'Bumper Plates',
        text: '260lb Bumper Plate and Bar Package',
        slug: '/product/260lb-bumper-plate-and-bar-package',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/260lb.jpg'
      },
      {
        title: 'Hyperextension Benches',
        text: 'Elite Series – Olympic Incline Bench CF2152',
        slug: '/product/elite-series-olympic-incline-bench-cf2152',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/CF2152-main.jpg'
      },
      {
        title: 'Bars and Plates',
        text: 'Hexagon Trap Bar',
        slug: '/product/open-trap-bar',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/Hexagon_2.jpg'
      },
      {
        title: 'Bars and Plates',
        text: '300lb Olympic Weight Set',
        slug: '/product/300lb-olympic-weight-set',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/300LB.jpg'
      },
      {
        title: 'Bars and Plates',
        text: '260lb Bumper Plate and Bar Package',
        slug: '/product/260lb-bumper-plate-and-bar-package',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/260lb.jpg'
      },
      {
        title: 'Bars and Plates',
        text: 'EZ Curl Bar',
        slug: '/product/ez-curl-bar-chrome-47',
        image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/EZ_Curl_Bar_3.jpg'
      },
      {
        title: 'Attachments',
        text: `Leg Press Plate for MX1162`,
        slug: '/product/leg-press-plate-for-mx1162',
        image: ''
      },
      {
        title: 'Attachments',
        text: `Universal Storage Rack MX1191`,
        slug: '/product/universal-storage-rack-mx1191',
        image: ''
      },
      {
        title: 'Attachments',
        text: `Lat seat for MX1162`,
        slug: '/product/lat-seat-for-mx1162',
        image: ''
      },
      {
        title: 'Attachments',
        text: `Universal Trainer Jammer Arms MX1171`,
        slug: '/product/universal-trainer-jammer-arms-mx1171',
        image: ''
      },
      {
        title: 'Attachments',
        text: `Leg Extension/Curl Seat Attachment MX1175`,
        slug: '/product/leg-extension-curl-seat-attachment-mx1175',
        image: ''
      },
    
      // {
      //   title: 'Squat Box',
      //   text: 'Squat Box MX1182',
      //   slug: '/product/squat-box-mx1182',
      //   image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/SquatBox_8of9_-min.png'
      // },
      // {
      //   title: 'Squat Box PRO',
      //   text: 'Portable Belt Squat Box Pro',
      //   slug: '/product/mx1182xl-squat-box-pro-portable-belt-squat-station',
      //   image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/P1005185_1-min.jpg?v=1738066496'
      // },
      // {
      //   title: 'Add-Ons',
      //   text: `Weight Extender Pin`,
      //   slug: '/product/weight-extender-pin',
      //   image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/BeltandExtender_9of10.jpg'
      // },
      
    ]);
  }, []);

  const menus = [
    {
      icon: '',
      name: 'Products',
      subCategories: productCats,
      slug: '',
    },
    {
      icon: '',
      name: 'Shop',
      slug: '/product',
      subCategories: [],
    },
    {
      icon: '',
      name: 'Resources',
      slug: '',
      subCategories: [
        {
          title: 'INFORMATIONAL',
          slug: '',
          image: information,
          subCategories: [
            {
              name: '#WeAreBodyKore',
              slug: routes.aboutus.path,
              type: 'menu',
            },
            {
              name: 'Manuals',
              slug: routes.manuals.path,
              type: 'menu',
            },
            {
              name: 'Technical Datasheets',
              slug: routes.technicalDatasheets.path,
              type: 'menu',
            },
            {
              name: 'Performance Technology',
              slug: routes.performanceTechnology.path,
              type: 'menu',
            },
          ],
        },

        {
          title: 'ORDER SUPPORT',
          slug: '',
          image: order,
          subCategories: [
            {
              name: 'Full Gym Solutions',
              slug: routes.fullGymSolutions.path,
              type: 'menu',
            },
            {
              name: '3D Gym Design',
              slug: routes.threeDGymDesign.path,
              type: 'menu',
            },
            {
              name: 'Customization',
              slug: routes.upholstery.path,
              type: 'menu',
            },
            {
              name: 'White Glove Delivery',
              slug: routes.home.path,
              type: 'menu',
            },
            
          
         
          ],
        },

        {
          title: 'CATALOGS',
          slug: '',
          image: category,
          subCategories: [
            {
              name: 'Equipment Catalog',
              slug: '//cms.bodykore.com/uploads/Body_Kore_Catalog_2025_78c9d8c010.pdf',
              type: 'menu',
            },
            {
              name: 'Product Catalog',
              slug: '/PDFs/Product-Catalog.pdf',
              type: 'menu',
            },
            {
              name: 'Home Gym Catalog',
              slug: '/PDFs/Home-Gyms-Catalog.pdf',
              type: 'menu',
            },
            {
              name: 'Linx Rack Catalog',
              slug: '/PDFs/Linx_Rack_Catalog.pdf',
              type: '_blank',
            },
          ],
        },
        {
          title: 'FEATURES',
          slug: '',
          image: feature,
          subCategories: [
            {
              name: 'News',
              slug: routes.news.path,
              type: 'menu',
            },
            {
              name: 'Videos',
              slug: routes.videos.path,
              type: 'menu',
            },
            {
              name: 'Team Bodykore',
              slug: routes.teamBodykore.path,
              type: 'menu',
            },
            {
              name: 'Fitness Challenge',
              slug: '/maslow-moves-fitness-challenge',
              type: 'menu',
            },
          ],
        },
        {
          title: 'SERVICES',
          slug: '',
          image: service,
          subCategories: [
            {
              name: '3D Gym Design',
              slug: routes.threeDGymDesign.path,
              type: 'menu',
            },
            {
              name: 'Customization',
              slug: routes.upholstery.path,
              type: 'menu',
            },
            {
              name: 'White Glove Delivery',
              slug: routes.whiteGloveDelivery.path,
              type: 'menu',
            },
          ],
        },
        {
          title: 'INDUSTRIES',
          slug: '',
          image: industry,
          subCategories: [
            {
              name: 'Hospitality',
              slug: routes.hospitality.path,
              type: 'menu',
            },
            {
              name: 'Residential Communities',
              slug: routes.residential.path,
              type: 'menu',
            },
            {
              name: 'Commercial Gyms',
              slug: routes.commercialgym.path,
              type: 'menu',
            },
            {
              name: 'Military',
              slug: routes.military.path,
              type: 'menu',
            },
            {
              name: 'Institutions',
              slug: routes.institutional.path,
              type: 'menu',
            },
            {
              name: 'Gyms',
              slug: routes.gym.path,
              type: 'menu',
            },
          ],
        },
      ],
    },

    {
      icon: '',
      slug: '/inspiration',
      name: 'Inspiration',
      subCategories: [],
    },
    {
      icon: '',
      slug: '',
      name: 'Dealers',
      subCategories: [
        {
          title: 'Dealer Location',
          slug: '/storeLocator',
          subCategories: [],
        },
        {
          title: 'Dealer Application',
          slug: '/dealerForm',
          subCategories: [],
        },
        {
          title: 'Dealer Login',
          slug: 'https://dealerportal.bodykore.com/login',
          subCategories: [],
        },
      ],
    },

    {
      icon: '',
      slug: '/blog',
      name: 'Blog + News',
      subCategories: [],
    },

    {
      icon: '',
      name: 'Contact',
      slug: '/contact',
      subCategories: [],
    },

    {
      icon: '/svg/header-cart.svg',
      name: 'Cart',
      slug: '#',
      subCategories: [],
    },
    {
      icon: '/svg/my-account.svg',
      name: 'Account',
      slug: '/auth/signin',
      subCategories: [],
    },
  ];
  const mainMenuAct = () => {
    setMainShow(true);
    setSecondMenu(false);
    setThirdMenu(false);
  };

  const secondMenuAct = () => {
    setMainShow(false);
    setSecondMenu(true);
    setThirdMenu(false);
  };
  const thirdMenuAct = () => {
    setMainShow(false);
    setSecondMenu(false);
    setThirdMenu(true);
  };

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-50 xl:hidden"
        style={{ zIndex: 99999999 }}
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-sm w-full bg-white">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full"
                  onClick={() => {
                    setSidebarOpen(false);
                    mainMenuAct();
                  }}
                >
                  <span className="sr-only"></span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4 pb-4">
                <Image
                  className="h-auto w-auto"
                  style={{ maxWidth: '180px' }}
                  src="/header/logo.png"
                  alt="Logo BodyKore"
                  width={180}
                  height={22}
                  placeholder="blur"
                  blurDataURL="/loading.png"
                />
              </div>

              <div className="h-3 bg-red-bc2026"></div>

              {/* MobileMenu 0 */}
              {mainShow ? (
                <div>
                  <SearchBox dynamicItems={search} />
                  <nav className="px-4">
                    {menus.map((item, i) => (
                      <div key={i}>
                        {item.slug == '' && (
                          <a
                            onClick={() => {
                              secondMenuAct();
                              setSubMenu(item.subCategories);
                            }}
                            className={
                              'group flex items-center px-2 py-2 text-base font-medium hover:text-red-bc2026 rounded-md'
                            }
                          >
                            <div className="flex justify-between items-center w-full">
                              <div className="flex items-center w-full">
                                {item.icon != '' && (
                                  <Image
                                    src={item.icon}
                                    alt=""
                                    className="h-8 w-8 mr-3"
                                    width={25}
                                    height={25}
                                  />
                                )}
                                {item.name}
                              </div>
                              {item.subCategories && item.subCategories.length > 0 && (
                                <Image
                                  src="/svg/black-arrow.svg"
                                  alt=""
                                  className="h-5 w-5"
                                  width={20}
                                  height={20}
                                />
                              )}
                            </div>
                          </a>
                        )}
                        {item.slug != '' && (
                          <a
                            href={item.slug}
                            className={
                              'group flex items-center px-2 py-2 text-base font-medium hover:text-red-bc2026 rounded-md'
                            }
                          >
                            <div className="flex justify-between items-center w-full">
                              <div className="flex items-center w-full">
                                {item.icon != '' && (
                                  <Image
                                    src={item.icon}
                                    alt=""
                                    className="h-8 w-8 mr-3"
                                    width={32}
                                    height={32}
                                  />
                                )}
                                {item.name}
                              </div>
                            </div>
                          </a>
                        )}
                        <div className="border-t border-gray-300 mt-2"></div>
                      </div>
                    ))}
                  </nav>

                  <div className="flex justify-center pt-10">
                    <a href="tel:9493253088">
                      <button
                        className="bg-transparent text-black hover:text-red-bc2026 border border-black hover:border-red rounded-lg text-md px-16 py-2"
                        style={{ letterSpacing: '1.5px' }}
                      >
                        <div className="flex justify-center items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          <div className="px-2 text-sm font-medium">
                            Call us
                          </div>
                        </div>
                      </button>
                    </a>
                  </div>
                </div>
              ) : null}

              {/* MobileMenu 1 */}
              {secondMenu ? (
                <nav className="mt-5 space-y-1 px-4">
                  <>
                    <span
                      className="flex cursor-pointer"
                      onClick={() => {
                        mainMenuAct();
                      }}
                    >
                      {' '}
                      <Image
                        src="/svg/black-arrow-reverse.svg"
                        alt=""
                        className="h-5 w-5"
                        width={20}
                        height={20}
                      />
                      <strong className="-mt-1 ml-2">Go Back</strong>
                    </span>

                    {subMenu.map((item, i) => (
                      <div key={i}>
                        {item.slug == '' && (
                          <a
                            onClick={() => {
                              thirdMenuAct();
                              setSubsubMenu(item.subCategories);
                            }}
                            className={
                              'group flex items-center px-2 py-2 text-base font-medium hover:text-red-bc2026 rounded-md'
                            }
                          >
                            {item.title != 'Images' && (
                              <div className="flex justify-between items-center w-full">
                                {item.title}
                                <Image
                                  src="/svg/black-arrow.svg"
                                  alt=""
                                  className="h-5 w-5"
                                  width={20}
                                  height={20}
                                />
                              </div>
                            )}
                            {item.title == 'Images' && (
                              <div className="flex justify-between items-center w-full">
                                <Image
                                  loader={() => '/header/resources.jpg'}
                                  src="/header/resources.jpg"
                                  width={450}
                                  height={200}
                                  objectFit="cover"
                                  alt=""
                                />
                              </div>
                            )}
                          </a>
                        )}
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={310}
                            height={132}
                            className="w-full object-cover rounded-md mb-2"
                            placeholder="blur"
                            blurDataURL="/loading.png"
                          />
                        )}
                        {item.slug != '' && (
                          <a
                            className={
                              'group flex items-center px-2 py-2 text-base font-medium hover:text-red-bc2026 rounded-md'
                            }
                          >
                            {item.title != 'Images' && (
                              <div className="flex justify-between items-center w-full">
                                <a href={item.slug}>{item.title}</a>
                                <Image
                                  src="/svg/black-arrow.svg"
                                  alt=""
                                  className="h-5 w-5"
                                  onClick={() => {
                                    thirdMenuAct();
                                    setSubsubMenu(item.subCategories);
                                  }}
                                  width={20}
                                  height={20}
                                />
                              </div>
                            )}
                            {item.title == 'Images' && (
                              <div className="flex justify-between items-center w-full">
                                <Image
                                  loader={() => '/header/resources.jpg'}
                                  src="/header/resources.jpg"
                                  width={450}
                                  height={200}
                                  objectFit="cover"
                                  alt=""
                                />
                              </div>
                            )}
                          </a>
                        )}

                        <div className="border-t border-gray-300 mt-2"></div>
                      </div>
                    ))}
                  </>
                </nav>
              ) : null}
              {thirdMenu ? (
                <nav className="mt-5 space-y-1 px-4">
                  <>
                    <span
                      className="flex cursor-pointer"
                      onClick={() => {
                        secondMenuAct();
                      }}
                    >
                      <Image
                        src="/svg/black-arrow-reverse.svg"
                        alt=""
                        className="h-5 w-5"
                        width={20}
                        height={20}
                      />
                      <strong className="-mt-1 ml-2">Go Back</strong>
                    </span>
                    {subSubMenu.map((item, i) => (
                      <div key={i}>
                        <a
                          href={item.slug}
                          className={
                            'group flex items-center px-2 py-2 text-base font-medium hover:text-red-bc2026 rounded-md'
                          }
                        >
                          <div className="w-full">
                            {item.image && (
                              <Image
                                src={item.image}
                                alt=""
                                className="w-full"
                                width={310}
                                height={232}
                                placeholder="blur"
                                blurDataURL="/loading.png"
                              />
                            )}
                            <div className="flex flex-wrap justify-between items-center pt-2">
                              <h3>{item.name}</h3>
                              <Image
                                src="/svg/black-arrow.svg"
                                alt=""
                                className="h-5 w-5 "
                                width={20}
                                height={20}
                              />
                            </div>
                            <ul className="text-gray-600 cursor-pointer font-normal font-roboto text-base pt-1 tracking-wide">
                              {/* <li>Product List</li>
                              <li>Product List</li> */}
                              {item.name != 'Packages' &&
                                item.name != 'Smart Sled' && (
                                  <ul className="text-black cursor-pointer font-roboto text-base leading-7 listitems">
                                    {products.map((el, index) => {
                                      return (
                                        el.title == item.name && (
                                          <li
                                            className="hover:text-red-hover text-sm flex flex-row items-start gap-2 mb-2"
                                            key={index}
                                          >
                                             <Image
                                                              placeholder="blur"
                                                              blurDataURL="/loading.png"
                                                              src="/svg/rightArrow.svg"
                                                              width={20}
                                                              height={20}
                                                              alt=""
                                                              className="w-5"
                                                            />
                                            <a href={el.slug} className='w-11/12 font-roboto font-normal text-sm text-gray-700 leading-normal'>
                                              {el.text}
                                            </a>
                                          </li>
                                        )
                                      );
                                    })}
                                  </ul>
                                )}
                            </ul>
                          </div>
                        </a>
                        <div className="border-t border-gray-300 mt-2"></div>
                      </div>
                    ))}
                  </>
                </nav>
              ) : null}
            </div>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  );
}
