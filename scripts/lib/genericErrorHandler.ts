export default function genericErrorHandler(e) {
    if (!e)
        return;
    alert(JSON.stringify(e, null, "\t"));
}
