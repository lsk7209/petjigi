import { sourceLinkParts } from '@/lib/content-sources';

export function SourceReference({source}:{source:string}) {
 const {before,href,after}=sourceLinkParts(source);
 return <span>{before}{href && <a href={href} target="_blank" rel="noopener noreferrer" className="underline break-all">{href}</a>}{after}</span>;
}
