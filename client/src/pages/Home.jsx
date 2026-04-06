import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import Button from "../components/Button";
import FloatingBar from "../components/FloatingBar";
import FloatingQuizButton from "../components/FloatingQuizButton";

import "swiper/css";

const HERO_TITLE =
  "Tamil Nadu Association of Senior Professionals of Environment and Forests";

const HERO_SUBTITLE =
  "Working Together to Protect and Conserve Tamil Nadu Forests";

const Home = () => {
  const [typedTitle, setTypedTitle] = useState("");
  const [typedSubtitle, setTypedSubtitle] = useState("");
  const [cycle, setCycle] = useState(0); // 🔁 loop trigger

  // 🔠 Typing effect for TITLE
  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index <= HERO_TITLE.length) {
        setTypedTitle(HERO_TITLE.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [cycle]); // 🔁 restart on cycle change

  // 🔠 Typing effect for SUBTITLE (after title)
  useEffect(() => {
    if (typedTitle.length !== HERO_TITLE.length) return;

    let index = 0;

    const interval = setInterval(() => {
      if (index <= HERO_SUBTITLE.length) {
        setTypedSubtitle(HERO_SUBTITLE.slice(0, index));
        index++;
      } else {
        clearInterval(interval);

        // ⏳ wait 5 seconds, then restart
        setTimeout(() => {
          setTypedTitle("");
          setTypedSubtitle("");
          setCycle((c) => c + 1); // 🔁 trigger re-run
        }, 5000);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [typedTitle]);

   const features = [
     {
       title: "E-Magazine",
       description:
         'Access our digital magazine "Namadhu Vanam" with articles on forest conservation and wildlife.',
       icon: (
         <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
           <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
         </svg>
       ),
       link: "/e-magazines",
     },
     {
       title: "Office Bearers",
       description:
         "Meet our leadership team and executive committee members dedicated to environmental conservation.",
       icon: (
         <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
           <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
         </svg>
       ),
       link: "/Office-Bearers",
     },
     {
       title: "Our Members",
       description:
         "Browse our member directory and connect with fellow professionals in environment and forests.",
       icon: (
         <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
           <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
         </svg>
       ),
       link: "/members",
     },
   ];

   const latestUpdates = [
     {
       title: "Annual General Meeting 2024",
       description:
         "The AGM was held successfully with important decisions regarding forest conservation initiatives.",
       date: "September 14, 2025",
       image: "/assets/Gallery/gallery-19.png",
     },
     {
       title: "New E-Magazine Issue Released",
       description:
         "Issue 12 of Namadhu Vanam is now available featuring articles on wildlife conservation.",
       date: "Feb 15, 2026",
       image: "/assets/images/i-11.png",
     },
     {
       title: "Wildlife Conservation",
       description:
         "Leading strategic efforts to monitor, protect and restore critical habitats for Tamil Nadu’s endangered species and biodiversity.",
       date: "March 10, 2024",
       image: "/assets/Gallery/covers/wildlife-cover.jpg",
     },
   ];


  return (
    <div>
      <FloatingBar />
      <FloatingQuizButton />

      {/* 🌿 HERO SECTION */}
      <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
        {/* 🌄 BACKGROUND CAROUSEL */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop
          speed={1000}
          className="absolute inset-0 w-full h-full"
        >
          {[
            
            "/public/assets/c1.png",
            "/public/assets/c2.png",
            "/public/assets/c3.png",
            "/public/assets/c4.png",
          ].map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img} className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 🌫️ OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-green-900/40 to-transparent z-10" />

        {/* 💬 HERO TEXT */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white max-w-[1200px] leading-tight min-h-[380px]">
            {typedTitle}
            <span className="animate-pulse"></span>
          </h1>

          <p className="text-lg md:text-3xl mt-6 font-semibold text-accent-400 min-h-[60px]">
            {typedSubtitle}
          </p>

          
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background-light">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-text-primary">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card p-8 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 text-primary-500 rounded-full mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-text-primary">
                  {feature.title}
                </h3>
                <p className="text-text-secondary mb-6">
                  {feature.description}
                </p>
                <Link to={feature.link}>
                  <Button variant="outline" size="sm">
                    View More
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📰 Latest Updates */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-text-primary">
            Latest Updates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestUpdates.map((update, index) => (
              <article
                key={index}
                className="card overflow-hidden rounded-xl shadow hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={update.image}
                    alt={update.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-6">
                  <time className="text-sm text-gray-500">{update.date}</time>
                  <h3 className="text-xl font-bold mt-2 mb-3 text-gray-900">
                    {update.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{update.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 🌍 CTA */}
      <section className="py-16 md:py-24 bg-primary-500 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Us in Protecting Our Forests
          </h2>
          <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Become a member of TASPEF and contribute to the conservation of
            Tamil Nadu's natural heritage.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => (window.location.href = "/members")}
          >
            Become a Member
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
