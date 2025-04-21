import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const HospatalityFAQ = () => {
  const accordion = [
    {
      question:
        "Can BodyKore equipment be customized to match our hotel's branding?",
      answer:
        'Absolutely! We offer customization options for our equipment, including color schemes and logos, to perfectly match your hotel’s branding.',
    },
    {
      question:
        'What types of equipment does BodyKore offer for hospitality fitness centers?',
      answer:
        'BodyKore specializes in a wide range of strength training and functional fitness equipment, ideal for hospitality fitness centers looking to offer a comprehensive workout experience.',
    },
    {
      question: 'How does the installation process work?',
      answer:
        'Our certified installers provide professional installation services nationwide, ensuring your equipment is set up efficiently and correctly according to your space’s specific needs.',
    },
    {
      question: 'What support and maintenance services does BodyKore provide?',
      answer:
        'We offer robust support and maintenance services, including a lifetime warranty on equipment frames, to keep your fitness center running smoothly.',
    },
    {
      question: 'Are there training resources available for our staff?',
      answer:
        'Yes, we provide extensive training resources, including video libraries and technical sheets, to empower your staff with the knowledge to maintain and troubleshoot the equipment effectively.',
    },
    {
      question:
        'How can I visualize how the equipment will fit into our space?',
      answer:
        'BodyKore offers a 3D design service to help you visualize the equipment layout in your space, ensuring an optimal setup before installation.',
    },
    {
      question: 'How can I schedule a consultation to discuss our needs?',
      answer:
        'Scheduling a consultation is easy. Fill out our form or contact us directly to discuss your specific needs and how BodyKore can enhance your hospitality fitness center.',
    },
    {
      question: 'Can I Use The Squat Box Outdoors?',
      answer:
        'Yes, the Squat Box is designed for versatility and can be used outdoors. However, we recommend storing it indoors when not in use to preserve its condition.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-black py-16">
      <div className="grid lg:grid-cols-10 grid-cols-1 justify-center items-center m-auto max-w-8xl lg:px-20 px-4">
        <div className=" lg:col-span-4">
          <p className="text-red-bc2026 lg:text-2xl lg:text-left text-center text-lg font-montserrat">
            FAQ
          </p>
          <div className="lg:pb-0 pb-16">
            <h1 className="flex flex-col lg:text-6xl text-4xl lg:text-left text-center leading-none font-Archivo text-white font-bold">
              <span>ASK US</span>
              <span>ANYTHING</span>
            </h1>
          </div>
        </div>
        <div className="lg:col-span-6 border-t-2 border-red-bc2026">
          {accordion.map((item, index) => (
            <div key={index} className="text-white relative">
              <div className="lg:pr-24 pr-10">
                <h1
                  onClick={() => handleClick(index)}
                  className="lg:text-2.25xl text-xl font-bold font-Archivo leading-none py-7 cursor-pointer "
                >
                  {item.question}
                </h1>
              </div>
              <div className="absolute top-10 right-0 px-2">
                {activeIndex === index ? (
                  <FaMinus size={25} />
                ) : (
                  <FaPlus size={25} />
                )}
              </div>
              <div
                className={`overflow-hidden transition-all duration-1000 ease-in-out  ${
                  activeIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="pb-8 font-montserrat">{item.answer}</p>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HospatalityFAQ;
