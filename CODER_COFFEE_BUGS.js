
import kaboom from "kaboom"

// initialize context
kaboom({
  font:"sink",
  background: [210,210,210],
  
})
//Lets load the Sprites
loadSprite("programmer5", "sprites/programmer5.png");
loadSprite("bugs5", "sprites/bugs5.png");
loadSprite("coffee5", "sprites/coffee5.png");
loadSprite("coffeejar", "sprites/coffeejar.png");
loadSprite("monster", "sprites/monster.png");
//Lets load the music
loadSound("background", "sounds/background.mp3");
loadSound("sip1", "sounds/sip1.mp3");
loadSound("gameover", "sounds/gameover.mp3");
// Lets define some game variables
let SPEED = 450
let BSPEED=2
let SCORE=0
let scoreText
let bg=false
let backmusic;
let handles;

//Telling user how to play
 const displayhandle = ()=>{
  
 
    handles = add([
    
      text(" Start:Click on the Screen  | UP ↑ | DOWN ↓ | LEFT <  | RIGHT > "),
      scale(3),
      color(0,64,255),
    pos(200, 50),
    
])
}
//Lets define a function to display our score
const display = ()=>{
  destroy(scoreText)
 
    scoreText = add([
    text("Score:"+SCORE),
      scale(3),
     color(0,64,255),
    pos(24, 24),
    
])
}
const playBg = ()=>{
 if(!bg){
  backmusic= play('background')
   bg=true;
 }
    

}

// Lets add the programmer
const player = add([
    sprite("programmer5"),
    pos(100, 100),
    scale(0.13),

    area(),
   
])

// Lets Add events to our player

onKeyDown("left", () => {
  player.move(-SPEED, 0)
  playBg()
  destroy(handles)
    
})
onKeyDown("right", () => {
  playBg()
   destroy(handles)
    player.move(SPEED, 0)
})
onKeyDown("up", () => {
  playBg()
   destroy(handles)
    player.move(0,-SPEED)
})
onKeyDown("down", () => {
  playBg()
   destroy(handles)
    player.move( 0,SPEED)
})
// Lets add 4 bugs and a coffee the bugs
setInterval(()=>{
  for(let i=0;i<4;i++){
    let x=rand(0,width());
    let y=height()
    
    let c=add([
    sprite("bugs5"),
    pos(x, y),
    scale(0.13),
    area(),
      "bug"
      
    ])
    c.onUpdate(()=>{
      c.moveTo(c.pos.x,c.pos.y-BSPEED)
    }
      )
  }
  if(BSPEED<10){
  BSPEED +=1
  }
  
},4000)

setInterval(()=>{
  for(let i=0;i<2;i++){
    let x=rand(0,width());
    let y=height()
    let c=add([
    sprite("coffee5"),
    pos(x, y),
    scale(0.13),
    area(),
      "coffee"
      
    ])
    c.onUpdate(()=>{
      c.moveTo(c.pos.x-0.30,c.pos.y-BSPEED)
    }
      )
  }
  
},4000)
setInterval(()=>{
  for(let i=0;i<1;i++){
    let x=rand(0,width());
    let y=height()
    let c=add([
    sprite("coffeejar"),
    pos(x, y),
    scale(0.13),
    area(),
      "coffeejar"
      
    ])
    c.onUpdate(()=>{
      c.moveTo(c.pos.x-0.30,c.pos.y-BSPEED)
    }
      )
  }
  
},4000)
setInterval(()=>{
  for(let i=0;i<1;i++){
    let x=rand(0,width());
    let y=height()
    let c=add([
    sprite("monster"),
    pos(x, y),
    scale(0.8),
    area(),
      "monster"
      
    ])
    c.onUpdate(()=>{
      c.moveTo(c.pos.x,c.pos.y-BSPEED)
    }
      )
  }
  
},4000)

player.onCollide("monster", () => {
   backmusic.volume(0.2)
    play("gameover")
  destroy(player)
  addKaboom(player.pos)
  scoreText = add([
    text("GAME OVER"),
      scale(5),
    color(0,64,255),
    pos(500,280),
    
])
   backmusic.volume(0.7)
  
  
})
//Lets Collide
player.onCollide("bug", () => {
   backmusic.volume(0.2)
    play("gameover")
  destroy(player)
  addKaboom(player.pos)
  scoreText = add([
    text("GAME OVER"),
      scale(5),
    color(0,64,255),
    pos(500,280),
    
])
   backmusic.volume(0.7)
  
  
})
player.onCollide("coffee", (coffee) => {
  backmusic.volume(0.2)
    play("sip1",{volume:5
                })

  destroy(coffee)
  SCORE +=1
  display()
  backmusic.volume(0.7)
  
})
player.onCollide("coffeejar", (coffeejar) => {
    backmusic.volume(0.2)
  play("sip1",{volume:5
                })

  destroy(coffeejar)
  SCORE +=4
  display()
  backmusic.volume(0.7)
})
//Display the score
display()
displayhandle()
