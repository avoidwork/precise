export function precise(): Precise;
export class Precise {
    started: BigInteger;
    stopped: BigInteger;
    diff(ms?: boolean): number;
    start(): this;
    stop(): this;
}
