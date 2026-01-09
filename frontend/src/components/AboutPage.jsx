import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CountUp,
  ScrollReveal,
  ProductCard,
  TeamMemberCard,
  TechCard,
  ValueCard,
  TestimonialCarousel,
  TimelineMilestone
} from "./AboutComponents";
import { GlobalVisionSection } from "./MedAuraGlobe";
import "../homepage-animations.css";
import "../mission-card.css";
import "../premium-stats.css";
import "../premium-products.css";

export default function AboutPage() {
  const navigate = useNavigate();

  // Statistics data - Now outcome-focused
  const stats = [
    { value: 70, suffix: '%', label: 'Faster Documentation', detail: 'vs. manual charting' },
    { value: 40, suffix: '%', label: 'Fewer Missed Red Flags', detail: 'in pilot simulations' },
    { value: 60, suffix: 's', label: 'Avg. Response Time', detail: 'for risk assessment' }
  ];

  // Team members with skills and social links
  const teamMembers = [
    {
      name: "Raheel Ahmed",
      role: "UI/UX Designer",
      icon: "✨",
      skills: ["Visual Design", "User Flows", "Accessibility", "Brand Identity"],
      github: "https://github.com/codeExplorer34/MedAuraAI---Health-Tech-",
      linkedin: "https://www.linkedin.com/in/raheel-ahmed-36542030b/"
    },
    {
      name: "Rohan Rao",
      role: "UI/UX Designer & API",
      icon: "🎨",
      skills: ["User Research", "Prototyping", "API Integration", "Design Systems"],
      github: "https://github.com/RohanRaoCs",
      linkedin: "https://www.linkedin.com/in/rohanrao2/"
    },
    {
      name: "Murtaza Mohammed",
      role: "Frontend Developer",
      icon: "💻",
      skills: ["React Components", "Responsive Design", "Animation", "Testing"],
      github: "https://github.com/murtazaMohd",
      linkedin: "https://www.linkedin.com/in/murtaza-mohammed-b29771313/"
    },
    {
      name: "Suhayb Muzammil Shaik",
      role: "Lead Backend Developer",
      icon: "⚙️",
      skills: ["Python & FastAPI", "Database Design", "API Architecture", "System Scalability"],
      github: "https://github.com/codeExplorer34",
      linkedin: "https://www.linkedin.com/in/suhayb-muzammil-shaik-13985231a/"
    },
    {
      name: "Mohammed Yaser Hameed",
      role: "Lead Frontend Developer",
      icon: "👨‍💻",
      skills: ["React & Modern JS", "UI/UX Design", "Performance Optimization", "State Management"],
      github: "https://github.com/Yaser36",
      linkedin: "https://www.linkedin.com/in/mohammed-yaser-hameed-05094738a/"
    }
  ];

  // Tech stack
  const techStack = [
    { name: 'React', icon: '⚛️', color: 'from-cyan-500 to-blue-500', description: 'Modern UI framework' },
    { name: 'Node.js', icon: '🟢', color: 'from-green-500 to-emerald-500', description: 'Backend runtime' },
    { name: 'Python', icon: '🐍', color: 'from-blue-500 to-yellow-500', description: 'AI & ML processing' },
    { name: 'FastAPI', icon: '⚡', color: 'from-teal-500 to-cyan-500', description: 'High-performance API' },
    { name: 'Tailwind', icon: '🎨', color: 'from-sky-500 to-indigo-500', description: 'Utility-first CSS' },
    { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-600 to-indigo-600', description: 'Reliable database' }
  ];

  // Core values
  const values = [
    {
      icon: '🎯',
      title: 'Clinician-First',
      description: 'Built by clinicians, for clinicians. Every feature designed with real-world workflow in mind.',
      color: 'from-sky-500 to-cyan-500'
    },
    {
      icon: '🔒',
      title: 'Safety First',
      description: 'AI assists, never replaces. Human oversight is mandatory for every decision.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: '🌟',
      title: 'Transparency',
      description: 'Explainable AI reasoning. You always know why the AI suggests what it does.',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: '⚡',
      title: 'Speed',
      description: 'Seconds matter in healthcare. Our AI delivers insights in real-time.',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  // Security features
  const securityFeatures = [
    { title: 'Enterprise Encryption', description: 'AES-256 encryption for all data' },
    { title: 'HIPAA Compliant', description: 'Full compliance with healthcare regulations' },
    { title: 'Transparent AI', description: 'Explainable AI reasoning for every decision' },
    { title: 'Access Control', description: 'Role-based permissions and audit logs' },
    { title: 'Data Sovereignty', description: 'Your data stays in your region' },
    { title: 'Real-time Monitoring', description: '24/7 security monitoring and alerts' }
  ];

  // Timeline milestones
  const milestones = [
    { year: 'Jan 2025', title: 'Inception', description: 'MedAura AI concept born from real clinical needs', icon: '💡' },
    { year: 'Oct 2025', title: 'Development Begins', description: 'Started building core AI agents and clinical workflows', icon: '🔨' },
    { year: 'Dec 2025', title: 'Platform Ready', description: 'Completed Emergency Care and Team Coordination tools', icon: '✨' },
    { year: '2026', title: 'Launch & Growth', description: 'Preparing for clinical validation and deployment', icon: '🚀' }
  ];

  // Vision statement
  const visionPoints = [
    {
      icon: '🎯',
      title: 'Our Vision',
      description: 'To empower every clinician with AI-driven insights that enhance decision-making without replacing human judgment.'
    },
    {
      icon: '🌍',
      title: 'Our Goal',
      description: 'To reduce clinical overload and improve patient outcomes through intelligent, transparent, and safe AI assistance.'
    },
    {
      icon: '🚀',
      title: 'Next Steps',
      description: 'We\'re preparing for clinical validation and pilot programs with healthcare institutions in 2026.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 page-animate-in">
      {/* Hero Section - With Video Background */}
      <section className="relative pt-32 pb-12 px-4 text-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute w-full h-full object-cover"
            style={{ opacity: 0.5 }}
          >
            <source src="/videos/Ambulance.mp4" type="video/mp4" />
          </video>
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/60 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="text-white">AI Co-Pilot for ER Triage & Risk.</span>
            <br />
            <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
              Built to Save Time, Not to Replace Clinicians.
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-6">
            Purpose-built to reduce documentation time, surface critical red flags, and structure multidisciplinary handovers—all while keeping clinicians in full control.
          </p>

          {/* Clinician Value Bullets */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="flex items-center gap-2 text-slate-300">
              <span className="text-green-400">✓</span> Less time on notes
            </span>
            <span className="flex items-center gap-2 text-slate-300">
              <span className="text-green-400">✓</span> Fewer missed red flags
            </span>
            <span className="flex items-center gap-2 text-slate-300">
              <span className="text-green-400">✓</span> Better structured handovers
            </span>
          </div>
        </div>
      </section>


      {/* Statistics Section - Outcome Focused */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className={`stat-card-premium stat-card-${i}`}>
                  <div className="stat-content">
                    <div className="stat-number">
                      <CountUp end={stat.value} duration={2} />{stat.suffix}
                    </div>
                    <div className="stat-label">{stat.label}</div>
                    <div className="text-xs text-slate-500 mt-1">{stat.detail}</div>
                  </div>
                  <div className="stat-glow"></div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="text-center text-xs text-slate-500 mt-4 italic">
            Based on internal simulations and early pilot data; results may vary.
          </p>
        </div>
      </section>

      {/* Global Vision Section - 3D Globe */}
      <GlobalVisionSection />

      {/* How It Works - Premium Image-Based Steps */}
      <section className="py-16 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">How It Works</h2>
          <p className="text-slate-400 text-sm text-center mb-12">From patient intake to clinical action in under 60 seconds</p>

          {/* Image-Based Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1: Input */}
            <ScrollReveal delay={0}>
              <div className="group relative">
                <div className="relative overflow-hidden rounded-2xl mb-4 h-48">
                  <img
                    src="/images/how-input.png"
                    alt="Input patient data"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-bold text-lg">Input Data</h4>
                    <p className="text-slate-300 text-sm">Enter vitals, symptoms & patient history</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Step 2: AI Analysis */}
            <ScrollReveal delay={100}>
              <div className="group relative">
                <div className="relative overflow-hidden rounded-2xl mb-4 h-48">
                  <img
                    src="/images/how-analysis.png"
                    alt="AI analysis processing"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-bold text-lg">AI Analysis</h4>
                    <p className="text-slate-300 text-sm">5 specialists review in parallel</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Step 3: Results */}
            <ScrollReveal delay={200}>
              <div className="group relative">
                <div className="relative overflow-hidden rounded-2xl mb-4 h-48">
                  <img
                    src="/images/how-results.png"
                    alt="Doctor reviewing results"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-bold text-lg">Review & Act</h4>
                    <p className="text-slate-300 text-sm">Clinician reviews recommendations</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Bottom indicator */}
          <div className="text-center mt-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Average time: 45-60 seconds
            </span>
          </div>
        </div>
      </section>

      {/* What We Do - Minimal Cards */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal delay={0}>
              <a href="/er-copilot" className="block">
                <ProductCard
                  title="Emergency Care"
                  description="Provides rapid risk assessment and red-flag detection for emergency scenarios, helping doctors make faster, safer triage decisions."
                  color="text-red-400"
                  icon="🚑"
                  gradient="from-red-500 to-orange-500"
                  link="/er-copilot"
                />
              </a>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <a href="/mdt-review" className="block">
                <ProductCard
                  title="Multi-Specialist Review"
                  description="Orchestrates five specialist AI agents to analyze complex cases, offering a comprehensive perspective for difficult follow-up scenarios."
                  color="text-sky-400"
                  icon="👥"
                  gradient="from-sky-500 to-indigo-500"
                  link="/mdt-review"
                />
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values - Simplified */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <ValueCard key={i} value={value} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Security & Privacy - Clean Design */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Security & Privacy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {securityFeatures.map((feature, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 hover:border-sky-500/30 transition-all">
                  <h4 className="font-semibold text-white mb-2 text-sm">{feature.title}</h4>
                  <p className="text-xs text-slate-400">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Horizontal & Interactive */}
      <section className="py-6 px-4 bg-slate-900/30 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Our Journey</h2>

          {/* Horizontal Timeline Container */}
          <div className="relative pt-5">
            {/* Timeline horizontal line */}
            <div className="absolute top-[42px] left-0 right-0 h-0.5 bg-gradient-to-r from-sky-500/20 via-sky-500/50 to-sky-500/20" />

            {/* Milestones Grid - Always 4 columns */}
            <div className="grid grid-cols-4 gap-2 md:gap-3 relative">
              {milestones.map((milestone, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="group relative">
                    {/* Date on top */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-bold text-sky-400 group-hover:text-sky-300 transition-colors whitespace-nowrap">
                      {milestone.year}
                    </div>

                    {/* Dot on timeline */}
                    <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-sky-500 ring-2 md:ring-4 ring-slate-900 group-hover:ring-sky-400/30 group-hover:scale-125 transition-all duration-300 z-10" />

                    {/* Card below timeline */}
                    <div className="pt-[56px] cursor-pointer">
                      <div className="p-2 md:p-3 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-sky-500/50 group-hover:-translate-y-1 transition-all duration-300 shadow-lg group-hover:shadow-sky-500/20">
                        <div className="text-lg md:text-xl mb-1 group-hover:scale-110 transition-transform duration-300">{milestone.icon}</div>
                        <h3 className="text-[10px] md:text-xs font-bold text-white mb-0.5 leading-tight">{milestone.title}</h3>
                        <p className="text-[9px] md:text-[10px] text-slate-400 leading-snug line-clamp-2">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Team - Simplified */}
      <section className="py-12 px-4 relative">
        {/* Blurred radial gradient background */}
        <div className="absolute inset-0 bg-gradient-radial from-cyan-900/20 via-transparent to-transparent blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Our Team</h2>
          <p className="text-slate-400 text-center mb-8 text-sm max-w-2xl mx-auto">
            A passionate team of developers and designers dedicated to transforming healthcare with AI
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
              <TeamMemberCard key={idx} member={member} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack - Elevated Security Message */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">Powered By</h2>
          <p className="text-slate-400 text-center mb-2 text-sm">Modern, auditable stack with clear separation between PHI storage and AI inference</p>
          <p className="text-xs text-slate-500 text-center mb-8">HIPAA-compliant infrastructure • SOC 2 Type II • 256-bit encryption</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, i) => (
              <TechCard key={i} tech={tech} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Proof Points */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">What's Next</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal delay={0}>
              <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 hover:border-sky-500/30 transition-all text-center">
                <div className="text-3xl mb-3">🏥</div>
                <h3 className="text-base font-bold text-white mb-2">Pilot Program</h3>
                <p className="text-sm text-slate-400">Preparing clinical validation with 3 mid-size EDs in Q1 2026</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 hover:border-sky-500/30 transition-all text-center">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="text-base font-bold text-white mb-2">Validation Studies</h3>
                <p className="text-sm text-slate-400">IRB-approved studies to measure time savings and diagnostic accuracy</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 hover:border-sky-500/30 transition-all text-center">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="text-base font-bold text-white mb-2">Go-To-Market</h3>
                <p className="text-sm text-slate-400">Targeting community and academic EDs with 20-100 daily patient volume</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Call to Action - Clean */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 p-10 text-center">
            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ready to Transform Your Clinical Workflow?
              </h2>
              <p className="text-base text-sky-50 mb-6 max-w-xl mx-auto">
                Join healthcare professionals who are already using MedAura AI to make faster, safer decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/er-copilot')}
                  className="px-6 py-3 rounded-lg bg-white text-sky-600 font-semibold hover:bg-sky-50 transition-colors text-sm"
                >
                  Try Emergency Care →
                </button>
                <button
                  onClick={() => navigate('/mdt-review')}
                  className="px-6 py-3 rounded-lg bg-transparent border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors text-sm"
                >
                  Try Team Coordination →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
