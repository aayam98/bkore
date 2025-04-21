import Image from 'next/image';
import SupportCard from './SupportServicesCard';
import Link from 'next/link';

const PackageCard = () => {
  return (
    <section className="lg:px-10 px-4 h-full">
      <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-16 mt-20">
        <div className="package-card">
          <h3 className="text-red-bc2026 flex flex-col lg:text-3xl text-2xl font-bold">
            PACKAGE A: ESSENTIAL FITNESS
          </h3>
          <div className="package-content flex flex-col justify-start items-start h-full pb-28">
            <Image
              src={'/PremiumHospatilityFitness/packageA.jpeg'}
              alt=""
              className="w-80 h-80"
              height={400}
              width={400}
              placeholder="blur"
              blurDataURL="/loading.png"
            />
            <p className="text-white py-4">
              Perfect for smaller hotels or limited spaces, Package A offers a
              well-rounded selection of equipment to meet your guests' basic
              fitness needs.
            </p>
            <ul className="text-white list-disc pt-4">
              <li>RT930 Commercial Treadmill</li>
              <li>RE930 Commercial Elliptical</li>
              <li>RR930 Recumbent Bike</li>
              <li>Mx1161 Functional Trainer</li>
              <li>VFCR1701A Single Bay Linx Rack</li>
              <li>5-50lb Pro Dumbbell Set with G231 Dumbbell Rack</li>
              <li>G206 Adjustable Bench</li>
            </ul>
            <button className="bg-red-bc2026 text-white p-2 rounded-md mt-auto">
              <Link href="/contact">Learn More</Link>
            </button>
          </div>
        </div>
        <div className="package-card">
          <h3 className="text-red-bc2026 flex flex-col lg:text-3xl text-2xl font-bold">
            PACKAGE B: COMPLETE FITNESS
          </h3>
          <div className="package-content flex flex-col justify-start items-start h-full pb-28">
            <Image
              src={'/PremiumHospatilityFitness/packageB.jpeg'}
              alt=""
              className="w-80 h-80"
              height={400}
              width={400}
              placeholder="blur"
              blurDataURL="/loading.png"
            />
            <p className="text-white py-4">
              Perfect for smaller hotels or limited spaces, Package A offers a
              well-rounded selection of equipment to meet your guests' basic
              fitness needs.
            </p>
            <ul className="text-white list-disc pt-4">
              <li>2x RT930 Commercial Treadmill</li>
              <li>2x RE930 Commercial Elliptical</li>
              <li>RR930 Recumbent Bike</li>
              <li>XCS700 Stepmill</li>
              <li>Mx1162 Universal Trainer</li>
              <li>VFCR1701A Single Bay Linx Rack</li>
              <li>5-50lb Pro Dumbbell Set with G231 Dumbbell Rack</li>
              <li>G206 Adjustable Bench</li>
              <li>Gr638 Lat Pulldown/Low Row</li>
              <li>Gr639 Leg Extension/Curl</li>
              <li>Gr640 Multipress</li>
            </ul>
            <button className="bg-red-bc2026 text-white p-2 rounded-md mt-auto">
              <Link href="/contact">Learn More</Link>
            </button>
          </div>
        </div>
        <div className="package-card">
          <h3 className="text-red-bc2026 flex flex-col lg:text-3xl text-2xl font-bold">
            PACKAGE C: ULTIMATE FITNESS
          </h3>
          <div className="package-content flex flex-col justify-start items-start h-full pb-28">
            <Image
              src={'/PremiumHospatilityFitness/packageC.jpeg'}
              alt=""
              className="w-80 h-80"
              height={400}
              width={400}
              placeholder="blur"
              blurDataURL="/loading.png"
            />
            <p className="text-white py-4">
              Perfect for smaller hotels or limited spaces, Package A offers a
              well-rounded selection of equipment to meet your guests' basic
              fitness needs.
            </p>
            <ul className="text-white list-disc pt-4">
              <li>3x RT930 Commercial Treadmill</li>
              <li>2x RE930 Commercial Elliptical</li>
              <li>RR930 Recumbent Bike</li>
              <li>RU930 Upright Bike</li>
              <li>2x XCS700 Stepmill</li>
              <li>Mx1162 Universal Trainer</li>
              <li>VFCR1701D Dual Bay Linx Rackh</li>
              <li>5-100lb Pro Dumbbell Set with G231 Dumbbell Rack</li>
              <li>G206 Adjustable Bench</li>
              <li>Gr631 Leg Press</li>
              <li>Gr639 Leg Extension/Curl</li>
              <li>Gm5003 Multigym</li>
            </ul>
            <button className="bg-red-bc2026 text-white p-2 rounded-md mt-auto">
              <Link href="/contact">Learn More</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageCard;
