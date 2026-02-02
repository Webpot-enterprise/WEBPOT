document.querySelectorAll(".status-select").forEach(select => {
  select.addEventListener("change", () => {
    alert("Order status updated to: " + select.value);
  });
});
// Example (future)
document.getElementById("sumTotal").textContent = rows.length;
document.getElementById("sumPending").textContent = pendingCount;
document.getElementById("sumProcessing").textContent = processingCount;
document.getElementById("sumDelivered").textContent = deliveredCount;
document.getElementById("sumRevenue").textContent = "₹" + totalRevenue;
