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
var param = getUrlVars();
var aid = param["aid"];
var comment_url = unescape(param["comment_url"]);
var comment_title = unescape(param["comment_title"]);
var cid = "article-" + aid + "-comment-form";
document.getElementById(cid).value = comment_title + ' ' + comment_url + ' ';
document.getElementById(cid).focus();

