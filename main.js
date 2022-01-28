video = "";
status = "";
objects = [];
r = "";
g = "";
b = "";

function preload(){

}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    objectName = document.getElementById("input").value;
}

function modelLoaded(){
    console.log("Model is Loaded!");
    status = true; 
}

function draw(){
    image(video, 0, 0, 480, 380);

    if(status != ""){
        objectDetector.detect(video, gotresults);

        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected!";

            r = random(255);
            g = random(255);
            b = random(255);
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input){
                video.stop();
                objectDetector.detect(gotresults);
                document.getElementById("object-found").innerHTML = objects[i].label + " found ";
            }
            else{
                document.getElementById("object-found").innerHTML = objects[i].label + " not found ";
            }
        }
    }
}

function gotresults(error, results){
     if(error){
         console.log(error);
     }
     else{
         console.log(results);
         objects = results;
     }
}