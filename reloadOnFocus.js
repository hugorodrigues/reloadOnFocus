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
            var ROFdiv = document.createElement('div');

            ROFdiv.setAttribute('id', 'ROFdiv');

            ROFdiv.style.position = "fixed";
            ROFdiv.style.top = '5px';
            ROFdiv.style.left = '5px';
            ROFdiv.style.background = "#1F1F1F";
            ROFdiv.style.color = "white";
            ROFdiv.style.fontFamily = '"Trebuchet MS",Verdana,sans-serif';
            ROFdiv.style.fontSize = '12px';
            ROFdiv.style.border = "3px solid #CF2626";
            ROFdiv.style.padding = "5px";
            ROFdiv.style.zIndex = "9999999";

            document.body.appendChild(ROFdiv);
            ROF.ui.obj = document.getElementById('ROFdiv');

            return;
        },
        msg : function(msg)
        {
            if (!ROF.ui.obj) ROF.ui.init();
            ROF.ui.obj.style.display = "block";
            ROF.ui.obj.innerHTML = msg;
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
                //console.log('Power: '+ROF.cookies.read('globalPower'));
                ROF.ui.msg('Enabled? '+ROF.cookies.read('globalPower'));
                setTimeout(ROF.ui.hide,1000);
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