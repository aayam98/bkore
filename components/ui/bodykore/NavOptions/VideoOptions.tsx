import Image from 'next/image';
import bodykorePromos from '../../../../public/BodyKore Promos.png';
import clientTestimonials from '../../../../public/Client Testimonials.png';
import commercialGym from '../../../../public/Commercial Gym.png';
import homeGym from '../../../../public/Home_Gym.png';
import maintenanence from '../../../../public/Maintenanence_Videos.png';
import portfolioSeries from '../../../../public/Portfolio_Series.png';
import productInstall from '../../../../public/Product_Installations.png';
import productVideo from '../../../../public/Product_Video.png';
import tutorial from '../../../../public/Tutorial_Videos.png';

interface VideoOptionsParams {
  title1: string;
  titles: {
    text: string;
    id?: string;
    count: number;
  }[];
  type?: string;
  setter?: (value: { page: number; category: string }) => void;
}

export default function NavMenuOptions({
  title1,
  titles,
  type,
  setter,
}: VideoOptionsParams) {
  const scrollDown = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  function setCategory(category: string) {
    if (setter) {
      setter({ page: 1, category: category });
    }
  }

  const getImageSource = (text: string) => {
    switch (text.toLowerCase()) {
      case 'products':
        return productVideo;
      case 'client testimonials':
        return clientTestimonials;
      case 'bodykore promos':
        return bodykorePromos;
      case 'product installations':
        return productInstall;
      case 'portfolio series':
        return portfolioSeries;
      case 'home gyms':
        return homeGym;
      case 'commercial gyms':
        return commercialGym;
      case 'maintenance videos':
        return maintenanence;
      case 'tutorial videos':
        return tutorial;
      default:
        return 'https://cms.bodykore.com/uploads/Beverly_02_4366e03471.jpeg';
    }
  };

  return (
    <>
      {/*Main Image*/}
      <div className="max-w-6xl m-auto py-10" style={{ letterSpacing: '1px' }}>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 lg:px-0 px-5">
          {titles.map((t, i) => {
            return (
              <div key={i}>
                <a href={`/our-portfolio/${t.id}`}>
                  <Image
                    src={getImageSource(t.text)}
                    alt={t.text}
                    sizes="100vw"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '10px',
                    }}
                    width={500}
                    height={300}
                  />
                  <h5 className="cursor-pointer text-gray-800 hover:text-red-hover font-bebas italic text-2xl tracking-wide pt-1">
                    {t.text} ({t.count} Videos)
                  </h5>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
