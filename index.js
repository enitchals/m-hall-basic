let prizeDoor = null;
let firstPick = null;
let doorToReveal = null;
let secondPick = null;
let scores = {
  stay: {
    win: 0,
    lose: 0
  },
  swap: {
    win: 0,
    lose: 0
  }
}

const assignPrizeDoor = () => {
  const randomDoor = Math.floor(Math.random()*3)+1;
  prizeDoor = randomDoor;
}

const onFirstPick = (e) => {
  console.log('prize door: ', prizeDoor);
  console.log('first pick: ', firstPick);
  console.log('door to reveal: ', doorToReveal);
  const doorPicked = e.target.id;
  console.log(doorPicked)
  if (firstPick === null) firstPick = doorPicked;
  revealDoor();
  renderChoice();
  console.log(doorPicked);
}

const revealDoor = () => {
  const possibleDoorsToReveal = [1,2,3].filter(d => d != firstPick && d != prizeDoor);
  console.log(prizeDoor, firstPick, doorToReveal, possibleDoorsToReveal)
  const randomIndex = Math.floor(Math.random()*(possibleDoorsToReveal.length-1));
  console.log(randomIndex)
  doorToReveal = possibleDoorsToReveal[randomIndex];
}

const onStay = () => {
    secondPick = firstPick;
    renderResult();
}

const onSwap = () => {
    secondPick = [1,2,3].filter(d => d != firstPick && d != doorToReveal)[0];
    renderResult();
}

const reset = () => {
  prizeDoor = null;
  firstPick = null;
  secondPick = null;
  assignPrizeDoor();
  renderDoors();
}

const renderDoor = (d) => {
  const door = document.createElement('div');
  door.innerText = d;
  door.id = d;
  door.className = 'door';
  door.addEventListener('click', onFirstPick);
  const doorknob = document.createElement('div');
  doorknob.className = 'doorknob';
  door.append(doorknob);
  return door;
}

const renderDoors = () => {
  const doors = document.querySelector('#doors');
  const prompt = document.querySelector('#prompt');
  doors.replaceChildren('');
  prompt.replaceChildren('');
  [1,2,3].forEach(d => {
    const door = renderDoor(d);
    doors.append(door);
  })
  const text = document.createElement('p');
  text.textContent = 'pick a door';
  prompt.append(text);
}

const renderChoice = () => {
  const string = `You picked door ${firstPick}. Monty reveals a goat behind door ${doorToReveal}. Do you want to stick with door ${firstPick} or swap to door ${[1,2,3].filter(d => d != firstPick && d != doorToReveal)[0]}`;
  const stayButton = document.createElement('button');
  stayButton.textContent = 'Stay';
  stayButton.addEventListener('click', onStay); 
  const swapButton = document.createElement('button');
  swapButton.textContent = 'Swap';
  swapButton.addEventListener('click', onSwap);
  const buttons = document.createElement('section');
  buttons.append(stayButton, swapButton);
  document.querySelector('#prompt').replaceChildren(string, buttons);
}

const getAndRecordResult = () => {
  const stay = firstPick === secondPick;
  const win = secondPick === prizeDoor;
  scores[stay ? 'stay' : 'swap'][win ? 'win' : 'lose'] += 1;
  const score = document.querySelector(`#${stay ? 'stay' : 'swap'}-${win ? 'win' : 'lose'}`);
  score.innerText = scores[stay ? 'stay' : 'swap'][win ? 'win' : 'lose'];
  return `You ${stay ? 'stayed' : 'swapped'} and you ${win ? 'won' : 'lost'}!`
}

const renderResult = () => {
  const result = getAndRecordResult();
  const button = document.createElement('button');
  button.addEventListener('click', reset);
  button.innerText = 'Play again';
  document.querySelector('#prompt').replaceChildren(result, button);
}

assignPrizeDoor();
renderDoors();