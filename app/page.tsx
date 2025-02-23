import AccordionFeatures from "@/components/landing/accordion-features";
import BeforeAfter from "@/components/landing/before-after";
import { Container } from "@/components/landing/container";
import CTA from "@/components/landing/cta";
// import FAQ from "@/components/landing//faq";
import Footer from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import Hero from "@/components/landing/hero";
// import LogoClouds from "@/components/landing//logo-clouds";
// import Pricing from "@/components/landing//pricing";
export default function Home() {
  return (
    <div className="bg-white">
    <Container>
      <Header  />
      <Hero />
     
      <BeforeAfter />
      <AccordionFeatures />
    
      
      {/* <CTA /> */}
      <Footer />
    </Container>
    </div>
  );
}
