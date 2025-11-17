export class TextMeasurer {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
    }

    measureTextWidth(text: string, inputFont: string): number {
        if (!this.context) return 0;
        if (this.context.font !== inputFont) {
            this.context.font = inputFont;
        }
        return this.context.measureText(text).width;
    }
}
