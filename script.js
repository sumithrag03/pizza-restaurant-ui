
document.addEventListener("DOMContentLoaded", function () {
    // Update the copyright year automatically
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Search destination cards
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("siteSearch");
    const destinationColumns = document.querySelectorAll(".destination-column");
    const noResults = document.getElementById("noResults");
    const destinationsSection = document.getElementById("destinations");

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const query = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        destinationColumns.forEach(function (column) {
            const cardText = column.textContent.toLowerCase();
            const matches = query === "" || cardText.includes(query);

            column.classList.toggle("d-none", !matches);

            if (matches) {
                visibleCount++;
            }
        });

        noResults.classList.toggle("d-none", visibleCount !== 0);

        // Bring the filtered results into view
        destinationsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        // Close the mobile navigation after searching
        const navbarCollapse = document.getElementById("mainNavbar");

        if (navbarCollapse.classList.contains("show")) {
            bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
        }
    });

    // Restore all destination cards when the search field is cleared
    searchInput.addEventListener("input", function () {
        if (searchInput.value.trim() === "") {
            destinationColumns.forEach(function (column) {
                column.classList.remove("d-none");
            });

            noResults.classList.add("d-none");
        }
    });
});
