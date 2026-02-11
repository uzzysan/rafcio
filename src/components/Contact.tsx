"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Section, SectionHeader, Container } from '@/components/ui/Section';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
    Send, 
    CheckCircle, 
    Linkedin, 
    Mail, 
    MapPin,
    ArrowUpRight
} from 'lucide-react';

const contactMethods = [
    {
        icon: Mail,
        label: 'Email',
        value: 'rafal.maculewicz@tuta.com',
        href: 'mailto:rafal.maculewicz@tuta.com',
        color: 'from-red-500 to-orange-500'
    },
    {
        icon: Linkedin,
        label: 'LinkedIn',
        value: 'linkedin.com/in/uzzysan',
        href: 'https://www.linkedin.com/in/uzzysan/',
        external: true,
        color: 'from-blue-500 to-cyan-500'
    },
    {
        icon: MapPin,
        label: 'Location',
        value: 'Śrem, Poland',
        href: null,
        color: 'from-emerald-500 to-teal-500'
    }
];

// hCaptcha site key - get yours from https://dashboard.hcaptcha.com
const HCAPTCHA_SITE_KEY = '0914d5ae-696e-42ac-aa2a-e9e26e980d34';

export function Contact() {
    const t = useTranslations('HomePage');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [captchaLoaded, setCaptchaLoaded] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const captchaRef = useRef<HTMLDivElement>(null);

    // Listen for hCaptcha verification
    useEffect(() => {
        const handleCaptchaVerify = (event: Event) => {
            const customEvent = event as CustomEvent<string>;
            setCaptchaToken(customEvent.detail);
        };

        window.addEventListener('hcaptcha-verified', handleCaptchaVerify);
        return () => window.removeEventListener('hcaptcha-verified', handleCaptchaVerify);
    }, []);

    // Load hCaptcha script
    useEffect(() => {
        if (showCaptcha && !captchaLoaded) {
            if (typeof window === 'undefined') return;
            
            if (!document.getElementById('hcaptcha-script')) {
                const script = document.createElement('script');
                script.id = 'hcaptcha-script';
                script.src = 'https://js.hcaptcha.com/1/api.js?render=explicit';
                script.async = true;
                script.defer = true;
                script.onload = () => {
                    setCaptchaLoaded(true);
                };
                document.body.appendChild(script);
            } else if ((window as unknown as { hcaptcha?: unknown }).hcaptcha) {
                setCaptchaLoaded(true);
            }
        }
    }, [showCaptcha, captchaLoaded]);

    // Render hCaptcha when loaded
    useEffect(() => {
        if (captchaLoaded && captchaRef.current && showCaptcha) {
            const hcaptcha = (window as unknown as { 
                hcaptcha?: { render: (container: string | HTMLElement, options: Record<string, unknown>) => number } 
            }).hcaptcha;
            
            if (hcaptcha) {
                // Clear previous captcha if exists
                captchaRef.current.innerHTML = '';
                hcaptcha.render(captchaRef.current, {
                    sitekey: HCAPTCHA_SITE_KEY,
                    callback: 'onHCaptchaVerify',
                    theme: 'dark'
                });
            }
        }
    }, [captchaLoaded, showCaptcha]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Show CAPTCHA on first submit attempt
        if (!showCaptcha) {
            setShowCaptcha(true);
            return;
        }
        
        // Check if CAPTCHA is completed
        if (!captchaToken) {
            alert(t('contact.captchaRequired'));
            return;
        }
        
        setIsSubmitting(true);
        
        const form = e.currentTarget;
        const formData = new FormData(form);
        
        try {
            const response = await fetch('https://formspree.io/f/mqedewbz', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                setIsSent(true);
                form.reset();
                setCaptchaToken(null);
                setShowCaptcha(false);
            } else {
                const data = await response.json();
                if (data.errors) {
                    alert(data.errors.map((e: { message: string }) => e.message).join(', '));
                } else {
                    alert(t('contact.error'));
                }
            }
        } catch (error) {
            alert(t('contact.error'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Section id="contact" className="bg-[var(--muted)]/30">
            {/* Global hCaptcha callback */}
            <script dangerouslySetInnerHTML={{
                __html: `
                    window.onHCaptchaVerify = function(token) {
                        window.dispatchEvent(new CustomEvent('hcaptcha-verified', { detail: token }));
                    };
                `
            }} />

            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-[150px]" />
                <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[var(--accent-secondary)]/5 rounded-full blur-[120px]" />
            </div>

            <Container>
                <SectionHeader 
                    title={t('contact.label')}
                    subtitle={t('contact.subtitle')}
                />

                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
                    {/* Left column - Contact info */}
                    <motion.div 
                        className="lg:col-span-2"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                            {t('contact.heading')}
                        </h3>
                        <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
                            {t('contactText')}
                        </p>

                        {/* Contact methods */}
                        <div className="space-y-4">
                            {contactMethods.map((method, index) => (
                                <motion.div
                                    key={method.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                >
                                    {method.href ? (
                                        <a 
                                            href={method.href}
                                            target={method.external ? "_blank" : undefined}
                                            rel={method.external ? "noopener noreferrer" : undefined}
                                            className="group flex items-center gap-4 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all duration-300"
                                        >
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center shadow-lg`}>
                                                <method.icon size={24} className="text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-[var(--muted-foreground)]">{method.label}</p>
                                                <p className="font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                                                    {method.value}
                                                </p>
                                            </div>
                                            <ArrowUpRight size={20} className="text-[var(--muted-foreground)] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    ) : (
                                        <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center shadow-lg`}>
                                                <method.icon size={24} className="text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-[var(--muted-foreground)]">{method.label}</p>
                                                <p className="font-medium text-[var(--foreground)]">{method.value}</p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Availability */}
                        <motion.div 
                            className="mt-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <div className="flex items-center gap-3">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                </span>
                                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                    {t('contact.available')}
                                </span>
                            </div>
                            <p className="text-sm text-[var(--muted-foreground)] mt-2">
                                {t('contact.response')}
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Right column - Contact form */}
                    <motion.div 
                        className="lg:col-span-3"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <Card className="h-full" hover={false}>
                            <CardContent className="h-full">
                                {isSent ? (
                                    <motion.div 
                                        className="h-full flex flex-col items-center justify-center text-center py-12"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
                                            <CheckCircle size={40} className="text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                                            {t('messageSent')}
                                        </h3>
                                        <p className="text-[var(--muted-foreground)] mb-6">
                                            {t('contact.thankYou')}
                                        </p>
                                        <Button 
                                            variant="outline" 
                                            onClick={() => {
                                                setIsSent(false);
                                                setCaptchaToken(null);
                                                setShowCaptcha(false);
                                            }}
                                        >
                                            {t('contact.sendAnother')}
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <form 
                                        ref={formRef}
                                        onSubmit={handleSubmit} 
                                        className="space-y-6"
                                    >
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                                                    {t('name')} *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl bg-[var(--muted)] border border-[var(--border)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]"
                                                    placeholder={t('contact.namePlaceholder')}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                                                    {t('email')} *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl bg-[var(--muted)] border border-[var(--border)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]"
                                                    placeholder={t('contact.emailPlaceholder')}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                                                {t('contact.subject')}
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                className="w-full px-4 py-3 rounded-xl bg-[var(--muted)] border border-[var(--border)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all text-[var(--foreground)]"
                                            >
                                                <option value="">{t('contact.selectSubject')}</option>
                                                <option value="powerbi">{t('contact.subjects.powerbi')}</option>
                                                <option value="development">{t('contact.subjects.development')}</option>
                                                <option value="training">{t('contact.subjects.training')}</option>
                                                <option value="consulting">{t('contact.subjects.consulting')}</option>
                                                <option value="other">{t('contact.subjects.other')}</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                                                {t('message')} *
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={5}
                                                className="w-full px-4 py-3 rounded-xl bg-[var(--muted)] border border-[var(--border)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] resize-none"
                                                placeholder={t('contact.messagePlaceholder')}
                                            />
                                        </div>

                                        {/* CAPTCHA Container */}
                                        {showCaptcha && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="flex justify-center"
                                            >
                                                <div ref={captchaRef} />
                                            </motion.div>
                                        )}

                                        <Button
                                            type="submit"
                                            fullWidth
                                            size="lg"
                                            disabled={isSubmitting || (showCaptcha && !captchaToken)}
                                            icon={isSubmitting ? undefined : <Send size={18} />}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <motion.span
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                    />
                                                    {t('contact.sending')}
                                                </span>
                                            ) : showCaptcha ? (
                                                t('sendMessage')
                                            ) : (
                                                t('sendMessage')
                                            )}
                                        </Button>

                                        {/* Info about CAPTCHA */}
                                        {showCaptcha && (
                                            <p className="text-xs text-[var(--muted-foreground)] text-center">
                                                {t('contact.captchaInfo')}
                                            </p>
                                        )}
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
}
