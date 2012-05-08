"use strict";

GetHomeBack.Cursor = (function(){
    var cursor = {};

    cursor.init = function(drawer, opts){
        cursor.drawer = drawer;
        cursor.x = 100;
        cursor.y = 100;
        cursor.dx = 20;
        cursor.dy = 20;
        cursor.normal = opts.normal;
        cursor.selected = opts.selected;
        cursor.mode = "normal";
    };

    cursor.start = function(){
        cursor.drawer.canvas.onmousemove = cursor.onMouseMove;
        cursor.drawer.canvas.onclick = cursor.onClick;
        cursor.drawer.canvas.onmousedown = cursor.onMouseDown;
        cursor.drawer.canvas.onmouseup = cursor.onMouseUp;
    };

    cursor.getX = function(e){
        var x = e.pageX + 1;
        x = cursor.drawer.globalToRelativeX(x);
        if (x < 0) x = 0;
        return x;
    };

    cursor.getY = function(e){
        var y = e.pageY + 1;
        y = cursor.drawer.globalToRelativeY(y);
        if (y < 0) y = 0;
        return y;
    };

    cursor.setXY = function(e){
        cursor.x = cursor.getX(e);
        cursor.y = cursor.getY(e);
        cursor.e = {
            x: cursor.x,
            y: cursor.y,
            drawer: cursor.drawer
        };
    };

    cursor.onMouseMove = function(e){
        cursor.setXY(e);
        cursor.drawer.onMouseMove(cursor.e);
        return true;
    };

    cursor.onMouseDown = function(e){
        cursor.mode = "selected";
        cursor.drawer.onMouseDown(cursor.e);
    };
    cursor.onMouseUp = function(e){
        cursor.mode = "normal";
        cursor.drawer.onMouseUp(cursor.e);
    };

    cursor.onClick = function(e){
        cursor.drawer.onClick(cursor.e);
    };

    cursor.draw = function(ctx){
        if (cursor.mode === "normal") {
            if (cursor.normal) {
                ctx.drawImage(cursor.normal, cursor.x, cursor.y);
            }
            else {
                ctx.fillStyle = "yellow";
                ctx.fillRect(cursor.x, cursor.y, cursor.dx, cursor.dy);
            }
        }
        else if (cursor.mode === "selected") {
            if (cursor.selected) {
                ctx.drawImage(cursor.selected, cursor.x, cursor.y);
            }
            else {
                ctx.fillStyle = "red";
                ctx.fillRect(cursor.x, cursor.y, cursor.dx, cursor.dy);
            }
        }
    };

    return cursor;
})();