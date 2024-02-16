import React from 'react';
import HeroCarousel from '../Component/Herosection';
import Offer from '../Component/Offers';
import ScheduleSection from '../Component/SchuleArea';
import FunFactsSection from '../Component/FactsAbout';
import DoctorsSection from '../Component/TopDoctors';
import AboutUsSection from '../Component/About-us'
import FeaturesSection from '../Component/SectionWhyus'
import AppointmentSection from '../Component/Abounment'
function HomePage() {
  return (
    <div>
  <HeroCarousel></HeroCarousel>
  <ScheduleSection></ScheduleSection>

  {/* <FunFactsSection></FunFactsSection> */}
  <DoctorsSection></DoctorsSection>
  <FeaturesSection></FeaturesSection>
  <AboutUsSection></AboutUsSection>
  <AppointmentSection></AppointmentSection>
  {/* <Offer></Offer>  */}
    </div>
  );
}

export default HomePage;