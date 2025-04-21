import MainBanner from '@components/ui/bodykore/Banners/MainBanner';
import ImgDescriptionAmbs from '@components/ui/bodykore/Sections/ImgDescriptionAmbs';
import DobleColorTitle from '@components/ui/bodykore/Text/Titles/DobleColorTitle';
import AmbBanner from '@components/ui/bodykore/Banners/AmbBanner';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import seo from '../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import Link from 'next/link';
import Image from 'next/image';

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
          <MainBanner
            bgImage={'/Ambassadors/coverImageAmb.jpg'}
            title={'MEET OUR AMBASSADORS'}
            description={
              'Our goal is to develop a win-win, long term relationship with you. We reward your performance and dedication to growing the BodyKore fam by offering the most competitive commission rates in the industry.'
            }
            buttonsText={[
              {
                text: 'WHO THEY ARE',
                color: 'transparent',
              },
              {
                text: 'LEARN MORE',
                color: 'transparent',
                link: '/ambTerms',
              },
            ]}
            width="w-4/6 lg:w-3/6"
          />

          <div className="py-24">
            <div className="flex justify-center">
              <DobleColorTitle title="HOW WE WORK" title2="TOGETHER" />
            </div>

            <ImgDescriptionAmbs
              imgHeight="h-16"
              imgWidth="w-14"
              images={[
                {
                  img: '/svg/howWeWork1.svg',
                  title: '01',
                  description:
                    'Our ambassadors embrance everything we do from health, fitness and a positive mindset.',
                },
                {
                  img: '/svg/howWeWork4.svg',
                  title: '02',
                  description:
                    'Team Bodykore athletes take part in photo and video shoots.',
                },
                {
                  img: '/svg/howWeWork3.svg',
                  title: '03',
                  description:
                    'Our athletes sweat hard working out on Bodykore fitness equipment and give is critical feedback.',
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

          <div className="grid grid-cols-1 gap-16 py-12">
            <section className="max-w-7xl m-auto">
              <Image
                src="/Ambassadors/team.jpg"
                className="w-full"
                alt=""
                width={1280}
                height={1115}
                placeholder="blur"
                blurDataURL="/loading.png"
              />
              <div className="pt-3 pb-1">
                <span className="text-black-373933 font-bebas italic font-bold text-3xl">
                  Become A BodyKore Ambassador!
                </span>
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
                <span className="text-black-373933 font-bebas italic font-bold text-3xl">
                  Champion it. Promote it. Benefit from it.
                </span>
                <p className="text-lg font-roboto text-black-373933 text-left leading-relaxed">
                  Whether you're a fitness trainer, digital influencer, coach,
                  or an avid BodyKore enthusiast who encourages others to
                  elevate their fitness game and opt for BodyKore equipment,
                  we're here to appreciate your efforts. Step into the BodyKore
                  Elite Ambassador Circle.
                </p>
              </div>
              <div className="pt-3 pb-1">
                <span className="text-black-373933 font-bebas italic font-bold text-3xl">
                  What's expected of a BodyKore Elite Ambassador?
                </span>
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
                <span className="text-black-373933 font-bebas italic font-bold text-3xl">
                  What perks come with being a BodyKore Elite Ambassador?
                </span>
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
                <span className="text-black-373933 font-bebas italic font-bold text-3xl">
                  How are my ambassador earnings processed?
                </span>
                <p className="text-lg font-roboto text-black-373933 text-left leading-relaxed">
                  To streamline the Ambassador rewards, we've partnered with the
                  Affiliately app. Here, you can define your preferred payment
                  mode and claim your earnings, either from completed activities
                  or referrals. The app also keeps you updated on all your
                  incentives – making tracking a breeze!
                </p>
              </div>
              <div className="pt-3 pb-1">
                <span className="text-black-373933 font-bebas italic font-bold text-3xl">
                  Minimum Requirements:
                </span>

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

                <p className="text-black-373933 font-bebas italic font-bold text-3xl pt-5">
                  Eager to Begin? Let's Get Moving!
                </p>
                <Link href={`https://google.com`}>
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
