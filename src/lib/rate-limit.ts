type RateLimitConfig = {
    interval: number; // Time window in milliseconds
    limit: number;    // Max requests per window
};

export class RateLimiter {
    private timestamps: Map<string, number[]> = new Map();
    private config: RateLimitConfig;
    private checkCount: number = 0;

    constructor(config: RateLimitConfig) {
        this.config = config;
    }

    check(key: string): { success: boolean; reset?: number } {
        const now = Date.now();
        const windowStart = now - this.config.interval;

        const timestamps = this.timestamps.get(key) || [];

        // Filter out old timestamps
        const validTimestamps = timestamps.filter(timestamp => timestamp > windowStart);

        if (validTimestamps.length >= this.config.limit) {
            const oldestTimestamp = validTimestamps[0];
            const reset = oldestTimestamp + this.config.interval;
            return { success: false, reset };
        }

        validTimestamps.push(now);
        this.timestamps.set(key, validTimestamps);

        this.checkCount++;
        if (this.checkCount % 100 === 0) {
            this.cleanup();
        }

        return { success: true };
    }

    // Helper to clean up all expired keys (can be called periodically if needed)
    cleanup() {
        const now = Date.now();
        const windowStart = now - this.config.interval;

        for (const [key, timestamps] of this.timestamps.entries()) {
            const validTimestamps = timestamps.filter(timestamp => timestamp > windowStart);
            if (validTimestamps.length === 0) {
                this.timestamps.delete(key);
            } else {
                this.timestamps.set(key, validTimestamps);
            }
        }
    }

    removeToken(key: string) {
        const timestamps = this.timestamps.get(key);
        if (timestamps && timestamps.length > 0) {
            timestamps.pop();
            if (timestamps.length === 0) {
                this.timestamps.delete(key);
            } else {
                this.timestamps.set(key, timestamps);
            }
        }
    }
}
