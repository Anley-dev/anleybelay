function initiateOrder(baseAmount) {
    // Step 6: Unique decimal logic
    const uniqueDecimal = (Math.random() * 0.99).toFixed(2);
    const finalAmount = (parseFloat(baseAmount) + parseFloat(uniqueDecimal)).toFixed(2);
    
    // Step 1: Create Order ID
    const orderId = "ANLEY-" + Math.random().toString(36).substr(2, 6).toUpperCase();

    // UI Updates
    document.getElementById('support-initial').style.display = 'none';
    document.getElementById('support-checkout').style.display = 'block';
    document.getElementById('order-id').innerText = orderId;
    document.getElementById('order-amount').innerText = finalAmount;

    startTimer(15 * 60); // Step 10: 15 minute timer
}

function startTimer(duration) {
    let timer = duration, minutes, seconds;
    const display = document.getElementById('timer');
    const countdown = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        display.textContent = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
        if (--timer < 0) {
            clearInterval(countdown);
            display.textContent = "EXPIRED - REFRESH";
        }
    }, 1000);
}

