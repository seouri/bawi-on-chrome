function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split(';');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

var url = unescape(getUrlVars()["url"]);
var body= document.getElementsByTagName("textarea")[0].value;
document.getElementsByTagName("textarea")[0].value = url + "\n\n" + body;
document.getElementsByTagName("textarea")[0].focus()