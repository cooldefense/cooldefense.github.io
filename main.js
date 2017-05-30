var selectedTower = "shooter";
var clickedTower;
var shooterCost = 20;
var moneyMakerCost = 10;
var rapidShooterCost = 40;
var money = 15;
var extraMoney = 0;
var x = 0;
var y = 0;
var hovered = "shooter";
var gameSpeed = 1;

var moneyMakerDelay = 5;
var shooterDelay = 10;
var rapidShooterDelay = 20;

var wave = 0;
var amount = 0;
var enemies = 0;
var health = 0;
var timeToWave = 20;
var inWave = false;

for ( x = 0; x < 9; x++ ) {
    for ( y = 0; y < 5; y++ ) {
		var thing = document.createElement("div");
		thing.style.left=x*100+"px";
		thing.style.top=100+y*100+"px";
		thing.className = "none";
				
		thing.addEventListener('mouseover', function () {
			this.style.filter = "brightness(75%)";
		});
		thing.addEventListener('mouseleave', function () {
			this.style.filter = "brightness(100%)";
		});
		thing.addEventListener('click', Buy);
		
		
		var tilesDiv = document.getElementById("tiles");
		tilesDiv.appendChild(thing);
	}
}

function Buy(){
	var selectedTowerCost = parseFloat(eval(selectedTower+"Cost"));
	var currentTowerBar = document.getElementById(selectedTower+"Bar").style.width;
	if(money >= selectedTowerCost && this.className == "none" && currentTowerBar == "0%"){
		Delay(eval(selectedTower+"Delay"),eval(selectedTower+"Delay"),selectedTower);
		this.className = selectedTower + " tower";
		this.addEventListener('click', function(){
			for(var i=0;i<document.getElementsByClassName("upgrade").length;i++){
				document.getElementsByClassName("upgrade")[i].style.opacity=1;
			}
			document.getElementsByClassName("upgradeTitle")[0].style.opacity=1;
			
			if(this.className == "moneyMaker tower"){
				var upgradeText = "Money maker";
				var upgrade1Text = extraMoney + ": more skrilla | +$1 every 5s";
				var upgrade2Text = "quick buck | -0.5s delay";
				clickedTower = "moneyMaker";
			}
			
			if(this.className == "shooter tower"){
				var upgradeText = "Shooter";
				var upgrade1Text = "high quality shots | +5 damage";
				var upgrade2Text = "quick shots | -0.25s delay";
				clickedTower = "shooter";
			}
			
			if(this.className == "rapidShooter tower"){
				var upgradeText = "Rapid shooter";
				var upgrade1Text = "real good shots | +2.5 damage";
				var upgrade2Text = "mad fast shots cuz | -0.25s delay";
				clickedTower = "rapidShooter";
			}
			
			document.getElementById("upgrade").innerHTML = upgradeText+" upgrades";
			document.getElementById("upgrade1").innerHTML = upgrade1Text;
			document.getElementById("upgrade2").innerHTML = upgrade2Text;
		});
		this.addEventListener('mouseover', function(){
			this.style.cursor="pointer";
		});
		this.addEventListener('mouseleave', function(){
			this.style.cursor="auto";
		});
		this.innerHTML = 100;
		money -= selectedTowerCost;
	}
}

function BuyUpgrade(upgrade){
	switch(upgrade){
		case 1:
			if(clickedTower == "moneyMaker"){
				if(money > 5){
					money -= 5;
					extraMoney += 1;
				}
			}
			if(clickedTower == "shooter"){
				
			}
			if(clickedTower == "rapidShooter"){
				
			}
		break;
		
		case 2:
			console.log(clickedTower+"Upgrade"+upgrade);
		break;
	}
}

function BulletLoop() {
	//make bullets
	for(var i=0;i<document.getElementsByClassName("shooter").length;i++){
		var thing = document.createElement("div");
		var bulletDiv = document.getElementById("bullets");
		var shooter = document.getElementsByClassName("shooter")[i];
		thing.style.zIndex=5;
		thing.style.left=parseFloat(shooter.style.left,10) + 50;
		thing.style.top=parseFloat(shooter.style.top,10)+25;
		thing.innerHTML="25";
		thing.className="bullet";
		bulletDiv.appendChild(thing);
	}
	window.setTimeout(BulletLoop, 2000/gameSpeed);
}
BulletLoop();

