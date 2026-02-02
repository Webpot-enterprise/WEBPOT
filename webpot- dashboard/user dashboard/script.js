// Status select event listener - Guard against missing elements
const statusSelects = document.querySelectorAll(".status-select");
if (statusSelects.length > 0) {
  statusSelects.forEach(select => {
    select.addEventListener("change", () => {
      alert("Order status updated to: " + select.value);
    });
  });
}

// Summary calculation - Placeholder for future PHP integration
// Example logic (commented out - requires backend data):
// const rows = document.querySelectorAll("tbody tr");
// if (rows.length > 0) {
//   let pendingCount = 0;
//   let processingCount = 0;
//   let deliveredCount = 0;
//   let totalRevenue = 0;
//
//   rows.forEach(row => {
//     const status = row.dataset.orderStatus;
//     const amount = parseInt(row.dataset.orderAmount || 0);
//
//     if (status === "pending") pendingCount++;
//     if (status === "processing") processingCount++;
//     if (status === "delivered") deliveredCount++;
//     totalRevenue += amount;
//   });
//
//   const sumTotal = document.getElementById("sumTotal");
//   const sumPending = document.getElementById("sumPending");
//   const sumProcessing = document.getElementById("sumProcessing");
//   const sumDelivered = document.getElementById("sumDelivered");
//   const sumRevenue = document.getElementById("sumRevenue");
//
//   if (sumTotal) sumTotal.textContent = rows.length;
//   if (sumPending) sumPending.textContent = pendingCount;
//   if (sumProcessing) sumProcessing.textContent = processingCount;
//   if (sumDelivered) sumDelivered.textContent = deliveredCount;
//   if (sumRevenue) sumRevenue.textContent = "₹" + totalRevenue;
// }
