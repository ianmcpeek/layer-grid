class EasingUtil {
    static easeInQuad(x: number) {
        return x * x;
    }
    static easeOutQuad(x: number) {
        return 1 - (1 - x) * (1 - x);
    }

    static linear(x: number) {
        return x / 1;
    }

    static easeInCubic(x: number): number {
        return x * x * x;
    }

    static easeOutCubic(x: number): number {
        return 1 - Math.pow(1 - x, 3);
    }
}

export default EasingUtil;