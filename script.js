const inner = document.getElementById("innerimg");
const outer = document.querySelector(".outer")
const spiner = document.getElementById("spin");
const circl = document.querySelector(".circle-container")
const cells = document.querySelectorAll('td');

function spin() {

    inner.style.transform = "rotate(" + -1550 + "deg)";
    ball.style.display = 'block';
    rotateBall();
}
const ball = document.querySelector('#ball');
const container = document.getElementById('circle');
const radius = container.offsetWidth / 2 - ball.offsetWidth / 2;
let speed = 0.05;
let running = true;
let angle = 0;
ball.style.display = 'none';
circl.style.display = 'none';

function rotateBall() {
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;
    const x = centerX + radius * Math.cos(angle) - ball.offsetWidth / 2;
    const y = centerY + radius * Math.sin(angle) - ball.offsetHeight / 2;
    ball.style.left = x + 'px';
    ball.style.top = y + 'px';
    angle += speed; // Adjust speed

    if (!running && speed > 0) {
        speed -= 0.0005; // Deceleration rate
        if (speed < 0) speed = 0;
    }
    requestAnimationFrame(rotateBall);
}
// Start animati
let i = 0;
spiner.addEventListener("click", () => {
    circl.style.display = 'block';
    outer.style.left = "0%";
    let inter = setInterval(() => {
        i = i + 1;
        console.log(i);
        if (i == 3) {
            spin();

        }
        if (i > 6) {
            running = false;
        }
        if (i > 10) {
            ball.style.display = 'none';
            circl.style.display = 'none';
            outer.style.left = "103%";
            running = true;
            cells.forEach(cell => {
                const chips = cell.querySelectorAll('.placed-chip');
                chips.forEach(chip => chip.remove());
            });
        }
        if (i > 11) {
            i = 0;

            angle = 0;
            speed = 0.05;

            inner.style.transform = "rotate(" + 0 + "deg)";
            clearInterval(inter);
        }

    }, 1000);



})






let selectedChip = null;
let selectedValue = 0;
let selectedImage = '';
const chipButtons = document.querySelectorAll('.chip');
// Handle chip selection
chipButtons.forEach(button => {
    button.addEventListener('click', () => {
        chipButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');

        const img = button.querySelector('img');
        selectedChip = img;
        selectedValue = parseInt(img.dataset.value);
        selectedImage = img.dataset.chip;
    });
});

// Handle chip placement on table cells

setTimeout(() => {


    console.log(cells);
    cells.forEach(cell => {
        console.log(cells);
        cell.addEventListener('click', () => {

            console.log(selectedChip, selectedValue, selectedImage);
            if (!selectedChip || !selectedValue || !selectedImage) return;

            const chipImg = document.createElement('img');
            chipImg.src = selectedImage;
            chipImg.className = 'placed-chip';
            cell.appendChild(chipImg);

            // Increment chip value
            // totals[selectedValue] += selectedValue;
            // document.getElementById(`value-${selectedValue}`).innerText = totals[selectedValue];
        });
    });

}, 5000);


document.getElementById('clear').addEventListener('click', () => {
    // Remove chip images
    cells.forEach(cell => {
        const chips = cell.querySelectorAll('.placed-chip');
        chips.forEach(chip => chip.remove());
    });

    // Reset totals
    //for (let val in totals) {
    //    totals[val] = 0;
    //    document.getElementById(`value-${val}`).innerText = '0';
    //}

});
// Auto-start