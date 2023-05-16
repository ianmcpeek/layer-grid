export const RandomUtil = {
    randBinary: () => Math.round(Math.random()),
    randBinaryAdvantage: () => Math.round(Math.random()) || Math.round(Math.random()),
    randBinaryDisavantage: () => Math.round(Math.random()) && Math.round(Math.random()),
    randBinaryDisavantageAdvantage: () => (Math.round(Math.random()) && Math.round(Math.random())) || (Math.round(Math.random()) && Math.round(Math.random())),
};