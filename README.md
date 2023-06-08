# gotogether-frontend-vue
gotogether-frontend - frontend go together (vue.js) 

http://193.123.252.22

--------------------------------------------------------

nginx spa 모듈 배포시 Refresh시 404 해결 처리 법

nginx.conf 파일 하단 내용 수정

location / {

          root   /usr/share/nginx/html;
          
          index  index.html index.htm;
          
          try_files $uri $uri/ /index.html;
          
}



Template : https://github.com/erdkse/adminlte-3-vue
