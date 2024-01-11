(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))e(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const h of r.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&e(h)}).observe(document,{childList:!0,subtree:!0});function s(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function e(i){if(i.ep)return;i.ep=!0;const r=s(i);fetch(i.href,r)}})();function g(t,o){return{x:t.width/2,y:t.height/2,vx:5,vy:1,speed:7,radius:10,color:"white",draw(){o.beginPath(),o.arc(this.x,this.y,this.radius,0,Math.PI*2),o.closePath(),o.fillStyle=this.color,o.fill()}}}function y(t,o,s){return{x:s,y:t.height/2-40,height:80,width:10,color:"white",score:0,draw(){o.fillStyle=this.color,o.fillRect(this.x,this.y,this.width,this.height)},move(e){e<0?this.y=0:e+this.height>t.height?this.y=t.height-this.height:this.y=e}}}function m(){const t=document.getElementById("canvas"),o=t.getContext("2d");let s=!1;const e=g(t,o),i=y(t,o,10),r=y(t,o,t.width-20),h={x:t.width/2,y:t.height,color:"white",draw(){o.beginPath(),o.moveTo(this.x,0),o.lineTo(this.x,this.y),o.strokeStyle=this.color,o.lineWidth=2,o.setLineDash([5,5]),o.stroke()}};function d(){e.speed=7,e.vx=5,e.vy=1,e.x=t.width/2,e.y=t.height/2}function a(n){let l=e.y-(n.y+n.height/2);l=l/(n.height/2);let c=Math.PI/4*l,f=e.x+e.radius<t.width/2?1:-1;e.vx=Math.floor(f*e.speed*Math.cos(c)),e.vy=Math.floor(e.speed*Math.sin(c)),e.speed+=.2}function u(){o.clearRect(0,0,t.width,t.height),i.draw(),e.draw(),h.draw(),r.draw(),s&&(e.x+=e.vx,e.y+=e.vy);const n=r.y+Math.floor((e.y-(r.y+r.height/2))*.1);r.move(n),(e.y+e.vy>t.height-e.radius||e.y+e.vy<e.radius)&&(e.vy=-e.vy),e.x<=30&&i.y<=e.y&&i.y+i.height>=e.y&&a(i),e.x>=t.width-30&&r.y<=e.y&&r.y+r.height>=e.y&&a(r),e.x<0&&(d(),r.score++,document.getElementById("computerScore").innerHTML=r.score),e.x>t.width&&(d(),i.score++,document.getElementById("playerScore").innerHTML=i.score),window.requestAnimationFrame(u)}t.addEventListener("mousemove",n=>{const l=t.getBoundingClientRect(),c=n.clientY-l.top-i.height/2;i.move(c),s||(s=!0),document.getElementById("gameInfo").style.opacity="0"}),window.requestAnimationFrame(u)}m();