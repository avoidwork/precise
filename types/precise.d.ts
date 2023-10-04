export function precise(): Precise;
export class Precise {
    started: number[];
    stopped: number[];
    diff(ms?: boolean): number;
    start(): this;
    stop(): this;
}
