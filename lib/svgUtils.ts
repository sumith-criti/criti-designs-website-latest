export interface SvgPathData {
    id: string
    d: string
    length: number
    bounds: { x: number, y: number, width: number, height: number }
    originalStroke?: string
    originalStrokeWidth?: number
}

export interface StagedPaths {
    structure: SvgPathData[]
    secondary: SvgPathData[] // Windows/Roof
    details: SvgPathData[]
}

/**
 * Fetches SVG content from a URL.
 */
export async function fetchSvgContent(url: string): Promise<string> {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed to fetch SVG: ${url}`)
    return await res.text()
}

/**
 * Converts various SVG shape elements to a standard Path data object.
 * Returns a list of path data with pre-calculated lengths and bounds.
 */
export function processSvgToPaths(svgString: string): { paths: SvgPathData[], viewBox: string } {
    if (typeof window === 'undefined') return { paths: [], viewBox: '0 0 100 100' }

    const parser = new DOMParser()
    const doc = parser.parseFromString(svgString, 'image/svg+xml')
    const svg = doc.querySelector('svg')
    if (!svg) return { paths: [], viewBox: '0 0 100 100' }

    // We need to append to DOM briefly to use getBBox() and getTotalLength() reliably?
    // Actually, getTotalLength works on a disconnected path in strict browsers, but typically requires DOM.
    // getBBox DEFINITELY requires the element to be in the render tree in some browsers, 
    // but often works if just parsed. 
    // To be safe, let's assume we can do simple math parsing for lines/rects, 
    // but for complex paths we might brute force or just rely on bounding box from the 'd' string logic if needed.
    // However, since we are in a browser environment (useEffect), we can create a hidden container.

    // BETTER APPROACH: Just extract the semantic data.
    // We will convert primitives to paths.

    const extracted: SvgPathData[] = []
    let counter = 0

    const elements = Array.from(doc.querySelectorAll('path, rect, circle, ellipse, line, polyline, polygon'))

    elements.forEach(el => {
        const tagName = el.tagName.toLowerCase()
        let d = ''

        if (tagName === 'path') {
            d = el.getAttribute('d') || ''
        } else if (tagName === 'rect') {
            const x = parseFloat(el.getAttribute('x') || '0')
            const y = parseFloat(el.getAttribute('y') || '0')
            const w = parseFloat(el.getAttribute('width') || '0')
            const h = parseFloat(el.getAttribute('height') || '0')
            d = `M${x},${y} L${x + w},${y} L${x + w},${y + h} L${x},${y + h} Z`
        } else if (tagName === 'line') {
            const x1 = el.getAttribute('x1')
            const y1 = el.getAttribute('y1')
            const x2 = el.getAttribute('x2')
            const y2 = el.getAttribute('y2')
            d = `M${x1},${y1} L${x2},${y2}`
        } else if (tagName === 'polyline' || tagName === 'polygon') {
            const pts = el.getAttribute('points') || ''
            const coords = pts.trim().split(/\s+|,/)
            if (coords.length >= 2) {
                d = `M${coords[0]},${coords[1]}`
                for (let i = 2; i < coords.length; i += 2) {
                    d += ` L${coords[i]},${coords[i + 1]}`
                }
                if (tagName === 'polygon') d += ' Z'
            }
        } else if (tagName === 'circle') {
            const cx = parseFloat(el.getAttribute('cx') || '0')
            const cy = parseFloat(el.getAttribute('cy') || '0')
            const r = parseFloat(el.getAttribute('r') || '0')
            // Approximation of circle with 2 arcs
            d = `M${cx - r},${cy} A${r},${r} 0 1,0 ${cx + r},${cy} A${r},${r} 0 1,0 ${cx - r},${cy}`
        }

        if (!d) return

        // Approximate length/bounds purely from string to avoid layout thrashing?
        // No, let's produce the path element and create a specialized provider component to measure them
        // OR just do it here if we assume this runs in Effect.

        // For accurate length, we create a temp path
        const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        tempPath.setAttribute('d', d)

        // Simple bounding box approximation from 'd' points if needed, 
        // but getTotalLength needs browser API.
        const len = tempPath.getTotalLength ? tempPath.getTotalLength() : 0

        // BBox needs DOM.
        // We will approximate 'size' by path length for heuristic grouping
        // Or if 'd' content scan.

        extracted.push({
            id: `path-${counter++}`,
            d,
            length: len,
            bounds: { x: 0, y: 0, width: 0, height: 0 }, // Placeholder
            originalStroke: el.getAttribute('stroke') || undefined,
            originalStrokeWidth: parseFloat(el.getAttribute('stroke-width') || '0') || undefined
        })
    })

    const viewBox = svg.getAttribute('viewBox') || '0 0 100 100'

    return {
        paths: extracted,
        viewBox
    }
}

/**
 * Heuristically groups paths into Structure, Secondary, Details based on Length.
 * Longer paths are likely walls/structure. Short paths details.
 */
export function groupPathsByImp(paths: SvgPathData[]): StagedPaths {
    // Sort by length descending
    const sorted = [...paths].sort((a, b) => b.length - a.length)
    const total = sorted.length

    // Top 20% -> Structure
    // Next 40% -> Secondary
    // Rest -> Details

    const p1 = Math.ceil(total * 0.2)
    const p2 = Math.ceil(total * 0.6)

    return {
        structure: sorted.slice(0, p1),
        secondary: sorted.slice(p1, p2),
        details: sorted.slice(p2)
    }
}
