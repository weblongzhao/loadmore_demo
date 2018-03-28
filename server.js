/*
* @Author: Marte
* @Date:   2018-03-28 09:04:59
* @Last Modified by:   Marte
* @Last Modified time: 2018-03-28 16:31:26
*/

'use strict';
var http = require("http")
var fs = require("fs")
var url = require("url")
var path = require("path")

http.createServer((request,response)=>{
    response.setHeader("content-type","application/json;charset=utf-8")
    var urlObj = url.parse(request.url,true) ;
    console.log(urlObj)
    if(urlObj.pathname == "/"){
        var statusDir = __dirname+"/index.html";
        fs.readFile(statusDir,function(err,data){
            response.setHeader("content-type","text/html")
            response.end(data)
        })
    } else if(urlObj.pathname == "/loadmore"){
        var arr =[];
        for(var i=0;i<5;i++){
            arr.push(urlObj.query.index++);
        }
        setTimeout(function(){response.end(JSON.stringify(arr))},2000)


    } else{
        var statusDir = path.join(__dirname,urlObj.pathname);
        console.log(statusDir)
        fs.readFile(statusDir,function(err,data){
            response.end(data)
        })
    }

}).listen("8888")

























