"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/shadcn-card';
import { ShieldCheck, Users, Stethoscope, Sparkles } from 'lucide-react';
import ScrollReveal from "@/components/animations/ScrollReveal";
import PageLink from '@/components/PageLink';
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function AboutDoctorSection() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Fade up the content details
        gsap.from(".about-content", {
            scrollTrigger: {
                trigger: ".about-content",
                start: "top 85%",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1
        });
    }, { scope: container });

    return (
        <section id="about" ref={container} className="bg-[#faf8f5] py-20 px-2 lg:px-0 md:py-24 relative z-10 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* 1. CLINIC FEATURES CARDS GRID */}
                <ScrollReveal direction="up" delay={0.1}>
                    <div className="text-center mb-10 md:mb-16">
                        <span className="text-primary font-medium tracking-widest text-[10px] sm:text-xs md:text-sm uppercase mb-3 block">
                            Our Approach
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold text-text mb-4 sm:mb-6">
                            Exceptional Care, Tailored for You.
                        </h2>
                        <p className="text-text/70 mx-auto max-w-2xl text-sm sm:text-lg font-light leading-relaxed">
                            Combining advanced medical precision with a compassionate mindset, ensuring every patient experiences painless treatments and lasting, beautiful results.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="relative mb-20 md:mb-32">
                    {/* On Mobile: Grid is 2 columns. On Tablet+: Grid is 6 columns */}
                    <div className="relative z-10 grid grid-cols-2 md:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
                        
                        {/* EXPERIENCE CARD (Full on Mobile, 2/6 on Tablet/Desktop) */}
                        <ScrollReveal direction="right" delay={0.2} className="col-span-2 md:col-span-2">
                            <Card className="relative h-full flex overflow-hidden shadow-sm border-primary/10 hover:shadow-md transition-shadow">
                                <CardContent className="relative m-auto w-full pt-6 pb-6 sm:pb-8 flex flex-col justify-center items-center">
                                    <div className="relative flex h-20 sm:h-24 w-full items-center text-primary justify-center">
                                        <svg className="absolute inset-0 size-full text-primary/10" viewBox="0 0 254 104" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path
                                                d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        <span className="mx-auto block w-fit text-4xl sm:text-5xl font-instrument font-bold">10+</span>
                                    </div>
                                    <h3 className="mt-2 sm:mt-4 text-center text-sm sm:text-lg lg:text-xl font-semibold text-text">Years Clinical Experience</h3>
                                </CardContent>
                            </Card>
                        </ScrollReveal>

                        {/* SAFETY & HYGIENE CARD (1 of 2 col on Mobile, 2/6 on Tablet/Desktop) */}
                        <ScrollReveal direction="up" delay={0.4} className="col-span-1 md:col-span-2">
                            <Card className="relative h-full overflow-hidden shadow-sm border-primary/10 hover:shadow-md transition-shadow">
                                <CardContent className="p-4 sm:p-6 pb-6 sm:pb-8 h-full flex flex-col justify-center items-center">
                                    <div className="relative flex aspect-square size-16 sm:size-28 rounded-full border border-primary/20 bg-primary/5">
                                        <ShieldCheck strokeWidth={1.5} className="m-auto size-6 sm:size-12 text-primary" />
                                    </div>
                                    <div className="relative z-10 mt-4 sm:mt-6 space-y-1 sm:space-y-2 text-center">
                                        <h3 className="text-sm sm:text-lg font-semibold text-text">Impeccable Hygiene</h3>
                                        <p className="text-text/70 text-xs sm:text-sm hidden sm:block">International sterilization norms and strict barrier protocols.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </ScrollReveal>

                        {/* TECHNOLOGY CARD (1 of 2 col on Mobile, 2/6 on Tablet/Desktop) */}
                        <ScrollReveal direction="left" delay={0.6} className="col-span-1 md:col-span-2">
                            <Card className="relative h-full overflow-hidden shadow-sm border-primary/10 hover:shadow-md transition-shadow">
                                <CardContent className="p-4 sm:p-6 pb-6 sm:pb-8 h-full flex flex-col justify-center items-center">
                                    <div className="relative flex aspect-square size-16 sm:size-28 rounded-full border border-primary/20 bg-primary/5">
                                        <Stethoscope strokeWidth={1.5} className="m-auto size-6 sm:size-12 text-primary" />
                                    </div>
                                    <div className="relative z-10 mt-4 sm:mt-6 space-y-1 sm:space-y-2 text-center">
                                        <h3 className="text-sm sm:text-lg font-semibold text-text">Precision Tech</h3>
                                        <p className="text-text/70 text-xs sm:text-sm hidden sm:block">Empowered by 3D imaging, precision tools, and 3D scanners.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </ScrollReveal>

                        {/* AESTHETIC EXCELLENCE CARD (Full on Mobile, 3/6 on Tablet/Desktop) */}
                        <ScrollReveal direction="right" delay={0.3} className="col-span-2 lg:col-span-3">
                            <Card className="relative h-full overflow-hidden shadow-sm border-primary/10 group hover:shadow-md transition-shadow">
                                <CardContent className="grid h-full p-0 sm:grid-cols-2 bg-white">
                                    <div className="relative z-10 flex flex-col justify-center space-y-3 sm:space-y-4 p-5 sm:p-8">
                                        <div className="relative flex aspect-square size-10 sm:size-12 rounded-full border border-primary/20 bg-primary/5">
                                            <Sparkles className="m-auto size-4 sm:size-5 text-primary" strokeWidth={1.5} />
                                        </div>
                                        <div className="space-y-1 sm:space-y-2">
                                            <h3 className="text-lg sm:text-xl font-semibold text-primary-dark font-playfair group-hover:text-primary transition-colors">Aesthetic Excellence</h3>
                                            <p className="text-text/70 text-xs sm:text-sm leading-relaxed">
                                                Blending artistry with advanced medical science to craft radiant, natural-looking smiles.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="hidden sm:flex relative bg-primary/5 p-4 sm:p-8 border-l border-surface items-center justify-center group-hover:bg-primary/[0.08] transition-colors">
                                        <div className="text-center space-y-4">
                                            <div className="relative">
                                                <div className="absolute -top-6 -left-2 text-4xl text-primary/10 font-serif opacity-50">"</div>
                                                <p className="font-playfair italic text-primary-dark/70 text-base sm:text-lg leading-relaxed relative z-10 px-4">
                                                    Perfecting every detail of your dental wellness.
                                                </p>
                                                <div className="absolute -bottom-8 -right-2 text-4xl text-primary/10 font-serif opacity-50 rotate-180">"</div>
                                            </div>
                                            <div className="w-16 h-[1px] bg-primary/20 mx-auto mt-6" />
                                            <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-primary/40 font-medium whitespace-nowrap">
                                                Authentic Care • 2020
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </ScrollReveal>

                        {/* FAMILY TRUST CARD (Full on Mobile, 3/6 on Tablet/Desktop) */}
                        <ScrollReveal direction="left" delay={0.5} className="col-span-2 lg:col-span-3">
                            <Card className="relative h-full overflow-hidden shadow-sm border-primary/10 bg-gradient-to-br from-primary/5 to-transparent group hover:shadow-md transition-shadow">
                                <CardContent className="grid h-full p-0 sm:grid-cols-2">
                                    <div className="relative z-10 flex flex-col justify-center space-y-3 sm:space-y-4 p-5 sm:p-8 border-b sm:border-b-0 sm:border-r border-primary/10">
                                        <div className="relative flex aspect-square size-10 sm:size-12 rounded-full border border-primary/20 bg-white">
                                            <Users className="m-auto size-4 sm:size-5 text-primary" strokeWidth={1.5} />
                                        </div>
                                        <div className="space-y-1 sm:space-y-2">
                                            <h3 className="text-lg sm:text-xl font-semibold text-primary-dark font-playfair group-hover:text-primary transition-colors">Trusted by Families</h3>
                                            <p className="text-text/70 text-xs sm:text-sm leading-relaxed">
                                                A fear-free environment for kids and adults alike, ensuring a calm, positive experience.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="relative flex flex-col justify-center space-y-3 sm:space-y-5 p-5 sm:p-8 shrink-0">
                                        
                                        {/* Abstract patient graph */}
                                        <div className="relative flex items-center justify-end gap-2 sm:gap-3 w-[95%] opacity-90 group-hover:opacity-100 transition-opacity">
                                            <span className="block rounded-lg bg-white border border-primary/10 px-2 py-1 text-[10px] sm:text-xs font-medium text-primary shadow-sm">Gentle Care</span>
                                            <div className="ring-background size-8 sm:size-10 ring-4 rounded-full shadow-sm bg-pink-100 flex items-center justify-center">
                                                <span className="text-xs font-bold text-pink-600" aria-hidden="true">AP</span>
                                            </div>
                                        </div>
                                        <div className="relative flex items-center gap-2 sm:gap-3 w-[90%] left-[5%] opacity-90 group-hover:opacity-100 transition-opacity">
                                            <div className="ring-background size-8 sm:size-10 ring-4 rounded-full shadow-sm bg-blue-100 flex items-center justify-center">
                                                <span className="text-xs font-bold text-blue-600" aria-hidden="true">RK</span>
                                            </div>
                                            <span className="block rounded-lg bg-white border border-primary/10 px-2 py-1 text-[10px] sm:text-xs font-medium text-primary shadow-sm">Painless</span>
                                        </div>
                                        <div className="relative flex items-center justify-end gap-2 sm:gap-3 w-[85%] opacity-90 group-hover:opacity-100 transition-opacity">
                                            <span className="block rounded-lg bg-white border border-primary/10 px-2 py-1 text-[10px] sm:text-xs font-medium text-primary shadow-sm">Modern Tools</span>
                                            <div className="ring-background size-8 sm:size-10 ring-4 rounded-full shadow-sm bg-amber-100 flex items-center justify-center">
                                                <span className="text-xs font-bold text-amber-600" aria-hidden="true">SM</span>
                                            </div>
                                        </div>

                                    </div>
                                </CardContent>
                            </Card>
                        </ScrollReveal>

                    </div>
                </div>

                {/* 2. DOCTOR BIOGRAPHY & DETAILS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mt-24">
                    
                    <div className="lg:col-span-5 relative about-content max-w-sm sm:max-w-md mx-auto lg:mx-0 w-full">
                        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://ui-avatars.com/api/?name=Dr+Saachi+Shingrani&size=512&background=ede9fe&color=7c3aed"
                                alt="Dr. Saachi Shingrani"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                        
                        {/* Experience Badge - Adjusted for mobile to avoid overflow */}
                        <div className="absolute bottom-2 right-2 sm:-bottom-6 sm:-right-6 md:-bottom-8 md:-right-8 bg-white p-3 sm:p-6 md:p-8 rounded-full shadow-xl flex flex-col items-center justify-center w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 border border-surface z-10">
                            <span className="text-xl sm:text-3xl md:text-4xl font-bold text-primary font-instrument">10+</span>
                            <span className="text-[9px] sm:text-xs md:text-sm text-text/70 text-center font-medium uppercase tracking-wider mt-0.5 leading-tight">
                                Years <br /> Experience
                            </span>
                        </div>
                    </div>

                    <div className="lg:col-span-6 lg:col-start-7 lg:pl-8 mt-12 lg:mt-0 flex flex-col justify-center">
                        <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-text mb-2 about-content">
                            Dr. Saachi Shingrani
                        </h2>
                        <p className="text-primary font-medium text-lg mb-6 about-content">
                            BDS – Dental Surgeon (Nair Hospital Dental College)
                        </p>
                        
                        {/* Custom Blur Reveal for bio */}
                        <motion.div
                            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-text/80 leading-relaxed font-inter font-light"
                        >
                            <p>
                                Dr. Saachi Shingrani is a skilled & passionate Dentist,
                                graduated from the prestigious Nair Hospital Dental College, Mumbai.
                            </p>
                            <p>
                                Her practice is built on a foundation of sincerity and patient-first care,
                                ensuring that every treatment, from routine checkups to complex procedures are
                                delivered with a gentle touch and technical excellence.
                            </p>
                            <p>
                                With a friendly nature and a deep commitment to treatment satisfaction,
                                her motto is simple: providing the best dental care for her patients.
                            </p>
                        </motion.div>

                        <div className="mt-10 pt-10 border-t border-text/10 about-content">
                            <PageLink
                                href="/about"
                                className="inline-flex items-center space-x-2 text-primary hover:text-primary-dark font-medium group transition-colors"
                            >
                                <span className="border-b border-primary/30 group-hover:border-primary transition-colors pb-0.5">
                                    Read Full Profile
                                </span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </PageLink>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
