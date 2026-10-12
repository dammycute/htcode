import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import AboutPhoto from '@/components/AboutPhoto';
import Reveal from '@/components/Reveal';
import WorkStack from '@/components/WorkStack';
import Marquee from '@/components/fx/Marquee';
import SplitText from '@/components/fx/SplitText';
import ScrambleText from '@/components/fx/ScrambleText';
import Magnetic from '@/components/fx/Magnetic';
import { capabilities, experience, getProjects, site } from '@/lib/site';

const profile = [
  ['role', 'Backend / full-stack developer'],
  ['based in', site.location],
  ['looking for', 'Remote roles, worldwide'],
  ['now at', 'CVtoCareer, Kreva & Co.'],
  ['stack', 'TypeScript, Node, Django, Next.js, PostgreSQL'],
  ['education', 'B.Eng. Industrial and Production Engineering, FUTA (2024)'],
];

const howIWork = [
  ['I own features end to end.', 'At CVtoCareer I delivered the Missing Info feature from the staff backend and expiry cron job to the audit trail and the customer review flow.'],
  ['I treat data carefully.', 'Email and phone lookups go through hash-based helpers, PII fields are encrypted, every lifecycle action is logged, and I’ve integrated PayPal and Paystack payments.'],
  ['I care about the result.', 'I’ve reached a 95+ PageSpeed score, cut page load times by 28% and reduced login response times by 60%.'],
  ['I use AI where it helps.', 'AI assistants speed up my development and debugging, and I’ve built LLM job classification into a production pipeline.'],
];

export default function Home() {
  const projects = getProjects();

  return (
    <>
      <Header home />
      <main id="main">
        <Hero />
        <Marquee />

        <section id="work" className="mx-auto max-w-6xl px-5 py-28 sm:px-8">
          <div className="mb-14 flex items-end justify-between gap-6">
            <SplitText as="h2" className="display text-6xl sm:text-8xl" parts={[{ text: 'Selected' }, { text: 'work', accent: true }]} />
            <ScrambleText text="2023 → now" className="tabular hidden pb-3 text-sm text-ink-3 sm:block" />
          </div>
          <WorkStack projects={projects} />
        </section>

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
            parts={[{ text: 'Hi, I’m' }, { text: 'Damilola.', accent: true }]}
          />
          <div className="mt-16 grid gap-14 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <AboutPhoto className="mx-auto max-w-xs md:max-w-none" />
            </Reveal>

            <div className="space-y-12 md:col-span-8">
              <Reveal className="space-y-5 text-lg leading-relaxed text-ink-2 sm:text-xl">
                <p>
                  I studied Industrial and Production Engineering at the Federal University of Technology, Akure, but I’ve been building software since 2022, when I joined Zuri Team as a full-stack intern.
                </p>
                <p>
                  Since then I’ve built dashboards, a B2B marketplace, the backend of a multi-chain crypto wallet and features for a career platform used by real clients. I’m now looking for a backend or full-stack role with a remote team.
                </p>
              </Reveal>

              <Reveal>
                <h3 className="tabular text-sm text-ink-3">how I work</h3>
                <ol className="mt-4 divide-y divide-line border-y border-line">
                  {howIWork.map(([title, body], i) => (
                    <li key={title} className="grid gap-x-6 gap-y-1 py-5 sm:grid-cols-[3rem_1fr]">
                      <span className="tabular pt-0.5 text-sm text-accent">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <p className="font-medium">{title}</p>
                        <p className="mt-1 leading-relaxed text-ink-2">{body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="md:col-span-8 md:col-start-5">
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
              <p className="tabular text-sm text-ink-3">hiring for a backend or full-stack role?</p>
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
                I’m open to remote backend and full-stack roles with teams anywhere in the world. Send me the role and a little about the team, and I’ll reply quickly.
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
