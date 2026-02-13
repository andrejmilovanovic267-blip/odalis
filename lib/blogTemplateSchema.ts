/**
 * Blog Template Schema
 * 
 * Defines the standard structure and order of sections for blog posts.
 * This schema serves as the "source of truth" for blog page layout.
 * 
 * Each section has:
 * - id: Stable identifier used for mapping and validation
 * - label: Human-readable name for documentation
 * - required: Whether this section must be present in all blog posts
 */

export type BlogSectionDefinition = {
  id: string;
  label: string;
  required: boolean;
};

/**
 * Standard blog template sections in display order.
 * 
 * This array defines the expected structure of blog posts.
 * Sections are validated against this schema to ensure consistency.
 */
export const BLOG_TEMPLATE_SECTIONS: BlogSectionDefinition[] = [
  {
    id: "hero",
    label: "Hero Section (Image, H1, Badges)",
    required: true,
  },
  {
    id: "breadcrumb",
    label: "Breadcrumb Navigation",
    required: true,
  },
  {
    id: "intro",
    label: "Intro Section (Eyebrow + Introduction Text)",
    required: true,
  },
  {
    id: "whatIs",
    label: "What Is Section (Main Content - What is the treatment/service)",
    required: true,
  },
  {
    id: "inPractice",
    label: "In Practice Section (How it works / Process)",
    required: false,
  },
  {
    id: "forWhom",
    label: "For Whom Section (Target audience)",
    required: false,
  },
  {
    id: "benefits",
    label: "Benefits Section (Key benefits/results)",
    required: false,
  },
  {
    id: "additionalContent",
    label: "Additional Content Sections (Dynamic sections from post.sections)",
    required: false,
  },
  {
    id: "frequency",
    label: "Frequency Section (How often / Schedule)",
    required: false,
  },
  {
    id: "ctaConsultations",
    label: "Consultation CTA Section (Form)",
    required: true,
  },
];

/**
 * Get section definition by ID
 */
export function getSectionDefinition(id: string): BlogSectionDefinition | undefined {
  return BLOG_TEMPLATE_SECTIONS.find(section => section.id === id);
}

/**
 * Get all required section IDs
 */
export function getRequiredSectionIds(): string[] {
  return BLOG_TEMPLATE_SECTIONS
    .filter(section => section.required)
    .map(section => section.id);
}

/**
 * Get all section IDs (required and optional)
 */
export function getAllSectionIds(): string[] {
  return BLOG_TEMPLATE_SECTIONS.map(section => section.id);
}
