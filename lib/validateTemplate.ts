import { BLOG_TEMPLATE_SECTIONS, getRequiredSectionIds, type BlogSectionDefinition } from "./blogTemplateSchema";

/**
 * Validation result for template sections
 */
export type ValidationResult = {
  isValid: boolean;
  missingRequired: string[];
  missingOptional: string[];
  extraSections: string[];
  warnings: string[];
};

/**
 * Validate that a blog post contains all required sections from the template schema.
 * 
 * This function checks:
 * - All required sections are present
 * - Warns about missing optional sections (for documentation)
 * - Identifies any extra sections not in the schema
 * 
 * @param presentSectionIds - Array of section IDs that are actually present in the blog post
 * @returns Validation result with details about missing/extra sections
 * 
 * @example
 * ```ts
 * const result = validateTemplateSections(["hero", "breadcrumb", "intro", "whatIs", "ctaConsultations"]);
 * if (!result.isValid) {
 *   console.warn("Missing required sections:", result.missingRequired);
 * }
 * ```
 */
export function validateTemplateSections(presentSectionIds: string[]): ValidationResult {
  const requiredIds = getRequiredSectionIds();
  const allSchemaIds = BLOG_TEMPLATE_SECTIONS.map(s => s.id);
  
  const missingRequired = requiredIds.filter(id => !presentSectionIds.includes(id));
  const missingOptional = BLOG_TEMPLATE_SECTIONS
    .filter(s => !s.required && !presentSectionIds.includes(s.id))
    .map(s => s.id);
  const extraSections = presentSectionIds.filter(id => !allSchemaIds.includes(id));
  
  const warnings: string[] = [];
  
  if (missingRequired.length > 0) {
    warnings.push(
      `Missing required sections: ${missingRequired.map(id => {
        const def = BLOG_TEMPLATE_SECTIONS.find(s => s.id === id);
        return def ? `${id} (${def.label})` : id;
      }).join(", ")}`
    );
  }
  
  if (missingOptional.length > 0) {
    warnings.push(
      `Missing optional sections (recommended): ${missingOptional.map(id => {
        const def = BLOG_TEMPLATE_SECTIONS.find(s => s.id === id);
        return def ? `${id} (${def.label})` : id;
      }).join(", ")}`
    );
  }
  
  if (extraSections.length > 0) {
    warnings.push(
      `Extra sections not in schema: ${extraSections.join(", ")}`
    );
  }
  
  return {
    isValid: missingRequired.length === 0,
    missingRequired,
    missingOptional,
    extraSections,
    warnings,
  };
}

/**
 * Log validation warnings to console (dev mode only).
 * Does not throw errors or break the build.
 */
export function logValidationWarnings(result: ValidationResult): void {
  if (result.warnings.length === 0) {
    return;
  }
  
  console.group("📋 Blog Template Validation");
  
  if (result.missingRequired.length > 0) {
    console.warn("❌ Missing required sections:", result.missingRequired);
  }
  
  if (result.missingOptional.length > 0) {
    console.info("ℹ️  Missing optional sections:", result.missingOptional);
  }
  
  if (result.extraSections.length > 0) {
    console.info("ℹ️  Extra sections (not in schema):", result.extraSections);
  }
  
  console.groupEnd();
}
