import express from 'express';
import { SegmentEvaluator } from './evaluators/segmentEvaluator';
import { parseRules } from './ruleEngine/parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/evaluate', (req, res) => {
    const { rules, products } = req.body;
    const parsedRules = parseRules(rules);
    const evaluator = new SegmentEvaluator(parsedRules);
    const result = evaluator.evaluate(products);
    res.json(result);
});

app.listen(port, () => {
    console.log(`Segmentation service running on port ${port}`);
});