function RapidBulletLoop() {
	//make rapid bullets
	for(var i=0;i<document.getElementsByClassName("rapidShooter").length;i++){
		var thing = document.createElement("div");
		var bulletDiv = document.getElementById("bullets");
		var rapidShooter = document.getElementsByClassName("rapidShooter")[i];
		thing.style.zIndex=5;
		thing.style.left=parseFloat(rapidShooter.style.left,10) + 50;
		thing.style.top=parseFloat(rapidShooter.style.top,10)+25;
		thing.innerHTML="10";
		thing.style.backgroundColor="red";
		thing.className="bullet";
		bulletDiv.appendChild(thing);
	}
	window.setTimeout(RapidBulletLoop, 750/gameSpeed);
}
RapidBulletLoop();

function MoneyLoop() {
	//make money
	for(var i=0;i<document.getElementsByClassName("moneyMaker").length;i++){
		money += 2;
	}
	
	money += extraMoney;
	
	//gradual money get
	money += 5;
	window.setTimeout(MoneyLoop, 5000/gameSpeed);
}
MoneyLoop();

function WaveLoop() {
	if(inWave == false){
		if(timeToWave > 0){
			timeToWave--;
		} else {
			SpawnWave();
		}
	}
	window.setTimeout(WaveLoop, 1000/gameSpeed);
}
WaveLoop();

function SpawnWave(){
	if(inWave == false){
		wave++;
		timeToWave = 5;
		amount = wave;
		if(wave % 5 == 0 && wave > 0){
			enemies++;
		}
		
		if(wave % 2 == 0 && wave > 0){
			health++;
		}
		CreateEnemies();
	}	
}

function Delay(number,max,tower) {
	if(number == max){
		document.getElementById(tower+"Bar").style.width="100%";
	}
	number--;
	console.log(number,max,tower);
	var left = 100/max;
	document.getElementById(tower+"Bar").style.width=(parseFloat(document.getElementById(tower+"Bar").style.width,10)-left)+"%";
	if(number > 0){
		window.setTimeout(Delay.bind(null,number,max,tower), 1000/gameSpeed);
	}
}

function CheckNotRow(elementDiv) {
    return elementDiv.style.top != (100+100*row)+"px";
}

function CheckRow(){
	var row = Math.floor(Math.random() * 5);
	var usedRows = [];
	for(var i=0;i<document.getElementsByClassName("enemy").length;i++){
		usedRows.push(document.getElementsByClassName("enemy")[i].style.top); //get all used rows
	}
	while(usedRows.indexOf((100+100*row)+"px") >= 0){ //while the row made is already being used by another minion then change it and repeat
		var row = Math.floor(Math.random() * 5);
	}
	return row;
}

function CreateEnemies(){
	for(var i=0;i<=enemies;i++){
		var row = Math.floor(Math.random() * 5);
		c=document.getElementsByClassName("enemy").length;
		var thing = document.createElement("div");
		thing.style.zIndex=4;
		thing.style.left=900;
		thing.style.top=100+100*row;
		thing.className="enemy";
		thing.innerHTML = 25+(25*(health));
		thing.style.filter="hue-rotate("+wave*5+"deg)";
		document.getElementById("enemies").appendChild(thing);
	}
	
	if(amount > 1){
		window.setTimeout(CreateEnemies,(2500/(wave/2))/gameSpeed);
		amount--;
	}
}

function SpeedUp(){
	if(gameSpeed == 1){
		gameSpeed = 5;
	} else {
		gameSpeed = 1;
	}
}

/*window.setTimeout(function(){
	window.setInterval(function(){	
		if(wave % 5 == 0 && wave > 0){
			amount++;
		}
		//make enemies
		for(var i=0;i<=amount;i++){
			var thing = document.createElement("div");
			var row = Math.floor(Math.random() * 5);
			thing.style.zIndex=4;
			thing.style.left=900;
			thing.style.top=100+100*row;
			thing.className="enemy";
			thing.innerHTML = 100;
			document.getElementById("enemies").appendChild(thing);
		}
		
		wave++;
	},5000);
		var thing = document.createElement("div");
		var row = Math.floor(Math.random() * 4);
		thing.style.zIndex=4;
		thing.style.left=900;
		thing.style.top=100+100*row;
		thing.className="enemy";
		thing.innerHTML = 100;
		document.getElementById("enemies").appendChild(thing);
},5000);*/

