'use strict';
document.addEventListener('DOMContentLoaded', function() {
    var h1 = document.getElementsByTagName('h1');
    if (h1.length > 0) {
        h1[0].innerText = h1[0].innerText + ' \'Allo';
    }
    var scale=  document.getElementById("scale");

    document.getElementById("imageSelector").addEventListener('change', function(event) {
     var f = event.target.files[0];

     if (!f.type.match('image.*')) return;

     var reader = new FileReader();

     reader.onload = (function(theFile) {
       return function(e) {
         
         var canvas = document.getElementById('canvas');
         var context = canvas.getContext('2d');
         var img = new Image();
         var maxScale = scale.valueAsNumber;
         img.onload= function(event) {
           context.drawImage(img, 0, 0);
           console.log("image is "+img.width+"x"+img.height);
           var imageData = context.getImageData(0,0,img.width,img.height);
           var correctedImageData = context.createImageData(maxScale * (img.width - 1), img.height);
           var cx = 0;
           var scaledPixelCount = 0;
           for (var x = 0; x < img.width; x ++) {

            scaledPixelCount = maxScale*x/img.width;
            var end = cx + scaledPixelCount;
            console.log("scaled pixel count at "+x+" is "+scaledPixelCount+" going from "+cx+" to "+end);

            for (;cx<end;cx++) {
              for (var y = 0; y < img.height; y++) {
                var originPixel = getPixelAt(x,y, imageData);
                putPixelAt(originPixel, cx, y, correctedImageData);
              }
            }
           }

           context.clearRect(0,0,img.height,img.width);
           context.putImageData(correctedImageData, 0, 0);
         }
         img.src = e.target.result;
       } 
     })(f);

     reader.readAsDataURL(f);


    });

    function getPixelAt(x,y, imageData) {
      var r = 4*y*imageData.width + 4*x;
      var data = imageData.data;

      return [data[r], data[r+1], data[r+2], data[r+3]];
    }

    function putPixelAt(rgba, x, y, imageData) {
      var r = 4*y*imageData.width + 4*x;
      var data = imageData.data;

      for (var i = 0; i < rgba.length; i++) {
        data[r+i] = rgba[i];
      }
      if (y == 0) {
        console.log("Writing rgba("+rgba.join(", ")+" to "+[x,y].join(","));
      }
    }
}, false);


