export default function callAjax(inputData, targetUrl, successFunc) {
    const data = new FormData;
    data.append('sending', JSON.stringify(inputData));

    $.ajax({
        url: targetUrl,
        method: "POST",
        data: data,
        contentType: false,
        cache: false,
        processData: false,
        success: function(data) {
            console.log(data);
            if (data) return successFunc(JSON.parse(data));
        }
        
    });
}