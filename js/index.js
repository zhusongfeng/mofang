document.addEventListener('touchmove', function (ev) {
    ev.preventDefault();
}, false);

/*REM*/
var fontSize = 100;
~function () {
    var desW = 320,
        winW = document.documentElement.clientWidth;
    fontSize = (winW / desW) * 100;
    document.documentElement.style.fontSize = fontSize + 'px';
}();

/*CUBE*/
~function () {
    var cube = document.querySelector('#cube'),
        menu = document.querySelector('#menu'),
        cubeOuterList = cube.querySelectorAll('.outer>div'),
        cubeInnerList = cube.querySelectorAll('.inner>div'),
        cubeList = [];
    [].forEach.call(cubeOuterList, function (item) {
        cubeList.push(item);
    });
    [].forEach.call(cubeInnerList, function (item) {
        cubeList.push(item);
    });


    //->MENU
    var computedTransform = function (flag) {
        var n = flag ? 1.5 / 2 + 0.5 : 1.5 / 2;
        [].forEach.call(cubeOuterList, function (item, index) {
            var v = null;
            item.style.opacity = flag ? 0.9 : 1;
            switch (index) {
                case 0:
                    v = 'rotateY(0deg) translateZ(' + n + 'rem)';
                    break;
                case 1:
                    v = 'translateZ(' + (n * -1) + 'rem) rotateY(180deg)';
                    break;
                case 2:
                    v = 'rotateY(90deg) translateZ(' + n + 'rem)';
                    break;
                case 3:
                    v = 'rotateY(-90deg) translateZ(' + n + 'rem)';
                    break;
                case 4:
                    v = 'rotateX(90deg) translateZ(' + n + 'rem)';
                    break;
                case 5:
                    v = 'rotateX(-90deg) translateZ(' + n + 'rem)';
                    break;
            }
            item.style.webkitTransform = v;
        });
    };
    menu.isAuto = true;
    menu.addEventListener('click', function () {
        var delayTimer = null;
        if (this.isAuto) {
            this.isAuto = false;
            this.innerHTML = 'AUTO';
            computedTransform(false);

            cube.style.webkitTransform = window.getComputedStyle(cube, null).transform;
            cube.className = 'cube';
            delayTimer = window.setTimeout(function () {
                cube.style.transitionDuration = '.5s';
                cube.style.webkitTransform = 'rotateX(30deg) rotateY(30deg)';
                window.clearTimeout(delayTimer);
            }, 20);
            return;
        }
        this.isAuto = true;
        this.innerHTML = 'SWIPE';
        computedTransform(true);
        cube.className = 'cube cubeRotate';
    }, false);

    //->CLICK
    [].forEach.call(cubeList, function (item) {
        item.addEventListener('click', function () {
            var cName = this.className,
                reg = /(?:^| +)(?:outer|inner)-([a-zA-Z]+)(?: +|$)/i;
            if (reg.test(cName)) {
                cName = reg.exec(cName)[1].toLowerCase();
            }

            var temp = document.querySelector('#temp');
            temp.innerHTML = cName;
        }, false);
    });

    //->SWIPE
    var oBox = document.querySelector('.box'),
        swipeDir = function (changeX, changeY) {
            return Math.abs(changeX) > Math.abs(changeY) ? (changeX < 0 ? 'left' : 'right') : (changeY < 0 ? 'up' : 'down');
        };
    oBox.addEventListener('touchstart', function (ev) {
        cube.style.transitionDuration = '0s';
        var point = ev.touches[0];
        cube['strX'] = point.clientX;
        cube['strY'] = point.clientY;
        if (!cube['rotX']) {
            cube['rotX'] = 30;
            cube['rotY'] = 30;
        }
    }, false);
    oBox.addEventListener('touchmove', function (ev) {
        var point = ev.touches[0];
        var changeX = point.clientX - cube['strX'],
            changeY = point.clientY - cube['strY'],
            dir = swipeDir(changeX, changeY);
        var curRotX = cube['rotX'],
            curRotY = cube['rotY'];
        switch (dir) {
            case 'left':
            case 'right':
                curRotY = curRotY + changeX;
                break;
            case 'up':
            case 'down':
                curRotX = curRotX + changeY;
                break;
        }
        cube['curRotX'] = curRotX;
        cube['curRotY'] = curRotY;
        cube.style.webkitTransform = 'rotateX(' + curRotX + 'deg) rotateY(' + curRotY + 'deg)';
    }, false);
    oBox.addEventListener('touchend', function (ev) {
        cube['rotX'] = cube['curRotX'];
        cube['rotY'] = cube['curRotY'];
    }, false);
}();