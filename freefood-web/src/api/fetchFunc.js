export default function fetchFunc(url, data={}, type='GET'){
    return fetch(url,{
        method:type,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: obj2params(data)
    }).then(response=>{
        if(response.ok){
            return response.json();
        }
    })
}

function obj2params(obj) {
    let result = '';
    let item;
    for (item in obj) {
        result += '&' + item + '=' + encodeURIComponent(obj[item]);
    }

    if (result) {
        result = result.slice(1);
    }
    return result;
}