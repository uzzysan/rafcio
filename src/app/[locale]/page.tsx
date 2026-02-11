import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero />
            <About />
            <Services />
            <Projects />
            <Experience />
            <Contact />
            <Footer />
        </div>
    );
}
