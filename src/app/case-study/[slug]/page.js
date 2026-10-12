import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/fx/SplitText';
import ProjectArt from '@/components/fx/ProjectArt';
import { getProject, getProjects, hasCaseStudy } from '@/lib/site';

export function generateStaticParams() {
  return getProjects().filter(hasCaseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: `${p.title} notes`, description: p.description };
}

export default async function CaseStudy({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !hasCaseStudy(project)) notFound();

  const { title, description, techStack, caseStudy: cs } = project;
  const list = getProjects().filter(hasCaseStudy);
  const idx = list.findIndex((p) => p.slug === slug);
  const next = list[(idx + 1) % list.length];
  const seed = getProjects().findIndex((p) => p.slug === slug) + 2;

  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8">
        <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-ink-2 transition-colors hover:text-accent">
          <ArrowLeft size={14} /> All work
        </Link>

        <SplitText as="h1" waitForBoot className="display mt-10 max-w-4xl text-[clamp(3rem,8vw,7rem)]" parts={[{ text: title }]} />
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-ink-2">{description}</p>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-12 h-56 overflow-hidden rounded-md border border-line sm:h-[28rem]">
          {project.image ? (
            <Image
              src={project.image}
              alt={`Screenshot of ${title}`}
              fill
              priority
              sizes="(min-width: 1152px) 1100px, 100vw"
              className="object-cover object-top"
            />
          ) : (
            <ProjectArt seed={seed} />
          )}
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-12">
          <aside className="space-y-8 self-start text-sm md:sticky md:top-28 md:col-span-3">
            <dl className="tabular space-y-4 border-t border-line pt-4">
              {[['role', project.role], ['client', project.company], ['timeline', project.dateRange]].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-ink-3">{k}</dt>
                  <dd className="mt-0.5">{v}</dd>
                </div>
              ))}
            </dl>
            <ul className="flex flex-wrap gap-2">
              {techStack.map((t) => (
                <li key={t} className="tag">{t}</li>
              ))}
            </ul>
            <div className="flex flex-col gap-2">
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="link-line inline-flex w-fit items-center gap-1">
                  Live site <ArrowUpRight size={14} />
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-line inline-flex w-fit items-center gap-1">
                  {project.frontend_github ? 'Backend repo' : 'Source'} <ArrowUpRight size={14} />
                </a>
              )}
              {project.frontend_github && (
                <a href={project.frontend_github} target="_blank" rel="noopener noreferrer" className="link-line inline-flex w-fit items-center gap-1">
                  Frontend repo <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </aside>

          <div className="space-y-20 md:col-span-8 md:col-start-5">
            <Reveal>
              <h2 className="display text-4xl">Overview</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-2">{cs.overview}</p>
            </Reveal>

            <Reveal>
              <h2 className="display text-4xl">What’s in it</h2>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {cs.built.map((item, i) => (
                  <li key={item} className="grid grid-cols-[3rem_1fr] py-4 leading-relaxed">
                    <span className="tabular pt-0.5 text-sm text-accent">{String(i + 1).padStart(2, '0')}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="tabular mt-6 text-xs text-ink-3">
                Based on the project’s public repository and live site.
              </p>
            </Reveal>
          </div>
        </div>

        <Link href={`/case-study/${next.slug}`} className="group mt-28 block border-t border-line pt-8">
          <span className="text-sm text-ink-3">Next project</span>
          <span className="display mt-2 flex items-center justify-between text-4xl transition-colors group-hover:text-accent sm:text-6xl">
            {next.title}
            <ArrowRight className="transition-transform group-hover:translate-x-2" size={40} />
          </span>
        </Link>
      </main>
      <Footer />
    </>
  );
}
