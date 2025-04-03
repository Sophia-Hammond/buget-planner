document.addEventListener("DOMContentLoaded", () => {
    fetchTotalBudget();
    fetchEnvelopes();
    
});
// homepage 
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
        const container = document.querySelector(".all-envelopes .envelope-gallery");
        container.innerHTML = "";
        
        envelopes.forEach(env => {
            const div = document.createElement("div");
            div.classList.add("envelope");
            div.innerHTML = `
                <div class="envelope-box">
                    <h3>${env.title}</h3>
                    <p>Amount: $${env.amount}</p>
                </div>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching envelopes:", error);
    }
}

document.getElementById("submit-total-budget").addEventListener("click", async () => {
    const amount = document.getElementById("total-budget-amount").value;
    
    if (!amount) {
        alert("Please enter a valid amount.");
        return;
    }

    try {
        const response = await fetch("/api/totalBudget", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount })
        });

        if (response.ok) {
            fetchTotalBudget(); // Refresh total budget
        } else {
            alert("Failed to update total budget.");
        }
    } catch (error) {
        console.error("Error updating total budget:", error);
    }
});

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


