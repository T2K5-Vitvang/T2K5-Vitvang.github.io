


const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const check = $('.check')
const check_ball = $('.check-ball')
const control = $('.control')
const playBtn = $('.btn-toggle-play')
const audio = $('#audio')
const playList = $('.playlist__songs')
const nextBtn = $('.right')
const prevBtn = $('.left')
const randomBtn = $('.random')
const repeatBtn = $('.repeat')
const range = $('#range')
const song = $('.song')
const timeLeft = $('.time_left')
const timeRight = $('.time_right')
const navbar = $('.navbar')
const navbarBtn = $('.arrow-dis')
const navbarBlock = $('.navbar_block')
const navbarIconBtn = $('.navbar-icon')
const app = {
    currentIndex: 0,
    isPlaying: false,
    checkBool: false,
    playingBool: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            id: 1,
            title: "Xin Đừng Nhắc Máy",
            artist: "Bray X Han Sara",
            time: "244",
            path: "./assets/music/y2mate.com - XIN ĐỪNG NHẤC MÁY  B RAY X HAN SARA OFFICIAL MV.mp3"
            
        },
        {
            id: 2,
            title: "Ex's Hate Me",
            artist: "B Ray x Masew",
            time: "267",
            path: "./assets/music/y2mate.com - Exs Hate Me  B Ray x Masew Ft AMEE  Official MV.mp3"
        },
        {
            id: 3,
            title: "Tết Đong Đầy",
            artist: "Kay Trần x Nguyễn Khoa x Duck V",
            time: "243",
            path: "./assets/music/y2mate.com - Tết Đong Đầy  Kay Trần x Nguyễn Khoa x Duck V x Homieboiz Ness Mix.mp3"
        },
        {
            id: 4,
            title: "Trên Tình Bạn Dưới Tình Yêu",
            artist: "Min",
            time: "293",
            path: "./assets/music/y2mate.com - MIN  TRÊN TÌNH BẠN DƯỚI TÌNH YÊU  OFFICIAL MUSIC VIDEO.mp3"
        },
        {
            id: 5,
            title: "Bánh Mì Không",
            artist: "ĐạtG x DuUyên",
            time: "272",
            path: "./assets/music/y2mate.com - Bánh Mì Không  ĐạtG x DuUyên  OFFICIAL MV.mp3"
        },
        {
            id: 6,
            title: "Gieo Quẻ",
            artist: "Hoàng Thuỳ Linh & ĐEN",
            time: "205",
            path: "./assets/music/y2mate.com - Gieo Quẻ  Hoàng Thuỳ Linh  ĐEN  Yến Napun Cover.mp3"
        },
        {
            id: 7,
            title: "Truyền Thái Y",
            artist: "Ngô Kiến Huy",
            time: "179",
            path: "./assets/music/y2mate.com - Truyền Thái Y  Ngô Kiến Huy x Masew x Đinh Hà Uyên Thư  Official Music Video.mp3"
        },
        {
            id: 8,
            title: "2 Phút Hơn",
            artist: "Pháo x Masew",
            time: "177",
            path: "./assets/music/y2mate.com - 2 Phút Hơn  Pháo x Masew.mp3"
        },
        {
            id: 9,
            title: "05 (Không Phai)",
            artist: "Tăng Duy Tân x T.R.I x Phong Max",
            time: "226",
            path: "./assets/music/y2mate.com - 05 Không Phai  Tăng Duy Tân x TRI x Phong Max  phiên bản Phong Max .mp3"
        },
        {
            id: 10,
            title: "Yêu Từ Đâu Mà Ra",
            artist: "Lil ZPOET",
            time: "242",
            path: "./assets/music/y2mate.com - Yêu Từ Đâu Mà Ra  Lil ZPOETLyrics VideoMeens.mp3"
        }
    ],
    render: function() {
        const htmls = this.songs.map((song,index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <span class="index">${index + 1}</span>
                    <span class="title">${song.title}</span>
                    <span class="artist">${song.artist}</span>
                    <span class="time">${song.time}</span>
                </div>
            `
        }) 
        playList.innerHTML = htmls.join('')
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    loadCurrentSong: function() {
        audio.src = this.currentSong.path
    },
    handleEvent: function() {
        const _this = this

        // LightDark
        check.onclick = function() {
            if(_this.checkBool) {
                _this.checkBool = false;
                check_ball.style.left = 2 + 'px'
                check_ball.style.backgroundColor = '#FFFFFF'
                check.style.backgroundColor = '#000000'   
            }
            else {
                _this.checkBool = true
                check_ball.style.left = 22 + 'px'
                check_ball.style.backgroundColor = '#000000'
                check.style.backgroundColor = '#FFFFFF'
            }
            $('.app').classList.toggle('dark-theme', _this.checkBool)
        }
        // Xu li play/pause
        playBtn.onclick = function() {
            if(_this.isPlaying === false) {
                audio.play()
            } else {
                audio.pause()
            }
        }
        // Update Time song
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const rangePercent = Math.floor(audio.currentTime / audio.duration * 100)
                range.value = rangePercent
                _this.loadTime()
            }
        }
        // Onchange
        range.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
            _this.loadTime()
        }
        // Play
        audio.onplay = function() {
            control.classList.add('playing')
            _this.isPlaying = true
            _this.loadTime()

        }
        // Pause
        audio.onpause = function() {
            control.classList.remove('playing')
            _this.isPlaying = false
        }
        // Next Song
        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            app.loadTime()

        }
        // Prev Song
        prevBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            app.loadTime()
        }
        // Random Song
        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
        }
        // Repeat song
        repeatBtn.onclick = function(e) {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }
        // Audio ended
        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play()
            }
            else {
                nextBtn.click()
            }
        }
        // Playlist
        playList.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active')
            if(songNode) {
                _this.currentIndex = Number(songNode.dataset.index)
                _this.loadCurrentSong()
                audio.play()
                _this.render()
                app.loadTime()
            }
        }
        // Navbar
        navbarBtn.onclick = function() {
            navbar.style.left = 0
            navbarBlock.classList.add('block')
        }
        // Close navbar
        navbarIconBtn.onclick = function() {
            navbar.style.left = -100 + '%'
            navbarBlock.classList.remove('block')
        }
        navbarBlock.onclick = function() {
            navbar.style.left = -100 + '%'
            navbarBlock.classList.remove('block')
        }
    },
    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while(newIndex === this.currentIndex)
        this.currentIndex = newIndex
        app.loadTime()
        this.loadCurrentSong()
    },
    nextSong: function() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        app.loadTime()
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
        app.loadTime()
    },
    loadTime: function() {
        if(timeRight.textContent === '' || timeRight.textContent == NaN) {
            timeLeft.textContent = 0
            timeRight.textContent = app.songs[0].time
        }
        else {
        timeLeft.textContent = Math.floor(audio.currentTime)
        timeRight.textContent = Math.floor(audio.duration)
        }
    },
    scrollNavbar: function() {

    },
    start: function() {
        this.defineProperties()
        this.loadCurrentSong()
        this.handleEvent()
        this.render()
        this.loadTime()
    }
}
app.start()