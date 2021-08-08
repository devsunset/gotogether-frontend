<template>
<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Location</h1>
            </div>
            <!-- /.col -->
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                        <router-link to="/">Home</router-link>
                    </li>
                    <li class="breadcrumb-item active">Location</li>
                </ol>
            </div>
            <!-- /.col -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
</div>
<!-- /.content-header -->

<!-- Main content -->
<section class="content">
    <div class="container-fluid">
        <div>
            <div id="map" class="map"></div>
        </div>
    </div>
    <!-- /.container-fluid -->
</section>
<!-- /.content -->
</template>

<script>
export default {
  name: "location",
  data() {
    return {
      content: "",
    };
  },
   mounted() {
    window.kakao && window.kakao.maps
      ? this.initMap()
      : this.addKakaoMapScript();
  },
  methods: {
    addKakaoMapScript() {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=fc3ffc2cce82269dd8b0295c881c7e2c";
      document.head.appendChild(script);
    },
    initMap() {
      var container = document.getElementById("map"); 
      var options = {
        center: new kakao.maps.LatLng(37.564343, 126.947613), 
        level: 3 
      };
      var map = new kakao.maps.Map(container, options); 
      console.log(map)

    ///////////////////////////////////////////////////////////////////
        var positions = [
          {
            id: 1,
            store: '학생문화관점',
            location: '학생문화관 지하1층 로비',
            time: '학기 중: 월~금 08:30~19:00 | 토 09:00~14:00',
            vacation: '방학 중: 월~금 08:30~18:00 | 토 09:00~14:00',
            tel: '02-3277-3707',
            latlng: new kakao.maps.LatLng(37.562632898194835, 126.9454282268269),
          },
        ]

        var imageSrc = require('@/assets/img/marker.png'), 
        imageSize = new kakao.maps.Size(24, 35), 
        imageOption = { offset: new kakao.maps.Point(20, 35) }; 

        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        //for문이 아닌 forEach를 이용하여 dom에 직접 접근해야한다.
        positions.forEach(function(pos) {
          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: pos.latlng, // 마커의 위치
            image: markerImage,
          });

          var customOverlay = new kakao.maps.CustomOverlay({
            position: pos.latlng,
            xAnchor: 0.5,
            yAnchor: 1.05,
          });

          var content = document.createElement('div');
          content.className = 'overlaybox';

          var title = document.createElement('div');
          title.className = 'map-popup-title';

          var store = document.createElement('h3');
          store.className = 'popup-name';
          store.appendChild(document.createTextNode(pos.store));
          title.appendChild(store);
          content.appendChild(title);

          var location = document.createElement('span');
          location.className = 'store-location';
          location.appendChild(document.createTextNode(pos.location));
          content.appendChild(location);

          var timeContainer = document.createElement('div');

          var time = document.createElement('p');
          time.className = 'time-text';
          time.appendChild(document.createTextNode(pos.time));
          timeContainer.appendChild(time);
          var vacation = document.createElement('p');
          vacation.className = 'time-text';
          vacation.appendChild(document.createTextNode(pos.vacation));
          timeContainer.appendChild(vacation);
          content.appendChild(timeContainer);

          var tel = document.createElement('span');
          tel.className = 'telephone';
          tel.appendChild(document.createTextNode(pos.tel));
          content.appendChild(tel);

          var buttonContainer = document.createElement('div');
          buttonContainer.className = 'popup-buttons';

          var closeBtn = document.createElement('button');
          closeBtn.className = 'popup-button';
          closeBtn.appendChild(document.createTextNode('취소'));
          closeBtn.onclick = function() {
            customOverlay.setMap(null);
          };

          var selectBtn = document.createElement('button');
          selectBtn.className = 'popup-button';
          selectBtn.appendChild(document.createTextNode('선택'));
          selectBtn.onclick = function() {
            if (localStorage.getItem('store-id') != pos.id) { //store가 바뀌면 현재 장바구니를 비운다
              if (localStorage.length > 0) {
                for (let i = 0; i < localStorage.length; i++) {
                  if (
                    localStorage.key(i) !== 'loglevel:webpack-dev-server' &&
                    localStorage.key(i) !== 'store-id' &&
                    localStorage.key(i) !== 'store' &&
                    localStorage.key(i) !== 'nearest-store-id' &&
                    localStorage.key(i) !== 'nearest-store'
                  ) {
                    localStorage.removeItem(localStorage.key(i));
                  }
                }
              }
            }
            localStorage.setItem('store-id', pos.id);
            localStorage.setItem('store', pos.store);
            customOverlay.setMap(null);
            window.location.reload();
          };

          buttonContainer.appendChild(closeBtn);
          buttonContainer.appendChild(selectBtn);

          content.appendChild(buttonContainer);

          kakao.maps.event.addListener(marker, 'click', function() {
            customOverlay.setMap(map);
          });

          customOverlay.setContent(content);
        });

    ///////////////////////////////////////////////////////////////////
    if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다

        navigator.geolocation.getCurrentPosition(function(position) {
          var lat = position.coords.latitude, // 위도
              lon = position.coords.longitude; // 경도

          var polyline = new kakao.maps.Polyline({
            path: [new kakao.maps.LatLng(lat, lon), positions[0].latlng],
          });
          var minDistance = polyline.getLength();
          var minIndex = 0;
          for (let i = 1; i < positions.length; i++) {
            polyline = new kakao.maps.Polyline({
              path: [new kakao.maps.LatLng(lat, lon), positions[i].latlng],
            });
            var distance = polyline.getLength();
            if (minDistance > distance) {
              minDistance = distance;
              minIndex = i;
            }
          }

          localStorage.setItem('nearest-store-id', positions[minIndex].id);

          localStorage.setItem('nearest-store', positions[minIndex].store);
        });
      } else {
        // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        // eslint-disable-next-line no-unused-vars
        var locPosition = new kakao.maps.LatLng(37.564343, 126.947613);
      }
      /////////////


    }
  }
};
</script>

<style>
.map {
  width: 100%;
  height: 400px;
}
</style>