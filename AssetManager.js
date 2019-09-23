function AssetManager() {
    this.toLoad = 0;
    this.loaded = 0;
    this.assets = [];
}
AssetManager.prototype.loadImage = function (key, url){
    console.log(`Loading image ${url}...`);
    this.toLoad++;
    var img = new Image();
    img.addEventListener("Load", function () {
        console.log(`Image ${key}: ${url}`);
        this.loaded++;
    })
    img.src = url;
    this.assets[key] = img;
}