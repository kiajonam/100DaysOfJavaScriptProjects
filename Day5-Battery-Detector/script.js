// Initialize battery detector
initBattery();

function initBattery() {

    // UI elements
    const batteryLiquid = document.querySelector(".Bliquid");
    const batteryStatus = document.querySelector(".Bstatus");
    const Bprecentage = document.querySelector(".Bprecentage");

    // Get battery information from browser
    navigator.getBattery().then((batt) => {

        const chargingremain = batt.chargingTime;
        console.log(chargingremain);

        // Update battery UI
        const updateBattery = () => {

            // Battery level (%)
            const level = Math.floor(parseInt(batt.level * 100));

            Bprecentage.innerHTML = `${level}%`;
            batteryLiquid.style.height = `${level}%`;

            // Remaining battery time
            let time = batt.dischargingTime;
            let hours;
            let min;

            if (time === Infinity || isNaN(time)) {
                batteryStatus.innerHTML = "Left: Calculate...";
            } else {
                hours = Math.floor(time / 3600);
                min = Math.floor((time % 3600) / 60);

                batteryStatus.innerHTML = `Left: ${hours}h:${min}m`;
            }

            // Battery fully charged
            if (level === 100) {

                batteryStatus.innerHTML =
                    `Battery Full <i class="ri-battery-2-fill green-color"></i>`;

                batteryLiquid.style.height = "100%";
                batteryLiquid.classList.add("gradient-color-green");
                batteryLiquid.classList.remove("charging-animation");

            }

            // Charging state (75% - 100%)
            else if (level >= 75 && batt.charging) {

                batteryStatus.innerHTML =
                    `Charging... <i class="ri-flashlight-line animated-green"></i>`;

                batteryLiquid.classList.add(
                    "charging-animation",
                    "gradient-color-green"
                );

            }

            // Charging state (50% - 74%)
            else if (level >= 50 && batt.charging) {

                batteryStatus.innerHTML =
                    `Charging... <i class="ri-flashlight-line animated-yellow"></i>`;

                chargingtime.innerHTML =
                    `Full Charge in${chargingTimeInHours}h:${chargingTimeInMinute}m`;

                batteryLiquid.classList.add(
                    "charging-animation",
                    "gradient-color-yellow"
                );

            }

            // Charging state (25% - 49%)
            else if (level >= 25 && batt.charging) {

                batteryStatus.innerHTML =
                    `Charging...<i class="ri-flashlight-line animated-orange"></i>`;

                batteryLiquid.classList.add(
                    "charging-animation",
                    "gradient-color-orange"
                );

            }

            // Charging state (0% - 24%)
            else if (level >= 0 && batt.charging) {

                batteryStatus.innerHTML =
                    `Charging...<i class="ri-flashlight-line animated-red"></i>`;

                batteryLiquid.classList.add(
                    "charging-animation",
                    "gradient-color-red"
                );

            }

            // Battery level colors while discharging
            else if (level >= 75 && !batt.charging) {

                batteryLiquid.classList.add("gradient-color-green");
                batteryLiquid.classList.remove("charging-animation");

            }

            else if (level >= 50 && !batt.charging) {

                batteryLiquid.classList.add("gradient-color-yellow");
                batteryLiquid.classList.remove("charging-animation");

            }

            else if (level >= 25 && !batt.charging) {

                batteryLiquid.classList.add("gradient-color-orange");
                batteryLiquid.classList.remove("charging-animation");

            }

            else if (level >= 15 && !batt.charging) {

                batteryLiquid.classList.add("gradient-color-red");
                batteryLiquid.classList.remove("charging-animation");

            }

            else {
                batteryStatus.innerHTML = "";
            }

        };

        // Listen for battery level changes
        batt.addEventListener("levelchange", updateBattery);

        // Listen for charging state changes
        batt.addEventListener("chargingchange", updateBattery);

        // Initial render
        updateBattery();

    });

}