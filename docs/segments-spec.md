# Segment Rules Specification

## Overview
This document outlines the specifications for defining segments using a text-based rule editor in the Woo Segmentation App. Segments are used to categorize products based on specific criteria defined by the user.

## Segment Definition
A segment is defined by a set of rules that determine which products belong to that segment. Each rule consists of a field, an operator, and a value.

### Rule Structure
- **Field**: The attribute of the product to evaluate (e.g., `price`, `category`, `stock`).
- **Operator**: The condition to apply (e.g., `=`, `!=`, `>`, `<`, `contains`, `startsWith`).
- **Value**: The value to compare against the field.

### Example Rules
1. `price > 100`
2. `category = "Electronics"`
3. `stock < 50`
4. `name contains "Pro"`

## Logical Operators
Rules can be combined using logical operators:
- **AND**: All conditions must be true.
- **OR**: At least one condition must be true.
- **NOT**: Negates the condition.

### Example Combined Rule
`(price > 100 AND stock < 50) OR (category = "Electronics")`

## Validation
The rules defined by the user will be validated to ensure:
- Correct syntax.
- Supported fields and operators.
- Logical consistency.

## Evaluation
Once defined, segments will be evaluated against the product data to determine membership. The evaluation process will occur periodically or can be triggered manually.

## User Interface
The rule editor will provide:
- Input fields for each part of the rule.
- Dropdowns for selecting fields and operators.
- A preview of the constructed rule.
- Error messages for invalid rules.

## Conclusion
This specification serves as a guideline for implementing the segment rules feature in the Woo Segmentation App, ensuring that users can effectively define and manage product segments.