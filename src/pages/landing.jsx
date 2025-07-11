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
          Find Your Dream Job and{" "}
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
        className="w-full py-10 slide-up stagger-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center px-4">
          {companies.map(({ name, id, path }) => {
            return (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <img
                  src={path}
                  alt={name}
                  className="h-8 sm:h-12 object-contain transition-all duration-300 group-hover:scale-110"
                />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl hover-lift slide-up stagger-5 group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-gradient-shift"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
              <svg className="w-10 h-10 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">Connect. Apply. Succeed.</h3>
            <p className="text-white/80 max-w-md mx-auto">Join thousands of professionals finding their perfect career match</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

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
