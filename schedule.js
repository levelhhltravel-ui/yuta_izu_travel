const tabs = document.querySelectorAll(".tab-btn");
const days = document.querySelectorAll(".schedule-container");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const target = tab.dataset.day;
        days.forEach(day => {
            day.style.display = (day.id === target) ? "block" : "none";
        });
    });
});
