let val;

document.querySelector('.clear-tasks').addEventListener('click', onClick);

function onClick(e) {
  e.preventDefault();

  val = e.target;
  val = e.target.className;
  e.target.innerText = 'Hello World';


  val = e.type;
  val = e.timeStamp;
  val = e.clientX;
  val = e.offsetY;

  console.log(val);
}
