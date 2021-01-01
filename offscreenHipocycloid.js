onmessage = function(e){
    var canvas1 = e.data.canv1;
    var canvas2 = e.data.canv2;
    var r = e.data.r;
    var offset = e.data.offset;
    var R = e.data.R;

    const width = parseInt(canvas1.width);
    const height = parseInt(canvas1.height);

    const w2 = parseInt(width/2)
    const h2 = parseInt(height/2);

    var ctx = canvas1.getContext('2d');
    var ctx2 = canvas2.getContext('2d');

    var t = 0.0;

    ctx.translate(w2,h2);
    ctx2.translate(w2,h2);

    function hipocycloid(){
        ctx2.clearRect(-w2,-h2,width,height);
        var xCircle=(R-r)*Math.cos(t);
        var yCircle=(R-r)*Math.sin(t);

        function xPoint(a){
            return (R-r)*Math.cos(a)+(r+offset)*Math.cos(((R-r)/(r))*a);
        }
        function yPoint(a){
            return (R-r)*Math.sin(a)-(r+offset)*Math.sin(((R-r)/(r))*a);
        }

        //big circle
        ctx.beginPath();
        ctx.arc(0,0,R,0,2*Math.PI);
        ctx.stroke();

        //small circle
        ctx2.beginPath();
        ctx2.strokeStyle = "#000000";
        ctx2.arc(xCircle,yCircle,r,0,2*Math.PI);
        ctx2.stroke();

        //line in small circle
        ctx2.save();
        ctx2.beginPath();
        ctx2.translate(xCircle,yCircle);
        ctx2.moveTo(0,0);
        ctx2.rotate(((R/r)-1)*(-t));
        ctx2.lineTo(r+offset,0);
        ctx2.stroke();
        ctx2.restore();

        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(xPoint(t), yPoint(t), 1, 1 );
        ctx.stroke();
        t+=0.01;

        ctx.beginPath();
        ctx.moveTo(-w2,0);
        ctx.lineTo(w2,0);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0,-h2);
        ctx.lineTo(0,h2);
        ctx.stroke();

        id = requestAnimationFrame(hipocycloid);
    }
        requestAnimationFrame(hipocycloid);

}