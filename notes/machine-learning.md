---
title: Machine Learning Field Notes
description: Practical reminders for features, evaluation, and generalization.
tags: machine learning, evaluation, features
updated: 2026-07-01
---

# Machine Learning Field Notes

Machine learning is mostly careful problem framing, data quality, evaluation,
and iteration. The model is only one part of the system.

## Workflow

1. Define the target.
2. Choose a baseline.
3. Split data carefully.
4. Track metrics and failure cases.

## Bias-Variance

The expected error can be thought of as:

$$
\text{error} = \text{bias}^2 + \text{variance} + \text{noise}
$$

```js
const accuracy = correct / total;
const errorRate = 1 - accuracy;
```

| Metric | Good For |
| --- | --- |
| Accuracy | Balanced classes |
| Precision | Costly false positives |
| Recall | Costly false negatives |
