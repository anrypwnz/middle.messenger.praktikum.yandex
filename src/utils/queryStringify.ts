export default function _queryStringify(data: string[]) {
    let res = 'frame.html?';
    Object.entries(data).map(i => {
        res += i.toString().replace(',', '=') + '&'
    })
    res = res.slice(0, -1)
    return res;
}