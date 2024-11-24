const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');
const nameList = document.getElementById('nameList');

let names = ['Ali', 'Beatriz', 'Carlos', 'Diya', 'Eric', 'Fátima', 'Gabriel', 'Hanna'];
let currentAngle = 0;
let isSpinning = false;

// Draw the wheel
function drawWheel() {
  const totalSegments = names.length;
  const anglePerSegment = (2 * Math.PI) / totalSegments;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < totalSegments; i++) {
    const startAngle = currentAngle + i * anglePerSegment;
    const endAngle = startAngle + anglePerSegment;

    // Alternate colors
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, endAngle);
    ctx.fillStyle = i % 2 === 0 ? '#FF6347' : '#4682B4';
    ctx.fill();
    ctx.stroke();

    // Draw text
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(startAngle + anglePerSegment / 2);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(names[i], canvas.width / 4, 10);
    ctx.restore();
  }

  // Draw center text
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, 2 * Math.PI);
  ctx.fillStyle = '#000';
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 20px Arial';
  ctx.fillText('Click to spin', canvas.width / 2, canvas.height / 2 + 5);
  ctx.textAlign = 'center';
}

// Spin the wheel
function spinWheel() {
  if (isSpinning) return;

  isSpinning = true;
  const spinTime = Math.random() * 2000 + 3000; // Between 3-5 seconds
  const finalAngle = Math.random() * 2 * Math.PI;

  let startTime = null;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    if (elapsed < spinTime) {
      currentAngle += 0.1;
      drawWheel();
      requestAnimationFrame(animate);
    } else {
      currentAngle += finalAngle;
      currentAngle %= 2 * Math.PI;
      drawWheel();
      selectWinner();
      isSpinning = false;
    }
  }

  requestAnimationFrame(animate);
}

// Select the winner
function selectWinner() {
  const totalSegments = names.length;
  const anglePerSegment = (2 * Math.PI) / totalSegments;
  const winningIndex = Math.floor(((2 * Math.PI) - currentAngle) / anglePerSegment) % totalSegments;

  const winner = names[winningIndex];
  alert(`Winner: ${winner}`);

  // Remove all instances of the winner
  names = names.filter(name => name !== winner);
  drawWheel();
}

// Initialize
spinButton.addEventListener('click', spinWheel);
nameList.addEventListener('input', () => {
  names = nameList.value.split('\n').filter(name => name.trim() !== '');
  drawWheel();
});

drawWheel();
