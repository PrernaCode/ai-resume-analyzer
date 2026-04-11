export interface PdfImage {
    imageUrl: string;
    file: File | null;
}

export interface PdfConversionResult {
    images: PdfImage[];
    error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
    if (pdfjsLib) return pdfjsLib;
    if (loadPromise) return loadPromise;

    isLoading = true;
    // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
    loadPromise = import("pdfjs-dist/build/pdf.mjs").then((lib) => {
        // Set the worker source to use local file
        lib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        pdfjsLib = lib;
        isLoading = false;
        return lib;
    });

    return loadPromise;
}

export async function getPdfMetadata(file: File): Promise<{ pageCount: number } | { error: string }> {
    try {
        const lib = await loadPdfJs();
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
        return { pageCount: pdf.numPages };
    } catch (err) {
        return { error: `Failed to read PDF metadata: ${err}` };
    }
}

export interface ConvertOptions {
    scale?: number;
    format?: "image/png" | "image/jpeg";
    quality?: number;
    maxPages?: number;
}

export async function convertPdfToImage(
    file: File,
    options: ConvertOptions = {}
): Promise<PdfConversionResult> {
    const { scale = 4, format = "image/png", quality = 1.0, maxPages = 2 } = options;
    try {
        const lib = await loadPdfJs();

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
        
        const numPages = Math.min(pdf.numPages, maxPages);
        const images: PdfImage[] = [];

        for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale });
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            if (context) {
                context.imageSmoothingEnabled = true;
                context.imageSmoothingQuality = "high";
            }

            await page.render({ canvasContext: context!, viewport }).promise;

            const blob: Blob | null = await new Promise((resolve) => {
                canvas.toBlob((b) => resolve(b), format, quality);
            });

            if (blob) {
                const extension = format === "image/png" ? "png" : "jpg";
                const originalName = file.name.replace(/\.pdf$/i, "");
                const imageFile = new File([blob], `${originalName}_p${i}_${scale}.${extension}`, {
                    type: format,
                });

                images.push({
                    imageUrl: URL.createObjectURL(blob),
                    file: imageFile,
                });
            }
        }

        return { images };
    } catch (err) {
        return {
            images: [],
            error: `Failed to convert PDF: ${err}`,
        };
    }
}