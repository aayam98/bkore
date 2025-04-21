import ImgDescriptionAmbs from '@components/ui/bodykore/Sections/ImgDescriptionAmbs';
import DobleColorTitle from '@components/ui/bodykore/Text/Titles/DobleColorTitle';
import AmbBanner from '@components/ui/bodykore/Banners/AmbBanner';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import seo from '../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import Link from 'next/link';
import AmbrasadorBanner from '@components/ui/bodykore/Banners/AmbrasadorBanner';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();

  return {
    props: { header },
    // revalidate: 30 * 60,
  };
};

interface AmbassadorsParams {
  header: HeaderData;
}

const Ambassadors = ({ header }: AmbassadorsParams) => {
  return (
    <>
      <SeoHeader seo={seo.ambassador} />

      <div>
        <main className="w-full">

          <AmbrasadorBanner
            bgImage={'/Ambassadors/team1.jpeg'}
            title={'Become A BodyKore Ambassador!'}
            description={
              'Champion it. Promote it. Benefit from it.'
            }
            link={'http://bodykore-store.goaffpro.com'}
            width="w-4/6 lg:w-3/6"
          />

          <div className="lg:py-24 p-10">
            <div className="flex justify-center">
              <DobleColorTitle title="HOW WE WORK" title2="TOGETHER" />
            </div>

            <ImgDescriptionAmbs
              imgHeight="h-16"
              imgWidth="w-14"
              link={'http://bodykore-store.goaffpro.com'}
              images={[
                {
                  img: '/svg/howWeWork1.svg',
                  title: 'Apply',
                  description:
                    'Fill out a simple application so we can get to know you .',
                },
                {
                  img: '/svg/howWeWork4.svg',
                  title: 'Connect',
                  description:
                    'Connect with your program manager and follow team bodykore.',
                },
                {
                  img: '/svg/howWeWork3.svg',
                  title: 'Promote',
                  description:
                    'Share your ambassador code with family friends and followers.',
                },
              ]}
            />
          </div>

          <div className="">
            <AmbBanner
              title1="BRAND AMBASSADOR"
              title2="PERKS"
              description="As a BodyKore Brand Ambassador, you’ll enjoy awesome perks, free products, and sales commission on referred purchases."
              iconsRow1={[
                {
                  icon: '/svg/ambBanner1.svg',
                  title: 'REWARDS',
                },
                {
                  icon: '/svg/ambBanner2.svg',
                  title: 'PROMOTIONAL ITEMS',
                },
                {
                  icon: '/svg/ambBanner3.svg',
                  title: 'SNEAK PEEKS',
                },
              ]}
              iconsRow2={[
                {
                  icon: '/svg/ambBanner4.svg',
                  title: 'VIP GIVEAWAYS',
                },
                {
                  icon: '/svg/ambBanner5.svg',
                  title: 'SALES COMMISSION',
                },
                {
                  icon: '/svg/ambBanner6.svg',
                  title: 'EXCLUSIVE CONTENT',
                },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 gap-16 lg:py-12 p-10">
            <section className="max-w-7xl m-auto">
              <h3 className='text-black-373933 font-bebas italic font-bold text-5xl text-center'>Program details</h3>
              <div className="pt-3 pb-1">
                <h6 className="text-black-373933 font-bebas italic font-bold lg:text-3xl text-2xl">
                  Become A BodyKore Ambassador!
                </h6>
                <p className="text-lg font-roboto text-black-373933 text-left leading-relaxed">
                  Join the BodyKore Elite Ambassador Team! Your passion for
                  motivating others to embrace movement and choose BodyKore
                  resonates with us. Let's make sure you're recognized and
                  rewarded for every recommendation you make. Dive into the
                  BodyKore Ambassador initiative – it's straightforward,
                  rewarding, and the perfect moment to jump on board is now!
                </p>
              </div>
              <div className="pt-3 pb-1">
              <h6 className="text-black-373933 font-bebas italic font-bold lg:text-3xl text-2xl">
                  Champion it. Promote it. Benefit from it.
                </h6>
                <p className="text-lg font-roboto text-black-373933 text-left leading-relaxed">
                  Whether you're a fitness trainer, digital influencer, coach,
                  or an avid BodyKore enthusiast who encourages others to
                  elevate their fitness game and opt for BodyKore equipment,
                  we're here to appreciate your efforts. Step into the BodyKore
                  Elite Ambassador Circle.
                </p>
              </div>
              <div className="pt-3 pb-1">
              <h6 className="text-black-373933 font-bebas italic font-bold lg:text-3xl text-2xl">
                  What's expected of a BodyKore Elite Ambassador?
                </h6>
                <p className="text-lg font-roboto text-black-373933 text-left leading-relaxed">
                  At its core, your role is to amplify the BodyKore message,
                  showcasing your genuine enthusiasm for our product range and
                  training ethos, all while earning exclusive merchandise and
                  monetary rewards. We're on a mission to set the world in
                  motion, and our Ambassadors are spirited folks, vocal on
                  social platforms, driven to curate compelling content and
                  advocate the BodyKore fitness approach.
                </p>
              </div>
              <div className="pt-3 pb-1">
              <h6 className="text-black-373933 font-bebas italic font-bold lg:text-3xl text-2xl">
                  What perks come with being a BodyKore Elite Ambassador?
                </h6>
                <p className="text-lg font-roboto text-black-373933 text-left leading-relaxed">
                  As part of the BodyKore Elite Team, you'll be privy to
                  complimentary merchandise and exclusive photo sessions. You'll
                  also receive a unique referral code/link, granting your circle
                  a special 10% discount on bodykore.com. And that's not all –
                  for every sale driven by you, there's a 7% commission waiting!
                  Plus, seize the chance to shine on our Instagram feed,
                  reaching out to our ever-expanding follower base.
                </p>
              </div>
              <div className="pt-3 pb-1">
              <h6 className="text-black-373933 font-bebas italic font-bold lg:text-3xl text-2xl">
                  How are my ambassador earnings processed?
                </h6>
                <p className="text-lg font-roboto text-black-373933 text-left leading-relaxed">
                  To streamline the Ambassador rewards, we've partnered with the
                  Affiliately app. Here, you can define your preferred payment
                  mode and claim your earnings, either from completed activities
                  or referrals. The app also keeps you updated on all your
                  incentives – making tracking a breeze!
                </p>
              </div>
              <div className="pt-3 pb-1">
              <h6 className="text-black-373933 font-bebas italic font-bold lg:text-3xl text-2xl">
                  Minimum Requirements:
                </h6>

                <ul className="text-lg font-roboto text-black-373933 text-left leading-relaxed">
                  <li>● Passion for our brand and products </li>
                  <li>● An Instagram account </li>
                  <li>● Over 3% engagement rate </li>
                  <li>● Good content creation skills </li>
                  <li>● An interest in strength training </li>
                  <li>● Over 5,000 followers </li>
                  <li>● Male/Female Under 55 Live in USA</li>
                  <li>
                    ● Should have access to BodyKore Equipment (local gym or
                    home studio)
                  </li>
                </ul>

                <h6 className="text-black-373933 font-bebas italic font-bold lg:text-3xl text-2xl">
                  Eager to Begin? Let's Get Moving!
                </h6>
                <Link target='_blank' href={`http://bodykore-store.goaffpro.com`}>
                  <button
                    className="w-48 h-12 mt-5 bg-transparent text-black-373933 font-bold border border-black-373933 hover:text-red-bc2026 hover:border-red-bc2026 rounded-lg"
                    style={{ letterSpacing: '2px' }}
                  >
                    ENROLL TODAY!
                  </button>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default Ambassadors;
