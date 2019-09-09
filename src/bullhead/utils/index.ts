export const delay = async (durationInMs: number) => {
    return new Promise(done => setTimeout(done, durationInMs))
};