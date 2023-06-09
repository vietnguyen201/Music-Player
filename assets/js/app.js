const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playList = $('.playlist');
const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const btnPlay = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const btnNext = $('.btn-next');
const btnPrev = $('.btn-prev');
const btnRandom = $('.btn-random');
const btnRepeat = $('.btn-repeat');
const song = $('.song');
const labelCurrentTime = $('.current-time');
const labelDurationTime = $('.duration-time');
const volume = $('#volume');
const btnVolume = $('.btn-volume');
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isMute: false,
    songs: [
        {
            name: 'Bụi Hoa Giấy',
            singer: 'Trang',
            path: './assets/music/bui-hoa-giay.mp3',
            img: './assets/img/bui-hoa-giay.jpg'
        },
        {
            name: 'Tầng Thượng 102',
            singer: 'Cá Hồi Hoang',
            path: './assets/music/tang-thuong-102.mp3',
            img: './assets/img/tang-thuong-102.jpg'
        },
        {
            name: 'Datmaniac',
            singer: 'Ngày Nào ft. Cá Hồi Hoang',
            path: './assets/music/datmaniac.mp3',
            img: './assets/img/datmaniac.jpg'
        },
        {
            name: 'Bài Hát Của Em',
            singer: 'Uyen Linh Tran',
            path: './assets/music/bai-hat-cua-em.mp3',
            img: './assets/img/bai-hat-cua-em.jpg'
        },
        {
            name: 'She Said',
            singer: 'WEAN ft. NAOMI',
            path: './assets/music/she-said.mp3',
            img: './assets/img/she-said.jpg'
        },
        {
            name: 'Vết Mưa',
            singer: 'Vũ Cát Tường',
            path: './assets/music/vet-mua.mp3',
            img: './assets/img/vet-mua.jpg'
        },
        {
            name: 'Yêu Xa',
            singer: 'Vũ Cát Tường',
            path: './assets/music/yeu-xa.mp3',
            img: './assets/img/yeu-xa.jpg'
        },
        {
            name: 'Bước Qua Mùa Cô Đơn',
            singer: 'Vũ',
            path: './assets/music/buoc-qua-mua-co-don.mp3',
            img: './assets/img/buoc-qua-mua-co-don.jpg'
        },
        {
            name: 'Bước Qua Nhau',
            singer: 'Vũ',
            path: './assets/music/buoc-qua-nhau.mp3',
            img: './assets/img/buoc-qua-nhau.jpg'
        },
        {
            name: '20 Năm Ở Thế Giới',
            singer: 'Thịnh Suy',
            path: './assets/music/20-nam-o-the-gioi.mp3',
            img: './assets/img/20-nam-o-the-gioi.jpg'
        },
        {
            name: 'Chạy Về Khóc Với Anh',
            singer: 'Erik',
            path: './assets/music/chay-ve-khoc-voi-anh.mp3',
            img: './assets/img/chay-ve-khoc-voi-anh.jpg'
        },
        {
            name: 'Cố Giang Tình',
            singer: 'X2X',
            path: './assets/music/co-giang-tinh.mp3',
            img: './assets/img/co-giang-tinh.jpg'
        },
        {
            name: 'Cưới Luôn Được Không',
            singer: 'YuniBoo, Goctoi Mixer',
            path: './assets/music/cuoi-luon-duoc-khong.mp3',
            img: './assets/img/cuoi-luon-duoc-khong.jpg'
        },
        {
            name: 'Dạ Vũ',
            singer: 'Tăng Duy Tân',
            path: './assets/music/da-vu.mp3',
            img: './assets/img/da-vu.jpg'
        },
        {
            name: 'Em Là Nhất Miền Tây',
            singer: 'Võ Lê Mi, Jin Tuấn Nam',
            path: './assets/music/em-la-nhat-mien-tay.mp3',
            img: './assets/img/em-la-nhat-mien-tay.jpg'
        },
        {
            name: 'Hồng Trần Tình Ca',
            singer: 'Cao An, Hắc Áp Tử',
            path: './assets/music/hong-tran-tinh-ca.mp3',
            img: './assets/img/hong-tran-tinh-ca.jpg'
        },
        {
            name: 'Mlem Yêu Anh',
            singer: 'Thảo Phạm, Bìn',
            path: './assets/music/mlem-yeu-anh.mp3',
            img: './assets/img/mlem-yeu-anh.jpg'
        },
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: './assets/music/nevada.mp3',
            img: './assets/img/nevada.jpg'
        },
        {
            name: 'Nhớ Người Hay Nhớ',
            singer: 'Sofia x Khói x Châu Đăng Khoa',
            path: './assets/music/nho-nguoi-hay-nho.mp3',
            img: './assets/img/nho-nguoi-hay-nho.jpg'
        },
    ],
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
                 <div class="song${index === this.currentIndex ? ' active' : ''}" data-index=${index}>  
                    <div class="thumb" style="background-image: url('${song.img}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>
            `
        });
        playList.innerHTML = htmls.join('');
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }  
        })
    },
    handleEvent: function() {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        // Xử lí CD quay / dừng
        const cdThumbAnimation = cdThumb.animate(
            [
            {transform: 'rotate(360deg)'},
            ], 
            {
                duration: 10000,
                iterations: Infinity,
            }
        );
        cdThumbAnimation.pause();


        //Xử lí phóng to/thu nhỏ CD
        // document.onscroll = function() {   
        // const scrollTop = window.scrollY || document.documentElement.scrollTop;
        // const newCdWidth = cdWidth - scrollTop;

        // cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
        // cd.style.opacity = newCdWidth / cdWidth;
        // }
    
        //Xử lí khi click play
        btnPlay.onclick = function () {
            if(_this.isPlaying) {
                audio.pause();
            }else {
                audio.play();
            }
        }

        // Xử lí khi song được play
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimation.play();
        }

        // Xử lí khi song được pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimation.pause();
        }

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if(audio.duration) {
            const currentTime = audio.currentTime;
            const duration = audio.duration;
            const percent = Math.floor(currentTime / duration * 100);
            progress.value = percent;

                //Xử lí Song time
            labelCurrentTime.textContent = _this.formatTime(currentTime);
            labelDurationTime.textContent = _this.formatTime(duration);        
            }
        }
        // Xử lí khi tua song
        progress.oninput = function(e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }

        //Xử lí khi thay đổi volumn
        volume.oninput = function(e) {
            const volumnNow = e.target.value / 100;
            audio.volume = volumnNow;
            if(audio.volume !=0) {
                btnVolume.classList.remove('mute')
            }else {
                btnVolume.classList.add('mute')
            }
        }

        //Xử lí khi icon volume click
        btnVolume.onclick = function() {
            _this.isMute = !_this.isMute;
            btnVolume.classList.toggle('mute', _this.isMute);
            volume.value = _this.isMute ? 0 : 50;
            audio.volume = _this.isMute ? 0 : 0.5;
        }
        
        //Khi next song được click
        btnNext.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            if (_this.isRepeat) {
                _this.isRepeat =!_this.isRepeat;
                btnRepeat.classList.remove('active');
            }
            _this.activeSong();
            _this.scrollIntoView();
            audio.play();
        }

        //Khi prev song được click
        btnPrev.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }  
            if (_this.isRepeat) {
                _this.isRepeat =!_this.isRepeat;
                btnRepeat.classList.remove('active');
            }         
            _this.activeSong();
            _this.scrollIntoView();
             audio.play();
        }
        
        //Khi random song được click
        btnRandom.onclick = function() {
            _this.isRandom = !_this.isRandom;
            btnRandom.classList.toggle('active', _this.isRandom);
        }

        // Xử lí repeat song
        btnRepeat.onclick = function () {
            _this.isRepeat =!_this.isRepeat;
            btnRepeat.classList.toggle('active', _this.isRepeat);
        }

        // Xử lí next song khi audio ended
        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play();
            } else {
                btnNext.click();
            }
        }

        // Lắng nghe hành vi người dùng click vào playlist
        playList.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)');
            if(songNode || e.target.closest('.option')) {
                // Xử lí khi nhấn vào song
                if(songNode) {
                    _this.currentIndex = songNode.dataset.index;
                    _this.loadCurrentSong();
                    audio.play();
                    _this.activeSong();
                }
            }
        }       
    
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `URL(${this.currentSong.img}`;
        audio.src = this.currentSong.path;
    },
    nextSong: function() {
        this.currentIndex++;
        const listLength = this.songs.length;
        if (this.currentIndex >= listLength) {
            this.currentIndex = 0
        }
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--;
        const listLength = this.songs.length;
        if (this.currentIndex < 0) {
            this.currentIndex = listLength - 1;
        }
        this.loadCurrentSong();
    },
    activeSong: function () {
        const allSong = $$('.song');
        const currentSong = $(`[data-index='${this.currentIndex}']`)
        allSong.forEach((song) => {
            song.classList.remove('active');
        });
        currentSong.classList.add('active')
      },
      scrollIntoView: function () {
        $('.song.active').scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });
      },
    playRandomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex)

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    formatTime: function(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10? '0' : ''}${seconds}`;
    },
    start: function() {
        this.defineProperties();

        this.handleEvent();

        this.loadCurrentSong();

        this.render();
    }
}
app.start();

