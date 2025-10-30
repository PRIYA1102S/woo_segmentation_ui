import { SegmentEvaluator } from '../src/evaluators/segmentEvaluator';
import { parseRules } from '../src/ruleEngine/parser';

describe('SegmentEvaluator', () => {
    let evaluator: SegmentEvaluator;

    beforeEach(() => {
        evaluator = new SegmentEvaluator();
    });

    it('should evaluate a simple rule correctly', () => {
        const rules = 'price > 100';
        const product = { price: 150 };
        const parsedRules = parseRules(rules);
        const result = evaluator.evaluate(parsedRules, product);
        expect(result).toBe(true);
    });

    it('should evaluate a rule with AND condition correctly', () => {
        const rules = 'price > 100 AND stock > 0';
        const product = { price: 150, stock: 10 };
        const parsedRules = parseRules(rules);
        const result = evaluator.evaluate(parsedRules, product);
        expect(result).toBe(true);
    });

    it('should evaluate a rule with OR condition correctly', () => {
        const rules = 'price < 50 OR stock > 0';
        const product = { price: 30, stock: 0 };
        const parsedRules = parseRules(rules);
        const result = evaluator.evaluate(parsedRules, product);
        expect(result).toBe(true);
    });

    it('should return false for a product that does not meet the rule', () => {
        const rules = 'price > 100';
        const product = { price: 50 };
        const parsedRules = parseRules(rules);
        const result = evaluator.evaluate(parsedRules, product);
        expect(result).toBe(false);
    });
});