import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getMostVisibleProject } from './visibleProject.ts';

test('switches before the next heading reaches the top when the next project dominates', () => {
  assert.equal(getMostVisibleProject([
    { id: 'previous', top: -1500, bottom: 330 },
    { id: 'next', top: 450, bottom: 2400 },
  ], 128, 900), 'next');
});

test('keeps the previous project while it still occupies more of the viewport', () => {
  assert.equal(getMostVisibleProject([
    { id: 'previous', top: -1000, bottom: 620 },
    { id: 'next', top: 740, bottom: 2400 },
  ], 128, 900), 'previous');
});

test('compares visible pixels rather than favoring a fully visible short project', () => {
  assert.equal(getMostVisibleProject([
    { id: 'short', top: 128, bottom: 328 },
    { id: 'long', top: 400, bottom: 3000 },
  ], 128, 900), 'long');
});

test('excludes content covered by navigation and handles three visible projects', () => {
  assert.equal(getMostVisibleProject([
    { id: 'covered', top: -500, bottom: 120 },
    { id: 'middle', top: 140, bottom: 400 },
    { id: 'next', top: 430, bottom: 1000 },
  ], 128, 900), 'next');
});

test('selects the nearest project outside the project list or in a gap', () => {
  const bounds = [{ id: 'first', top: 1000, bottom: 2000 }, { id: 'last', top: 2400, bottom: 3400 }];
  assert.equal(getMostVisibleProject(bounds, 128, 900), 'first');
  assert.equal(getMostVisibleProject(bounds, 3500, 4200), 'last');
  assert.equal(getMostVisibleProject(bounds, 2250, 2350), 'last');
});

test('ties follow document order and an empty list has no active project', () => {
  assert.equal(getMostVisibleProject([
    { id: 'first', top: 128, bottom: 450 },
    { id: 'next', top: 578, bottom: 900 },
  ], 128, 900), 'first');
  assert.equal(getMostVisibleProject([], 128, 900), '');
});
