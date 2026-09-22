interface ProjectBounds {
  id: string;
  top: number;
  bottom: number;
}

export function getMostVisibleProject(
  projects: ProjectBounds[],
  viewportTop: number,
  viewportBottom: number,
): string {
  let activeId = '';
  let largestOverlap = 0;
  let nearestDistance = Infinity;

  for (const project of projects) {
    const overlap = Math.max(0, Math.min(project.bottom, viewportBottom) - Math.max(project.top, viewportTop));
    const distance = Math.max(0, viewportTop - project.bottom, project.top - viewportBottom);

    // Compare visible pixels, not the fraction of each project's total height.
    if (overlap > largestOverlap || (largestOverlap === 0 && distance < nearestDistance)) {
      activeId = project.id;
      largestOverlap = overlap;
      nearestDistance = distance;
    }
  }

  return activeId;
}
