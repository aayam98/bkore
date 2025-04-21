import CoolPlayButton from '@components/playButton/play';
import CountdownTimer from '@components/timer';
import MaslowForm from '@components/ui/bodykore/Index/MaslowForm'
import Image from 'next/image';
import React, { useState } from "react";
import ReactPlayer from 'react-player';
import closedImage from '../public/closed.png'

const Maslow = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <>
      {/* banner */}
      <section className="  bg-maslow-banner-mobile lg:bg-maslow-banner bg-right-top bg-no-repeat w-full bg-cover">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-16 items-start pt-5">
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-2">
              <h3 className="text-white font-bebas text-3xl sm:text-5xl lg:text-6xl leading-none text-center lg:text-left">
                KICKSTART YOUR FITNESS JOURNEY WITH JAMES MASLOW
              </h3>
              <p className="text-white font-roboto text-sm sm:text-base lg:text-lg text-center lg:text-left">
                🔥 A FREE 4-week fitness challenge with James Maslow, BodyKore, and MetPro. Limited spots - signup now! 🔥
              </p>
              <div className=" relative">
                <div className=' z-[999]  absolute'>
<div style={{rotate:'-20deg'}} className='h-[100px] w-auto relative'>
<img src={'/closed.png'} className='h-full w-full rotate-45 object-cover'  alt='closed-image'/>
</div>
                </div>
                <MaslowForm />
              </div>
              <div>
                {/* <p className="text-white font-roboto text-sm lg:text-base text-center">
                  Don't miss out - registry closes soon!
                </p> */}
                <div className="">
                  {/* <CountdownTimer /> */}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end items-center relative">
              {!isPlaying ? (
                // Placeholder Image with Play Button
                <div className="relative cursor-pointer w-full max-w-lg lg:max-w-full" onClick={handlePlay}>
                  <img
                    src="https://cms.bodykore.com/uploads/Maslow_Moves_withlogo_c48627a629.png"
                    alt=""
                    className="w-full object-contain rounded-md h-maslowimage"
                  />
                  <div className="absolute inset-0 flex justify-center items-center">
                    <CoolPlayButton onClick={handlePlay} />
                  </div>
                </div>
              ) : (
                // Video Player
                <ReactPlayer
                  className="rounded-md"
                  url={"https://cms.bodykore.com/uploads/maslow_video_ea1dfafb36.mp4"}
                  playing={true}
                  loop={false}
                  controls={true}
                  volume={1}
                  width="100%"
                  height="auto"
                  playsInline={true}
                  config={{
                    file: {
                      attributes: {
                        controlsList: "nodownload",
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* banner */}
      {/* belowfold */}
      <div className="relative w-full lg:pt-20 pt-36 pb-12 bg-archbanner clip-path-diagonal flex items-center justify-center">
        <div className='max-w-4xl text-center p-5 space-y-3'>
          <h3 className='text-gray-800 font-bebas leading-none lg:text-5xl text-3xl'>This is Your Moment: Join James Maslow’s 4-Week Fitness Challenge</h3>
          <p className='lg:w-5/6 w-full m-auto'>
            Start your New Year strong with the Maslow Moves Challenge, a FREE 4-week program led by James Maslow—actor, singer, and fitness enthusiast. Beginning January 1, 2025, this challenge combines expert-designed workouts, motivational tips, and a supportive community to help you build healthy habits and achieve your fitness goals.

          </p>
          <p className='lg:w-5/6 w-full m-auto'>

            Whether you’re just starting out or looking to level up your routine, James will guide you every step of the way with exclusive workout videos, weekly challenges, and insider advice to keep you inspired and moving forward. Don’t miss your chance to join this exciting journey!

          </p>
        </div>
      </div>
      {/* belowfold */}
      {/* 3grid */}
      <div className="max-w-7xl mx-auto lg:py-16 p-5 text-center font-roboto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-12">What’s Included?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-full h-64">
              <img
                src="https://cms.bodykore.com/uploads/maslow_grid_1_ceeba49924.png"
                alt="Placeholder"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mt-4">Weekly Workouts with James Maslow</h3>
            <p className="text-sm text-gray-600 mt-2">
              Crush your goals with exclusive workouts designed by the pros at <b>MetPro</b>. These expertly crafted routines come with both bodyweight and gym-friendly options, so you can sweat it out anytime, anywhere. And the best part? It’s all FREE when you join the challenge!

            </p>
          </div>

          <div className="text-center">
            <div className="w-full h-64">
              <img
                src="https://cms.bodykore.com/uploads/maslow_grid_3_4ad463bcde.png"
                alt="Placeholder"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mt-4">Community Connection</h3>
            <p className="text-sm text-gray-600 mt-2">
              Get exclusive access to a group led by <b>James Maslow</b>, where he shares workouts, progress updates, and motivational tips straight from his JimGym 4.0, designed and outfitted by BodyKore. Connect with fellow challengers, share your journey, and stay motivated every step of the way.
            </p>
          </div>

          <div className="text-center">
            <div className="w-full h-64">
              <img
                src="https://cms.bodykore.com/uploads/maslow_grid_2_8e4a117e86.png"
                alt="Placeholder"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mt-4">Nutrition & Health Support</h3>
            <p className="text-sm text-gray-600 mt-2">
              Follow the same proven plan that <b>James Maslow</b> is using to fuel his own fitness journey during the challenge! Get 30 days of <b>MetPro’s personalized nutrition coaching</b>, tailored to your unique metabolic needs and goals. With daily tips and expert guidance, this $750 value is yours for FREE!

            </p>
          </div>


        </div>
      </div>

      {/* 3grid */}
      {/* winnerbanner */}
      <div
        className="relative bg-cover lg:bg-center bg-none lg:py-16 p-5 bg-customgray"

      >
        <div className='max-w-5xl m-auto space-y-5'>
          <div className="text-center lg:p-0 p-5 space-y-4">
            <img
              src="https://cms.bodykore.com/uploads/trophy_icon_5b0074efce.svg"
              alt="Trophy"
              className="mx-auto w-16 mb-4"
            />
            <h2 className="text-3xl font-bold text-white leading-none">
              Win Big with the Maslow <br></br>Moves Fitness Challenge! 🎉
            </h2>
            <p className="text-white max-w-xl m-auto">
              Grand prizes are up for grabs, including a BodyKore Squat Box, personalized coaching from MetPro, and James Maslow merch! Sign up and participate for your chance to win!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 justify-center max-w-5xl gap-8">
            <div className="text-center space-y-2">
              <div className="w-60 h-60 mx-auto flex items-center justify-center">
                <img
                  src="https://cms.bodykore.com/uploads/Body_Kore_Squat_Box_b3a2178ae8.png"
                  alt=""
                  className=""
                />
              </div>
              <h3 className="text-lg font-bold text-white">BodyKore Squat Box</h3>
              <p className="text-sm text-white">
                Transform your workouts with this premium fitness essential.
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-60 h-60 mx-auto flex items-center justify-center">
                <img
                  src="https://cms.bodykore.com/uploads/Met_Pro_Concierge_Nutrition_5d879bb9f8.png"
                  alt=""
                  className=""
                />
              </div>
              <h3 className="text-lg font-bold text-white">MetPro Concierge Service</h3>
              <p className="text-sm text-white">
                1-month of personalized metabolic coaching to optimize your health.
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-60 h-60 mx-auto flex items-center justify-center">
                <img
                  src="https://cms.bodykore.com/uploads/On_the_Road_with_Maslow_Kit_742b75d96f.png"
                  alt=""
                  className=""
                />
              </div>
              <h3 className="text-lg font-bold text-white">On the Road Fitness Kit</h3>
              <p className="text-sm text-white">
                A portable resistance band kit for workouts anywhere.
              </p>
            </div>


          </div>
        </div>
      </div>

      {/* winnerbanner */}
      {/* review */}
      <div className="bg-archbanner py-16">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            What Fans Are Saying About James and the Maslow Moves Challenge
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 mx-auto max-w-7xl px-4">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md flex flex-col h-full">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-500">
                <span>★ ★ ★ ★ ★</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">I’m so excited!</h3>
            <p className="text-gray-600 text-sm mb-4 flex-grow">
              “James has this amazing way of making fitness approachable and fun. Every time he shares a workout, it feels like he’s cheering us on to be our best selves. I’ve been dreaming of a chance to be part of something like this, and I’m so excited to finally join his fitness challenge!”
            </p>
            <p className="text-gray-700 font-medium text-sm">- Emily, 34, Texas</p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md flex flex-col h-full">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-500">
                <span>★ ★ ★ ★ ★</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">I've been waiting for this!</h3>
            <p className="text-gray-600 text-sm mb-4 flex-grow">
              "James has been such a consistent source of motivation for me. His energy, passion, and encouragement always remind me to keep going, even on tough days. I’ve been waiting for him to launch something like this for so long, and now I’m ready to take on the challenge and be part of this amazing journey!"
            </p>
            <p className="text-gray-700 font-medium text-sm">- Mia, 30, Florida</p>
          </div>
        </div>
      </div>


      {/* review */}
      {/* form section */}
      <div className="bg-customgray hidden text-white lg:py-16 p-5">
        <div className="max-w-xl mx-auto text-center space-y-5">
          <h2 className="text-3xl font-bold">
            Don’t Wait—Start Your Fitness Journey with James Maslow Today!
          </h2>
          <p className="text-lg">Sign Up for FREE Now!</p>

          <MaslowForm />
          <div>
            {/* <p className='text-white font-roboto text-base text-center'>
              Don't miss out - registry closes soon!
            </p> */}
            {/* <CountdownTimer /> */}
          </div>
        </div>
      </div>

      {/* form section */}
    </>
  )
}

export default Maslow;