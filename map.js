$(function() {
    

    initMap();
    
  });
  

  let _BASE = new naver.maps.LatLng(37.2939419, 126.9754234);
    let _ZOOM = 16;
  
  
  
    // Map Options
    var mapOptions = {
      center: _BASE, //지도 시작 지점
      zoom: _ZOOM,
      zoomControl: true,
      zoomControlOptions: {
              position: naver.maps.Position.TOP_LEFT,
              style: naver.maps.ZoomControlStyle.SMALL
          },
      scaleControl: true,
      scaleControlOptions: {position: naver.maps.Position.BOTTOM_RIGHT},
    };
    // Here we render Naver Map 
    var map = new naver.maps.Map('map', mapOptions)
    
  let markers = new Array(); // 마커 정보를 담는 배열
  let infoWindows = new Array(); // 정보창을 담는 배열
  let areaArr = new Array();  // 지역을 담는 배열 ( 지역명/위도경도 )
  
  let hangoutList = []
  areaArr.push(
    /*지역구 이름*/         /*위도*/               /*경도*/            
    {location : '본찌돈까스' , lat : '37.2971523' , lng : '126.9715006', description: '율전에서 이색적인 음식을 먹고싶다면!', imageTag: 'img/food.png', type: 'Food'},  // 강남구 중심좌표
    {location : '벨라튀니지' , lat : '37.2972199' , lng : '126.9713739', description: '율전에서 이색적인 음식을 먹고싶다면!', imageTag: 'img/food.png', type: 'Food'},  // 강동구 중심좌표
    {location : '알촌' , lat : '37.297476' , lng : '126.9717054', description: '율전에서 이색적인 음식을 먹고싶다면!', imageTag: 'img/food.png', type: 'Food'},  // 강북구 중심좌표
    {location : '무대포핫도그' , lat : '37.2969972' , lng : '126.9712576', description: '율전에서 이색적인 음식을 먹고싶다면!', imageTag: 'img/food.png', type: 'Food'},  // 강서구 중심좌표
    {location : '힌카쿠' , lat : '37.2979467' , lng : '126.9721954', description: '율전에서 이색적인 음식을 먹고싶다면!', imageTag: 'img/food.png', type: 'Food'},
    {location : '깡우동' , lat : '37.2984079' , lng : '126.9704937', description: '율전에서 이색적인 음식을 먹고싶다면!', imageTag: 'img/food.png', type: 'Food'},
    {location : '무대포핫도그' , lat : '37.2981136' , lng : '126.9706376', description: '율전에서 이색적인 음식을 먹고싶다면!', imageTag: 'img/food.png', type: 'Food'},
    {location : '독산성 족발&순대국' , lat : '37.2982302' , lng : '126.9712576', description: '율전에서 이색적인 음식을 먹고싶다면!', imageTag: 'img/food.png', type: 'Food'},
    {location : '충만치킨' , lat : '37.2985579' , lng : '126.9696108', description: '율전에서 이색적인 음식을 먹고싶다면!', imageTag: 'img/food.png', type: 'Food'},
    {location : '자명문' , lat : '37.2992317' , lng : '126.9699131', description: '율전에서 이색적인 음식을 먹고싶다면!', imageTag: 'img/cafe.png', type: 'Cafe'},
    {location : '먹깨비김밥' , lat : '37.2986624' , lng : '126.971376', description: '율전에서 이색적인 음식을 먹고싶다면!', imageTag: 'img/food.png', type: 'Food'},
    {location : '국제식당' , lat : '37.2979487' , lng : '126.9732216', description: '율전에서 이색적인 음식을 먹고싶다면!', imageTag: 'img/food.png', type: 'Food'},
    {location : '성대목장' , lat : '37.2969672' , lng :'126.9692569', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '성대찌개고을' , lat : '37.2971789' , lng :'126.96936', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '명가양꼬치' , lat : '37.2967229' , lng :'126.9691429', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '커피트리' , lat : '37.2968783' , lng :'126.9701243', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '카페더쉐어' , lat : '37.2971137' , lng :'126.9682585', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '카페로브' , lat : '37.296911' , lng :'126.968156', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '사거리다방' , lat : '37.2971214' , lng :'126.9682363', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '섬세한남자' , lat : '37.2977115' , lng :'126.9685395', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '태영생막창' , lat : '37.297833' , lng :'126.9685266', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '칼국수여행' , lat : '37.2977383' , lng :'126.9688166', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '포동이네' , lat : '37.2979313' , lng :'126.9689787', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '경기수산' , lat : '37.2980763' , lng :'126.968677', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '바다참치' , lat : '37.2985145' , lng :'126.9712435', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '독도참치' , lat : '37.2991013' , lng :'126.9711644', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '짬뽕타임' , lat : '37.2985426' , lng :'126.9693008', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '르디망슈' , lat : '37.2988341' , lng :'126.968734', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '정성가득찬' , lat : '37.2979929' , lng :'126.9678454', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '또봉이통닭' , lat : '37.2984338' , lng :'126.9676702', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '회좋아' , lat : '37.2982738' , lng :'126.9676137', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '모닝꼬마김밥' , lat : '37.2979471' , lng :'126.9673452', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '롤랑까페' , lat : '37.2977069' , lng :'126.9673613', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '미스꼬꼬' , lat : '37.2988094' , lng :'126.967656', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '미쳐라' , lat : '37.2989657' , lng :'126.9677024', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '모수밀면' , lat : '37.2988341' , lng :'126.968734', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '한둘분식' , lat : '37.2986997' , lng :'126.9692276', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '채움거진코다리네' , lat : '37.2988185' , lng :'126.9694155', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '어반그레이' , lat : '37.2989143' , lng :'126.9693341', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '오디디' , lat : '37.2987629' , lng :'126.9698674', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '피자스쿨' , lat : '37.2987629' , lng :'126.9698674', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '인더비엣' , lat : '37.2988669' , lng :'126.9705375', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '대동집' , lat : '37.2989289' , lng :'126.9700998', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '김씨화로' , lat : '37.2994117' , lng :'126.9701733', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '옥집' , lat : '37.2986458' , lng :'126.9707803', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '황금족발' , lat : '37.2983174' , lng :'126.9710333', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '빽다방' , lat : '37.2987735' , lng :'126.971322', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '명륜진사갈비' , lat : '37.298892' , lng :'126.971302', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '북한산조개구이' , lat : '37.2990396' , lng :'126.9712832', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '스타벅스' , lat : '37.2988351' , lng :'126.9715664', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '이라부' , lat : '37.2990353' , lng :'126.9717586', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '요거베리' , lat : '37.2996087' , lng :'126.9717982', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '엉터리생고기' , lat : '37.2993022' , lng :'126.9711594', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '오르카커피룸' , lat : '37.2996845' , lng :'126.9706692', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '택이네조개전골' , lat : '37.2991652' , lng :'126.9701895', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '수코미치' , lat : '37.2991485' , lng :'126.9706186', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '사우스스트릿' , lat : '37.2981546' , lng :'126.9689075', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '썬더치킨' , lat : '37.298132' , lng :'126.9690739', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '한입닭강정' , lat : '37.2981378' , lng :'126.9689589', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '오스트리아우노' , lat : '37.2981548' , lng :'126.9692553', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : 'CafeDeManuale' , lat : '37.2980499' , lng :'126.9692184', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '가장맛있는족발' , lat : '37.2980261' , lng :'126.9692339', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '자장수전주콩나물국밥' , lat : '37.2983027' , lng :'126.9693116', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '한둘분식' , lat : '37.2986997' , lng :'126.9692276', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '채움거진코다리네' , lat : '37.2988185' , lng :'126.9694155', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '슈가블랑' , lat : '37.294569' , lng :'126.9677094', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '디아카페' , lat : '37.2944595' , lng :'126.9679365', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '율전동미미' , lat : '37.2962057' , lng :'126.9682937', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '베베' , lat : '37.2962899' , lng :'126.9678518', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '금자만두' , lat : '37.2962512' , lng :'126.9677451', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '예감쪽갈비' , lat : '37.2965356' , lng :'126.9687496', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '콤마' , lat : '37.2966372' , lng :'126.968614', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '생각나는순대국' , lat : '37.296755' , lng :'126.9682785', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '카페로브' , lat : '37.296911' , lng :'126.968156', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '빨간석쇠구이' , lat : '37.2969535' , lng :'126.9684989', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '카와마루아지' , lat : '37.2969036' , lng :'126.968736', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '반갑다친구야' , lat : '37.2968932' , lng :'126.9690425', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '안서동야곱집' , lat : '37.2970303' , lng :'126.9690541', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '선참치' , lat : '37.2970303' , lng :'126.9690541', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '순' , lat : '37.2971518' , lng :'126.9688273', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '홍추곱창카페' , lat : '37.2972039' , lng :'126.9686988', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : 'intensecoffee' , lat : '37.2972745' , lng :'126.9688977', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '뎅과꼬치로' , lat : '37.2972348' , lng :'126.9691551', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : 'Manda' , lat : '37.2970833' , lng :'126.9695785', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '항아리보쌈' , lat : '37.2970011' , lng :'126.9698686', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '차돌풍' , lat : '37.297088' , lng :'126.9698846', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '정든닭발' , lat : '37.2970518' , lng :'126.9701761', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '미가라멘' , lat : '37.2971985' , lng :'126.9701616', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '영희네고기' , lat : '37.2972913' , lng :'126.9702631', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '한마리정육식당' , lat : '37.2975258' , lng :'126.9700526', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '목구멍' , lat : '37.2976242' , lng :'126.9701391', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '육회독존' , lat : '37.297693' , lng :'126.9701437', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '마포구이촌' , lat : '37.2975555' , lng :'126.9703847', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '블랙스미스' , lat : '37.2976624' , lng :'126.970452', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '한창희천하일면' , lat : '37.2977394' , lng :'126.9702223', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '백령도생바지락칼국수' , lat : '37.2975303' , lng :'126.9703644', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '1인자감자탕뼈해장국' , lat : '37.2977889' , lng :'126.9704898', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '롯데리아' , lat : '37.297892' , lng :'126.9708526', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '두미르퓨전포차' , lat : '37.2979023' , lng :'126.9705852', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '청년다방' , lat : '37.2981136' , lng :'126.9706376', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag:'img/food.png',type:'Food'},
    {location : '화락바베큐치킨' , lat : '37.2980187' , lng :'126.9702896', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag:'img/food.png',type:'Food'},
    {location : '사랑해' , lat : '37.2979248' , lng :'126.9701665', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '감스시' , lat : '37.2981617' , lng :'126.9702535', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '홍매스시' , lat : '37.2982238' , lng :'126.9696266', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '보영만두' , lat : '37.2983513' , lng :'126.970473', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '커피볶는J2M' , lat : '37.2983694' , lng :'126.970307', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '퓨전포차포차' , lat : '37.298542' , lng :'126.970457', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '제주도식당' , lat : '37.2977341' , lng :'126.9695335', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '마포갈비' , lat : '37.2978563' , lng :'126.9699188', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '보리네주먹고기' , lat : '37.2977199' , lng :'126.9691362', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '고기굽는교실' , lat : '37.2980876' , lng :'126.9694063', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '처갓집양념치킨' , lat : '37.2979471' , lng :'126.9673452', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '만리향' , lat : '37.2985395' , lng :'126.9662004', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '페리카나' , lat : '37.2985951' , lng :'126.9660616', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '포명천천' , lat : '37.298846' , lng :'126.9658633', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '일구오삼' , lat : '37.2992653' , lng :'126.9651684', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '청춘핫도그' , lat : '37.2997419' , lng :'126.9666067', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '달콤한쌈이야기' , lat : '37.2997917' , lng :'126.9679955', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '오늘도족발' , lat : '37.2959789' , lng :'126.9667958', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '하얀집' , lat : '37.2965344' , lng :'126.969376', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '마포화곱창' , lat : '37.2966388' , lng :'126.9697328', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '월드오징어바다' , lat : '37.296715' , lng :'126.9695879', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '춘천닭갈비칡냉면' , lat : '37.2969566' , lng :'126.9698712', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '인생삼겹' , lat : '37.2971782' , lng :'126.9702071', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '시티파크PC방' , lat : '37.2989452' , lng:'126.9716059', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '삼성당구클럽' , lat : '37.2968395' , lng:'126.9697053', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : 'J당구장' , lat : '37.2965189' , lng:'126.9696217', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '카카오볼링' , lat : '37.2962158' , lng:'126.9698055', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '프로당구장' , lat : '37.2965189' , lng:'126.9696217', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '킹당구장' , lat : '37.2965189' , lng:'126.9696217', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '라이브노래방' , lat : '37.2990185' , lng:'126.9705508', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '비너스노래클럽' , lat : '37.2984757' , lng:'126.9707161', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '대학로노래방' , lat : '37.2982619' , lng:'126.9710611', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '애플노래방' , lat : '37.2981136' , lng:'126.9706376', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '명작노래방' , lat : '37.2981617' , lng:'126.9702535', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '채플린노래연습장' , lat : '37.2978731' , lng:'126.9708046', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '씨엘노래방' , lat : '37.2977889' , lng:'126.9704898', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '쇼노래연습장' , lat : '37.297693' , lng:'126.9701437', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : 'MusicCube' , lat : '37.2972145' , lng:'126.9699787', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '끼노래방' , lat : '37.297088' , lng:'126.9698846', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '와우노래방' , lat : '37.2969675' , lng:'126.9698096', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '비바노래방' , lat : '37.2970875' , lng:'126.9703527', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '무제한노래연습장' , lat : '37.2968783' , lng:'126.9701243', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '명동돈까스' , lat : '37.2969745' , lng:'126.9712329', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '무대뽀핫도그' , lat : '37.2969745' , lng:'126.9712329', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '락휴코인노래연습장' , lat : '37.2969745' , lng:'126.9712329', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '벨라튀니지' , lat : '37.2969745' , lng:'126.9712329', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '한솥도시락' , lat : '37.2970208' , lng:'126.9710709', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '킹고하우스' , lat : '37.297258' , lng:'126.971383', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '제주바다' , lat : '37.298015' , lng:'126.971789', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '샐러디치오도씨' , lat : '37.297094' , lng:'126.971148', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '옛이야기덮밥' , lat : '37.397200' , lng:'126.971353', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '새마을식당' , lat : '37.297607' , lng:'126.971510', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '성대왕돈까스' , lat : '37.297232' , lng:'126.971334', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '아라크네PC' , lat : '37.296702' , lng:'126.971388', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '포크포크매콤돈가스' , lat : '37.296852' , lng:'126.971391', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '이라면' , lat : '37.297036' , lng:'126.971421', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '중경마라탕' , lat : '37.296725' , lng:'126.971317', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '리꼬리또' , lat : '37.297129' , lng:'126.971461', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '우리집밥' , lat : '37.297229' , lng:'126.971660', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '밥은화' , lat : '37.2971777' , lng:'126.9717897', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '밥은직화&마요덮밥' , lat : '37.297125' , lng:'126.971822', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '당구도사' , lat : '37.2968117' , lng:'126.9714821', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '쉬즈베이글' , lat : '37.2970882' , lng:'126.9715708', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '더리터' , lat : '37.2969709' , lng:'126.9714483', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '쥬스스타' , lat : '37.297532' , lng:'126.971667', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '예국향' , lat : '37.297459' , lng:'126.971641', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '알촌' , lat : '37.2969709' , lng:'126.9714483', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '일미닭갈비파전' , lat : '37.2973208' , lng:'126.9716534', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '성대골목식당' , lat : '37.297364' , lng:'126.971663', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '테크노노래방' , lat : '37.297318' , lng:'126.91709', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '아늑' , lat : '37.2969709' , lng:'126.9714483', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '도레미파스타' , lat : '37.2969709' , lng:'126.9714483', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '맘스터치' , lat : '37.298214' , lng:'126.971825', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '아마스빈' , lat : '37.298340' , lng:'126.971836', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '빌보드게임카페' , lat : '37.2983257' , lng:'126.9719138', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '노랑통닭' , lat : '37.2984599' , lng:'126.9719666', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '동대문엽기떡볶이' , lat : '37.298623' , lng:'126.972107', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '아이엠바리스타' , lat : '37.2986777' , lng:'126.9722815', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '보배반점' , lat : '37.2985803' , lng:'126.9721776', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '공차' , lat : '37.298107' , lng:'126.972143', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '기똥찬고기' , lat : '37.2982638' , lng:'126.972465', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag:'img/food.png',type:'Food'},
    {location : '떡의작품' , lat : '37.2980499' , lng:'126.9725255', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '참바른김밥' , lat : '37.298018' , lng:'126.972591', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '제육신꾸미' , lat : '37.298023' , lng:'126.972623', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '하삼동커피' , lat : '37.2979899' , lng:'126.9727338', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '지코바' , lat : '37.2980253' , lng:'126.9728168', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : 'BBQ' , lat : '37.297971' , lng:'126.973042', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '면사무소' , lat : '37.298000' , lng:'126.973201', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '버거운버거' , lat : '37.297918' , lng:'126.973207', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '손커피연구소' , lat : '37.297953' , lng:'126.973113', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '마실' , lat : '37.297927' , lng:'126.973178', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '커피9' , lat : '37.2979893' , lng:'126.97363', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '더홀릭보드게임카페' , lat : '37.2981468' , lng:'126.9721734', description: '율전에서 즐겁게 놀고 싶다면!', imageTag:'img/play.png',type:'Activities'},
    {location : '에그박스' , lat : '37.2979735' , lng:'126.972861', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '싸가정곱창AND담윤순대국' , lat : '37.2980215' , lng:'126.9730966', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '키스커피' , lat : '37.2977121' , lng:'126.9719221', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '할리스커피' , lat : '37.2979488' , lng:'126.9720305', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '힌카쿠' , lat : '37.2979467' , lng:'126.9721954', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '왕빈자삼파전' , lat : '37.2978874' , lng:'126.9725326', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '업텐브로피자' , lat : '37.2978189' , lng:'126.9728773', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '율천회관' , lat : '37.2978269' , lng:'126.9729413', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '일미리금계찜닭' , lat : '37.2978499' , lng:'126.9730449', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '달구꼬꼬' , lat : '37.2977374' , lng:'126.9732809', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '본도시락' , lat : '37.2976957' , lng:'126.9733514', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '한두야밥먹자' , lat : '37.2974881' , lng:'126.9735212', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '성대밥상' , lat : '37.2974693' , lng:'126.9737336', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '짱식당' , lat : '37.297553' , lng:'126.9738679', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '레츠PC' , lat : '37.2975954' , lng:'126.9736442', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '먹거리고을' , lat : '37.297968' , lng:'', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '우이원' , lat : '37.297701' , lng:'126.972101', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '싸움의고수' , lat : '37.297890' , lng:'126.972716', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '행컵' , lat : '37.297741' , lng:'126.973474', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '생순' , lat : '37.297657' , lng:'126.973665', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '커피93.0' , lat : '37.2974833' , lng:'126.9740028', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '하우짓블랙' , lat : '37.2984721' , lng:'126.9722976', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '라면국물편의점포차' , lat : '37.2984678' , lng:'126.9724014', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '청년밥상' , lat : '37.2986036' , lng:'126.972704', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '옛날장터치킨' , lat : '37.298647' , lng:'126.972479', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '소꿉놀이' , lat : '37.298596' , lng:'126.972489', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '동자설렁탕' , lat : '37.298622' , lng:'126.972571', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '아웃닭' , lat : '37.2988709' , lng:'126.9726866', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : 'SKKPC방' , lat : '37.2987674' , lng:'126.9727033', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '정성식탁' , lat : '37.2987473' , lng:'126.9727978', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '베이스먼트8' , lat : '37.2989815' , lng:'126.9728175', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '월매랑삼겹살이랑' , lat : '37.299007' , lng:'126.9728565', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '이자카야심' , lat : '37.2986545' , lng:'126.9735117', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '나우커피' , lat : '37.298810' , lng:'126.972631', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '보드라미' , lat : '37.298778' , lng:'126.974216', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '카페델디아' , lat : '37.2988105' , lng:'126.9743085', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '카페리온' , lat : '37.2988826' , lng:'126.9724352', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '메트로피시방' , lat : '37.298874' , lng:'126.972461', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : 'NotAlone' , lat : '37.2991451' , lng:'126.9731181', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '쟈스민' , lat : '37.299250' , lng:'126.973004', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '모닝사이드' , lat : '37.299437' , lng:'126.973302', description: '율전에서 이색적인 음식을 먹고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '스타뮤오락실' , lat : '37.2991501' , lng:'126.9730094', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '카카오플러스볼링장' , lat : '37.299368' , lng:'126.971954', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/play.png',type:'Activities'},
    {location : '양평해장국' , lat : '37.2904645' , lng:'126.9761564', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '참숮풍천장어' , lat : '37.2902994' , lng:'126.9765187', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '카페 나노' , lat : '37.2910788' , lng:'126.9778939', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '카나호프' , lat : '37.2901005' , lng:'126.9781429', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/beer.png',type:'Beverages'},
    {location : '우락이네딹찝' , lat : '37.2903757' , lng:'126.9785120', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '작은별카페' , lat : '37.2900268' , lng:'126.9778991', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '수수한가' , lat : '37.2897729' , lng:'126.9778196', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '해담' , lat : '37.2898566' , lng:'126.9779805', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '돈치킨' , lat : '37.2898812' , lng:'126.9782722', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '본앤김밥' , lat : '37.2895606' , lng:'126.9785336', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : 'Tous Les Jours Cafe' , lat : '37.2894640' , lng:'126.9786129', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : 'BHC치킨' , lat : '37.2889892' , lng:'126.9788526', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '찜닭에 꽂힌 닭집애' , lat : '37.2890151' , lng:'126.9783413', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '소치COFFEE' , lat : '37.2889356' , lng:'126.9780959', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '부현숯불갈비' , lat : '37.2887462' , lng:'126.9775293', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '이가네 삼대째 손두부' , lat : '37.2890233' , lng:'126.9774146', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '수원숭이' , lat : '37.2895037' , lng:'126.9774206', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '본래순대' , lat : '37.290007' , lng:'126.978260', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '원조명동 찌개마을' , lat : '37.289965' , lng:'126.978218', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '엉클kun커피하우스' , lat : '37.290388' , lng:'126.978495', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/cafe.png',type:'Cafe'},
    {location : '회뜨는수산' , lat : '37.290273' , lng:'126.978466', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : '카츠요이' , lat : '37.290511' , lng:'126.978526', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/food.png',type:'Food'},
    {location : 'DCT Bar' , lat : '37.2989702' , lng:'126.9707434', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/beer.png',type:'Beverages'},
    {location : '태라스비어' , lat : '37.2987543' , lng:'126.9729219', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/beer.png',type:'Beverages'},
    {location : '인생술집' , lat : '37.2981396' , lng:'126.972169', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/beer.png',type:'Beverages'},
    {location : '생활맥주' , lat : '37.2991841' , lng:'126.9705636', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/beer.png',type:'Beverages'},
    {location : '봉구비어' , lat : '37.2988768' , lng:'126.9705336', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/beer.png',type:'Beverages'},
    {location : '더브로' , lat : '37.2981617' , lng:'126.9702535', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/beer.png',type:'Beverages'},
    {location : '양철통' , lat : '37.2979023' , lng:'126.9705852', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/beer.png',type:'Beverages'},
    {location : '맥주클럽' , lat : '37.2975555' , lng:'126.9703847', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/beer.png',type:'Beverages'},
    {location : '아무술집' , lat : '37.2973474' , lng:'126.9699826', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/beer.png',type:'Beverages'},
    {location : '수제맥주 5.0' , lat : '37.2977138' , lng:'126.9693132', description: '율전에서 즐겁게 놀고 싶다면!', imageTag: 'img/beer.png',type:'Beverages'},



   

);
  
  
  function initMap() {   
    

    for (var i = 0; i < areaArr.length; i++) {
  
        var marker = new naver.maps.Marker({
            map: map,
            title: areaArr[i].location, // 지역구 이름 
            position: new naver.maps.LatLng(areaArr[i].lat , areaArr[i].lng), // 지역구의 위도 경도 넣기
            type: areaArr[i].type,
            draggable: false 
        });
        console.log("Marker check")
        
        /* 정보창 */
         var infoWindow = new naver.maps.InfoWindow({
             content: `<div class="infoTab" style="width:200px;text-align:center;padding:10px;border-radius:5px;"><b><div class="imageplace" style="background-image: url(${areaArr[i].imageTag}); background-size: contain; background-repeat: no-repeat;display: block;
             margin-left: auto; margin-right: auto;"></div>`
               + areaArr[i].location + '</b><br>' + areaArr[i].description +
               `<br><button class="submit" onclick=listAdd(${i})>Add</button>`
  
         }); // 클릭했을 때 띄워줄 정보 HTML 작성
        
         markers.push(marker); // 생성한 마커를 배열에 담는다.
         infoWindows.push(infoWindow); // 생성한 정보창을 배열에 담는다.
    }
    

    console.log(markers)
    console.log(infoWindows);
    // This displays all of the markers when the map loads
    
     
    // This opens up the info when we click on the marker
    function getClickHandler(seq) {
        
            return function(e) {  // 마커를 클릭하는 부분
                var marker = markers[seq], // 클릭한 마커의 시퀀스로 찾는다.
                    infoWindow = infoWindows[seq]; // 클릭한 마커의 시퀀스로 찾는다
  
                if (infoWindow.getMap()) {
                    infoWindow.close(); // We close the info tab if we already clicked on it
                } else {
                    infoWindow.open(map, marker); // 표출
                }
            }
      }
  
       // naver.maps.Event.addListener(map, 'click', newMarker(seq))
  
    
        // This function pops up the info when we click on the according marker
    for (var i=0, ii=markers.length; i< ii; i++) { 
        console.log(markers[i] , getClickHandler(i));
        naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i)); // 클릭한 마커 핸들러
    }
  
    var polyline = new naver.maps.Polyline({
      map: map,
      path: [
          new naver.maps.LatLng(37.2997035, 126.9725015),
          new naver.maps.LatLng(37.3005833, 126.9637498),
          new naver.maps.LatLng(37.2989306, 126.9637901),
          new naver.maps.LatLng(37.2944595, 126.9679365),
          new naver.maps.LatLng(37.2907738, 126.9682970),
          new naver.maps.LatLng(37.2904459, 126.9757766),
          new naver.maps.LatLng(37.2881834, 126.9776124),
          new naver.maps.LatLng(37.2905216, 126.9839341),
          new naver.maps.LatLng(37.2986256, 126.9765827),
          new naver.maps.LatLng(37.2997959, 126.9725965),
          new naver.maps.LatLng(37.2997035, 126.9725015),

  
          ]
      });
  }
  
  function listAdd(index) {
  
    console.log(index)
    
    let wrapper = document.getElementById('stage')
    $('#stage').empty()
    
    
    
    hangoutList.push(areaArr[index].location)
    console.log(areaArr[index].location)
    
    let mapList = document.createElement("div");
    mapList.setAttribute("class", "mapList")
    
    hangoutList.forEach((e) =>
        mapList.innerHTML = e,
        mapList.innerHTML = " , "
    )
    mapList.innerHTML = hangoutList
    
    wrapper.appendChild(mapList)
  
  }

  function Remove() {
    
    let wrapper = document.getElementById('stage')
    $('#stage').empty()
    
    
    
    hangoutList.pop()
    console.log(hangoutList)
    
    let mapList = document.createElement("div");
    mapList.setAttribute("class", "mapList")
    
    hangoutList.forEach((e) =>
        mapList.innerHTML = e,
        mapList.innerHTML = " ,"
    )
    mapList.innerHTML = hangoutList
    
    wrapper.appendChild(mapList)
  }

  function Confirm() {
    let schedule = document.getElementById('schedule')

    let final = document.createElement("h3")
    final.innerHTML = hangoutList

    schedule.appendChild(final)


  }

  function markerDisplay(define) {
 
    console.log("we put map as global")

    /*for(let i = 0; i < markers.length; i++) { // markers를 초기화하는 부분
        console.log("We hide the markers on map")
        markers[i].setMap(null) // We make sure that markers doesn't appear on the map
    }*/

    if(define == "All") {
        for(let i = 0; i < markers.length; i++) {
            console.log("We show all markers")
            console.log(markers[i])
            markers[i].setMap(map);
        }      
    }
    else {
        for(let i =0 ; i < markers.length; i++) {
            console.log(markers[i].type)
            if(define == markers[i].type) {
                console.log("show" + markers[i].type)
                markers[i].setMap(map);
            }
            else {
                console.log("hide" + markers[i].type)
                markers[i].setMap(null)
            }
        }
    }

    map.setZoom(15)
  }