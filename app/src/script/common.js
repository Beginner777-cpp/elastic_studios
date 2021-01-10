const pages = document.querySelectorAll('.carousel_page');
const prevBtn = document.querySelector('.prev_btn');
const nextBtn = document.querySelector('.next_btn');
const indicators = document.querySelectorAll('.indicator');
const view_btn = document.querySelector('.view_btn');
const back_btn = document.querySelector('.back_btn');
const header = document.querySelector('.header');
var activePage = 0;
var flag = true;
prevBtn.addEventListener('click', (btn) => {
    move(prevBtn);
    prevBtn.disabled = true;
    setTimeout(() => {
        prevBtn.disabled = false;
    }, 1000);

})

nextBtn.addEventListener('click', (btn) => {
    move(nextBtn);
    nextBtn.disabled = true;
    setTimeout(() => {
        nextBtn.disabled = false;
    }, 1000);
})

for (let i = 0; i < pages.length; i++) {
    pages[i].addEventListener('wheel', (e) => {
        if (flag === true) {
            if (e.deltaY >= 100) {
                move(nextBtn);
            } else if (e.deltaY <= -100) {
                move(prevBtn);
            }
            flag = false;
            setTimeout(() => {
                flag = true;
            }, 1000);
        }
    })

}
flag = true;
window.addEventListener('keydown', (e) => {
    if (flag === true) {
        if (e.code == 'ArrowDown') {
            move(nextBtn);
        } else if (e.code == 'ArrowUp') {
            move(prevBtn);
        }
        flag = false;
        setTimeout(() => {
            flag = true;
        }, 1000);
    }

})

for (let i = 0; i < indicators.length; i++) {
    indicators[i].addEventListener('click', () => {
        if (indicators[i].classList.contains('active')) {} else {
            if (i > activePage) {
                for (let j = activePage; j < i; j++) {
                    move(nextBtn);
                }
            } else {
                for (let j = activePage; j > i; j--) {
                    move(prevBtn);
                }
            }
        }
    })
}

var startY;
for (let i = 0; i < pages.length; i++) {
    pages[i].addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    })
    pages[i].addEventListener('touchmove', (e) => {
        if (flag == true) {
            var change = startY - e.touches[0].clientY;
            pages[i].style.transition = '0s';
            pages[i].style.top = `${-change}px`;
            if (i < pages.length) {
                if (change > 0 && i != pages.length - 1) {
                    pages[i + 1].style.transition = '0s';
                    pages[i + 1].style.top = `${pages[i + 1].clientHeight - change}px`;
                } else {
                    if (i > 0) {
                        pages[i - 1].style.transition = '0s';
                        pages[i - 1].style.top = `-${pages[i - 1].clientHeight + change}px`;
                    }
                }
            } else {}
        }

    })
    pages[i].addEventListener('touchend', (e) => {
        if (flag == true) {
            if (i < pages.length) {
                if (pages[i].offsetTop < 0) {
                    if (i != pages.length - 1) {
                        if (Math.abs(pages[i].offsetTop) > pages[i].clientHeight / 3) {
                            pages[i].style.transition = '1s';
                            pages[i].style.top = `-100%`;
                            pages[i + 1].style.transition = '1s';
                            pages[i + 1].style.top = `0`;
                            activePage++;
                            indicators[activePage].classList.add('active');
                            indicators[activePage - 1].classList.remove('active');

                        } else {
                            pages[i].style.transition = '1s';
                            pages[i].style.top = `0`;
                            pages[i + 1].style.transition = '1s';
                            pages[i + 1].style.top = `100%`;
                        }
                    } else {
                        pages[i].style.transition = '1s';
                        pages[i].style.top = `0`;
                    }

                } else {
                    if (i != 0) {
                        if (Math.abs(pages[i].offsetTop) > pages[i].clientHeight / 3) {
                            pages[i].style.transition = '1s';
                            pages[i].style.top = `100%`;
                            pages[i - 1].style.transition = '1s';
                            pages[i - 1].style.top = `0`;
                            activePage--;
                            indicators[activePage].classList.add('active');
                            indicators[activePage + 1].classList.remove('active');
                        } else {
                            pages[i].style.transition = '1s';
                            pages[i].style.top = `0`;
                            pages[i - 1].style.transition = '1s';
                            pages[i - 1].style.top = `-100%`;
                        }
                    } else {
                        pages[i].style.transition = '1s';
                        pages[i].style.top = `0`;
                    }

                }
            } else {
                pages[i].style.transition = '1s';
                pages[i].style.top = `0`;
            }
        }

    })
}







function move(e) {
    if (e == prevBtn) {
        activePage--;
        if (activePage < 0) {
            activePage = 0;
        } else {
            pages[activePage].classList.add('active');
            pages[activePage + 1].classList.remove('active');
            pages[activePage + 1].style = 'top: 100%';
            pages[activePage].style = 'top: 0';
            indicators[activePage].classList.add('active');
            indicators[activePage + 1].classList.remove('active');
        }

    } else if (e == nextBtn) {
        activePage++;
        if (activePage >= pages.length) {
            activePage = pages.length - 1;
        } else {
            pages[activePage].classList.add('active');
            pages[activePage - 1].classList.remove('active');
            pages[activePage - 1].style = 'top: -100%';
            pages[activePage].style = 'top: 0';
            indicators[activePage].classList.add('active');
            indicators[activePage - 1].classList.remove('active');
        }

    }
}
view_btn.addEventListener('click', () => {
    indicators[1].click();
})
back_btn.addEventListener('click', () => {
    indicators[0].click();
})

const look_btn = document.querySelectorAll('.look_btn');

for (let i = 0; i < look_btn.length; i++) {
    look_btn[i].addEventListener('click', () => {
        flag = false;
        header.style.transition = '1s';
        header.style.top = '-100%';
        document.querySelectorAll('.page2_inner_content')[i].style.opacity = 0;
        document.querySelectorAll('.page2_inner')[i].style.border = 'none';
        document.querySelector('.carousel_indicators').style.transition = '1s';
        document.querySelector('.carousel_indicators').style.right = '-100%';
        look_btn[i].style.opacity = 0;
        pages[activePage].addEventListener('mousedown', (e) => {
            if (flag == false) {

            }
            var mouseStartX = e.screenX;
            var mouseStartY = e.screenY;
            pages[activePage].addEventListener('mousemove', (e1) => {
                console.log(e);
                pages[activePage].style.transition = '0s';
                pages[activePage].style.backgroundSize = 'contain';
                pages[activePage].style.backgroundPosition = `${-e1.clientX + mouseStartX}px ${-e1.clientY + mouseStartY}px`;
            })
        })
    })
}


/*====================== double click for mobile =====================*/
var timeClick = 0;
for (let i = 0; i < pages.length; i++) {
    pages[i].addEventListener('click', () => {
        if (timeClick == 0) {
            timeClick = new Date().getTime();
        } else {
            console.log();
            if ((new Date().getTime()) - timeClick < 500) {
                console.log('dblclick');
                flag = true;
                header.style.top = '0';
                document.querySelectorAll('.page2_inner_content')[activePage - 1].style.opacity = 1;
                document.querySelectorAll('.page2_inner')[activePage - 1].style.border = '2px solid #CCAF40';
                document.querySelector('.carousel_indicators').style.transition = '1s';
                document.querySelector('.carousel_indicators').style.right = '0.5%';
                look_btn[activePage - 1].style.opacity = 1;
                timeClick = 0;
            } else {
                timeClick = new Date().getTime();
            }
        }
    })
}


/*====================== /double click for mobile =====================*/