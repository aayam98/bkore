import routes from "@config/routes";
import information from '../public/Banners_Informational.jpg';
import category from '../public/Banners_Catalog.jpg';
import feature from '../public/Banners_Features.jpg';
import industry from '../public/Banners_Industries.jpg';
import order from '../public/Banners_Order Support.jpg';
import service from '../public/Banners_Services.jpg';

export const categories = [
    { name: 'Inspiration', link: routes.inspiration.path },
    {
      name: 'Dealers',
      subCategories: [
        { name: 'Dealer Location', link: routes.storeLocator.path, blank: '' },
        {
          name: 'Dealer Application',
          link: '/dealerForm',
          blank: '_blank',
        },
        {
          name: 'Dealer Login',
          link: 'https://dealerportal.bodykore.com/login',
          blank: '_blank',
        },
      ],
    },
    { name: 'Blog + News', link: routes.news.path },
    { name: 'Contact', link: routes.contact.path },
  ];
  
  export const resources = [
    [
      {
        name: 'INFORMATIONAL',
        options: [
          {
            text: '#WeAreBodyKore',
            link: routes.aboutus.path,
            newTab: '_self',
            image: information.src,
          },
          {
            text: 'Reviews',
            link: routes.reviews.path,
            newTab: '_self',
          },
  
          {
            text: 'Manuals',
            link: routes.manuals.path,
            newTab: '_self',
          },
          {
            text: 'Technical Datasheets ',
            link: routes.technicalDatasheets.path,
            newTab: '_self',
          },
          {
            text: 'Performance Technology',
            link: routes.performanceTechnology.path,
            newTab: '_self',
          },
        ],
      },
    ],
    [
      {
        name: 'ORDER SUPPORT',
        options: [
         
          {
            text: 'Financing',
            link: routes.financing.path,
            newTab: '_self',
            image: service.src,
          },
          {
            text: 'My Account',
            link: '/auth/signin',
            newTab: '_self',
          },
          {
            text: 'Warranty',
            link: routes.warranty.path,
            newTab: '_self',
          },
          {
            text: 'Return Policy',
            link: routes.returnPolicy.path,
            newTab: '_self',
          },
          {
            text: 'Spare Parts',
            link: routes.spareParts.path,
            newTab: '_self',
          },
        ],
      },
    ],
    [
      {
        name: 'CATALOGS',
        options: [
          {
            text: 'Equipment Catalog',
            link: 'https://cms.bodykore.com/uploads/Body_Kore_Catalog_2025_78c9d8c010.pdf',
            newTab: '_blank',
            image: category.src,
          },
          {
            text: 'Product Catalog',
            link: '/PDFs/Product-Catalog.pdf',
            newTab: '_blank',
          },
          {
            text: 'Home Gym Catalog',
            link: '/PDFs/Home-Gyms-Catalog.pdf',
            newTab: '_blank',
          },
          {
            text: 'Linx Rack Catalog',
            link: '/PDFs/Linx_Rack_Catalog.pdf',
            newTab: '_blank',
          },
        ],
      },
    ],
  
    [
      {
        name: 'FEATURES',
        options: [
          {
            text: 'News',
            link: routes.news.path,
            newTab: '_blank',
            image: feature.src,
          },
          {
            text: 'Videos',
            link: routes.videos.path,
            newTab: '_blank',
          },
          {
            text: 'Team BodyKore',
            link: routes.teamBodykore.path,
            newTab: '_blank',
          },
          {
            text: 'Fitness Challenge',
            link: '/maslow-moves-fitness-challenge',
            newTab: '_blank',
          },
        ],
      },
    ],
  
    [
      {
        name: 'Services',
        options: [
          {
            text: 'Full Gym Solutions',
            link: routes.fullGymSolutions.path,
            newTab: '_self',
            image: order.src,
          },
          {
            text: '3D Gym Design',
            link: routes.threeDGymDesign.path,
            newTab: '_blank',
            image: service.src,
          },
  
          {
            text: 'Customization',
            link: routes.upholstery.path,
            newTab: '_blank',
          },
          {
            text: 'White Glove Delivery',
            link: routes.whiteGloveDelivery.path,
            newTab: '_blank',
          },
        ],
      },
    ],
    [
      {
        name: 'Industries',
        options: [
          {
            text: 'Hospitality',
            link: routes.hospitality.path,
            newTab: '_blank',
            image: industry.src,
          },
  
          {
            text: 'Residential Communities',
            link: routes.residential.path,
            newTab: '_blank',
          },
          {
            text: 'Commercial Gyms',
            link: routes.commercialgym.path,
            newTab: '_blank',
          },
          {
            text: 'Military',
            link: routes.military.path,
            newTab: '_blank',
          },
          {
            text: 'Institutions',
            link: routes.institutional.path,
            newTab: '_blank',
          },
          {
            text: 'Gyms',
            link: routes.gym.path,
            newTab: '_blank',
          },
        ],
      },
    ],
  ]