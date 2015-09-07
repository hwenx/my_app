<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="ko">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>Daum OpenAPI with jQuery</title>

    <script type="text/javascript" src="/resource/js/jquery-1.6.2.min.js"></script>

    <script type="text/javascript">
        $(document).ready(function(){
            // 이미지 검색 할래염 버튼
            $("#searchBtn").click(function(){
                // 기존 검색결과랑 조건 지우기
                $("#imgList").empty();
                $("#pageInfo").val("1");

                searchImg();
            });

            // 더보기버튼
            $("#moreBtn").click(function(){
                $("#pageno").val(parseInt($("#pageno").val())+1);

                searchImg();
            });

            var searchImg = function(){
                $.ajax({
                    url : "http://apis.daum.net/search/image",
                    dataType : "jsonp",
                    type : "post",
                    jsonp : "callback",
                    data : {
                        apikey : "0aeb0bcc94e82aaa63c18e74caa0aaa5",               // API KEY
                        q : $("#keyword").val(),         // 검색어
                        result : "10",                   // 한페이지에 출력될 결과수
                        pageno : $("#pageno").val(),     // 페이지번호
                        output : "json"                  // JSONP 형식으로 호출하기 때문에 결과값 포맷은 json
                    },
                    success : function(r){
                        r = r.channel;
                        $("#pageInfo").text("검색된 이미지는 " + r.totalCount +"개 에요~")

                        $.each(r.item, function(idx, data){
                            var img = $("<img/>").attr({
                                src : data.thumbnail,
                                title : data.title
                            }).click(function(){
                                window.open(data.image);
                            }).appendTo("#imgList");
                        });
                    }
                });
            };
        });
    </script>

    <style type="text/css">
        #result {width:800px;}
        #imgList {width: 100%;border:2px solid #ccc; padding:5px}
        #imgList img{border:1px solid #cccccc;padding:2px;margin:5px;cursor:pointer}
        #moreBtn {width:100%;height:60px;}
    </style>
</head>
<body>
<input type="hidden" id="pageno" value="1"/>
<input type="text" id="keyword" />
<button id="searchBtn">이미지 검색 할래염</button>

<div id="result">
    <span id="pageInfo"></span>
    <div id="imgList">여기에 검색된 이미지가 나타날꺼임</div>
    <button id="moreBtn">더보기</button>
</div>
</body>
</html>