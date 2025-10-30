export function parseRule(rule: string): any {
    // Basic parsing logic for text-based rules
    const parsedRule = rule.split(' ').map(part => part.trim()).filter(part => part.length > 0);
    return parsedRule;
}