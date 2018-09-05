
function getLocation(){
    map.getLocation({
        accuracy: '100m',
        autoStop: true,
        filter: 1
    }, function(ret, err){
        if(ret.status){
            lat = ret.lat;
            lon = ret.lon;
            getNameFromCoords(lat, lon);

            //设置地图中心
            map.setCenter({
                coords: {
                    lon: lon,
                    lat: lat
                },
                animation:true
            });
        }
    });
}

function openMap(y, height){
    map.open({
        rect: {
            x: 0,
            y: y,
            w: 'auto',
            h: height
        },
        zoomLevel: 12,
        showUserLocation: false,
        fixedOn: api.frameName,
        fixed: true
    }, function(ret){
        if(ret){
            getLocation();
        }
    });
}

function getNameFromCoords(lat, lon){
    map.getNameFromCoords({
        lon: lon,
        lat: lat
    },function(ret,err){
        if(ret.status){
            address = ret.address;
        }
    });
}
