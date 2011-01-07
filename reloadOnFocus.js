/*
  ---------------------------------------------------------------------------
  ROF reloadOnFocus | Reload browser window on focus
  ---------------------------------------------------------------------------
  https://github.com/hugorodrigues/rsynca
  ---------------------------------------------------------------------------
  This program is free software. It comes without any warranty, to
  the extent permitted by applicable law. You can redistribute it
  and/or modify it under the terms of the Do What The Fuck You Want
  To Public License, Version 2, as published by Sam Hocevar. See
  http://sam.zoy.org/wtfpl/COPYING for more details.
  ---------------------------------------------------------------------------
 */


var ROF = {

    init: function (){

        document.onkeydown= ROF.key.down;
        document.onkeyup= ROF.key.up;

        window.onfocus = function()
        {
            if(ROF.cookies.read('globalPower') == false) return;

            //@hack: IE/FF focus the page onLoad, lets skip it.
            if ((navigator.userAgent.indexOf("Firefox")!=-1 || navigator.userAgent.indexOf("MSIE")!=-1 )&&  typeof ffHack === "undefined") {
                ffHack = true;
                return;
            }

            window.location.reload(true);
        }

        
       
    },

    // Ui Controls
    ui : {
        obj : '',
        init : function()
        {
            console.log('initui');
            var ROFdiv = document.createElement('div');

            ROFdiv.setAttribute('id', 'ROFdiv');

            ROFdiv.style.position = "absolute";
            ROFdiv.style.zIndex = "9999999";
            ROFdiv.style.display = "none";
            
            ROFdiv.style.top = '10px';
            ROFdiv.style.left = '10px';
            ROFdiv.style.padding = "10px";

            ROFdiv.style.background = "#B81900";
            //ROFdiv.style.background = "-webkit-gradient(linear, left top, left bottom, color-stop(0%,#7d7e7d), color-stop(100%,#0e0e0e))";
            //ROFdiv.style.background = "-moz-linear-gradient(top, #7d7e7d 0%, #0e0e0e 100%)";
            
            ROFdiv.style.color = "white";
            ROFdiv.style.fontFamily = 'Arial,Verdana';
            ROFdiv.style.fontSize = '14px';

            ROFdiv.style.borderRadius="4px";
            ROFdiv.style.MozBorderRadius=ROFdiv.style.borderRadius;

            ROFdiv.style.boxShadow='0px 0px 5px #999';
            ROFdiv.style.WebkitBoxShadow=ROFdiv.style.boxShadow;
            ROFdiv.style.MozBoxShadow = ROFdiv.style.boxShadow;


            document.body.appendChild(ROFdiv);
            ROF.ui.obj = document.getElementById('ROFdiv');

            return;
        },
        status: function()
        {
            if (!ROF.ui.obj) ROF.ui.init();
            
            if (ROF.cookies.read('globalPower') === true)
            {
                ROF.ui.obj.style.background = "#3DB800";
                ROF.ui.msg('reloadOnFocus is enabled.');
            } else
            {
                ROF.ui.obj.style.background = "#B81900";
                ROF.ui.msg('reloadOnFocus is disabled.');
            }
            clearInterval(ROF.ui.timer);
            ROF.ui.timer = setTimeout(ROF.ui.hide,1000);
        },
        msg : function(msg)
        {
            if (!ROF.ui.obj) ROF.ui.init();
            
            ROF.ui.obj.innerHTML = msg;
            ROF.ui.obj.style.display = "block";
            return;
        },
        hide : function()
        {
            ROF.ui.obj.style.display = "none";
        }
    },


    // Basic Key handling
    key : {
        isCtrl : false,
        up: function(e)
        {
            e = e || window.event;

            // console.log(e);
            if(e.keyCode == 17) ROF.key.isCtrl=false;
        },

        down:function(e)
        {
            e = e || window.event;

            if(e.keyCode == 17) ROF.key.isCtrl=true;

            // CTRL+ENTER - Power switch
            if(e.keyCode == 13 && ROF.key.isCtrl == true)
            {
                ROF.cookies.create('globalPower',!Boolean(ROF.cookies.read('globalPower')));
                ROF.ui.status();
            }
        }
    },


    // cookies - Copy/Paste from http://www.quirksmode.org/js/cookies.html
    cookies : {
        create : function(name,value)
        {
            days = 1;
            if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
            }
            else var expires = "";
            document.cookie = name+"="+value+expires+"; path=/";
        },
        read : function(name)
        {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0)
                {
                    tmp = c.substring(nameEQ.length,c.length);
                    if (tmp == 'true') tmp = true;
                    if (tmp == 'false') tmp = false;
                    return tmp
                }

            }
            return null;
        },
        erase : function(name)
        {
            ROF.cookies.create(name,"",-1);
        }
    }

    
}



    ROF.init();