function Repeat(){
	if(document.getElementsByClassName("enemy").length == 0){
		inWave = false;
	} else {
		inWave = true;
	}
	
	//move bullets
	for(var i=0;i<document.getElementsByClassName("bullet").length;i++){
		var currentBullet = document.getElementsByClassName("bullet")[i];
		currentBullet.style.left=parseFloat(currentBullet.style.left, 10)+(5*gameSpeed);
		if(parseFloat(currentBullet.style.left, 10) > 900){
			currentBullet.outerHTML = "";
		}
	}
	
	//move enemies
	for(var i=0;i<document.getElementsByClassName("enemy").length;i++){
		var currentEnemy = document.getElementsByClassName("enemy")[i];
		currentEnemy.style.left=parseFloat(currentEnemy.style.left, 10)-(0.5+(0.5*wave/10)*gameSpeed);
		if(parseFloat(currentEnemy.style.left, 10) < 100){
			currentEnemy.outerHTML = "";
		}
	}
	
	for(var i=0;i<document.getElementsByClassName("enemy").length;i++){
		var currentEnemy = document.getElementsByClassName("enemy")[i];
		
		//collision bullet to enemy
		for(var z=0;z<document.getElementsByClassName("bullet").length;z++){
			var currentBullet = document.getElementsByClassName("bullet")[z];
			if(parseFloat(currentBullet.style.left, 10)+25 >= parseFloat(currentEnemy.style.left, 10)){
				if(parseFloat(currentBullet.style.top, 10)-25 == parseFloat(currentEnemy.style.top, 10)){
					currentEnemy.innerHTML = parseFloat(currentEnemy.innerHTML)-parseFloat(currentBullet.innerHTML);
					currentBullet.outerHTML = "";
					if(parseFloat(currentEnemy.innerHTML) <= 0){
						currentEnemy.outerHTML = "";
					}
				}
			}
		}
		//collision enemy to tower
		for(var z=0;z<document.getElementsByClassName("tower").length;z++){
			var currentTower = document.getElementsByClassName("tower")[z];
			if(parseFloat(currentTower.style.left, 10)+100 >= parseFloat(currentEnemy.style.left, 10)){
				if(parseFloat(currentTower.style.top, 10) == parseFloat(currentEnemy.style.top, 10)){
					currentTower.innerHTML = parseFloat(currentTower.innerHTML)-25;
					currentEnemy.style.left = "-100px";
					if(parseFloat(currentTower.innerHTML) <= 0){
						currentTower.className = "none";
						currentTower.id = "";
						currentTower.innerHTML = "";
					}
				}
			}
		}
	}
	for(var i=0;i<document.getElementsByClassName("towerSelect").length;i++){
		var currentSelected = document.getElementsByClassName("towerSelect")[i];
		if(currentSelected.id == selectedTower){
			currentSelected.style.backgroundColor = "rgba(255,255,255,0.2)";
		} else {
			currentSelected.style.backgroundColor = "rgba(255,255,255,0)";
		}
	}
	document.getElementById("moneyAmount").innerHTML = money;
	document.getElementById("moneyGainAmount").innerHTML = 5 + document.getElementsByClassName("moneyMaker").length * 2 + extraMoney;
	if(document.getElementsByClassName("enemy").length != 0){
		document.getElementById("wave").innerHTML = "Wave " + wave;
	} else {
		document.getElementById("wave").innerHTML = "Next wave in: " + timeToWave;
	}
	
	requestAnimationFrame(Repeat);
	
	var tooltip = document.getElementById(hovered);
	if(tooltip.style.opacity != 0){
		tooltip.style.left = x+15;
		tooltip.style.top = y+15;
	}
	
	if(gameSpeed != 1){
		document.getElementsByClassName("button")[1].style.backgroundColor="rgba(255,255,255,1)";
		document.getElementsByClassName("button")[1].style.color="black";
	} else {
		document.getElementsByClassName("button")[1].style.backgroundColor="";
		document.getElementsByClassName("button")[1].style.color="";
	}
}

requestAnimationFrame(Repeat);

window.onmousemove = function (e) {
    x = e.clientX;
    y = e.clientY;
}

for(var i=0;i<document.getElementsByClassName("towerSelect").length;i++){
	document.getElementsByClassName("towerSelect")[i].addEventListener('mouseover', function () {
		document.getElementById(this.id+"Description").style.opacity = 1;
		document.getElementById(this.id+"Description").style.width = "225px";
		document.getElementById(this.id+"Description").style.height = "75px";
		hovered = this.id+"Description";
	});
	document.getElementsByClassName("towerSelect")[i].addEventListener('mouseleave', function () {
		document.getElementById(this.id+"Description").style.opacity = 0;
		document.getElementById(this.id+"Description").style.width = "0px";
		document.getElementById(this.id+"Description").style.height = "0px";
		hovered = this.id+"Description";	
	});
}