"use client"

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, CheckCircle, Linkedin, Mail } from 'lucide-react';

export function Contact() {
    const t = useTranslations('HomePage');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSent(true);
    };

    return (
        <section id="contact" className="py-20 bg-gray-50 dark:bg-[#292524]">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        {t('contactHeading')}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                        {t('contactText')}
                    </p>

                    <div className="flex justify-center gap-6 mb-12">
                        <a
                            href="https://www.linkedin.com/in/uzzysan/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#1c1917] rounded-full shadow-md text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                        >
                            <Linkedin size={24} />
                            <span>LinkedIn</span>
                        </a>
                        <a
                            href="mailto:rafal.maculewicz@tuta.com"
                            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#1c1917] rounded-full shadow-md text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                        >
                            <Mail size={24} />
                            <span>rafal.maculewicz@tuta.com</span>
                        </a>
                    </div>

                    <div className="h-1 w-20 bg-orange-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="max-w-xl mx-auto bg-white dark:bg-[#1c1917] p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-white/5">
                    {isSent ? (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                                <CheckCircle size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('messageSent')}</h3>
                            <p className="text-gray-600 dark:text-gray-400">Thank you for reaching out. I'll get back to you shortly.</p>
                            <button
                                onClick={() => setIsSent(false)}
                                className="mt-6 text-orange-500 hover:text-orange-600 font-medium"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {t('name')}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#292524] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:text-white"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {t('email')}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#292524] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:text-white"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {t('message')}
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#292524] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:text-white resize-none"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all hover:scale-[1.02] shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="animate-pulse">Sending...</span>
                                ) : (
                                    <>
                                        {t('sendMessage')} <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
