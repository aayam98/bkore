import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
type PartSectionListProps = {
  scrollToDiv: (index: number) => void;
};
const PartSectionList = ({ scrollToDiv }: PartSectionListProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          sectionRef.current?.classList.add('sticky');
          if (sectionRef.current) {
            sectionRef.current.style.visibility = 'visible';  // Setting opacity to 0
            sectionRef.current.style.background = '#fff';  // Setting opacity to 0
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0, // Trigger when the element is fully out of view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  const attachments = [
    {
      index: 0,
      title: 'Dip Bar',
      image: '/attachments/Dip-Bar.png',
      link: '/dipbar',
    },
    {
      index: 1,
      title: 'Inverted Leg Press Plate',
      image: '/attachments/Inverted-Foot-Plate.png',
      link: '/invertedlegpress',
    },
    {
      index: 2,
      title: 'J Hooks',
      image: '/attachments/J-Hooks.png',
      link: '/jhooks',
    },
    {
      index: 3,
      title: 'Jammer Arms',
      image: '/attachments/Jammer-Arms.png',
      link: '/jammerarms',
    },
    {
      index: 4,
      title: 'Leg Extension/Curl Seat',
      image: '/attachments/Leg-ExtensionCurl-Seat.webp',
      link: '/lefextension',
    },
    {
      index: 5,
      title: 'Safety Spotter Arms',
      image: '/attachments/Safety-Spotters.png',
      link: '/safetyspotterarms',
    },
    {
      index: 6,
      title: 'Landmine',
      image: '/attachments/Landmine.png',
      link: '/landmine',
    },

    {
      index: 7,
      title: 'Dual Pulley System',
      image: '/attachments/Adjustable-Dual-Pulley-System-Universal-Trainer.jpg',
      link: '/dualpulley',
    },

    {
      index: 8,
      title: 'Lat Pull Down Seat',
      image: '/attachments/Lat-Pull-Down-Seat.png',
      link: '/latpulldownseat',
    },
    {
      index: 9,
      title: 'Low Row Footplate',
      image: '/attachments/Low-Row-Footplate.png',
      link: '/lowrowfootplate',
    },
  ];
  return (
    <div
      ref={sectionRef}
      className={`w-full border-t-2 border-b-2 top-sticky-part z-10 bg-white'`}
      style={{ visibility: 'hidden' }}
    >
      <div className="xl:max-w-7xl w-full m-auto">
        <ul className="flex flex-row xl:gap-x-5 justify-between xl:py-5 xl:overflow-auto overflow-scroll hide-scrollbar">
          {attachments.map((l, i) => {
            return (
              <li
                key={i}
                className="hover:text-red-bc2026 font-bebas text-xl text-grey-8C8C8C xl:w-auto w-full"
              >
              
                  <p
                    className="cursor-pointer xl:w-full w-44 text-center mb-0 xl:py-0 py-2 "
                    onClick={() => scrollToDiv(l.index)}
                  >
                    {l.title}
                  </p>
                
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PartSectionList;
