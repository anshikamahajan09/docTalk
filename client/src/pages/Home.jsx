import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeCard from "../components/HomeCard";

import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

import { TiArrowRightThick } from "react-icons/ti";

import banner from "../assets/banner.png";
import service1 from "../assets/service1.png";
import service2 from "../assets/service2.png";
import service3 from "../assets/service3.png";

const services = [
  {
    title: "Free Support",
    description:
      "We provide free support to help you know the best medical services for you.",
    image: service1,
  },
  {
    title: "Easy to Use",
    description:
      "Our platform is easy to use and you can easily book an appointment with our doctors.",
    image: service2,
  },
  {
    title: "Best Doctors",
    description:
      "We have the best doctors in the world who are well trained and experienced to handle any medical emergency.",
    image: service3,
  },
];

export default function Home() {
  return (
    <div className=" ">
      <Header />
      <div className="sm:flex items-center lg:gap-x-16 md:gap-x-10 w-full xl:px-36 bg-gradient-to-r from-cyan-200 pt-16">
        <div className="sm:w-1/2  lg:pl-20 sm:pl-12 px-8 pt-8">
          <p className="lg:text-5xl md:text-4xl sm:text-3xl text-3xl md:mb-2 sm:m-0 mb-2">Get Quick</p>
          <p className="lg:text-5xl md:text-4xl sm:text-3xl text-4xl font-semibold md:mb-4 sm:m-0 mb-8">Medical Services</p>
          <p className="md:my-8 my-4 sm:block hidden">
            We provide the best medical services in the world. We are available 24/7 to provide you with the best
            medical services.
          </p>

          <Link  to="/sign-in">
            
            <Button className="sm:w-auto w-1/2" gradientDuoTone="greenToBlue">
              Get a free trial
              <TiArrowRightThick className="ml-2 mt-0.5" />
            </Button>
          </Link>
        </div>
        <div className="sm:w-1/2 h-full">
          <img className="sm:w-auto sm:h-auto w-[470px] h-[400px] ml-3.5" src={banner} />
        </div>
      </div>

      <div className="mb-10">
        <div>
          <p className="text-center lg:text-5xl text-4xl font-semibold mt-16 mb-10">
            Our Services
          </p>
        </div>
        <div className="flex mx-auto xl:w-2/3 gap-x-2 w-4/5">
          <HomeCard image={services[0].image} title={services[0].title} description={services[0].description} />
          <HomeCard image={services[1].image} title={services[1].title} description={services[1].description} />
          <HomeCard image={services[2].image} title={services[2].ti7utle} description={services[2].description} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
