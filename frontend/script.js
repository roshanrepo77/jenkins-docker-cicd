
const tripForm = document.getElementById("trip-form");
const tripResult = document.getElementById("trip-result");

tripForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const destination = document
        .getElementById("destination")
        .value.trim();

    const budget = Number(
        document.getElementById("budget").value
    );

    const days = Number(
        document.getElementById("days").value
    );

    if (!destination || budget <= 0 || days < 1 || days > 30) {
        tripResult.textContent =
            "Please enter valid trip details.";
        return;
    }

    const dailyBudget = Math.round(budget / days);

    const activities = [
        "Explore famous local attractions",
        "Discover local food and culture",
        "Visit scenic locations and hidden gems",
        "Enjoy outdoor adventures and photography",
        "Relax and explore the surrounding areas",
        "Experience local shopping and entertainment",
        "Enjoy a memorable final day"
    ];

    const heading = document.createElement("h3");
    heading.textContent = "Your DreamRoute Adventure ✨";

    const summary = document.createElement("p");
    summary.textContent =
        `Destination: ${destination} | ` +
        `${days} days | Estimated budget: $${budget}`;

    const daily = document.createElement("p");
    daily.textContent =
        `Your average daily budget is $${dailyBudget}.`;

    const list = document.createElement("ol");

    for (let day = 1; day <= days; day++) {
        const item = document.createElement("li");

        item.textContent =
            `Day ${day}: ${activities[(day - 1) % activities.length]}`;

        list.appendChild(item);
    }

    tripResult.replaceChildren(heading, summary, daily, list);

    tripResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

console.log("DreamRoute application initialized successfully!");
