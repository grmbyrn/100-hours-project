// const hello = document.querySelector('#hello')

// hello.addEventListener('click', () => {
//     console.log('hello')
// })

function buttonClicked(){
    console.log("Button clicked");
}

window.onload=function(){
  var btn = document.getElementById("hello");
  btn.addEventListener("click", buttonClicked, true);
}