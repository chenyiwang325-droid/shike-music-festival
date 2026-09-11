(function(root){'use strict';const F=root.Festival;
function fitText(ctx,text,x,y,max,size,min=24){ctx.font=`800 ${size}px "PingFang SC", "Microsoft YaHei", sans-serif`;while(ctx.measureText(text).width>max&&size>min){size--;ctx.font=`800 ${size}px "PingFang SC", "Microsoft YaHei", sans-serif`;}ctx.fillText(text,x,y);}
function paint(canvas,record,images){
 const c=canvas.getContext('2d'),w=1080,h=1620;canvas.width=w;canvas.height=h;
 const scene=images[F.assetKey(record)],print=record.style==='risograph',sunset=record.style==='sunset';
 c.fillStyle=print?'#f3e8d7':sunset?'#f1c9b4':'#20142e';c.fillRect(0,0,w,h);
 if(scene?.complete&&scene.naturalWidth)c.drawImage(scene,0,0,w,h);
 const ink=print?'#35274e':sunset?'#522c48':'#fff7fc';
 const top=c.createLinearGradient(0,0,0,500);top.addColorStop(0,print?'rgba(253,245,228,.96)':sunset?'rgba(255,231,211,.9)':'rgba(20,8,38,.9)');top.addColorStop(1,print?'rgba(253,245,228,0)':sunset?'rgba(255,231,211,0)':'rgba(20,8,38,0)');c.fillStyle=top;c.fillRect(0,0,w,500);
 c.fillStyle=ink;c.textAlign='left';c.font='500 26px "PingFang SC",sans-serif';c.fillText(record.preview?'等四个选择，听见你的此刻':(record.nickname||'今晚的我')+'的音乐心情',64,64);
 const align=record.persona==='wander'?'center':'left',x=align==='center'?540:64;const size=record.persona==='energy'?72:record.persona==='wander'?64:68;
 c.textAlign=align;c.font=`800 ${size}px "PingFang SC", "Microsoft YaHei", sans-serif`;const phrase=record.preview?'你想说的那句话，\n会成为画面的主角。':record.phrase||'让热爱，冒个泡。';
 let lines=[],line='';for(const ch of phrase.replace(/([，,。！!])/g,'$1\n')){if(ch==='\n'){lines.push(line);line='';continue;}if(c.measureText(line+ch).width>948){lines.push(line);line=ch}else line+=ch;}if(line)lines.push(line);lines.slice(0,3).forEach((text,i)=>c.fillText(text,x,158+i*83));
 // A personal name mark changes with the nickname without inventing personality traits.
 c.save();c.textAlign='right';c.fillStyle=ink;c.globalAlpha=.75;c.font='800 28px "PingFang SC",sans-serif';const signature=Array.from(record.nickname||'此刻').slice(-2).join('');c.fillText(signature+' / '+F.PERSONAS[record.persona].english,1015,1468);c.restore();
 c.textAlign='left';c.fillStyle=print?'#f7ebdd':'#f9e9e9';c.fillRect(0,1510,w,110);
 c.fillStyle='#552441';c.font='800 38px "PingFang SC",sans-serif';c.fillText('此刻',58,1563);c.font='500 23px "PingFang SC",sans-serif';c.fillText('白桃气泡水 · 让热爱，冒个泡',155,1560);
 c.textAlign='right';c.font='600 23px "PingFang SC",sans-serif';c.fillText(record.preview?'音乐人格 · 待揭晓':F.PERSONAS[record.persona].name,1020,1560);c.font='400 16px "PingFang SC",sans-serif';c.fillText('#此刻有声# · 音乐节限定纪念',1020,1600);c.textAlign='left';
}
root.PosterRenderer={paint};if(typeof module!=='undefined')module.exports={paint};
})(typeof window!=='undefined'?window:globalThis);
