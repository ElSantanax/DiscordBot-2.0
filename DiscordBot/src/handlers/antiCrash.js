
module.exports = client => {
    process.removeAllListeners();

    process.on("unhandledRejection", (reason, p) => {
        console.log('[ANTICRASH] - ERROR ENCONTRADO');
        console.log(reason, p);
    });

    process.on("uncaughException", (err, origin) => {
        console.log('[ANTICRASH] - ERROR ENCONTRADO');
        console.log(err, origin);
    });

    process.on("uncaughExceptionMonitor", (err, origin) => {
        console.log('[ANTICRASH] - ERROR ENCONTRADO');
        console.log(err, origin);
    });

    process.on("multipleResolves", () => { });
}