export function precise(): Precise;
export class Precise {
    started: any[];
    stopped: any[];
    diff(ms?: boolean): any;
    start(): this;
    stop(): this;
}
