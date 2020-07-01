const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
var cnvHeight = canvas.height;
var cnvWidth = canvas.width;
var sprite = new Image();
sprite.src = "image/sprite.png";
score = 0;
highScore = localStorage.getItem('highScore') || 0;