---
title: Linear Algebra Refresher
description: Vectors, matrices, projections, and eigenspaces for ML study.
tags: linear algebra, vectors, matrices
updated: 2026-07-02
---

# Linear Algebra Refresher

Linear algebra gives machine learning its working language: vectors represent
data, matrices represent transformations, and decompositions reveal structure.

## Useful Ideas

- Vectors can be treated as points or directions.
- Matrices transform space.
- Dot products measure alignment.
- Eigenvectors keep their direction under a transformation.

## Projection

The projection of vector $a$ onto vector $b$ is:

$$
\operatorname{proj}_b a = \frac{a \cdot b}{b \cdot b}b
$$

```py
def dot(a, b):
    return sum(x * y for x, y in zip(a, b))
```

| Topic | Why It Matters |
| --- | --- |
| Matrix multiplication | Composing transformations |
| Eigenvalues | Understanding stable directions |
| SVD | Compression and latent structure |
