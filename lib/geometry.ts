/**
 * Interface for a point in 2D space
 */
export interface Point {
    x: number;
    y: number;
}

/**
 * Check if a point is inside a polygon using ray casting algorithm
 */
export function isPointInPolygon(point: Point, polygon: Point[]): boolean {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].x, yi = polygon[i].y;
        const xj = polygon[j].x, yj = polygon[j].y;

        const intersect = ((yi > point.y) !== (yj > point.y))
            && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

/**
 * Sample random points inside a polygon using rejection sampling
 */
export function samplePointsInPolygon(
    polygon: Point[],
    count: number,
    bounds: { minX: number, maxX: number, minY: number, maxY: number }
): Point[] {
    const points: Point[] = [];
    let safety = 0;

    while (points.length < count && safety < count * 20) {
        const x = bounds.minX + Math.random() * (bounds.maxX - bounds.minX);
        const y = bounds.minY + Math.random() * (bounds.maxY - bounds.minY);

        if (isPointInPolygon({ x, y }, polygon)) {
            points.push({ x, y });
        }
        safety++;
    }

    return points;
}

/**
 * Get the bounding box of a polygon
 */
export function getPolygonBounds(polygon: Point[]) {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    polygon.forEach(p => {
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
        minY = Math.min(minY, p.y);
        maxY = Math.max(maxY, p.y);
    });

    return { minX, maxX, minY, maxY };
}
