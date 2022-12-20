AFRAME.registerComponent("collide-plane",{
    schema: {
        elementId:{type:"string",default:"#coin1"}
        
    },
    init: function(){
var duration = 120
var timerEL = document.querySelector("#timer")
this.startTimer(duration,timerEL)
    },
    update: function(){
        this.isCollided(this.data.elementId)
    },
    startTimer: function(duration,timerEL){
      var minutes,seconds
      setInterval(() => {
        if(duration>=0){
            minutes=parseInt(duration/60)
            seconds=parseInt(duration%60)
             if(minutes<10){
                minutes="0"+minutes
             }

             if(seconds<10){
                seconds="0"+seconds
             }

             timerEL.setAttribute("text",{value:minutes+":"+seconds})
             duration-=1
        }
        else{
            this.gameOver()
        }

      }, 1000);  
    },
    isCollided: function(elementId){
const element = document.querySelector(elementId)
element.addEventListener("collide",(e)=>{
    if(elementId.includes("#coin")){
        element.setAttribute("visible",false)
        this.updateScore()
        this.updateTarget()
    }
    else{
        this.gameOver()
    }


})    
},
updateScore: function(){
    var element = document.querySelector("#score")
    var count= element.getAttribute("text").value
    var currentScore= parseInt(count)
    currentScore+=50
    element.setAttribute("text",{
       value:currentScore 
    })
},
updateTarget: function(){
    var element = document.querySelector("#targets")
    var count= element.getAttribute("text").value
    var currentTarget= parseInt(count)
    currentTarget-=1
    element.setAttribute("text",{
       value:currentTarget 
    })
},
gameOver: function(){
    var planeEL = document.querySelector("#plane_model")
    var elementEL= document.querySelector("#game_over_text")

    elementEL.setAttribute("visible",true)
    planeEL.setAttribute("dynamic-body",{musk:1})
}
})

