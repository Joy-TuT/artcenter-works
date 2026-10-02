     
        let clrARrea=document.getElementById("colorArea")
        console.log(clrARrea)
        let clrbtn=document.getElementById("colorButton")
        let txtBtn=document.getElementById("txtButton")
        let imgBtn=document.getElementById("imgButton")
        let imgToToggle=document.getElementById("imgToToggle")
        
        let changingColor=()=>{
            let redC=Math.random()*255
            let greenC=Math.random()*255
            let blueC=Math.random()*255
            clrARrea.style.backgroundColor="rgb(" + redC + "," + greenC + ", " + blueC +")"
        }
        
        let addingText=()=>{
            let p=document.createElement("p")
            console.log(p)
            p.innerHTML="hjjhvjhvhdvhdckk"
            clrARrea.after(p)
        }
        
        let changingImage = ()=>{
            if(imgToToggle.alt == "image1"){
                imgToToggle.src = "images/2.jpg"
                imgToToggle.alt = "image2"
            }
            else{imgToToggle.src = "images/1.jpg"
                 imgToToggle.alt = "image1"
            }

        }
        clrbtn.addEventListener("click", changingColor)
        txtBtn.addEventListener("click", addingText)
        imgBtn.addEventListener("click",changingImage)