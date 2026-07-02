---
title: Neural Network Notes
description: A compact study note on layers, activations, loss, and backpropagation.
tags: neural networks, deep learning, gradients
updated: 2026-07-03
---

# Neural Network Notes

Neural networks approximate functions by composing many small differentiable
operations. Each layer transforms an input vector into a representation that is
useful for the next layer.

![Neural network diagram](/api/notes/assets/neural-network.svg)

## Core Pieces

- **Inputs** are numeric features.
- **Weights** control how strongly signals move between units.
- **Biases** shift activations.
- **Activations** add non-linearity.

## Forward Pass

For a dense layer:

$$
z = Wx + b
$$

Then the activation function produces:

$$
a = \sigma(z)
$$

## Tiny Example

```ts
type Layer = {
  weights: number[][];
  bias: number[];
};

function relu(value: number) {
  return Math.max(0, value);
}
```

## Comparison

| Concept | Purpose | Common Choice |
| --- | --- | --- |
| Activation | Adds non-linearity | ReLU |
| Loss | Measures error | Cross entropy |
| Optimizer | Updates weights | Adam |

## Study Checklist

1. Understand matrix shapes.
2. Trace a forward pass by hand.
3. Derive one gradient.
4. Train a tiny model.
