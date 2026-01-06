import WeeklyLogSection from '@/components/WeeklyLogSection';
import WorkExperienceSection from '@/components/WorkExperienceSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-background-light/90 dark:bg-background-dark/90 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-8 h-8 flex items-center justify-center bg-primary rounded text-white font-mono font-bold text-lg">
              &gt;_
            </div>
            <span className="text-xl font-bold tracking-tight font-mono">
              &lt;Ht-<span className="text-primary">code</span>/&gt;
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 bg-white/5 dark:bg-slate-800/50 px-6 py-2 rounded border border-gray-200 dark:border-white/5">
            <a className="text-sm font-medium hover:text-primary transition-colors font-mono" href="/updates">Build Log</a>
            <a className="text-sm font-medium hover:text-primary transition-colors font-mono" href="#expertise">Tech Stack</a>
            <a className="text-sm font-medium hover:text-primary transition-colors font-mono" href="#projects">Work</a>
            <a className="text-sm font-medium hover:text-primary transition-colors font-mono" href="#contact">Contact</a>
          </div>
          <a href="/Damilola-Olawoore-Resume.pdf" download className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded text-sm font-bold transition-all transform hover:scale-105 shadow-lg shadow-violet-900/20 font-mono">
            <span>Resume.pdf</span>
            <span className="material-symbols-outlined text-sm">download</span>
          </a>
          <button className="md:hidden text-2xl flex items-center justify-center">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)",
            backgroundSize: "4rem 4rem"
          }}></div>
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-slow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium w-fit mx-auto lg:mx-0 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              6-Month Challenge: Active
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight animate-fade-in-up delay-100">
              Building <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500 font-mono text-4xl lg:text-6xl">&lt;FullStack&gt;</span> <br />
              Log.
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up delay-200 font-mono text-sm lg:text-base">
              // 6 Months. Weekly Shipments. Documenting the continuous journey of constructing scalable backends and interactive frontends, powered by AI collaboration.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-4 animate-fade-in-up delay-300">
              <a className="group flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded font-bold transition-all hover:bg-primary-dark hover:scale-105 shadow-lg shadow-violet-500/20 font-mono" href="/updates">
                View Log
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">calendar_month</span>
              </a>
              <a className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-gray-200 dark:border-slate-700 px-8 py-4 rounded font-bold transition-all hover:border-primary/50 hover:text-primary font-mono" href="#projects">
                Projects
              </a>
            </div>
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 text-slate-500 animate-fade-in-up delay-500 font-mono text-xs">
              <span className="uppercase tracking-widest">Stack</span>
              <div className="flex gap-4 opacity-70 flex-wrap justify-center lg:justify-start">
                <span className="hover:text-primary transition-colors cursor-default">Django</span>
                <span className="hover:text-primary transition-colors cursor-default">PostgreSQL</span>
                <span className="hover:text-primary transition-colors cursor-default">Redis</span>
                <span className="hover:text-primary transition-colors cursor-default">React</span>
                <span className="hover:text-primary transition-colors cursor-default">AI Assistants</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative animate-fade-in-up delay-300">
            <div className="relative w-full rounded-lg overflow-hidden shadow-2xl border border-slate-700 bg-[#0f172a] group font-mono text-sm leading-relaxed">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs text-slate-400">roadmap.json</span>
              </div>
              <div className="p-6 text-slate-300">
                <div className="flex">
                  <span className="text-slate-600 select-none w-8 text-right mr-4">1</span>
                  <span className="text-purple-400">{"{"}</span>
                </div>
                <div className="flex">
                  <span className="text-slate-600 select-none w-8 text-right mr-4">2</span>
                  <span className="ml-4"><span className="text-blue-400">"scope"</span>: <span className="text-green-400">"6 Months"</span>,</span>
                </div>
                <div className="flex">
                  <span className="text-slate-600 select-none w-8 text-right mr-4">3</span>
                  <span className="ml-4"><span className="text-blue-400">"status"</span>: <span className="text-yellow-400">"Active"</span>,</span>
                </div>
                <div className="flex">
                  <span className="text-slate-600 select-none w-8 text-right mr-4">4</span>
                  <span className="ml-4"><span className="text-blue-400">"current_sprint"</span>: [</span>
                </div>
                <div className="flex">
                  <span className="text-slate-600 select-none w-8 text-right mr-4">5</span>
                  <span className="ml-8"><span className="text-purple-400">{"{"}</span> <span className="text-blue-400">"id"</span>: 1, <span className="text-blue-400">"focus"</span>: <span className="text-green-400">"Blog API & Portfolio"</span> <span className="text-purple-400">{"}"}</span>,</span>
                </div>
                <div className="flex">
                  <span className="text-slate-600 select-none w-8 text-right mr-4">6</span>
                  <span className="ml-8"><span className="text-purple-400">{"{"}</span> <span className="text-blue-400">"id"</span>: 2, <span className="text-blue-400">"focus"</span>: <span className="text-green-400">"Shortener & Typing FX"</span> <span className="text-purple-400">{"}"}</span>,</span>
                </div>
                <div className="flex">
                  <span className="text-slate-600 select-none w-8 text-right mr-4">7</span>
                  <span className="ml-8"><span className="text-purple-400">{"{"}</span> <span className="text-blue-400">"id"</span>: 3, <span className="text-blue-400">"focus"</span>: <span className="text-green-400">"Weather Cache & Widget"</span> <span className="text-purple-400">{"}"}</span>,</span>
                </div>
                <div className="flex">
                  <span className="text-slate-600 select-none w-8 text-right mr-4">8</span>
                  <span className="ml-8"><span className="text-purple-400">{"{"}</span> <span className="text-blue-400">"id"</span>: 4, <span className="text-blue-400">"focus"</span>: <span className="text-green-400">"Recipe API & Particles"</span> <span className="text-purple-400">{"}"}</span></span>
                </div>
                <div className="flex">
                  <span className="text-slate-600 select-none w-8 text-right mr-4">9</span>
                  <span className="ml-4">]</span>
                </div>
                <div className="flex">
                  <span className="text-slate-600 select-none w-8 text-right mr-4">10</span>
                  <span className="text-purple-400">{"}"}</span><span className="cursor-blink border-l-2 border-primary ml-1 h-4 inline-block align-middle"></span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-surface-dark p-4 rounded border border-slate-700 shadow-xl flex items-center gap-4 animate-float z-20">
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 uppercase font-mono">Current Phase</span>
                <span className="font-bold text-primary font-mono text-sm">Month 1 / 6</span>
              </div>
              <div className="h-8 w-[1px] bg-slate-700"></div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 uppercase font-mono">Next Launch</span>
                <span className="font-bold text-green-400 font-mono text-sm">T-Minus 3 Days</span>
              </div>
            </div>
          </div>
        </div>

        <a className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-primary transition-colors animate-bounce cursor-pointer font-mono" href="/updates">
          <span className="text-xs uppercase tracking-widest">See Schedule</span>
          <span className="material-symbols-outlined">keyboard_double_arrow_down</span>
        </a>
      </header>

      {/* Weekly Log Section - Now Dynamic */}
      <WeeklyLogSection />

      {/* Expertise Section */}
      <section className="py-24 relative overflow-hidden bg-surface-dark border-t border-slate-700" id="expertise">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">Core Tech Stack</h2>
              <p className="text-slate-400 max-w-2xl font-mono text-sm">
                &gt; Specialized toolkit for high-performance backend systems.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded bg-slate-800/50 border border-slate-700 hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 bg-blue-500/10 rounded flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">code</span>
              </div>
              <h3 className="text-xl font-bold mb-3 font-mono text-white">Languages</h3>
              <p className="text-sm text-slate-400 mb-4">Primary focus on Python for speed and AI integration, with Node.js for async services.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-mono px-2 py-1 bg-slate-700 rounded text-slate-300">Python</span>
                <span className="text-xs font-mono px-2 py-1 bg-slate-700 rounded text-slate-300">Node.js</span>
                <span className="text-xs font-mono px-2 py-1 bg-slate-700 rounded text-slate-300">SQL</span>
              </div>
            </div>
            <div className="p-6 rounded bg-slate-800/50 border border-slate-700 hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 bg-purple-500/10 rounded flex items-center justify-center text-purple-500 mb-6 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">database</span>
              </div>
              <h3 className="text-xl font-bold mb-3 font-mono text-white">Data Store</h3>
              <p className="text-sm text-slate-400 mb-4">Architecting persistent and in-memory data layers for scalability.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-mono px-2 py-1 bg-slate-700 rounded text-slate-300">PostgreSQL</span>
                <span className="text-xs font-mono px-2 py-1 bg-slate-700 rounded text-slate-300">Redis</span>
                <span className="text-xs font-mono px-2 py-1 bg-slate-700 rounded text-slate-300">Supabase</span>
              </div>
            </div>
            <div className="p-6 rounded bg-slate-800/50 border border-slate-700 hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 bg-emerald-500/10 rounded flex items-center justify-center text-emerald-500 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">hub</span>
              </div>
              <h3 className="text-xl font-bold mb-3 font-mono text-white">Async & Queue</h3>
              <p className="text-sm text-slate-400 mb-4">Handling background tasks and distributed message processing efficiently.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-mono px-2 py-1 bg-slate-700 rounded text-slate-300">Celery</span>
                <span className="text-xs font-mono px-2 py-1 bg-slate-700 rounded text-slate-300">RabbitMQ</span>
                <span className="text-xs font-mono px-2 py-1 bg-slate-700 rounded text-slate-300">WebSockets</span>
              </div>
            </div>
            <div className="p-6 rounded bg-slate-800/50 border border-slate-700 hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 bg-orange-500/10 rounded flex items-center justify-center text-orange-500 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">smart_toy</span>
              </div>
              <h3 className="text-xl font-bold mb-3 font-mono text-white">AI Workflow & Crypto</h3>
              <p className="text-sm text-slate-400 mb-4">Leveraging AI coding assistants and building on decentralized chains.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-mono px-2 py-1 bg-slate-700 rounded text-slate-300">Web3.py</span>
                <span className="text-xs font-mono px-2 py-1 bg-slate-700 rounded text-slate-300">GitHub Copilot</span>
                <span className="text-xs font-mono px-2 py-1 bg-slate-700 rounded text-slate-300">ChatGPT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <WorkExperienceSection />

      {/* Scrolling Text Banner */}
      <div className="py-12 bg-surface-dark border-y border-slate-700 overflow-hidden">
        <div className="flex whitespace-nowrap animate-scroll-left">
          <span className="text-4xl font-black text-slate-700 dark:text-slate-600/30 px-8 font-mono">BACKEND DEVELOPMENT • DECENTRALIZED SYSTEMS • AI ASSISTED CODING • PYTHON EXPERT • 6-MONTH BUILD LOG •</span>
          <span className="text-4xl font-black text-slate-700 dark:text-slate-600/30 px-8 font-mono">BACKEND DEVELOPMENT • DECENTRALIZED SYSTEMS • AI ASSISTED CODING • PYTHON EXPERT • 6-MONTH BUILD LOG •</span>
        </div>
      </div>

      {/* About Section */}
      <section className="py-24 relative bg-background-light dark:bg-[#0c0f19]" id="about">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">The "Build Fast" Philosophy</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                I believe the best way to master backend engineering is by building. That's why I've committed to launching a new project every week while working on complex decentralized systems.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">bolt</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Rapid Iteration</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Moving from idea to deployment in 7 days forces prioritization and efficient coding practices.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">group</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Collaborative AI</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">I don't just write code; I partner with AI assistants. This collaborative workflow accelerates development, optimizes architecture, and ensures robust testing strategies.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="bg-slate-900 rounded-lg p-6 font-mono text-sm text-slate-300 shadow-2xl border border-slate-700 w-full">
                <div className="flex gap-2 mb-4 border-b border-slate-700 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-auto text-xs text-slate-500">terminal - zsh</span>
                </div>
                <p className="mb-4">
                  <span className="text-green-400">➜</span> <span className="text-blue-400">~</span> cat current_focus.json<br />
                  {"{"}<br />
                  <span className="pl-4">"role": "Backend Engineer",</span><br />
                  <span className="pl-4">"focus": "Weekly Projects & Escrow Platform",</span><br />
                  <span className="pl-4">"stack": {"{"}</span><br />
                  <span className="pl-8">"main": ["Python", "PostgreSQL", "Redis"],</span><br />
                  <span className="pl-8">"cloud": ["Supabase", "AWS"],</span><br />
                  <span className="pl-8">"workflow": ["GitHub Copilot", "ChatGPT"]</span><br />
                  <span className="pl-4">{"}"},</span><br />
                  <span className="pl-4">"interests": ["Crypto", "AI Tools"]</span><br />
                  {"}"}
                </p>
                <p className="mb-2">
                  <span className="text-green-400">➜</span> <span className="text-blue-400">~</span> <span className="animate-pulse">_</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pt-24 pb-12 relative bg-white dark:bg-[#0f172a] border-t border-slate-200 dark:border-slate-800" id="contact">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded bg-primary/10 text-primary mb-8">
            <span className="material-symbols-outlined text-3xl">terminal</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">Got a backend challenge?</h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-xl mx-auto font-mono text-base">
            I'm shipping projects weekly, but always open to discussing decentralized infrastructure, AI-assisted workflows, or backend optimization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <a className="inline-flex items-center justify-center gap-3 bg-primary text-white text-lg font-bold px-8 py-4 rounded hover:bg-primary-dark transition-all shadow-xl shadow-violet-900/20 font-mono" href="mailto:damilolaolawoore@gmail.com">
              Start Collaboration
              <span className="material-symbols-outlined">send</span>
            </a>
            <a className="inline-flex items-center justify-center gap-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-white border border-gray-300 dark:border-slate-600 text-lg font-bold px-8 py-4 rounded hover:border-primary transition-all font-mono" href="/Damilola-Olawoore-Resume.pdf" download>
              Download CV
              <span className="material-symbols-outlined">download</span>
            </a>
          </div>
          <div className="border-t border-gray-200 dark:border-slate-800 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center bg-slate-200 dark:bg-slate-800 rounded text-primary border border-gray-300 dark:border-slate-700 font-mono font-bold">
                &gt;_
              </div>
              <span className="font-bold text-lg font-mono">&lt;Ht-<span className="text-primary">code</span>/&gt;</span>
            </div>
            <div className="flex gap-8 font-mono text-sm">
              <a className="text-slate-500 hover:text-primary transition-colors" href="https://github.com/dammycute" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="text-slate-500 hover:text-primary transition-colors" href="https://x.com/ht__code" target="_blank" rel="noopener noreferrer">Twitter/X</a>
              <a className="text-slate-500 hover:text-primary transition-colors" href="https://www.linkedin.com/in/htcode/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
            <p className="text-slate-500 text-sm font-mono">
              © 2026 Ht-code. MIT License.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
