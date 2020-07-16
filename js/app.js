const addTask = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');

// ########## 追加 ###########
(function(){
    // 初期化処理
    // ローカルストレージに格納されている値を取得し、リストを生成する
    for(var key in localStorage){
        var html = localStorage.getItem(key);
        if (html) {
            list.innerHTML += localStorage.getItem(key);
        }
    }
})();

const saveTaskToLocalStorage = (task, html) => {
    // null は、localStorage に保存しない
    if(html){
        // localStorage は、0 から始まる
        localStorage.setItem(task, html);
        return;
    }
    return;
}

const deleteTaskFromLocalStorage = task => {
    localStorage.removeItem(task);
    return;
}

// ###############################

const createTodoList = task => {
    // HTML テンプレートを生成
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${task}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;

    list.innerHTML += html;
    // ########## 追加 ###########
    saveTaskToLocalStorage(task, html); 
}

addTask.addEventListener('submit', e => {
    // デフォルトのイベントを無効
    e.preventDefault();

    // タスクに入力した値を空白を除外して格納
    const task = addTask.add.value.trim();
    if(task.length) {
        // Todo List の HTML を作成
        createTodoList(task);
        // タスクに入力した文字をクリア
        addTask.reset();
    }
});

// 削除機能
list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')){
        e.target.parentElement.remove();
        // ########## 追加 ###########
        const task = e.target.parentElement.textContent.trim()
        deleteTaskFromLocalStorage(task);
    }
});

const filterTasks = (term) => {

    Array.from(list.children)
        .filter((todo) => !todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.add('filtered'));

    Array.from(list.children)
        .filter((todo) => todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.remove('filtered'));
};



$(function(){
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var w = now.getDay();
    var wd = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    $('.date').text(m + '/' + d + '(' + wd[w] + ')');
    });
    $('.date').fadeIn(3000);

$(document).ready(function () {
    'use strict'

    const APIKEY = "26383210e4b15cc639151c00a7b154f6";

    //翌日9時のデータの場所を割り出す
    const date = new Date();
    const nowHour = date.getHours();

    //現在位置の取得ができるかどうか
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);

        // 現在位置の取得に成功した場合
        function success(position) {
            const positionData = position.coords;

            //緯度経度の取得と表示
            const lat = positionData.latitude;
            const lon = positionData.longitude;
            // $('.location').text('(' + Math.floor(lat * 100) / 100 + ',' + Math.floor(lon * 100) / 100 + '）');
            const lati = Math.floor(lat * 100) / 100 
            const long = Math.floor(lon * 100) / 100
            if (lati == 34.84 && long == 135.66){
                $('.location').text('HIRAKATA')
            }else{
                 $('.location').text('(' + Math.floor(lat * 100) / 100 + ',' + Math.floor(lon * 100) / 100 + '）');
            }
            $('.location').fadeIn(3000);

            //現在の天気データを呼び出し
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather",
                dataType: "jsonp",
                data: "lat=" + lat + "&lon=" + lon + "&appid=" + APIKEY,
                //天気データ呼び出し成功時の挙動
                success: function (data) {                
                    if (data.weather[0].main === "Clear") {
                        $('.weatherMain').css('background-image', 'url(img/Sunny.jpg)');
                        $('.dayWeather').text("SUNNY");
                        $('.dayWeather').fadeIn(3000);
                    } else if (data.weather[0].main === "Rain") {
                        $('.weatherMain').css('background-image', 'url(img/Rain.jpg)');
                        $('.dayWeather').text("RAIN");
                        $('.dayWeather').fadeIn(3000);
                    } else if (data.weather[0].main === "Clouds") {
                        $('.weatherMain').css('background-image', 'url(img/Sunny.jpeg)');
                        $('.dayWeather').text("CLOUDY");
                        $('.dayWeather').fadeIn(3000);
                    } else if (data.weather[0].main === "Snow") {
                        $('.weatherMain').css('background-image', 'url(img/Snowy.jpg)');
                        $('.dayWeather').text("SNOWY");
                        $('.dayWeather').fadeIn(3000);
                    }

                    //各データの表示
                    $('.nowTemp').text(Math.floor((data.main.temp - 273.15) * 10) / 10 + "℃");
                    $('.nowTemp').fadeIn(4000);

                    
                }
            });

            
            
            
        }

        //現在位置の取得に失敗した場合
        function error(error) {
            alert("位置情報が取得できなかったため、大阪の天気を表示します");
            $('.location').text('OSAKA');
            $('.location').fadeIn(2000);

            OsakaWeather();

        }
        //現在位置がそもそも取得できない場合
    } else {
        alert("位置情報が取得できなかったため、大阪の天気を表示します");
        $('.location').text('OSAKA');

        OsakaWeather();
    }

    //大阪の天気
    function OsakaWeather() {

        //現在の天気データ呼び出し
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather",
            dataType: "jsonp",
            data: "q=Osaka,jp&appid=" + APIKEY,
            //天気データ呼び出し成功時の挙動
            success: function (data) {
                if (data.weather[0].main === "Sunny" || data.weather[0].main === "Clear") {
                    $('.weatherMain').css('background-image', 'url(img/Sunny.jpg)');
                    $('.dayWeather').text("SUNNY");
                    $('.dayWeather').fadeIn(3000);

                } else if (data.weather[0].main === "Rain") {
                    $('.weatherMain').css('background-image', 'url(img/Rain.jpg)');
                    $('.dayWeather').text("RAIN");
                    $('.dayWeather').fadeIn(3000);

                } else if (data.weather[0].main === "Clouds") {
                    $('.weatherMain').css('background-image', 'url(img/Cloudy.jpg)');
                    $('.dayWeather').text("CLOUDY");
                    $('.dayWeather').fadeIn(3000);

                } else if (data.weather[0].main === "Snow") {
                    $('.weatherMain').css('background-image', 'url(img/Snowy.jpg)');
                    $('.dayWeather').text("SNOWY");
                    $('.dayWeather').fadeIn(3000);

                }

                //各データの表示
                $('.nowTemp').text(Math.floor((data.main.temp - 273.15) * 10) / 10 + "℃");
                $('.nowTemp').fadeIn(5000);

 

            }
        });

    }
}());


