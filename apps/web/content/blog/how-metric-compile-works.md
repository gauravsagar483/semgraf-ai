---
title: How Semgraf compiles a metric ask
description: From question to deterministic SQL — definition version, joins from the model, fail loud when out of scope.
date: 2026-08-03
author: Semgraf
tags:
  - metrics
  - compiler
draft: false
---

On the metric plane, Semgraf does not ask an LLM to invent joins.

1. Resolve the ask to a named metric in the OSI-derived model.
2. Compile SQL from measure, grain, filters, and declared relationships.
3. Execute on the fixture warehouse.
4. Return rows plus a **definition version** hash for attestation.

If the metric is unknown, we refuse with `OUT_OF_SCOPE` — fail loud beats a wrong number.

Try it in the [Ask console](/ask) with `total revenue` or `revenue by segment`.
