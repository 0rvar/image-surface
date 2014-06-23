[1mdiff --git a/static/client.js b/static/client.js[m
[1mindex b093a28..3f3f0f0 100644[m
[1m--- a/static/client.js[m
[1m+++ b/static/client.js[m
[36m@@ -68,9 +68,9 @@[m [mfunction render(src) {[m
       var cs = context.getImageData(x, y, 1, 1).data;[m
       return hex(cs[0], cs[1], cs[2]);[m
     }[m
[31m-    var fillTop    = getColorAt(0, 0);[m
[32m+[m[32m    var fillTop    = getColorAt(1, 1);[m
     // Keep to the left as scrollbars are generally on the right[m
[31m-    var fillBottom = getColorAt(0, img.height-1);[m
[32m+[m[32m    var fillBottom = getColorAt(1, img.height-1);[m
 [m
     // Pass 2: draw top and bottom colors[m
     context.fillStyle = fillTop;[m
