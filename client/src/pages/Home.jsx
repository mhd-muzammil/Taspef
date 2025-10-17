import { Link } from 'react-router-dom'
import Button from '../components/Button'

const Home = () => {
  const features = [
    {
      title: 'E-Magazine',
      description: 'Access our digital magazine "Namadhu Vanam" with articles on forest conservation and wildlife.',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
      ),
      link: '/e-magazines',
    },
    {
      title: 'Office Bearers',
      description: 'Meet our leadership team and executive committee members dedicated to environmental conservation.',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      ),
      link: '/Office-Bearers',
    },
    {
      title: 'Our Members',
      description: 'Browse our member directory and connect with fellow professionals in environment and forests.',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      ),
      link: '/members',
    },
  ]

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
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        {/* 🎥 Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/images/Hero-vid.mp4" // 👈 put your video in public/assets/
          autoPlay
          loop
          muted
          playsInline
        />

        {/* 🌫️ Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-green-900/40 to-transparent" />
        {/* 💬 Hero Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Protect Forest and Conserve Wildlife
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100 animate-fade-in">
            Working Together to Protect and Conserve Tamil Nadu Forests
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <button
              onClick={() => (window.location.href = "/gallery")}
              className="px-6 py-3 rounded-md border border-white bg-white/10 text-white hover:bg-white hover:text-green-700 transition-all text-lg"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background-light">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-text-primary">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card p-8 text-center hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
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

      {/* Latest Updates Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-text-primary">
            Latest Updates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestUpdates.map((update, index) => (
              <article
                key={index}
                className="card overflow-hidden rounded-xl shadow hover:shadow-lg transition-all duration-300 bg-white animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* 🖼️ Image */}
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={update.image}
                    alt={update.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* 📝 Content */}
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

      {/* CTA Section */}
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
}

export default Home

