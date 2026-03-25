async function fetchData(city) {
const API_Key = "30b4f1931b45e816c8edad5629a2076d";

    try {
        const response = await fetch(
            
            "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric"
        );

        const data = await response.json();

        if (data.cod !== 200) {
            document.getElementById("result").innerHTML =
                `<p style="color:red;">${data.message}</p>`;
            return;
        }

        document.getElementById("result").innerHTML =
            `<h2>${data.name}</h2>
             <p>Temperature: ${data.main.temp}°C</p>
             <p>Humidity: ${data.main.humidity}%</p>`;

    } catch (error) {
        console.error(error);
    }
}

function getWeather() {
    const city = document.getElementById("city").value.trim();

    if (!city) {
        alert("Enter a city name");
        return;
    }

    fetchData(city);
}
/* ---------- SAVE HISTORY ---------- */
        function saveHistory(city) {
            let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

            if (!history.includes(city)) {
                history.unshift(city);
            }

            history = history.slice(0, 5);

            localStorage.setItem("weatherHistory", JSON.stringify(history));

            showHistory();
        }

        /* ---------- SHOW HISTORY ---------- */
        function showHistory() {
            const history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

            historyBox.innerHTML = "";

            history.forEach(city => {
                const btn = document.createElement("button");
                btn.textContent = city;

                btn.onclick = () => {
                    search(city);
                };

                historyBox.appendChild(btn);
            });
        }