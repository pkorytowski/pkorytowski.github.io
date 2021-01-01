onmessage = function(e){
    var canvas1 = e.data.canv1;
    var canvas2 = e.data.canv2;
    var r = e.data.r;
    var offset = e.data.offset;

    var ctx = canvas1.getContext('2d');
    var ctx2 = canvas2.getContext('2d');

    var t = 0.0;

    const width = parseInt(canvas1.width);
    const height = parseInt(canvas1.height);

    const h2 = parseInt(height/2);

    ctx.translate(100,h2);
    ctx2.translate(100,h2);

    function cycloid(){
    
        ctx2.clearRect(-100,-h2,width,height);
        var xCircle=(t*r);
        var yCircle=r*(-1);
    
        function xPoint(a){
            return r*a-(r+offset)*Math.sin(a);
        }
        function yPoint(a){
            return (r-(r+offset)*Math.cos(a))*(-1);
        }
    
        //small circle
        ctx2.beginPath();
        ctx2.strokeStyle = "#000000";
        ctx2.arc(xCircle,yCircle,r,0,2*Math.PI);
        ctx2.stroke();
    
        //line in circle
        ctx2.save();
        ctx2.beginPath();
        ctx2.translate(xCircle,yCircle);
        ctx2.moveTo(0,0);
        ctx2.rotate(t);
        ctx2.lineTo(0,r+offset);
        ctx2.stroke();
        ctx2.restore();
    
        //red line
        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(xPoint(t), yPoint(t), 1, 1 );
        ctx.stroke();
        t+=0.01;
    
        //axes
        ctx.beginPath();
        ctx.moveTo(-100, 0);
        ctx.lineTo(width-100, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0,-h2);
        ctx.lineTo(0,h2);
        ctx.stroke();
    
        requestAnimationFrame(cycloid);
        }
        requestAnimationFrame(cycloid);

}