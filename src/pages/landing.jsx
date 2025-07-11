import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20 relative">
      <section className="text-center fade-in">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4 animate-pulse-slow">
          Find Your Dream Job{" "}
          <span className="flex items-center gap-2 sm:gap-6 slide-up stagger-1">
            and get{" "}
            <img
              src="/logo.png"
              alt="Hired logo"
              className="h-14 sm:h-24 lg:h-32 transition-transform duration-500 hover:scale-110 hover:rotate-3"
            />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl slide-up stagger-2 max-w-2xl mx-auto leading-relaxed">
          Explore throusands of job listings or find the perfect candidate
        </p>
      </section>
      <div className="flex gap-6 justify-center slide-up stagger-3">
        <Link to="/jobs">
          <Button variant="blue" size="xl" className="hover-lift group relative overflow-hidden">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
            Find Jobs
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </Button>
        </Link>
        <Link to="/post-job">
          <Button size="xl" variant="destructive" className="hover-lift group relative overflow-hidden">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
            post a Job
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </Button>
        </Link>
      </div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full py-10 slide-up stagger-4"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => {
            return (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
                <img
                  src={path}
                  alt={name}
                  className="h-9 sm:h-14 object-contain transition-all duration-300 hover:scale-110 filter grayscale hover:grayscale-0"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      <img src="/banner.jpeg" className="w-full rounded-2xl shadow-2xl hover-lift slide-up stagger-5" />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 slide-up stagger-5">
        <Card className="hover-lift glass-effect border-0 group">
          <CardHeader>
            <CardTitle className="font-bold text-xl group-hover:text-blue-400 transition-colors duration-300">For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 leading-relaxed">Search and apply for jobs, track applications, and more.</p>
          </CardContent>
        </Card>
        <Card className="hover-lift glass-effect border-0 group">
          <CardHeader>
            <CardTitle className="font-bold text-xl group-hover:text-purple-400 transition-colors duration-300">For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 leading-relaxed">Post jobs, manage applications, and find the best candidates.</p>
          </CardContent>
        </Card>
      </section>

      <Accordion type="multiple" className="w-full slide-up stagger-5">
        {faqs.map((faq, index) => {
          return (
            <AccordionItem key={index} value={`item-${index + 1}`} className="border-white/20 hover:border-white/40 transition-colors duration-300">
              <AccordionTrigger className="hover:text-blue-400 transition-colors duration-300 text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-300 leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </main>
  );
};

export default LandingPage;
