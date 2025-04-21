const routes = {
  home: {
    path: '/',
  },
  account: {
    path: 'https://localhost:3000/account/login',
    // TODO: set correct shopify domain
  },
  news: {
    path: '/blog',
    subPages: [
      {
        title: 'How to train hard in the gym?',
        slug: 'how-to-train-hard-in-the-gym',
      },
      {
        title: 'How Many Exercises Per Muscle Group You Should Do',
        slug: 'how-many-exercises-per-muscle-group-you-should-do',
      },
      {
        title:
          'BodyKore’s Universal Trainer: The Original, Trusted, and Innovated Multi-Gym Solution',
        slug: 'bodykore-universal-trainer-the-original-multi-gym-solution',
      },
      {
        title: 'Top 5 Middle Back Gym Exercises for 2024',
        slug: 'middle-back-gym-exercises',
      },
      {
        title: 'Best Chest and Tricep Workouts for 2024',
        slug: 'chest-and-tricep-workouts',
      },
      {
        title: 'Top 5 Lower Back Gym Exercises for 2024',
        slug: 'lower-back-gym-exercises',
      },
      {
        title: 'How to Maintain Your Workout Routine While Traveling',
        slug: 'how-to-maintain-your-workout-routine-while-traveling',
      },
      {
        title: '5 Best Quad Exercises for Beginners',
        slug: 'best-quad-exercises-for-beginners',
      },
      {
        title: 'How to Exercise Effectively at Home? 5 Tips to Follow',
        slug: 'how-to-exercise-effectively-at-home',
      },
      {
        title: 'Why Fitness is Important? 5 Benefits of Regular Exercise',
        slug: 'why-fitness-is-important',
      },
      {
        title: '5 Best Lat Exercises to Build a Bigger Back',
        slug: 'best-lat-exercises-to-build-a-bigger-back',
      },
      {
        title: '5 Best Trap Exercises to Build Bigger Traps',
        slug: 'best-trap-exercises',
      },
      {
        title: 'Good Morning Exercise: How to Do, Benefits & Mistakes',
        slug: 'good-morning-exercise',
      },
      {
        title: 'Leg Press Machine Workouts: 7 Effective Exercises',
        slug: 'leg-press-machine-workouts',
      },
      {
        title: '5 Best Smith Machine Exercises for Back',
        slug: 'best-smith-machine-exercises-for-back',
      },
      {
        title: 'Is leg press a good exercise?',
        slug: 'is-leg-press-a-good-exercise',
      },
      {
        title:
          'Gabriela Kurtz: A Journey of Strength, Discipline, and Glute Mastery with BodyKore',
        slug: 'gabriela-kurtz-a-journey-of-strength-discipline-and-glute-mastery-with-body-kore',
      },
      {
        title: 'How to Clean Gym Equipment: A Complete Guide',
        slug: 'how-to-clean-gym-equipment-a-complete-guide',
      },
      {
        title: '7 Gym Equipment That Burns the Most Calories',
        slug: 'gym-equipment-that-burns-the-most-calories',
      },
      {
        title: 'How Can a Maintained Workout Routine Help You Fight Diseases?',
        slug: 'how-can-a-maintained-workout-routine-help-you-fight-diseases',
      },
      {
        title: 'How Exercise Helps You Manage Pain & Revitalize',
        slug: 'how-exercise-helps-you-manage-pain-and-revitalize',
      },
      {
        title: 'Physical Exercise & Mental Health Benefits - Bodykore',
        slug: 'physical-exercise-and-mental-health-benefits',
      },
      {
        title: '5 Home Gym Tips to Achieve Your Fitness Goal',
        slug: 'home-gym-tips-to-achieve-your-fitness-goal',
      },
      {
        title: '13 Best Barbell Squat Alternatives for Total Fitness',
        slug: 'best-barbell-squat-alternatives',
      },
      {
        title: 'Top 10 Fitness Equipment by BodyKore for 2024',
        slug: 'top-10-fitness-equipment-by-body-kore-in-2024',
      },
      {
        title:
          'Navigating the Gym Business: Insights from Gym Owner Bert Flores',
        slug: 'navigating-the-gym-business-insights-from-gym-owner-bert-flores',
      },
      {
        title: '9 Essential Home Gym Equipment for Total Fitness',
        slug: 'essential-home-gym-equipment-for-total-fitness',
      },
      {
        title: 'How to Use a Cable Machine at the Gym? ',
        slug: 'how-to-use-a-cable-machine-at-the-gym',
      },
      {
        title: 'The Dynamic Trainer: Versatile and Compact Fitness Machine',
        slug: 'the-dynamic-trainer-versatile-and-compact-fitness-machine',
      },
      {
        title: 'Journey to Strength with Michelle Hurst: A BodyKore Spotlight',
        slug: 'journey-to-strength-with-michelle-hurst-a-body-kore-spotlight',
      },
      {
        title:
          "New Press Release: BodyKore's Insider Tips for Your Dream Home Gym",
        slug: 'new-press-release-body-kore-s-insider-tips-for-your-dream-home-gym',
      },
      {
        title:
          'Plate Loaded Fitness Equipment: An In-depth Look at the Stacked Series by BodyKore',
        slug: 'plate-loaded-fitness-equipment-an-in-depth-look-at-the-stacked-series-by-body-kore',
      },
      {
        title: '6 Gym Equipment to Help You Lose Body Weight',
        slug: 'gym-equipment-to-help-you-lose-body-weight',
      },
      {
        title: '6 Best Gym Exercises for Abs',
        slug: 'best-gym-exercises-for-abs',
      },
      {
        title: 'From Zero to Home Gym Hero with BodyKore: the Ultimate Guide',
        slug: 'from-zero-to-home-gym-hero-with-body-kore-the-ultimate-guide',
      },
      {
        title: 'How to Build A Home Gym in Budget?',
        slug: 'how-to-build-a-home-gym-in-budget',
      },
      {
        title:
          'Maximizing Glute Gains: A Personal Trainer’s Perspective and Top Glute Machines',
        slug: 'maximizing-glute-gains-a-personal-trainer-s-perspective-and-top-glute-machines',
      },
      {
        title: "Friends in Fitness: Amanda and Vanessa's Inspiring Journey",
        slug: 'friends-in-fitness-amanda-and-vanessa-s-inspiring-journey',
      },
      {
        title: 'How to Use Sled Push to Build Power? ',
        slug: 'how-to-use-sled-push-to-build-power',
      },
      {
        title: '10 Benefits of Using Sled Gym Equipment',
        slug: 'benefits-of-using-sled-gym-equipment',
      },
      {
        title: 'Transforming Arrive Paso Robles with Our 3D Design Service',
        slug: 'transforming-arrive-paso-robles-with-our-3-d-design-service',
      },
      {
        title: '5 Best Fitness Equipment for Legs by Bodykore',
        slug: 'best-fitness-equipment-for-legs-by-bodykore',
      },
      {
        title: '7 Best Fitness Equipment for Small Spaces',
        slug: '7-best-fitness-equipment-for-small-spaces',
      },
      {
        title:
          'OC Strength Lab: Christian’s Passion for Fitness and Helping Others',
        slug: 'oc-strength-lab-christian-s-passion-for-fitness-and-helping-others',
      },
      {
        title:
          'Gabriela’s Insights and Tips on the GM5004 Station 4 Lat Pull Down Station',
        slug: 'gabriela-s-insights-and-tips-on-the-gm-5004-station-4-lat-pull-down-station',
      },
      {
        title: '6 Best Outdoor Fitness Equipment for Backyard & Park',
        slug: '6-best-outdoor-fitness-equipment-for-backyard-and-park',
      },
      {
        title: 'Empowering Fitness Communities: An Interview with @toriwhitee_',
        slug: 'empowering-fitness-communities-an-interview-with-toriwhitee',
      },
      {
        title:
          'Summer Ready: Functional Training System to Boost Your Fitness Routine',
        slug: 'summer-ready-functional-training-system-to-boost-your-fitness-routine',
      },
      {
        title: '8 Best Smith Machine Exercise To Do',
        slug: '8-best-smith-machine-exercise-to-do',
      },
      {
        title: '9 Best Dumbbell Exercises For Building Muscle',
        slug: '9-best-dumbbell-exercises-for-building-muscle',
      },
      {
        title: '9 Amazing Cable Machine Exercises to Do',
        slug: '9-amazing-cable-machine-exercises-to-do',
      },
      {
        title: '9 Best Budget Garage Home Gym Equipment Ideas 2023',
        slug: '9-best-budget-garage-home-gym-equipment-ideas',
      },
      {
        title: 'Best Full Body Workout Machines for Home: Ultimate Fitness',
        slug: 'best-full-body-workout-machines-for-home',
      },
      {
        title: 'Building a Basement Home Gym: Planning and Equipment',
        slug: 'building-a-basement-home-gym-planning-and-equipment',
      },
      {
        title:
          'Influencing the Fitness World: An Interview with @valleyymuscle',
        slug: 'influencing-the-fitness-world-an-interview-with-valleyymuscle',
      },
      {
        title: 'IHRSA 2023 Is One To Remember',
        slug: 'ihrsa-2023-is-one-to-remember',
      },
      {
        title:
          '5 Weight Lifting Exercises For Beginners That Can Take You Step Ahead',
        slug: '5-weight-lifting-exercises-for-beginners-that-can-take-you-step-ahead',
      },
      {
        title: 'BodyKore to Debut Revolutionary Smart Sled Pro at IHRSA 2023',
        slug: 'body-kore-to-debut-revolutionary-smart-sled-pro-at-ihrsa-2023',
      },

      {
        title:
          'BodyKore Makes It Easier To Reach 2023 Fitness Goals with All-in-One Machine',
        slug: 'body-kore-makes-it-easier-to-reach-2023-fitness-goals-with-all-in-one-machine',
      },
      {
        title: 'BodyKore January 2023 Newsletter',
        slug: 'body-kore-january-2023-newsletter',
      },
      {
        title:
          'Commercial-Grade Quality vs. Standard Home Quality Fitness Equipment',
        slug: 'commercial-grade-quality-vs-standard-home-quality-fitness-equipment',
      },
      {
        title: '5 Ways To Start and Stay On Your Fitness Goals',
        slug: '5-ways-to-start-and-stay-on-your-fitness-goals',
      },
      {
        title: 'Exercising During Injury Recovery: What You Need To Know',
        slug: 'exercising-during-injury-recovery-what-you-need-to-know',
      },
      {
        title:
          'Join Us at IHRSA 2022 in Miami Beach from June 22-24 and Learn More About Our Functional Trainer!',
        slug: 'join-us-at-ihrsa-2022-in-miami-beach-from-june-22-24-and-learn-more-about-our-functional-trainer',
      },
      {
        title: 'IHRSA Recap, Digital Catalogs, and Product of the Month',
        slug: 'ihrsa-recap-digital-catalogs-and-product-of-the-month',
      },
      {
        title: 'Social Media Giveaway, QVC/HSN Recap, and NEWD GYM Feature',
        slug: 'social-media-giveaway-qvc-hsn-recap-and-newd-gym-feature',
      },
    ],
  },
  universalAttachments: {
    path: '/univeral-trainer-attachments',
  },
  performanceTechnology: {
    path: '/technology',
  },
  WorkoutwithJamesMaslow: {
    path: '/WorkoutwithJamesMaslow',
  },

  inspiration: {
    path: '/inspiration',
    subPages: [
      { slug: 'the-lab-909', title: 'The Lab 909' },
      { slug: 'newport-villa', title: 'Newport villa' },
      { slug: 'a-furnished-home-gym', title: 'Furnished Home Gym' },
      { slug: 'hb-master-gym-room', title: 'HB Master Gym Room' },
      { slug: 'hills-of-beverly', title: 'Hills of Beverly' },
      { slug: 'bel-air-mansion', title: 'Bel Air Mansion' },
      { slug: 'parker-house', title: 'Parker House' },
      { slug: 'sunset-view', title: 'sunset view' },
      { slug: 'redondo-sunroom', title: 'redondo sunroom' },
      { slug: 'woodland-hills-gym-room', title: 'woodland hills gym' },
      { slug: 'fitness-fan', title: 'fitness fan' },
      { slug: 'complete-home-gym', title: 'complete home gym' },
      {
        slug: 'something-about-the-sunshine',
        title: 'something about the sunshine',
      },
      { slug: 'hollywood-hills', title: 'hollywood hill' },
      { slug: 'fitness-den', title: 'Fitness Den' },
      { slug: 'arcadia', title: 'arcadia' },
      { slug: 'beverly-hills', title: 'beverly hills' },
      { slug: 'gym-above-the-stars', title: 'gym above the stars' },
      { slug: 'catching-the-breeze', title: 'catching the breeze' },
      { slug: 'brentwood', title: 'brentwood' },
      { slug: 'complete-garage-gym', title: 'complete garage gym' },
      { slug: 'la-jolla-clubhouse', title: 'la jolla clubhouse' },
      { slug: 'greenfield-house', title: 'greenfield house' },
      { slug: 'oc-jay-fitness', title: 'oc jay fitness' },
      { slug: 'russo-house', title: 'russo house' },
      { slug: 'frazier-home', title: 'frazier home' },
      { slug: 'gotta-have-it', title: 'gotta have it' },
      { slug: 'ladera-home-gym', title: 'ladera home gym' },
      { slug: 'murray-house', title: 'murray house' },
      { slug: 'riverside-ranch', title: 'riverside ranch' },
      { slug: 'wood-home', title: 'wood home' },
      { slug: 'zerner-house', title: 'zerner house' },
      { slug: 'rcmc-medical-center', title: 'rcmc medical center' },
      { slug: 'arrive-longmont', title: 'arrive longmont' },
      { slug: 'goat-fitness', title: 'goat fitness' },
      { slug: 'ther-ex-station', title: 'ther ex station' },
      { slug: 'fontana-fire-department', title: 'fontana fire department' },
      { slug: 'work-fitness', title: 'work fitness' },
      { slug: 'arrive-in-paso-robles', title: 'arrive in paso robles' },
      { slug: 'bio-body-fitne', title: 'bio body fitne' },
      { slug: 'anytime-fitness-san-jose', title: 'anytime fitness san jose' },
      { slug: 'gracie-gym-oc', title: 'gracie gym oc' },
      { slug: 'beast-chickz', title: 'beast chickz' },
      { slug: '24-sports-academy', title: '24 sports academy' },
      {
        slug: 'redding-submission-and-fitness',
        title: 'redding submission and fitness',
      },
      {
        slug: 'san-diego-probation-department',
        title: 'san diego probation department',
      },
      { slug: '24-hour-smith-s-station', title: '24 hour smith s station' },
      { slug: 'summit-personal-training', title: 'summit personal training' },
      { slug: 'ebs-performance-fitness', title: 'ebs performance fitness' },
      { slug: 'perfectly fit', title: 'perfectly fit' },
      { slug: 'booty-by-barbells', title: 'booty by barbells' },
    ],
  },

  products: {
    path: '/product',
  },

  collection: {
    hidden: true,
    path: '/product-category',
  },

  manuals: {
    path: '/product-manuals',
  },
  spareParts: {
    path: '/spareParts',
  },
  threeDGymDesign: {
    path: '/3ddesign',
  },
  technicalDatasheets: {
    path: '/datasheets',
  },
  aboutus: {
    path: '/aboutus',
  },
  teamBodykore: {
    path: '/ambassadors',
  },
  equipmentCatalog: {
    path: 'https://cms.bodykore.com/uploads/Body_Kore_Catalog_2024_5c3118b624.pdf',
  },
  productCatalog: {
    path: 'PDFs/Product-Catalog.pdf',
  },
  homeGymCatalog: {
    path: 'PDFs/Home-Gyms-Catalog.pdf',
  },
  linxRackCatalog: {
    path: 'PDFs/Linx_Rack_Catalog.pdf',
  },
  loyaltyProgram: {
    path: '/loyaltyProgram',
  },
  reviews: {
    path: '/reviews',
  },
  squatBox: {
    path: '/squatBox',
  },
  squatBoxPro: {
    path: '/squat-box-pro',
  },

  videos: {
    path: '/our-portfolio',
    subPages: [
      {
        title: 'Client Testimonials',
        slug: 'customer-testimonials',
      },
      {
        title: 'Product Installations',
        slug: 'installation-videos',
      },
      {
        title: 'Tutorial Videos',
        slug: 'tutorial-videos',
      },
      {
        title: 'BodyKore Promos',
        slug: 'promo-videos',
      },
      {
        title: 'Products',
        slug: 'product-video',
      },
      {
        title: 'Maintenance Videos',
        slug: 'maintenance-videos',
      },
      {
        title: 'Home Gyms',
        slug: 'home-gyms',
      },
      {
        title: 'Commercial Gyms',
        slug: 'commercial-gyms',
      },
      {
        title: 'Portfolio Series',
        slug: 'portfolio-series',
      },
    ],
  },
  fullGymSolutions: {
    path: '/full-gym-solutions',
  },
  financing: {
    path: '/finance',
  },

  warranty: {
    path: '/warranty',
  },
  returnPolicy: {
    path: '/returnPolicy',
  },
  storeLocator: {
    path: '/storeLocator',
  },
  dealerApplication: {
    path: '/dealerForm',
  },
  dealerLogin: {
    path: 'https://dealerportal.bodykore.com/login',
  },
  contact: {
    path: '/contact',
  },
  premiumHospitality: {
    path: '/hospitalityFitness',
  },
  // hospitality: {
  //   path: '/hospitalityFitness',
  // },
  hospitality: {
    path: 'hospitality-fitness-equipment',
  },
  residential: {
    path: 'residential-communities-fitness-equipment',
  },

  bread: {
    path: '/bread',
  },

  affirm: {
    path: '/affirm',
  },
  synchrony: {
    path: '/synchrony',
  },
  customUpholstery: {
    path: '/',
  },
  whiteGloveDelivery: {
    path: '/',
  },
  wegetfinance: {
    path: '/weGetFinance',
  },
  signin: {
    path: '/auth/signin',
  },
  military: {
    path: 'military-fitness-equipment',
  },
  institutional: {
    path: 'institutional-fitness-equipment',
  },
  gym: {
    path: 'gym-fitness-equipment',
  },
  commercialgym: {
    path: 'commercialgym'
  },
  upholstery: {
    path: 'upholstery'
  },
  api: {
    hidden: true,
    path: '/api',
    wishlist: {
      path: '/api/wishlist',
    },
    coordinates: {
      path: '/api/coordinates',
    },
  },
};

export default routes;
