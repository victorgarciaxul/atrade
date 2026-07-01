import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-[14px] text-grey">
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <span className="text-grey/60">/</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-primary transition-colors duration-200">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-secondary font-[500]">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
