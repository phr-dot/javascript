// *****지도 들고오기
var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
var options = {
  center: new kakao.maps.LatLng(35.15768, 129.059024), //지도의 중심좌표.
  level: 3, //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

var markers = [];
var positions = [];

//마커 지우기
function delMark() {
  markers.forEach((item) => {
    item.setMap(null);
  });
}

// 지도 이동 이벤트
kakao.maps.event.addListener(map, "dragend", paintMap);

//함수
function paintMap() {
  //마커 초기화
  delMark();

  // 지도 중심좌표를 얻어옵니다
  var latlng = map.getCenter();
  var lat = latlng.getLat();
  var lng = latlng.getLng();
  var m = 500;

  async function getStore() {
    const response = await fetch(`https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${lat}&lng=${lng}&m=${m}`);
    const data = await response.json();

    data.stores.forEach((store) => {
      positions.push({
        content: "<div>" + store.name + "</div>",
        latlng: new kakao.maps.LatLng(store.lat, store.lng),
      });
    });

    for (var i = 0; i < positions.length; i++) {
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커의 위치
      });

      // 마커에 표시할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content, // 인포윈도우에 표시할 내용
      });

      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다
      // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      kakao.maps.event.addListener(marker, "mouseover", makeOverListener(map, marker, infowindow));
      kakao.maps.event.addListener(marker, "mouseout", makeOutListener(infowindow));
      markers.push(marker);
    }

    // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
    function makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    }

    // 인포윈도우를 닫는 클로저를 만드는 함수입니다
    function makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    }
  }

  getStore();
}

paintMap();
