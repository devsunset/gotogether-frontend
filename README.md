# gotogether-frontend-vue
gotogether-frontend - frontend go together (vue.js) 

http://gotogether.ga/


--------------------------------------------------------

nginx spa 모듈 배포시 Refresh시 404 해결 처리 법

nginx.conf 파일 하단 내용 수정

location / {

          root   /usr/share/nginx/html;
          
          index  index.html index.htm;
          
          try_files $uri $uri/ /index.html;
          
}
