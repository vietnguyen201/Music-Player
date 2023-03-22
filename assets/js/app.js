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


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isStarted: false,
    songs: [
        {
            name: 'Chạy Về Khóc Với Anh',
            singer: 'Erik',
            path: './assets/music/ChayVeKhocVoiAnh.mp3',
            img: './assets/img/ChayVeKhocVoiAnh.jpg'
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
            path: './assets/music/DaVu.mp3',
            img: './assets/img/DaVu.jpg'
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
            path: './assets/music/HongTranTinhCa.mp3',
            img: './assets/img/HongTranTinhCa.jpg'
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
            path: './assets/music/NhoNguoiHayNho.mp3',
            img: './assets/img/NhoNguoiHayNho.jpg'
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
        document.onscroll = function() {   
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const newCdWidth = cdWidth - scrollTop;

        cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
        cd.style.opacity = newCdWidth / cdWidth;
        }
    
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
            _this.isStarted = true;
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
            if(_this.isStarted) {
            const currentTime = audio.currentTime;
            const duration = audio.duration;
            const percent = Math.floor(currentTime / duration * 100);
            progress.value = percent;    
            }
        }
        // Xử lí khi tua song
        progress.oninput = function(e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
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
    repeatSong: function() {

    },
    start: function() {
        this.defineProperties();

        this.handleEvent();

        this.loadCurrentSong();

        this.render();
    }
}
app.start();

