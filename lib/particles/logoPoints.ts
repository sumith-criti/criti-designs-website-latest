interface Point {
    x: number; // Normalized 0-1
    y: number; // Normalized 0-1
    color: string;
}

export async function samplePointsFromImage(
    src: string,
    density: number = 4 // Skip every N pixels (lower = more points)
): Promise<Point[]> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = src;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Limit analysis size for performance
            const MAX_WIDTH = 250;
            const scale = Math.min(1, MAX_WIDTH / img.width);

            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            if (!ctx) {
                reject("Could not get canvas context");
                return;
            }

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const { width, height } = canvas;
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;
            const points: Point[] = [];

            // Scan pixels
            for (let y = 0; y < height; y += density) {
                for (let x = 0; x < width; x += density) {
                    const i = (y * width + x) * 4;
                    const alpha = data[i + 3];

                    if (alpha > 128) { // Only opaque pixels
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];

                        // Add some jitter to avoid perfect grid
                        const jitterX = (Math.random() - 0.5) * density * 0.5;
                        const jitterY = (Math.random() - 0.5) * density * 0.5;

                        points.push({
                            x: (x + jitterX) / width, // Normalize 0-1
                            y: (y + jitterY) / height, // Normalize 0-1
                            color: `rgba(${r}, ${g}, ${b}, ${alpha / 255})`
                        });
                    }
                }
            }

            resolve(points);
        };

        img.onerror = (err) => reject(err);
    });
}
