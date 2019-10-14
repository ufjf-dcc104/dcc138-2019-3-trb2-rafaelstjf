function AssetsManager() {
    this.toLoad = 0;
    this.loaded = 0;
    this.images = {};
    this.audios = {};
    this.channels = [];
    this.maxChannels = 25;
    for (var i = 0; i < this.maxChannels; i++) {
        this.channels[i] = { audio: new Audio(), fim: -1 };
    }
}
AssetsManager.prototype.loadImage = function (key, url) {
    console.log(`Loading image ${url}...`);
    this.toLoad++;
    var img = new Image();
    img.src = url;
    this.images[key] = img;
    var that = this;
    img.addEventListener("Load", function () {
        that.loaded++;
        console.log(`Image ${that.loaded}/${that.toLoad} ${key}: ${url} loaded.`);
    });
}
AssetsManager.prototype.play = function (key) {
    if (!this.audios[key]) {
        throw new Error(`Invalid audio key: ${key}!`);
    }
    for (var i = 0; i < this.maxChannels; i++) {
        var now = new Date();
        if (this.channels[i].fim < now.getTime()) {
            this.channels[i].audio.src = this.audios[key].src;
            this.channels[i].end = now.getTime() + this.audios[key].duration * 1000;
            this.channels[i].audio.play();
            break;
        }
    }
}
AssetsManager.prototype.img = function (key) {
    return this.images[key];
}

AssetsManager.prototype.progress = function () {
    if (this.toLoad != 0) {
        return this.carregadas / this.aCarregar * 100.0;
    } else return 0.0;

}
//---------------Audio-------------------
AssetsManager.prototype.loadAudio = function (key, url) {
    console.log(`Loading audio ${key} : ${url}...`);
    this.toLoad++;
    var audio = new Audio();
    audio.src = url;
    audio.load();
    this.audios[key] = audio;
    var that = this;
    audio.addEventListener("Load", function () {
        that.loaded++;
        console.log(`Audio ${that.loaded}/${that.toLoad} ${key}: ${url} loaded.`);
    });
}
