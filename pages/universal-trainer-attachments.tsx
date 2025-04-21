import Banner from '@components/ui/bodykore/Index/Banner';
import LeftRightSection from '@components/ui/bodykore/Index/LeftRightSection';
import PartSection from '@components/ui/bodykore/Index/PartSection';
import PartSectionList from '@components/ui/bodykore/Index/PartSectionList';
import SubscriptionNew from '@components/ui/bodykore/Index/SubscriptionNew';
import VideoSection from '@components/ui/bodykore/Index/VideoSection';
import { getHeader, HeaderData } from '@utils/header';
import { useRef } from 'react';

export const getServerSideProps = async () => {
  const header = await getHeader();

  return {
    props: { header },
    // revalidate: 30 * 60,
  };
};

interface LoyaltyProgramParams {
  header: HeaderData;
}

export type UniveralTrainerAttachmentsProps = {
  title: string;
  video: string;
  list: string[];
  ref: string;
}

const UniveralTrainerAttachments = () => {
  const attachments:UniveralTrainerAttachmentsProps[] = [
    {
      title: 'Dip Bar',
      video: 'https://cms.bodykore.com/uploads/Dip_Bar_dc05523250.mp4',
      list: ['Tricep Dips',
        'Chest Dips',
        'Assisted Dips (using a resistance band)',
        'Leg Raises',
        'Knee Tucks',
        'L-Sit Hold',
        'Russian Dips',
        'Straight Bar Dips',
        'Scapular Dips',
        'Isometric Holds',
      ],
      ref: 'diper',
    },
    {
      title: 'Inverted Leg Press Plate',
      video: 'https://cms.bodykore.com/uploads/Inverted_Leg_Press_a51ba66196.mp4',
      list: [
        'Inverted Leg Press',
        'Single-Leg Press',
        'Calf Raises',
        'Glute Bridges (Pressing upward with the plate for added resistance)',
        'Smith Machine Glute Kickbacks (Pressing with feet for glute engagement)',
      ],
      ref: 'invertedlegpress',
    },
    {
      title: 'J Hooks',
      video: 'https://cms.bodykore.com/uploads/J_Hooks_65caa081af.mp4',
      list: [
        'Barbell Squats (Front, Back, Overhead)',
        'Bench Press (Flat, Incline, Decline)',
        'Overhead Press (Standing or Seated)',
        'Barbell Lunges',
        'Rack Pulls',
        'Shoulder Shrugs',
        'Barbell Curls',
        'Good Mornings',
        'Floor Press',
      ],
      ref: 'jhooks',
    },
    {
      title: 'Jammer Arms',
      video: 'https://cms.bodykore.com/uploads/Jammer_Arms_Demo_f96ea494f4.mp4',
      list: [
        'Chest Press',
        'Shoulder Press',
        'Push Press',
        'Squats',
        'Deadlifts',
        'Bent-Over Rows',
        'Lunges',
        'Incline Press',
        'Explosive Push-Pull Drills',
        'Single-Arm Presses ',
      ],
      ref: 'jammerarms',
    },
    {
      title: 'Leg Extension/Curl Seat',
      video: 'https://cms.bodykore.com/uploads/Universal_Trainer_Leg_Extension_Curl_Seat_Demo_1_7352432bf1.mp4',
      list: [
        'Leg Extensions',
        'Leg Curls',
        'Single-Leg Extensions',
        'Single-Leg Curls',
      ],
      ref: 'lefextension',
    },
    {
      title: 'Safety Spotter Arms',
      video: 'https://cms.bodykore.com/uploads/Bar_Spotters_bed9f9b731.mp4',
      list: [
        'Barbell Squats',
        'Bench Press (Flat, Incline, Decline)',
        'Overhead Press',
        'Deadlifts',
        'Barbell Rows',
        'Bulgarian Split Squats',
        'Rack Pulls',
        'Floor Press',
        'Shoulder Shrugs',
      ],
      ref: 'safetyspotterarms',
    },
    {
      title: 'Landmine',
      video: 'https://cms.bodykore.com/uploads/Land_Mine_ce0ce6f979.mp4',
      list: [
        'Landmine Press',
        'Landmine Squat',
        'Landmine Row',
        'Landmine Rotation (Twist)',
        'Landmine Deadlift',
        ' Landmine Lunges',
        'Landmine Single-Arm Press',
        'Landmine Thruster',
        'Landmine Shoulder-to-Shoulder Press',
        'Landmine RDL (Romanian Deadlift)',
      ],
      ref: 'landmine',
    },
    {
      title: 'Dual Pulley System',
      video: 'https://cms.bodykore.com/uploads/9_Dual_Adjustable_Pulley_System_54a53d69ec.mp4',
      list: [
        'Cable Chest Press',
        'Cable Flys',
        'Single-Arm Chest Press',
        'Cable Crossovers',
        'Tricep Pushdowns',
        'Overhead Tricep Extensions',
        'Bicep Curls',
        'Reverse Cable Curls',
        'Lateral Raises',
        'Front Raises',
        'Face Pulls',
        'Seated Rows',
      ],
      ref: 'landmine',
    },

    {
      title: 'Lat Pull Down Seat',
      video: 'https://cms.bodykore.com/uploads/5_Lat_Pull_Down_Seat_Add_On_dd35038ea7.mp4',
      list: [
        'Lat Pull Down',
        'Wide-Grip Lat Pull Down',
        'Close-Grip Lat Pull Down',
        'Reverse-Grip Lat Pull Down',
        'Single-Arm Lat Pull Down',
        'Seated Cable Row (using a narrow grip)',
        'Tricep Pushdown (using a rope or straight bar)',
      ],
      ref: 'latpulldownseat',
    },

    {
      title: 'Low Row Footplate',
      video: 'https://cms.bodykore.com/uploads/Foot_Plate_cbb596ddbb.mp4',
      list: [
        'Seated Cable Row',
        'Single-Arm Cable Row',
        'Reverse Grip Cable Row',
        'Wide-Grip Cable Row',
        'Face Pull (modified)',
      ],
      ref: 'lowrowfootplate',
    },
  ];
  const divRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollToDiv = (index: number) => {
    if (divRefs.current[index]) {
      // Scroll to the div at the specified index
      divRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section>
      <Banner scrollToDiv={scrollToDiv} />
      <VideoSection />
      <PartSection scrollToDiv={scrollToDiv} />
      <PartSectionList scrollToDiv={scrollToDiv} />
      {attachments.map((ele, index) => (
        <div ref={(el) => (divRefs.current[index] = el)} key={index}>
          <LeftRightSection
            position={index % 2 === 0 ? 'left' : 'right'}
            data={ele}
          />
        </div>
      ))}
      <SubscriptionNew />
    </section>
  );
};

export default UniveralTrainerAttachments;
