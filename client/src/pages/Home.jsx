import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { gsap } from "gsap";

const Home = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const waveTLRef = useRef(null);
  const subWaveRef = useRef(null);
  const shimmerRef = useRef(null);

  // ✅ Split text into spans and apply gradient text inline
  const splitToSpans = (el) => {
    if (!el || el.dataset.split === "true") return;
    const text = el.textContent || "";
    const frag = document.createDocumentFragment();
    const gradient = "linear-gradient(90deg,#34d399,#3b82f6,#10b981)";

    text.split("").forEach((ch) => {
      const span = document.createElement("span");
      span.className = "inline-block char";

      // 🔥 Gradient text styling for each letter
      span.style.backgroundImage = gradient;
      span.style.backgroundSize = "200% 200%";
      span.style.WebkitBackgroundClip = "text";
      span.style.backgroundClip = "text";
      span.style.WebkitTextFillColor = "transparent";
      span.style.color = "transparent";
      span.style.display = "inline-block";
      span.style.fontWeight = "700";

      span.innerHTML = ch === " " ? "&nbsp;" : ch;
      frag.appendChild(span);
    });

    el.innerHTML = "";
    el.appendChild(frag);
    el.dataset.split = "true";
  };

  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    if (!title || !subtitle) return;

    splitToSpans(title);
    splitToSpans(subtitle);

    const titleChars = title.querySelectorAll(".char");
    const subChars = subtitle.querySelectorAll(".char");

    // ✨ Intro animation
    gsap.fromTo(
      titleChars,
      { y: 60, opacity: 0, rotationX: -18 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.6)",
        stagger: { each: 0.03, from: "center" },
      }
    );

    gsap.fromTo(
      subChars,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: { each: 0.02, from: "center" },
        delay: 0.5,
      }
    );

    // 🌊 Continuous looping wave animation
    const waveTL = gsap.timeline({ repeat: -1, repeatDelay: 0 });
    waveTL.to(titleChars, {
      y: 6,
      duration: 0.9,
      ease: "sine.inOut",
      stagger: { each: 0.03, from: "center" },
    });
    waveTL.to(titleChars, {
      y: -4,
      duration: 0.9,
      ease: "sine.inOut",
      stagger: { each: 0.03, from: "center" },
    });
    waveTLRef.current = waveTL;

    const subWave = gsap.timeline({ repeat: -1, repeatDelay: 0 });
    subWave.to(subChars, {
      y: 4,
      duration: 1.2,
      ease: "sine.inOut",
      stagger: { each: 0.025, from: "center" },
    });
    subWave.to(subChars, {
      y: -3,
      duration: 1.2,
      ease: "sine.inOut",
      stagger: { each: 0.025, from: "center" },
    });
    subWaveRef.current = subWave;

    // 💫 Gradient shimmer animation
    const shimmer = gsap.to(titleChars, {
      backgroundPosition: "200% center",
      duration: 6,
      ease: "linear",
      repeat: -1,
      yoyo: true,
    });
    shimmerRef.current = shimmer;

    // Hover effect
    const onEnter = () => {
      gsap.to(titleChars, {
        y: 10,
        duration: 0.35,
        ease: "sine.out",
        stagger: 0.01,
      });
      gsap.to(subChars, {
        y: 6,
        duration: 0.35,
        ease: "sine.out",
        stagger: 0.01,
      });
    };
    const onLeave = () => {
      gsap.to(titleChars, {
        y: 0,
        duration: 0.4,
        ease: "sine.inOut",
        stagger: 0.01,
      });
      gsap.to(subChars, {
        y: 0,
        duration: 0.4,
        ease: "sine.inOut",
        stagger: 0.01,
      });
    };

    title.addEventListener("mouseenter", onEnter);
    title.addEventListener("mouseleave", onLeave);

    return () => {
      waveTL.kill();
      subWave.kill();
      shimmer.kill();
      title.removeEventListener("mouseenter", onEnter);
      title.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // 🌱 Data (unchanged)
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
      date: "September 24, 2024",
      image: "/assets/images/Home-card-1.jpg",
    },
    {
      title: "New E-Magazine Issue Released",
      description:
        "Issue 9 of Namadhu Vanam is now available featuring articles on wildlife conservation.",
      date: "May 15, 2024",
      image: "/assets/images/Home-card-2.jpg",
    },
    {
      title: "Member Registration Update",
      description:
        "New members can now register online through our updated portal.",
      date: "March 10, 2024",
      image: "/assets/images/Home-card-3.jpg",
    },
  ];

  return (
    <div>
      {/* 🌿 Hero Section */}
      <section className="relative w-full h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        {/* 🎥 Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover -z-20"
          src="/assets/images/Hero-1.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* 🌫️ Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-green-900/40 to-transparent z-10" />

        {/* 💬 Text Content */}
        <div className="relative z-20 text-center text-white px-4">
          <h1
            ref={titleRef}
            className="relative text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-center max-w-[1200px] mx-auto leading-tight"
          >
            Tamil Nadu Association of Senior Professionals of Environment and
            Forests
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg md:text-3xl mb-10 text-gray-100 mt-[220px] leading-snug"
          >
            Working Together to Protect and Conserve Tamil Nadu Forests
          </p>

          <div className="flex justify-center">
            <button
              onClick={() => (window.location.href = "/gallery")}
              className="px-6 py-3 rounded-md border border-white bg-white/10 text-white hover:bg-white hover:text-green-700 transition-all text-lg mt-[140px]"
            >
              View More
            </button>
          </div>
        </div>
      </section>

      {/* 🌱 Features Section */}
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
                    Learn More
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
