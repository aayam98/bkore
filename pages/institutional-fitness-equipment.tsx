import Packages from '@components/ui/bodykore/Sections/Packages';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import React from 'react';
import OurClient from '@components/ui/bodykore/Sections/OurClient';
import HospitalityPortfolio from '@components/ui/bodykore/Sections/HospitalityPortfolio';
import HospatilityForm from '@components/ui/bodykore/Sections/HospatilityForm';
import HospitalityBanner from '@components/ui/bodykore/Banners/HospitalityBanner';
import GymBenefits from '@components/ui/bodykore/Sections/GymBenefits';
import TransformFitness from '@components/ui/bodykore/Sections/TransformFitness';
import SupportServicesCard from '@components/ui/bodykore/Cards/SupportServicesCard';
export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();

  return {
    props: { header },
    // revalidate: 30 * 60,
  };
};

const InstitutionalFitness = () => {
  interface LoyaltyProgramParams {
    header: HeaderData;
  }
  return (
    <main>
      <HospitalityBanner />
      <GymBenefits />
      <TransformFitness />
      <Packages />
      <SupportServicesCard />
      <OurClient />
      <HospitalityPortfolio />
      <HospatilityForm />
    </main>
  );
};

export default InstitutionalFitness;
