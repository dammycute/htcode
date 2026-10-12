import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { site } from '@/lib/site';

// Renders the portrait only when the file exists in /public, so removing it never breaks the page.
export default function AboutPhoto({ className = '' }) {
  const file = path.join(process.cwd(), 'public', site.photo);
  if (!fs.existsSync(file)) return null;

  return (
    <figure className={`group relative ${className}`}>
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl border border-accent/60 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4"
      />
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line bg-paper-2">
        <Image
          src={site.photo}
          alt={`Portrait of ${site.name}`}
          fill
          sizes="(min-width: 768px) 30vw, 80vw"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
        />
      </div>
    </figure>
  );
}
