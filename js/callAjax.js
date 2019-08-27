export default function callAjax(inputData, targetUrl, successFunc) {
    const data = JSON.stringify(inputData);

    $.ajax({
        url: targetUrl,
        method: "POST",
        data: data,
        contentType: false,
        cache: false,
        processData: false,
        success: successFunc(JSON.parse(data))
    });
}