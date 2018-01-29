
// express server 의존성 확인 및 서버 준비
var express = require('express');
var app = express();

// Express CORS Enable 설정
// npm install cors 설치 필요
var cors = require('cors');
app.use(cors());

// NAVER Search Trend API 실행 결과를 파일로 저장 
// flare file write
var fs = require('fs');
var url = require('url');

// Visualizer HTML 파일에서 호출할 URL
// NAVER Search Trend API 연동 및 데이터 저장
app.get('/search', function (req, res) {

    var request = require('request');

    // Client ID, Secret Key
    var client_id = 'Bx3k9QA02ShYeDVyLQpf';
    var client_secret = 'DvfCZekAZs';

    // NAVER Trend API URL 
    var api_url = 'https://openapi.naver.com/v1/datalab/search';

    // Mobile Device에 대한 Data Model
    var request_body = {
        "startDate": "2017-10-01",
        "endDate": "2017-10-30",
        "timeUnit": "month",
        "keywordGroups": [
            {
                "groupName": "iPhone_4",
                "keywords": [
                    "아이폰4",
                    "iphone4"
                ]
            },
            {
                "groupName": "iPhone_5",
                "keywords": [
                    "아이폰5",
                    "iphone5",
                    "아이폰5se"
                ]
            },
            {
                "groupName": "iPhone_6",
                "keywords": [
                    "아이폰6",
                    "iphone6"
                ]
            },
            {
                "groupName": "iPhone_6Plus",
                "keywords": [
                    "아이폰6플러스",
                    "iphone6plus"
                ]
            },
            {
                "groupName": "iPhone_7",
                "keywords": [
                    "아이폰7",
                    "iphone7"
                ]
            },
            {
                "groupName": "iPhone_7Plus",
                "keywords": [
                    "아이폰7플러스",
                    "iphone7plus"
                ]
            },
            {
                "groupName": "iPhone_8",
                "keywords": [
                    "아이폰8",
                    "iphone8"
                ]
            },
            {
                "groupName": "iPhone_8Plus",
                "keywords": [
                    "아이폰8플러스",
                    "iphone8plus"
                ]
            },
            {
                "groupName": "iPhone_X",
                "keywords": [
                    "아이폰X",
                    "iphoneX"
                ]
            },
            {
                "groupName": "Galaxy_s3",
                "keywords": [
                    "갤럭시 s3",
                    "Galaxy s3"
                ]
            },
            {
                "groupName": "iPad",
                "keywords": [
                    "아이패드프로",
                    "아이패드미니",
                    "아이패드프로"
                ]
            },
            {
                "groupName": "AppleWatch",
                "keywords": [
                    "애플워치2",
                    "애플워치3"
                ]
            },
            {
                "groupName": "GalaxyNote_4",
                "keywords": [
                    "갤럭시노트4",
                    "GalaxyNote4"
                ]
            },
            {
                "groupName": "Galaxy_s5",
                "keywords": [
                    "갤럭시s5",
                    "Galaxy s5"
                ]
            },
            {
                "groupName": "GalaxyNote_5",
                "keywords": [
                    "갤럭시노트4",
                    "GalaxyNote4"
                ]
            },
            {
                "groupName": "Galaxy_s6",
                "keywords": [
                    "갤럭시s6",
                    "Galaxy s6"
                ]
            },
            {
                "groupName": "GalaxyNote_7",
                "keywords": [
                    "갤럭시노트7",
                    "GalaxyNote7"
                ]
            },
            {
                "groupName": "Galaxy_s8",
                "keywords": [
                    "갤럭시s8",
                    "Galaxy s8"
                ]
            },
            {
                "groupName": "GalaxyNote_8",
                "keywords": [
                    "갤럭시노트8",
                    "GalaxyNote8"
                ]
            },
            {
                "groupName": "Galaxy_s9",
                "keywords": [
                    "갤럭시s9",
                    "Galaxy s9"
                ]
            },
            {
                "groupName": "Galaxy_a7",
                "keywords": [
                    "갤럭시A7",
                    "Galaxy a3"
                ]
            },
            {
                "groupName": "Galaxy_Tab",
                "keywords": [
                    "갤럭시탭",
                    "GalaxyTab"
                ]
            },
            {
                "groupName": "Galaxy_Gear",
                "keywords": [
                    "갤럭시기어s3",
                    "Galaxy Gear s3",
                    "갤럭시기어"
                ]
            },
            {
                "groupName": "NintenDo",
                "keywords": [
                    "닌텐도스위치"
                ]
            },
            {
                "groupName": "MacBook",
                "keywords": [
                    "맥북프로"
                ]
            },
            {
                "groupName": "MacBook_Air",
                "keywords": [
                    "맥북에어"
                ]
            },
            {
                "groupName": "Mac_Pro",
                "keywords": [
                    "맥프로"
                ]
            },
            {
                "groupName": "Surface",
                "keywords": [
                    "서피스프로",
                    "서피스랩탑",
                    "서피스"
                ]
            },
            {
                "groupName": "LG_V6",
                "keywords": [
                    "LG V6"
                ]
            },
            {
                "groupName": "Huawei",
                "keywords": [
                    "화웨이 M2",
                    "화웨이 M3"
                ]
            },
            {
                "groupName": "saomi",
                "keywords": [
                    "샤오미 휴대폰"
                ]
            }
        ],
        "device": "pc",
        "ages": [
            "4",
            "5",
            "6",
            "7"
        ],
        "gender": "m"
    };

    // NAVER Trend API POST Call
    request.post({
        url: api_url,
        body: JSON.stringify(request_body),
        headers: {
            'X-Naver-Client-Id': client_id,
            'X-Naver-Client-Secret': client_secret,
            'Content-Type': 'application/json'
        }
    },
    function (error, response, body) {

        var json_data = JSON.parse(response.body);
        console.log(json_data.results[0]);
        console.log(json_data.results[0].data[0]);

        // Visualizer Data 생성 준비
        var bodyStr = 'id,value' + '\n' 
                        + 'flare,' +'\n';

        console.log(bodyStr);

        for(var i=0; i < json_data.results.length; i++) {
             
             bodyStr += 'flare.' + json_data.results[i].title+',\n';
             bodyStr += 'flare.' + json_data.results[i].title+'.0,\n';
             bodyStr += 'flare.' + json_data.results[i].title+'.'+ json_data.results[i].title +','+json_data.results[i].data[0].ratio+',\n';
           
        }
       
        filePath = '/usr/local/Cellar/nginx/1.12.2_1/html/flare.csv';

        // Browser Print (필요 시 생략 가능)
        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});

        // d3.js Visualization을 위한 Data File 생성
        fs.appendFile(filePath, bodyStr, function() {
            res.end(bodyStr);
        });

    });
 });

 // Data Visualizer 전달을 위한 Node Server 생성
 app.listen(3000, function () {
   console.log('http://127.0.0.1:3000/search app listening on port 3000!');
 });