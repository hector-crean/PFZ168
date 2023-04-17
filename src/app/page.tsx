"use client";
import { HeroBanner } from "@/components/HeroBanner";
import { JourneyThroughCoordinateSpace } from "@/components/charts-3D/JourneyThroughCoordinateSpace";
import { Skip } from "@/components/skip";
import { Block, Blocks } from "@/layouts/Block";
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
          <p>
            Principal Component Analysis (PCA) is a widely used technique in data analysis that allows reducing the dimensionality of a large set of correlated variables into a smaller set of uncorrelated variables known as principal components. By doing so, it becomes easier to visualize and interpret the data, identify patterns, and reduce noise and redundancy.
          </p>
          <p>
            In the context of patient response to an immunotherapy treatment, using PCA to reduce the multidimensional feature set into 3D would allow clustering patients who have a similar response to the treatment. Patients who are closer in this lower-dimensional space would be considered to have a similar treatment response. This could be useful for several reasons, such as:
          </p>
          <p>

            Identifying subgroups of patients with similar responses to the treatment, which may help to develop personalized treatment plans and improve patient outcomes.
            Visualizing the data in a more intuitive way, making it easier to communicate the results to others, including medical professionals, patients, and their families.
            Identifying which features or variables are most important for predicting treatment response, which could inform future research and development of new treatments.
            Overall, using PCA to reduce the dimensionality of the patient data can help to simplify and clarify the data, making it easier to understand and act upon.
          </p>
        </Block>
        <Block as='section' fullBleed={true}>
          <JourneyThroughCoordinateSpace />

        </Block>
      </Blocks>

    </div>
  );
};

export default LandingPage;
