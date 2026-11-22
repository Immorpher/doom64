document.addEventListener("DOMContentLoaded", function () {
    const searchInputs = document.querySelectorAll("[data-table-search]");

    searchInputs.forEach(function (input) {
        const table = document.querySelector(input.dataset.tableSearch);

        if (!table) {
            return;
        }

        const rows = Array.from(table.querySelectorAll("tbody tr"));

        input.addEventListener("input", function () {
            const keyword = input.value.trim().toLocaleLowerCase();

            rows.forEach(function (row) {
                const rowText = row.textContent.toLocaleLowerCase();
                row.hidden = keyword !== "" && !rowText.includes(keyword);
            });
        });
    });
});