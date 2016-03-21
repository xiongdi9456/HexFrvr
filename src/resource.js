var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    block_png : "res/block.png",
    shadow_png : "res/shadow.png",
    tuffy_fonts_plist : "res/Fonts/tuffy_bold_italic-charmap.plist",
    tuffy_fonts_png : "res/Fonts/tuffy_bold_italic-charmap.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}