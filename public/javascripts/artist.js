update_artist = function(r){
    $('#artist_info').html(r.info_html);
    $('#album').html(r.album_html);
    $('#discussions').html(r.discussions_html);
    $('#board').html(r.board_html);
    $('#contact').html(r.contact_html);
    load_event_monitor($('#artist_info,#album,#discussions,#board,#contact'));
}
Douban.init_unconnect_artist = function(o) {
    $(o).click(function(){
        if(confirm("真的要" + o.title + "吗?")) {
            $.getJSON(artist_url+"unconnect_artist",update_artist);
        }
        return false;
    })
}

Douban.init_connect_artist = function(o) {
    $(o).click(function(){
        $.getJSON(artist_url+"connect_artist",update_artist);
        return false;
    })
}

Douban.init_ban_button = function(o) {
    $(o).click(function(){
        $('#ban_form').show();
        $('#ban_button').hide();
        return false;
    })
    $('#ban_cancel').click(function(){
        $('#ban_form').hide();
        $('#ban_button').show();
        return false;
    })
}
Douban.init_down_title = function(o){
    trace($('.down_mp3').length);
    if(!$('.down_mp3').length) $(o).css('visibility','hidden');
}
Douban.init_hidden_mod = function(o){
    var h2 = $(o).parents('h2');
    $(o).click(function(){
        var isd = $(o).html() == '隐藏本区域';
        $(o).html(isd ? '显示本区域' : '隐藏本区域');
        $.post(artist_url+'mod_show',{mod:h2.parent()[0].id,display:!isd}, function(r){
            var p = h2.parent();
            p.html(r);
            (isd ? p.addClass : p.removeClass).call(p,'hiddenmod');
            load_event_monitor(p);
        });
        return false;
    })
}
function playsong(n, hold){
    playnext = n+1<sdata.length ?  
        function(){playsong(n+1)} : function(){playsong(0, true)};
    mplayer = document.getElementById('mplayer');
    $('tr','#song').removeClass('selsong');
    $('#tr'+n).addClass('selsong');
    if(mplayer != undefined && mplayer.playsong != undefined){
        mplayer.playsong(sdata[n].url, sdata[n].id, hold?0:1, sdata[n].title, sdata[n].isdemo);
        return;
    }

    var swfurl = '/javascripts/mainplayer.swf';
    var params = {wmode:"transparent"}
    var flashvars = {
        url: sdata[n].url,
        autoplay: (hold?'0':'1'),
        songid: sdata[n].id, 
        isdemo: (sdata[n].isfull=='True'?'0':'1'), 
        descri: sdata[n].title
    }
    var attributes = {
        id: "mplayer",
        name: "mplayer"
    };
    swfobject.embedSWF(swfurl, "mainplayer", "347", "40", "9.0.0","/javascripts/expressInstall.swf", flashvars, params, attributes);

}



