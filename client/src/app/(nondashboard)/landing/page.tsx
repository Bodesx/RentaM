import React from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import DiscoverSection from "./DiscoverSection";
import CallToActionSection from "./CallToActionSection";
import FooterSection from "./FooterSection";
import { HeroVideoDialog } from "@/components/ui/videohelp";
import { HeroVideoDialogDemo } from "@/components/ui/videofaq";

const Landing = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <HeroVideoDialogDemo/>
      <DiscoverSection />
      <CallToActionSection />
      <FooterSection />
    </div>
  );
};

export default Landing;
