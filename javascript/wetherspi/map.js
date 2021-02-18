let latLng = { lat: 37, lng: 127};

function initMap() {
	const myLatlng = { lat: 37.537305852926714, lng: 127.00091323874781};
	const map = new google.maps.Map(document.getElementById("map"), {
	  zoom: 7,
	  center: myLatlng,
	});

	let infoWindow = new google.maps.InfoWindow({
	  content: "클릭하여 날씨를 확인하세요!",
	  position: myLatlng,
	});
	infoWindow.open(map);
	map.addListener("click", (mapsMouseEvent) => {
	  //기존의 지도 정보 닫기
	  infoWindow.close();
	  //새로운 지도 정보 받기
	  infoWindow = new google.maps.InfoWindow({
		position: mapsMouseEvent.latLng,
	  });
	  infoWindow.setContent(
		//지도에 표시하기
		"이곳의 날씨는"
	  );
	  //새로운 지도 받기
	  infoWindow.open(map);
	  //위도 경도 정보 넘겨주기
	  latLng = mapsMouseEvent.latLng.toJSON();
	  // 날씨 데이터 표시
	  getData();
	  renderWeatherData()
	});
  }