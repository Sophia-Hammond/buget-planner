
document.addEventListener("DOMContentLoaded", () => {
    fetchTotalBudget();
    fetchEnvelopes();
    fetchWishList();
    fetchCountdown();
    fetchUser();

});

async function fetchTotalBudget() {
    try {
        const response = await fetch("/api/totalBudget");
        const data = await response.json();
        document.getElementById("totalBudget").textContent = data.totalAmount || 0;
    } catch (error) {
        console.error("Error fetching total budget:", error);
    }
}


async function fetchEnvelopes() {
    try {
        const response = await fetch("/api/envelopes");
        const envelopes = await response.json();
        const container = document.querySelector(".all-envelopes");
        container.innerHTML = "";
        
        envelopes.forEach(env => {
            const div = document.createElement("div");
            div.classList.add("envelope");
            div.innerHTML = `<h3>${env.title}</h3><p>Amount: $${env.amount}</p>`;
            container.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching envelopes:", error);
    }
}

document.getElementById("envelope-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;

    if (!title || !amount) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const response = await fetch("/api/envelopes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, amount })
        });

        if (response.ok) {
            fetchEnvelopes(); // Refresh envelope list
            document.getElementById("envelope-form").reset();
        } else {
            alert("Failed to create envelope.");
        }
    } catch (error) {
        console.error("Error creating envelope:", error);
    }
});


async function fetchWishList() {
    try {
        const response = await fetch("/api/wishlist");
        const wishlist = await response.json();
        
        const gridItems = document.querySelectorAll(".grid-item"); // All placeholders
        gridItems.forEach(item => item.innerHTML = ""); // Clear existing images

        wishlist.forEach((item, index) => {
            if (index < gridItems.length) { // Replace only available placeholders
                gridItems[index].innerHTML = `
                    <div class="wishlist-box">
                        <h3>${item.name}</h3>
                        <p>Amount: $${item.amount}</p>
                        <p>${item.purchased ? "✅ Purchased" : "❌ Not Purchased"}</p>
                    </div>
                `;
            }
        });
    } catch (error) {
        console.error("Error fetching wishlist:", error);
    }
}

