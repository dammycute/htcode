import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import WorkStack from '@/components/WorkStack';
import Marquee from '@/components/fx/Marquee';
import SplitText from '@/components/fx/SplitText';
import ScrambleText from '@/components/fx/ScrambleText';
import Magnetic from '@/components/fx/Magnetic';
import { capabilities, experience, getProjects, site } from '@/lib/site';

const profile = [
  ['role', 'Full-stack / backend developer'],
  ['location', site.location],
  ['now', 'CVtoCareer, Kreva & Co.'],
  ['languages', 'TypeScript, JavaScript, Python'],
  ['stack', 'Node, Django, Next.js, PostgreSQL'],
  ['education', 'B.Eng. Industrial and Production Engineering, FUTA (2024)'],
];

export default function Home() {
  const projects = getProjects();

  return (
    <>
      <Header home />
      <main id="main">
        <Hero />
        <Marquee />

        <section id="experience" className="mx-auto max-w-6xl px-5 py-28 sm:px-8">
          <SplitText as="h2" className="display mb-14 text-6xl sm:text-8xl" parts={[{ text: 'Where I’ve' }, { text: 'worked', accent: true }]} />
          <ol>
            {experience.map((job, i) => (
              <Reveal key={job.company + job.dates} as="li" delay={(i % 2) * 0.05}>
                <div className="group grid gap-x-8 gap-y-3 border-t border-line py-9 last:border-b md:grid-cols-12">
                  <div className="tabular text-sm text-ink-3 md:col-span-3">
                    <p className="transition-colors group-hover:text-accent">{job.dates}</p>
                    <p className="mt-1">{job.place}</p>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
                      {job.role} <span className="text-ink-3">·</span> <span className="text-accent">{job.company}</span>
                    </h3>
                    <ul className="mt-5 space-y-3 text-ink-2">
                      {job.points.map((pt) => (
                        <li key={pt} className="flex gap-3 leading-relaxed">
                          <span className="tabular mt-0.5 text-accent" aria-hidden="true">→</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        <section id="work" className="mx-auto max-w-6xl px-5 py-28 sm:px-8">
          <div className="mb-14 flex items-end justify-between gap-6">
            <SplitText as="h2" className="display text-6xl sm:text-8xl" parts={[{ text: 'Selected' }, { text: 'work', accent: true }]} />
            <ScrambleText text="2023 → now" className="tabular hidden pb-3 text-sm text-ink-3 sm:block" />
          </div>
          <WorkStack projects={projects} />
        </section>

        <section id="capabilities" className="border-y border-line bg-paper-2">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-28 sm:px-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <SplitText as="h2" className="display text-5xl sm:text-6xl md:sticky md:top-28" parts={[{ text: 'What I' }, { text: 'work with', accent: true }]} />
            </div>
            <dl className="md:col-span-8">
              {capabilities.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.06}>
                  <div className="group relative overflow-hidden border-t border-line last:border-b">
                    <span aria-hidden="true" className="absolute inset-0 translate-y-full bg-accent transition-transform duration-500 ease-out group-hover:translate-y-0" />
                    <div className="relative grid gap-x-8 gap-y-3 px-1 py-7 transition-[padding] duration-500 group-hover:px-5 sm:grid-cols-5">
                      <dt className="text-xl font-medium transition-colors duration-300 group-hover:text-accent-ink sm:col-span-2">{c.title}</dt>
                      <dd className="sm:col-span-3">
                        <p className="leading-relaxed text-ink-2 transition-colors duration-300 group-hover:text-accent-ink">{c.body}</p>
                        <p className="tabular mt-3 text-sm text-ink transition-colors duration-300 group-hover:text-accent-ink">
                          {c.items.map((t, n) => (
                            <span key={t}>
                              {n > 0 && ' · '}
                              <span className="glitch" data-text={t}>{t}</span>
                            </span>
                          ))}
                        </p>
                      </dd>
                    </div>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-5 py-32 sm:px-8">
          <SplitText
            as="h2"
            className="display max-w-5xl text-[clamp(3rem,9vw,8rem)]"
            parts={[{ text: 'Engineering for' }, { text: 'impact.', accent: true }]}
          />
          <div className="mt-20 grid gap-12 md:grid-cols-12">
            <Reveal className="space-y-8 text-lg leading-relaxed md:col-span-6">
              <p className="text-ink-2">
                I’m a full-stack and backend developer with 3+ years of experience building web applications, APIs and data-driven systems. At CVtoCareer I work across four codebases (two Express/TypeScript backends and two Next.js frontends) on shared PostgreSQL and Redis.
              </p>
              <div>
                <h3 className="font-medium">Careful with data</h3>
                <p className="mt-2 text-ink-2">PII encryption, hash-based lookups and audit trails, and payment integrations with PayPal and Paystack.</p>
              </div>
              <div>
                <h3 className="font-medium">Background work and AI</h3>
                <p className="mt-2 text-ink-2">BullMQ and Celery job processing, plus LLM-based classification in production. I also use AI assistants to speed up development and debugging.</p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-5 md:col-start-8">
              <div className="overflow-hidden rounded-md border border-line bg-paper-2">
                <div className="tabular flex items-center gap-2 border-b border-line px-4 py-2.5 text-xs text-ink-3">
                  <span className="size-2 rounded-full bg-accent" aria-hidden="true" /> profile.json
                </div>
                <dl className="tabular p-4 text-sm">
                  {profile.map(([k, v], i) => (
                    <div key={k} className="grid grid-cols-3 gap-4 py-2">
                      <dt className="text-ink-3">{k}</dt>
                      <dd className="col-span-2">
                        <ScrambleText text={v} delay={i * 90} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-32 sm:px-8">
            <Reveal>
              <p className="tabular text-sm text-ink-3">got a project in mind?</p>
              <a
                href={`mailto:${site.email}`}
                aria-label={`Email ${site.email}`}
                className="group display mt-5 block break-all text-[clamp(1.5rem,5.8vw,5rem)]"
              >
                {[...site.email].map((ch, i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className="inline-block transition-[transform,color] duration-300 group-hover:-translate-y-2 group-hover:text-accent"
                    style={{ transitionDelay: `${i * 18}ms` }}
                  >
                    {ch}
                  </span>
                ))}
              </a>
            </Reveal>
            <Reveal delay={0.1} className="mt-12 max-w-xl text-ink-2">
              <p className="leading-relaxed">
                A backend, a web app or a tricky integration: tell me what you’re building and I’ll reply with how I’d approach it.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-ink">
                <Magnetic>
                  <a href={site.resume} download className="inline-flex items-center gap-1 rounded-sm bg-accent px-5 py-3 font-medium text-accent-ink">
                    Download résumé <ArrowUpRight size={14} />
                  </a>
                </Magnetic>
                {site.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="link-line inline-flex items-center gap-1">
                    {s.label} <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
