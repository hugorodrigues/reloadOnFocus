/*
  ---------------------------------------------------------------------------
  reloadOnFocus | Reload browser window on focus
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

window.onfocus = function()
{
    //@hack: FF focus the page onLoad, lets skip it.
    if (navigator.userAgent.indexOf("Firefox")!=-1 &&  typeof ffHack === "undefined") {
        ffHack = true;
        return;
    }

    window.location.reload(true);
}