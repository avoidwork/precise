export function precise(): Precise;
export class Precise {
    started: any;
    stopped: any;
    diff(ms?: boolean): number;
    reset(): this;
    start(): this;
    stop(): this;
}
