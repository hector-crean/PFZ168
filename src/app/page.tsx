"use client";
import { Block, Blocks } from "@/components/Block";
import { HeroBanner } from "@/components/HeroBanner";
import { JourneyThroughCoordinateSpace } from "@/components/charts-3D/JourneyThroughCoordinateSpace";
import { Skip } from "@/components/skip";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";

const MotionSkip = motion(Skip)

const LandingPage = () => {

  const [skipAvailable, setSkipAvailable] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({
    // target: targetRef,
    // container: containerRef,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();

      if (latest > rect.height) {
        setSkipAvailable(true)
      }
    }
  })







  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <HeroBanner
        ref={targetRef}
        heading={"PFZ169"}
        description={"Elranatamab"}
        src="https://id.pfizer.com/sites/default/files/2022-02/Pfizer-Hero-Banner.jpg"
      />
      <MotionSkip
        skipHref="/sections"
        skipAvailable={skipAvailable}
        initial={{ opacity: 0 }}
        animate={{ opacity: skipAvailable ? 1 : 0 }}
      />
      <Blocks id='content' as='article'>
        <Block as='section' fullBleed={false} style={{ paddingTop: '80px' }}>
          <p>This site is a basic WIP mockup of the ui shell for PFZ169</p>
          <p>See <code>https://pfz-169.vercel.app/overview</code> for mockups of the charts</p>
          <p>See <code>https://pfz-169.vercel.app/sections</code> for a mockup of the navigation</p>

        </Block>
        <Block as='section' fullBleed={false} style={{ paddingTop: '80px' }}>
          <p>Landing page could give introductory detail about the study, and an overview of the patient cohort.</p>
        </Block>

        <Block as='section' fullBleed={false} style={{ paddingTop: '80px' }}>
          <p>For instance, the features of the patients in the dataset could be visualised in 3D space, and various partitions/groupings could be highlighted</p>
          <p>Below is a mockup of how scroll could facillitate a focus on particular parts of a dataset visualised in 3D</p>
        </Block>
        <Block as='section' fullBleed={true}>
          <JourneyThroughCoordinateSpace />

        </Block>
      </Blocks>

    </div>
  );
};

export default LandingPage;
