function AssetsManager() {
    this.toLoad = 0;
    this.loaded = 0;
    this.images = {};
    this.audios = {};
    this.channels = [];
    this.maxChannels = 5;
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
