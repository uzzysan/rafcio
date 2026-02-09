import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Courses } from '@/components/Courses';
import { Contact } from '@/components/Contact';

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero />
            <About />
            <Projects />
            <Courses />
            <Contact />
        </div>
    );
}
