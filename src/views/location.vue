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
      width: 0,
      height: 0
    };
  },
   mounted() {
    window.kakao && window.kakao.maps
      ? this.initMap()
      : this.addKakaoMapScript();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmout() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    addKakaoMapScript() {
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=fc3ffc2cce82269dd8b0295c881c7e2c";
      document.head.appendChild(script);
    },
    handleResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        var mapContainer = document.getElementById('map');
        mapContainer.style.height = (this.height-200)+'px'; 
    },
    initMap() {
      var container = document.getElementById("map"); 

      this.width = window.innerWidth;
      this.height = window.innerHeight;
      container.style.height = (this.height-200)+'px'; 

      var options = {
        center: new kakao.maps.LatLng(37.47973476787492, 126.82248036958089), 
        level: 4 
      };
      var map = new kakao.maps.Map(container, options); 
      console.log(map)

    ///////////////////////////////////////////////////////////////////
        var positions = [
          {
            id: 1,
            study: '항동 모각코',
            location: 'Twosome place',
            latlng: new kakao.maps.LatLng(37.479751116607545, 126.82286755783196),
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
            map: map,             // 마커를 표시할 지도
            position: pos.latlng, // 마커의 위치
            image: markerImage,
          });

          var customOverlay = new kakao.maps.CustomOverlay({
            position: pos.latlng,
            xAnchor: 0.5,
            yAnchor: 1.05,
          });

          // <div class="info-box shadow-sm">
          //     <span class="info-box-icon bg-success"><i class="far fa-comments"></i></span>
          //     <div class="info-box-content">
          //       <span class="info-box-text">Shadows</span>
          //       <span class="info-box-number">Small</span>
          //       <span><button class='btn btn-block btn-primary btn-sm'>Close</button></span>
          //     </div>
          // </div>

          var content = document.createElement('div');
          content.className = 'info-box shadow-sm';

          var spanicon = document.createElement('span');
          spanicon.className = 'info-box-icon bg-success';

          var itag = document.createElement('i');
          itag.className = 'far fa-comments';
          spanicon.appendChild(itag);

          var contentSub = document.createElement('div');
          contentSub.className = 'info-box-content';

          var spanTitle = document.createElement('span');
          spanTitle.className = 'info-box-number';
          spanTitle.appendChild(document.createTextNode(pos.study));
          contentSub.appendChild(spanTitle);

          var spanLocation = document.createElement('span');
          spanLocation.className = 'info-box-text';
          spanLocation.appendChild(document.createTextNode(pos.location));
          contentSub.appendChild(spanLocation);

          var buttonContainer = document.createElement('span');
          var closeBtn = document.createElement('button');
          closeBtn.className = 'btn btn-block btn-primary btn-sm';
          closeBtn.appendChild(document.createTextNode('Close'));
          closeBtn.onclick = function() {
            customOverlay.setMap(null);
          };

          buttonContainer.appendChild(closeBtn);
          contentSub.appendChild(buttonContainer);

          content.appendChild(spanicon);
          content.appendChild(contentSub);

          customOverlay.setContent(content);

          kakao.maps.event.addListener(marker, 'click', function() {
            customOverlay.setMap(map);
          });
          
        });
    ///////////////////////////////////////////////////////////////////
    /*
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var lat = position.coords.latitude,   
                  lon = position.coords.longitude;  

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
              console.log(positions[minIndex].id);
              console.log(positions[minIndex].study);
            });
          } else {
            // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
            // eslint-disable-next-line no-unused-vars
            var locPosition = new kakao.maps.LatLng(37.47973476787492, 126.82248036958089);
          }
    */
    ///////////////////////////////////////////////////////////////////
    }
  }
};
</script>

<style>
.map {
  width: 100%;
  height: 700px;
} 
</style>