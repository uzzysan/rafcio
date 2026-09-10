import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Testimonials } from '@/components/Testimonials';

export default function HomePage() {
    return (
        <div id="main-content" className="flex flex-col min-h-screen" tabIndex={-1}>
            <Hero />
            <About />
            <Services />
            <Projects />
            <Experience />
            <Testimonials />
            <Contact />
            <Footer />
        </div>
    );
}
