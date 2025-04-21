import PartnerContactForm from '@components/partner/PartnerContactForm';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>BodyKore - Become a Reseller</title>
        <meta
          name="description"
          content="Partner with BodyKore, a trusted brand in fitness innovation"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full">
            <Image
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-3b082e79-88b3-44d1-a16b-6d850b473fc9.jpg"
              alt="Gym Equipment"
              layout="fill"
              objectFit="cover"
              className="opacity-50"
            />
          </div>
        </div>
        <div className="max-w-6xl m-auto relative z-10 px-4 py-20 md:py-32 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <h4 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-roboton leading-none">
              Become a BodyKore Reseller
            </h4>
            <p className="lg:text-lg text-base mb-6">
              Partner with <span className="font-bold">BodyKore</span>, a
              trusted brand in fitness innovation, and bring
              <span className="text-red-500 font-bold">
                {' '}
                high-demand, commercial-grade fitness solutions
              </span>{' '}
              to your customers.
            </p>
            <PartnerContactForm name company email phone />
          </div>
        </div>
      </section>

      {/* Trade Shows Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h4 className="text-xl lg:text-3xl font-bold mb-6 font-roboton leading-none text-center ">
            Join Us at These Industry Trade Shows
          </h4>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-gray-100 overflow-hidden rounded-lg shadow-lg">
              <div className="lg:h-72 h-64 relative">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-22fa4aa8-fb8f-4a53-b8ef-03f89c53cb3c.jpg"
                  alt="FIBO Trade Show"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  VISIT US AT FIBO
                </h3>
                <p className="text-sm sm:text-base">10-13 APRIL, 25</p>
                <p className="text-sm sm:text-base">HALL 8, BOOTH #8A74</p>
                <p className="text-sm sm:text-base">COLOGNE, GERMANY</p>
              </div>
            </div>
            <div className="bg-gray-100 overflow-hidden rounded-lg shadow-lg">
              <div className="lg:h-72 h-64 relative">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-56752aff-656d-4a4d-8b81-642239d7223a.jpg"
                  alt="HFA Trade Show"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  JOIN US IN LAS VEGAS!
                </h3>
                <p className="text-sm sm:text-base">12-14 MARCH, 2025</p>
                <p className="text-sm sm:text-base">Booth 3229</p>
                <p className="text-sm sm:text-base">MANDALAY BAY RESORT</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="grid lg:grid-cols-12 grid-cols-1 gap-16 px-4">
        <div className="grid lg:col-span-7 col-span-1 m-auto lg:justify-end justify-start">
          <div className="lg:max-w-2xl max-w-full flex flex-col items-end p-3">
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h4 className="text-xl lg:text-3xl font-bold font-roboton leading-none">
                  OUR STORY: <br className="block md:hidden" />
                </h4>
                <h4 className="text-xl lg:text-3xl font-bold mb-4 font-roboton leading-none">
                  WE ARE <span className="text-red-bc2026">BODYKORE</span>
                </h4>
                <p className="font-roboto lg:text-base text-base text-red-bc2026 font-semibold">
                  DRIVEN BY PASSION, PROVEN BY PERFORMANCE.
                </p>
                <p className="font-roboto lg:text-base text-base text-gray-600">
                  At BodyKore, we design and manufacture commercial-grade
                  fitness equipment that combines innovation, durability, and
                  biomechanical precision.
                </p>
              </div>

              <div className="col-span-5 flex lg:hidden">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/whatWeDo.avif?v=1744111029"
                  alt="BodyKore Team"
                  width={600}
                  height={400}
                  className="object-contain"
                  priority
                />
              </div>

              {/* Feature Grid */}
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 text-sm">
                <div className="p-4 border rounded-lg bg-white shadow-sm">
                  <p className="font-semibold text-lg">Proven Experience</p>
                  <p>20+ years in the industry with global distribution.</p>
                </div>
                <div className="p-4 border rounded-lg bg-white shadow-sm">
                  <p className="font-semibold text-lg">High-Value Solutions</p>
                  <p>
                    High-demand, high-margin fitness products to set you apart.
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-white shadow-sm">
                  <p className="font-semibold text-lg">Innovative Technology</p>
                  <p>Smart Sled Pro & Universal Attachment System.</p>
                </div>
                <div className="p-4 border rounded-lg bg-white shadow-sm">
                  <p className="font-semibold text-lg">Global Growth</p>
                  <p>Now expanding distribution—let's grow together!</p>
                </div>
                <div className="p-4 border rounded-lg bg-white shadow-sm col-span-1 sm:col-span-2">
                  <p className="font-semibold text-lg">Trusted by the Best</p>
                  <p>
                    Used by top gyms, pro athletes, and elite training
                    facilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-5 lg:flex hidden">
          <Image
            src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/whatWeDo.avif?v=1744111029"
            alt="BodyKore Team"
            width={700}
            height={850}
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Global Network Section */}
      <section className="pt-16 px-4 max-w-6xl mx-auto text-center">
        <div className="pb-10 max-w-4xl m-auto">
          <h4 className="text-xl lg:text-3xl font-bold mb-4 font-roboton lg:leading-none leading-7">
            JOIN OUR GLOBAL NETWORK OF DEALERS, RETAILERS, & COMMERCIAL PARTNERS
          </h4>
          <p className="font-roboto lg:text-base text-base text-gray-600">
            Are you a gym owner, retailer, distributor, or fitness entrepreneur
            looking to expand your product offering with premium strength and
            performance equipment? Partner with BodyKore, a trusted brand in
            fitness innovation, and bring high-demand, commercial-grade fitness
            solutions to your customers.
          </p>
        </div>

        <div className="">
          <h4 className="text-xl lg:text-3xl font-bold mb-6 font-roboton leading-none">
            WHY PARTNER WITH BODYKORE?
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 - Proven Performance */}
            <div className="flex flex-col items-center text-center gap-2">
              <Image
                src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-ad88c543-ed40-4a94-b892-7fe7e66e9bb1.png"
                alt="Proven Performance"
                width={500}
                height={350}
              />

              <h4 className="lg:text-xl text-lg font-semibold text-gray-800">
                Proven Performance
              </h4>
              <p className="font-roboto font-normal text-sm text-gray-700">
                With a strong presence across the{' '}
                <strong>U.S., Canada, and Mexico</strong>, and an expanding
                global footprint, BodyKore equipment is trusted by{' '}
                <strong>
                  commercial gyms, training centers, rehab facilities, and elite
                  athletes.
                </strong>
              </p>
            </div>

            {/* Column 2 - High-Margin, High-Quality Products */}
            <div className="flex flex-col items-center text-center gap-2">
              <Image
                src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-b3eec73c-113e-4fc4-a7c0-8a6ad4192200.png"
                alt="High-Margin, High-Quality Products"
                width={500}
                height={350}
              />

              <h4 className="lg:text-xl text-lg font-semibold text-gray-800">
                High-Margin, High-Quality Products
              </h4>
              <p className="font-roboto font-normal text-sm text-gray-700">
                From our best-selling <strong>Universal Trainer</strong> to the
                versatile <strong>Squat Box Series</strong>, BodyKore offers
                equipment designed for{' '}
                <strong>durability, functionality, and style</strong>—creating
                strong demand and high customer satisfaction.
              </p>
            </div>

            {/* Column 3 - Support You Can Count On */}
            <div className="flex flex-col items-center text-center gap-2">
              <Image
                src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-ecaf8ba1-1cdd-4ca0-a5f7-3bfc576b5d0b.png"
                alt="Support You Can Count On"
                width={500}
                height={350}
              />

              <h4 className="lg:text-xl text-lg font-semibold text-gray-800">
                Support You Can Count On
              </h4>
              <div>
                <p className="font-roboto font-normal text-sm text-gray-700">
                  Our partners receive:
                </p>
                <ul className="list-disc text-left mx-auto font-roboto font-normal text-sm text-gray-700">
                  <li className="flex items-start">
                    <span>
                      - <strong>Dealer pricing</strong> & wholesale programs
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span>
                      - <strong>Marketing assets</strong> & sales collateral
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span>
                      - <strong>Training and onboarding</strong> support
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span>
                      - <strong>Logistics and fulfillment</strong> assistance
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-12 lg:px-0 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <h4 className="text-xl lg:text-3xl font-bold mb-6 lg:text-left text-center font-roboton leading-none">
            OUR INNOVATIONS
          </h4>
        </div>

        {/* Innovation Image */}
        <div className="xl:flex xl:justify-center mb-5">
          <Image
            src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/Screenshot_2025-04-07_at_4.00.38_PM.png?v=1744020970"
            alt="BodyKore Innovations"
            width={1800}
            height={380}
            priority
          />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="lg:p-5 p-0 flex flex-col gap-2">
              <h4 className="text-lg lg:text-xl font-bold font-roboton leading-none">
                REVOLUTIONIZING FITNESS WITH SMART TECH & PATENTED DESIGNS
              </h4>
              <p className="font-roboto font-normal text-sm text-gray-700">
                Tech-driven training for gyms, performance centers, and athletes
                worldwide.
              </p>
            </div>

            {/* Card 2 */}
            <div className=" flex flex-col">
              <div className="border border-gray-200 rounded-lg p-2 space-y-1">
                <h4 className="text-base lg:text-lg font-bold font-roboton leading-none">
                  Smart Sled Pro
                </h4>
                <p className="font-roboto font-normal text-sm text-gray-700">
                  Motorized resistance with real-time performance tracking via
                  app integration.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className=" flex flex-col">
              <div className="border border-gray-200 rounded-lg p-2">
                <h4 className="text-base lg:text-lg font-bold font-roboton leading-none">
                  Intelligent Pulley Sensors
                </h4>
                <p className="font-roboto font-normal text-sm text-gray-700">
                  Monitors force, speed, and reps for precise training feedback.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className=" flex flex-col">
              <div className="border border-gray-200 rounded-lg p-2">
                <h4 className="text-base lg:text-lg font-bold font-roboton leading-none">
                  Patented & Patent-Pending Designs
                </h4>
                <p className="font-roboto font-normal text-sm text-gray-700">
                  Smart Sled, Squat Box, and Universal Attachment System set us
                  apart in performance and versatility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-8xl m-auto py-12 w-full relative overflow-hidden px-4">
        <div className="grid grid-cols-12 w-full gap-4 items-start">
          <div className="lg:col-span-2 col-span-12 flex flex-col gap-5 lg:order-1 order-2">
            <img
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/Newport_2024_1_of_5.jpg?v=1744118416"
              className="w-full lg:h-40 h-auto object-cover"
              alt=""
            />
            <img
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/Newd_Gym-2.jpg?v=1744118543"
              className="w-full lg:h-40 h-auto object-cover"
              alt=""
            />
            <img
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/EBS_Portfolio_4.27.22-19.jpg?v=1744118715"
              className="w-full lg:h-40 h-auto object-cover"
              alt=""
            />
          </div>
          <div className="lg:col-span-8 col-span-12 lg:order-2 order-1">
            <h4 className="text-xl lg:text-3xl font-bold text-center font-roboton leading-none">
              PRODUCT HIGHLIGHTS
            </h4>
            <p className="font-roboto lg:text-base text-base text-gray-600 text-center mb-4 font-medium">
            Premium Commercial - Grade Equipment
            </p>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-5 bg-white gap-2 flex flex-col">
                  <h4 className="text-base lg:text-lg font-bold font-roboton leading-none">
                    MULTI GYMS
                  </h4>
                  <p className="font-roboto font-normal text-sm text-gray-700">
                    Space-saving cable stations and multi-function trainers
                    designed for dynamic, group-based workouts.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 bg-white gap-2 flex flex-col">
                  <h4 className="text-base lg:text-lg font-bold font-roboton leading-none">
                    ISOLATION SERIES
                  </h4>
                  <p className="font-roboto font-normal text-sm text-gray-700">
                    Selectorized machines offering precise, ergonomic strength
                    training with a user-friendly design.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 bg-white gap-2 flex flex-col">
                  <h4 className="text-base lg:text-lg font-bold font-roboton leading-none">
                    STACKED SERIES
                  </h4>
                  <p className="font-roboto font-normal text-sm text-gray-700">
                    Plate-loaded machines combining free-weight functionality
                    with guided motion for balanced muscle development.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 bg-white gap-2 flex flex-col">
                  <h4 className="text-base lg:text-lg font-bold font-roboton leading-none">
                    RACKS AND RIGS
                  </h4>
                  <p className="font-roboto font-normal text-sm text-gray-700">
                    Durable stainless-steel hardware, electrostatic powder
                    coating, and flexible floor or wall mounting.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 bg-white gap-2 flex flex-col">
                  <h4 className="text-base lg:text-lg font-bold font-roboton leading-none">
                    BENCHES
                  </h4>
                  <p className="font-roboto font-normal text-sm text-gray-700">
                    Classic designs built for durability, performance, and a
                    sleek modern aesthetic.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 bg-white gap-2 flex flex-col">
                  <h4 className="text-base lg:text-lg font-bold font-roboton leading-none">
                    SMART SLED PRO
                  </h4>
                  <p className="font-roboto font-normal text-sm text-gray-700">
                    AI-powered motorized sled delivering up to 3x the resistance
                    of traditional sleds, with real-time performance tracking.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 col-span-12 flex flex-col gap-5 lg:order-3 order-3">
            <img
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/2b_15_of_21.jpg?v=1744118918"
              className="w-full lg:h-40 h-auto object-cover"
              alt=""
            />
            <img
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/Linx_7_of_25.jpg?v=1744119047"
              className="w-full lg:h-40 h-auto object-cover"
              alt=""
            />
            <img
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/ObstacleCourse.avif?v=1744119223"
              className="w-full lg:h-40 h-auto object-cover"
              alt=""
            />
          </div>
        </div>
      </section>

      <section className="px-4 max-w-6xl mx-auto text-center">
        <div className="">
          <h4 className="text-xl lg:text-3xl font-bold font-roboton lg:leading-none leading-7">
            CUSTOM COLORS & BRANDING
          </h4>
          <p className="font-roboto lg:text-base text-base text-red-bc2026 text-center mb-4 font-medium">
            TAILOR YOUR EQUIPMENT TO FIT YOUR BRAND
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Column 1 - Proven Performance */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/Fontana_FD-6-min.jpg?v=1744120126"
                width={500}
                height={350}
              />

              <div className="border border-gray-200 text-left p-3 w-full">
                <h5 className="text-base lg:text-lg font-bold font-roboton leading-none">
                  CUSTOM POWDER COATING
                </h5>
                <p className="font-roboto font-normal text-sm text-gray-700">
                  Premium finishes with durable electro-static coating.
                </p>
              </div>
            </div>

            {/* Column 2 - High-Margin, High-Quality Products */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/Brown_Leather_Custom-3_94e45bb5-fe87-43b8-9640-9b892cebdc4a.jpg?v=1744120163"
                width={500}
                height={350}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />

              <div className="border border-gray-200 text-left p-3 w-full">
                <h5 className="text-base lg:text-lg font-bold font-roboton leading-none">
                  CUSTOM UPHOLSTERY
                </h5>
                <p className="font-roboto font-normal text-sm text-gray-700">
                  Multiple color options with high-density padding.
                </p>
              </div>
            </div>

            {/* Column 3 - Support You Can Count On */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/1R3A3342-min.webp?v=1744120373"
                width={500}
                height={350}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />

              <div className="border border-gray-200 text-left p-3 w-full">
                <h5 className="text-base lg:text-lg font-bold font-roboton leading-none">
                  PRIVATE LABELING
                </h5>
                <p className="font-roboto font-normal text-sm text-gray-700">
                  Add your logo for a professional, branded look.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto ">
        <div className="py-16 px-4 text-center">
          <div className="mb-4">
            <h4 className="text-xl lg:text-3xl font-bold font-roboton lg:leading-none leading-7">
              CLIENTS
            </h4>
            <p className="font-roboto lg:text-base text-base text-red-bc2026 text-center mb-4 font-medium">
              TRUSTED BY INDUSTRY LEADERS WORLDWIDE
            </p>
            <p className="text-base max-w-4xl mx-auto">
              Trusted by top sports teams, luxury wellness centers, government
              facilities, leading fitness franchises like Anytime Fitness and
              UFC Gyms, and renowned celebrities & influencers.
            </p>
          </div>
          <img
            src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/logos.png?v=1744123327"
            className="w-full"
            alt=""
          />
        </div>
      </section>

      <section className="max-w-6xl m-auto lg:px-0 px-6 py-14">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div className="">
            <div>
              <h4 className="text-xl lg:text-3xl font-bold font-roboton leading-none">
                GLOBAL MARKET PRESENCE
              </h4>
              <p className="font-roboto lg:text-base text-base text-red-bc2026 font-semibold">
                EXPANDING WORLDWIDE
              </p>
            </div>
            {/* Feature Grid */}
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div className="p-4 border rounded-lg bg-white shadow-sm">
                <p className="font-semibold text-lg">STRONG U.S. NETWORK</p>
                <p>100+ dealers across the United States.</p>
              </div>
              <div className="p-4 border rounded-lg bg-white shadow-sm">
                <p className="font-semibold text-lg">GLOBAL REACH</p>
                <p>
                  Presence in Canada, Mexico, Taiwan, China, the Middle East,
                  and Latin America.
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-white shadow-sm">
                <p className="font-semibold text-lg">NEW PARTNERSHIPS</p>
                <p>Seeking distribution partners in key markets.</p>
              </div>
            </div>
          </div>
          <div className="">
            <Image
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/map.webp?v=1744188099"
              alt="BodyKore Team"
              width={900}
              height={900}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl m-auto lg:px-0 px-6 py-14">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div className="">
            <div>
              <h4 className="text-xl lg:text-3xl font-bold font-roboton leading-none">
                LOGISTICS
              </h4>
              <p className="font-roboto lg:text-base text-base text-red-bc2026 font-semibold">
                SEAMLESS GLOBAL SHIPPING FOR HIGH-VOLUME ORDERS
              </p>
            </div>
            {/* Feature Grid */}
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div className="p-4 border rounded-lg bg-white shadow-sm">
                <p className="font-semibold text-lg">FLEXIBLE BULK SHIPPING</p>
                <p>
                  Full & half-container options with direct factory savings.
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-white shadow-sm">
                <p className="font-semibold text-lg">HASSLE-FREE IMPORTS</p>
                <p>Easy customs clearance with compliance support.</p>
              </div>
              <div className="p-4 border rounded-lg bg-white shadow-sm">
                <p className="font-semibold text-lg">OPTIMIZED PACKING</p>
                <p>Maximized space, reduced costs, and damage-free delivery.</p>
              </div>

              <div className="p-4 border rounded-lg bg-white shadow-sm">
                <p className="font-semibold text-lg">
                  FAST & RELIABLE FULFILLMENT
                </p>
                <p>Quick processing and global port shipping.</p>
              </div>
            </div>
          </div>
          <div className="">
            <Image
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/containership.png"
              alt="BodyKore Team"
              width={900}
              height={900}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl m-auto lg:px-0 px-6 py-14">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div className="">
            <div>
              <h4 className="text-xl lg:text-3xl font-bold font-roboton leading-none">
                MARKETING & TRAINING SUPPORT
              </h4>
              <p className="font-roboto lg:text-base text-base text-red-bc2026 font-semibold">
                YOUR ALL-IN-ONE DISTRIBUTOR PORTAL
              </p>
            </div>
            {/* Feature Grid */}
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div className="p-4 border rounded-lg bg-white shadow-sm">
                <p className="font-semibold text-lg">DISTRIBUTOR PORTAL</p>
                <p>24/7 access to manuals, spec sheets, images, and videos. </p>
              </div>
              <div className="p-4 border rounded-lg bg-white shadow-sm">
                <p className="font-semibold text-lg">CO-OP MARKETING</p>
                <p>
                  Trade show support, sponsorships, and custom marketing assets.
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-white shadow-sm">
                <p className="font-semibold text-lg">PRODUCT TRAINING</p>
                <p>On-demand videos and live training for sales teams.</p>
              </div>
            </div>
          </div>
          <div className="">
            <Image
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/computer.png?v=1744187624"
              alt="BodyKore Team"
              width={900}
              height={900}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl m-auto lg:px-0 px-6">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div className="col-span-1">
            <h4 className="text-xl lg:text-3xl font-bold font-roboton lg:leading-none leading-7 mb-4">
              Trusted by Fitness <br></br>Professionals Worldwide
            </h4>
            <p className="font-roboto lg:text-base text-base text-gray-600 text-left mb-4 font-medium">
              Businesses across the globe <b>trust BodyKore</b> to supply{' '}
              <b>high-performance fitness equipment</b> for{' '}
              <b>
                commercial gyms, training facilities, retailers, and home users.
              </b>
            </p>
            <div className="grid grid-cols-3 gap-5 pt-8">
              <div className="flex flex-col items-center gap-2 text-center">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-af4c5402-686e-4cf8-ab5f-452812c95577.png"
                  width={50}
                  height={50}
                  objectFit="contain"
                />
                <h5 className="font-roboto font-semibold text-4xl">250+</h5>
                <p className="font-medium text-base">Resellers Worldwide</p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-af4c5402-686e-4cf8-ab5f-452812c95577.png"
                  width={50}
                  height={50}
                  objectFit="contain"
                />
                <h5 className="font-roboto font-semibold text-4xl">120+</h5>
                <p className="font-medium text-base">
                  Commercial Gyms & Facilities
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-af4c5402-686e-4cf8-ab5f-452812c95577.png"
                  width={50}
                  height={50}
                  objectFit="contain"
                />
                <h5 className="font-roboto font-semibold text-4xl">460K+</h5>
                <p className="font-medium text-base">1,300+ Home Gyms</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
          <a href={'//cms.bodykore.com/uploads/Body_Kore_Catalog_2025_78c9d8c010.pdf'} target='_blank' rel="noreferrer" className="mb-2 cursor-pointer">
            <img
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-217d4c24-9eae-4f07-a96f-57e724508ec2.jpg"
              className="w-full"
              alt=""
            />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-xl mx-auto ">
          <div className="text-white text-center">
            <h4 className="text-xl lg:text-3xl font-bold mb-4 font-roboton leading-none text-center ">
              Ready to Partner with BodyKore?<br></br> Let's Talk!
            </h4>
            <p className="font-roboto lg:text-base text-base text-white text-center mb-4 font-medium">
              Get in touch with us to find out more about our partner program.
            </p>
          </div>
          <PartnerContactForm name company email phone />
        </div>
      </section>
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between">
          {/* Left Column - Logo and Company Info */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            {/* Logo */}
            <a href={'/'} className="mb-2 cursor-pointer">
              <Image
                src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-4b6f9861-8989-4f81-b47e-381729621375.png"
                width={250}
                height={40}
                objectFit="contain"
                priority
              />
            </a>

            {/* Company Description */}
            <p className="text-gray-300 mb-8 max-w-lg">
              BodyKore is a trusted leader in commercial fitness equipment,
              serving gyms, sports teams, rehab centers, and fitness retailers
              worldwide. With a strong presence in the U.S., Canada, and Mexico,
              we are now expanding further into Europe and beyond.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-6">
              <a
                href="https://www.tiktok.com/@bodykore"
                target="_blank" rel="noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/bodykore/"
                target="_blank" rel="noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/BodyKore/"
                target="_blank" rel="noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/bodykore"
                target="_blank" rel="noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>

              <a
                href="https://www.youtube.com/user/BodyKore"
                target="_blank" rel="noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>

            <div className="flex items-start mb-6">
              <div className="bg-gray-800 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-300">
                7466 Orangewood Avenue, Garden Grove California 92841, United
                States
              </p>
            </div>

            <div className="flex items-start">
              <div className="bg-gray-800 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <a
                href="mailto:sales@bodykore.com"
                className="text-gray-300 hover:text-white"
              >
                sales@bodykore.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
