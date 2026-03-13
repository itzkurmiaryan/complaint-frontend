import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function CampusVideo() {

  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  // Auto pause when user scrolls away
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 py-24 bg-gradient-to-b from-white via-indigo-50 to-purple-50"
    >

      {/* Heading */}
      <motion.h2
        initial={{opacity:0,y:40}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
        transition={{duration:0.6}}
        className="mb-16 text-3xl font-bold text-center md:text-4xl"
      >
        Explore Invertis Campus
      </motion.h2>

      {/* Video Card */}
      <motion.div
        initial={{opacity:0,scale:0.9}}
        whileInView={{opacity:1,scale:1}}
        viewport={{once:true}}
        transition={{duration:0.6}}
        whileHover={{scale:1.02}}
        className="relative max-w-6xl mx-auto overflow-hidden shadow-2xl rounded-3xl"
      >

        <video
          ref={videoRef}
          controls
          controlsList="nodownload"
          poster="/invertis-campus.jpeg"
          className="object-cover w-full h-[240px] sm:h-[340px] md:h-[440px] lg:h-[520px]"
        >
          <source src="/iu.mp4" type="video/mp4" />
        </video>

      </motion.div>

      <p className="max-w-xl mx-auto mt-8 text-center text-gray-600">
        Take a quick tour of the Invertis campus and see the environment where
        students learn, grow, and innovate.
      </p>

    </section>
  );
}