import React, { useState, useEffect } from 'react';

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', company: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
        setShowForm(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = '';
        setTimeout(() => {
            setShowForm(true);
            setFormData({ name: '', email: '', company: '' });
        }, 300);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:8000/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Something went wrong');
            }

            // Success
            setShowForm(false);
            setTimeout(() => {
                closeModal();
            }, 3000);
        } catch (error) {
            console.error('Submission error:', error);
            alert(error instanceof Error ? error.message : 'Failed to join waitlist. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <>
            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.1)]' : ''
                }`}>
                <div className="max-w-[1200px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-teal flex items-center justify-center text-white">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                <polyline points="14 2 14 8 20 8" />
                                <path d="m9 15 2 2 4-4" />
                            </svg>
                        </div>
                        <span className={`font-display font-bold text-xl transition-colors ${isScrolled ? 'text-foreground' : 'text-white'
                            }`}>ScanLedger</span>
                    </div>
                    <button
                        className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-all ${isScrolled
                            ? 'bg-transparent border-teal text-teal hover:bg-teal hover:text-white'
                            : 'bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/50'
                            }`}
                        onClick={openModal}
                    >
                        Join Waitlist
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen bg-gradient-hero overflow-hidden flex flex-col">
                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="glow-element top-[25%] left-[25%] w-96 h-96 bg-teal/10" />
                    <div className="glow-element bottom-[25%] right-[25%] w-80 h-80 bg-teal-light/10 animation-delay-1000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
                </div>

                {/* Hero Content */}
                <div className="relative container mx-auto px-4 pt-24 md:pt-32 flex-1 flex flex-col justify-center text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 mx-auto">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-teal-light">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <span className="text-white/80 text-sm font-medium">Blockchain-Secured Expense Tracking</span>
                    </div>

                    <h1 className="font-display text-4xl md:text-5xl lg:text-7xl text-white max-w-[900px] mx-auto leading-tight">
                        Stop Chasing Receipts.<br />
                        <span className="text-gradient">Start Trusting Data.</span>
                    </h1>

                    <p className="mt-6 text-lg text-white/60 max-w-[640px] mx-auto leading-relaxed">
                        ScanLedger automates receipt capture with OCR and anchors every expense to the blockchain—creating tamper-proof financial records your auditors will love.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
                        <button
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-accent text-white font-semibold rounded-xl shadow-glow hover:shadow-glow-hover hover:-translate-y-0.5 transition-all"
                            onClick={openModal}
                        >
                            Get Early Access
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                        <a
                            href="#how-it-works"
                            className="inline-flex items-center px-8 py-4 bg-transparent border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all"
                        >
                            See How It Works
                        </a>
                    </div>

                    <div className="mt-16 grid grid-cols-3 gap-8 max-w-[500px] mx-auto">
                        <div className="text-center">
                            <div className="font-display text-3xl md:text-4xl font-bold text-teal-light">90%</div>
                            <div className="mt-1 text-sm text-white/50">Less Manual Entry</div>
                        </div>
                        <div className="text-center">
                            <div className="font-display text-3xl md:text-4xl font-bold text-teal-light">100%</div>
                            <div className="mt-1 text-sm text-white/50">Audit Ready</div>
                        </div>
                        <div className="text-center">
                            <div className="font-display text-3xl md:text-4xl font-bold text-teal-light">∞</div>
                            <div className="mt-1 text-sm text-white/50">Data Integrity</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="py-14 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-[800px] mx-auto mb-16">
                        <span className="inline-block text-teal font-medium text-sm uppercase tracking-widest">The Problem</span>
                        <h2 className="font-display text-3xl md:text-5xl text-foreground">Manual Expense Tracking Is Broken</h2>
                        <p className="text-lg text-muted-foreground">Organizations still rely on outdated processes that create risk, waste time, and undermine financial accountability.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
                                title: 'Time-Consuming Entry',
                                desc: 'Hours wasted manually typing receipt data into spreadsheets'
                            },
                            {
                                icon: <><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></>,
                                title: 'Human Errors',
                                desc: 'Incorrect amounts, duplicates, and missing records pile up'
                            },
                            {
                                icon: <><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><path d="M10 10.3c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2" /><path d="M12 17h.01" /></>,
                                title: 'Lost Receipts',
                                desc: 'Physical receipts get lost, damaged, or become unreadable'
                            },
                            {
                                icon: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
                                title: 'Scattered Data',
                                desc: 'Digital receipts spread across devices and platforms'
                            },
                            {
                                icon: <><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></>,
                                title: 'Audit Nightmares',
                                desc: 'Financial reviews become time-consuming and stressful'
                            },
                            {
                                icon: <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m4.243 5.21 14.39 12.472" /></>,
                                title: 'No Tamper Protection',
                                desc: 'Records can be modified without any trace'
                            }
                        ].map((problem, i) => (
                            <div key={i} className="p-6 bg-card border border-border rounded-2xl card-hover">
                                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-4 text-teal transition-colors group-hover:bg-teal/20">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        {problem.icon}
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold mb-2">{problem.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{problem.desc}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-center mt-12 text-muted-foreground max-w-[640px] mx-auto">
                        As organizations grow, these inefficiencies scale into serious operational risks—reducing visibility, weakening accountability, and increasing stress.
                    </p>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-[800px] mx-auto mb-16">
                        <span className="inline-block text-teal font-medium text-sm uppercase tracking-widest">How It Works</span>
                        <h2 className="font-display text-3xl md:text-5xl text-foreground">From Receipt to Blockchain in Minutes</h2>
                        <p className="text-lg text-muted-foreground">A streamlined workflow that transforms expense chaos into verified, permanent records.</p>
                    </div>

                    <div className="max-w-[800px] mx-auto space-y-0">
                        {[
                            {
                                icon: <><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></>,
                                num: '01',
                                title: 'Capture Receipt',
                                desc: 'Upload via web or snap a photo with your phone. Works with physical and digital receipts.'
                            },
                            {
                                icon: <><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3" /><path d="M15 1v3" /><path d="M9 20v3" /><path d="M15 20v3" /><path d="M20 9h3" /><path d="M20 14h3" /><path d="M1 9h3" /><path d="M1 14h3" /></>,
                                num: '02',
                                title: 'OCR Extraction',
                                desc: 'AI automatically extracts vendor name, date, amount, and line items with confidence scoring.'
                            },
                            {
                                icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>,
                                num: '03',
                                title: 'Quick Verification',
                                desc: 'Review extracted data and correct any errors with minimal effort before confirmation.'
                            },
                            {
                                icon: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>,
                                num: '04',
                                title: 'Blockchain Anchor',
                                desc: 'Confirmed receipts are hashed and recorded on Cardano blockchain for permanent proof.'
                            },
                            {
                                icon: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>,
                                num: '05',
                                title: 'Track & Report',
                                desc: 'View verified expenses in dashboards with timelines, summaries, and audit trails.'
                            }
                        ].map((step, i) => (
                            <div key={i} className="relative flex gap-6 pb-12 last:pb-0">
                                {/* Step Indicator */}
                                <div className="relative flex-shrink-0">
                                    <div className="w-12 h-12 rounded-xl bg-teal flex items-center justify-center text-white shadow-glow">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            {step.icon}
                                        </svg>
                                    </div>
                                    <span className="absolute -bottom-2 -right-2 text-xs font-bold text-teal bg-background px-2 py-0.5 rounded-full border border-teal/30">
                                        {step.num}
                                    </span>
                                </div>

                                {/* Step Content */}
                                <div className="flex-1 bg-card border border-border rounded-2xl p-6 hover:border-teal/30 hover:shadow-soft transition-all">
                                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                                </div>

                                {/* Connection Line */}
                                {i < 4 && (
                                    <div className="absolute left-6 top-14 w-0.5 h-[calc(100%-3rem)] bg-gradient-to-b from-teal to-teal/20" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-14 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-[800px] mx-auto mb-16">
                        <span className="inline-block text-teal font-medium text-sm uppercase tracking-widest">Features</span>
                        <h2 className="font-display text-3xl md:text-5xl text-foreground">Built for Trust & Transparency</h2>
                        <p className="text-lg text-muted-foreground">Every feature is designed to reduce friction, eliminate errors, and create unshakeable financial integrity.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><rect x="7" y="7" width="10" height="10" rx="1" /></>,
                                title: 'Smart OCR Extraction',
                                desc: 'Automatically extract vendor, date, amount, and line items with AI-powered confidence scoring.'
                            },
                            {
                                icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></>,
                                title: 'Blockchain Anchoring',
                                desc: 'Every confirmed receipt is cryptographically hashed and recorded on Cardano for permanent proof.'
                            },
                            {
                                icon: <><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></>,
                                title: 'Expense Dashboards',
                                desc: 'Visual timelines, spending summaries, and vendor breakdowns at your fingertips.'
                            },
                            {
                                icon: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
                                title: 'Privacy by Design',
                                desc: 'Sensitive data stays encrypted. Only hashes go on-chain, ensuring compliance and security.'
                            },
                            {
                                icon: <><path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" /><path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2" /><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" /><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" /><path d="M8.65 22c.21-.66.45-1.32.57-2" /><path d="M14 13.12c0 2.38 0 6.38-1 8.88" /><path d="M2 16h.01" /><path d="M21.8 16c.2-2 .131-5.354 0-6" /><path d="M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2" /></>,
                                title: 'Audit-Ready Records',
                                desc: 'Immutable timestamps and transaction IDs make every expense independently verifiable.'
                            },
                            {
                                icon: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
                                title: 'Access Anywhere',
                                desc: 'Web-based interface works on any device. Capture receipts in the field or at your desk.'
                            }
                        ].map((feature, i) => (
                            <div key={i} className="relative p-8 bg-card border border-border rounded-2xl overflow-hidden group transition-all hover:border-teal/50">
                                <div className="absolute inset-0 bg-teal/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center mb-6 text-teal transition-all group-hover:bg-teal/20 group-hover:shadow-glow">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        {feature.icon}
                                    </svg>
                                </div>

                                <h3 className="relative text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="relative text-muted-foreground leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Audience Section */}
            <section className="py-14 bg-gradient-hero text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-[800px] mx-auto mb-16">
                        <span className="inline-block text-teal-light font-medium text-sm uppercase tracking-widest">Who It&apos;s For</span>
                        <h2 className="font-display text-3xl md:text-5xl text-white">Built for Teams That Need Trust</h2>
                        <p className="text-lg text-white/60">Whether you&apos;re managing donor funds, running operations, or scaling a business—ScanLedger brings clarity to your finances.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 max-w-[1100px] mx-auto">
                        {[
                            {
                                icon: <><line x1="3" x2="21" y1="22" y2="22" /><line x1="6" x2="6" y1="18" y2="11" /><line x1="10" x2="10" y1="18" y2="11" /><line x1="14" x2="14" y1="18" y2="11" /><line x1="18" x2="18" y1="18" y2="11" /><polygon points="12 2 20 7 4 7" /></>,
                                title: 'NGOs & Donor-Funded Orgs',
                                desc: 'Demonstrate accountability to donors with verifiable, transparent expense records.'
                            },
                            {
                                icon: <><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" /></>,
                                title: 'Small & Medium Businesses',
                                desc: 'Streamline bookkeeping and prepare for growth with organized, trustworthy data.'
                            },
                            {
                                icon: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></>,
                                title: 'Startups',
                                desc: 'Build financial discipline from day one without adding administrative overhead.'
                            },
                            {
                                icon: <><path d="M10 17h4V5H2v12h3" /><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5" /><path d="M14 17h1" /><circle cx="7.5" cy="17.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></>,
                                title: 'Logistics & Procurement',
                                desc: 'Track field expenses, vendor payments, and supply chain costs in real-time.'
                            },
                            {
                                icon: <><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" x2="16" y1="6" y2="6" /><line x1="16" x2="16" y1="14" y2="18" /><path d="M16 10h.01" /><path d="M12 10h.01" /><path d="M8 10h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" /><path d="M12 18h.01" /><path d="M8 18h.01" /></>,
                                title: 'Finance Teams',
                                desc: 'Reduce reconciliation time and improve audit readiness across the organization.'
                            }
                        ].map((audience, i) => (
                            <div key={i} className="flex-1 min-w-[280px] max-w-[320px] p-6 bg-white/5 border border-white/10 rounded-2xl transition-all hover:bg-white/10 hover:border-teal/30">
                                <div className="w-12 h-12 rounded-xl bg-teal/20 flex items-center justify-center mb-4 text-teal-light transition-colors hover:bg-teal/30">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        {audience.icon}
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold mb-2">{audience.title}</h3>
                                <p className="text-sm text-white/50 leading-relaxed">{audience.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-14 bg-background overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-teal/5 blur-[80px]" />
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-teal-light/5 blur-[80px]" />
                </div>

                <div className="relative container mx-auto px-4">
                    <div className="max-w-[800px] mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-teal/20 mb-6">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-teal">
                                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                            </svg>
                            <span className="text-sm font-medium text-foreground">Launching Soon</span>
                        </div>

                        <h2 className="font-display text-3xl md:text-5xl text-foreground mb-6">
                            Ready to Transform Your Expense Management?
                        </h2>

                        <p className="text-lg text-muted-foreground mb-10 max-w-[600px] mx-auto">
                            Join the waitlist and be among the first to experience ScanLedger. Get early access, exclusive updates, and help shape the future of financial accountability.
                        </p>

                        <button
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-accent text-white font-semibold rounded-xl shadow-glow hover:shadow-glow-hover hover:-translate-y-0.5 transition-all"
                            onClick={openModal}
                        >
                            Join the Waitlist
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>

                        <p className="mt-4 text-sm text-muted-foreground">
                            No credit card required. Get notified when we launch.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-navy py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
                        <div className="max-w-md">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-teal flex items-center justify-center text-white">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                        <polyline points="14 2 14 8 20 8" />
                                        <path d="m9 15 2 2 4-4" />
                                    </svg>
                                </div>
                                <span className="font-display font-bold text-xl text-white">ScanLedger</span>
                            </div>
                            <p className="text-white/60">
                                Blockchain-powered expense tracking for organizations that value trust and transparency.
                            </p>
                        </div>

                        <div className="flex gap-6">
                            <a href="#how-it-works" className="text-white/60 hover:text-white transition-colors">How It Works</a>
                            <a href="#" className="text-white/60 hover:text-white transition-colors">Features</a>
                            <a href="#" className="text-white/60 hover:text-white transition-colors">About</a>
                            <a href="#" className="text-white/60 hover:text-white transition-colors">Contact</a>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
                        <p className="text-white/60 text-sm">© 2026 ScanLedger. All rights reserved.</p>

                        <div className="flex gap-4">
                            <a href="#" aria-label="Twitter" className="text-white/60 hover:text-white transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                </svg>
                            </a>
                            <a href="#" aria-label="LinkedIn" className="text-white/60 hover:text-white transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                                </svg>
                            </a>
                            <a href="#" aria-label="GitHub" className="text-white/60 hover:text-white transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Waitlist Modal */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={closeModal}
            />

            <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-md bg-card border border-border rounded-2xl shadow-medium z-[101] transition-all duration-300 ${isModalOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}>
                <div className="p-6 bg-navy text-white rounded-t-2xl border-b border-white/10 relative">
                    <button
                        className="absolute top-6 right-6 w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                        onClick={closeModal}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    </button>
                    <h3 className="text-2xl font-display font-bold">Join the Waitlist</h3>
                    <p className="text-white/60 mt-1">Be the first to experience ScanLedger</p>
                </div>

                {showForm ? (
                    <form className="p-6 space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">Work Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="john@company.com"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="company" className="block text-sm font-medium mb-2">Company Name</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                placeholder="Acme Inc. (optional)"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 bg-gradient-accent text-white font-semibold rounded-xl shadow-glow hover:shadow-glow-hover hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                        </button>

                        <p className="text-sm text-muted-foreground text-center">
                            We&apos;ll only contact you about ScanLedger.
                        </p>
                    </form>
                ) : (
                    <div className="p-12 text-center">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-teal mb-4">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <h4 className="text-xl font-display font-bold mb-2">You&apos;re on the list!</h4>
                        <p className="text-muted-foreground">We&apos;ll be in touch soon.</p>
                    </div>
                )}
            </div>
        </>
    );
}
