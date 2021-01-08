const pages = document.querySelectorAll('.carousel_page');
const prevBtn = document.querySelector('.prev_btn');
const nextBtn = document.querySelector('.next_btn');
const indicators = document.querySelectorAll('.indicator');
const view_btn = document.querySelector('.view_btn');
const back_btn = document.querySelector('.back_btn');
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
        console.log(flag);
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
            console.log(e.code);
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
        if (indicators[i].classList.contains('active')) { } else {
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
        } else {

        }


    })
    pages[i].addEventListener('touchend', (e) => {
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
