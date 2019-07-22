export const getUrl = (string) => {
    let baseUrl = 'http://' + window.location.hostname + ':8080';
    return baseUrl.concat(string);
} 
 
