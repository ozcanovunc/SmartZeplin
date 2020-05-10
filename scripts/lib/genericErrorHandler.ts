export default function genericErrorHandler(e) {
    if (!e) {
        return;
    }
    else if (e.body && e.body.message) {
        alert(e.body.message, global.lang.error);
    }
    else {
        alert(JSON.stringify(e, null, "\t"));
    }
}
