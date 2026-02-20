/**
 * Renders Schema.org JSON-LD structured data as a script tag.
 * Data is application-controlled (not user input) — safe for dangerouslySetInnerHTML.
 */
interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
