// A function that returns a promise
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("✅ Data loaded!");
    }, 5000);
  });
}

// Using async/await
async function getData() {
  console.log("⏳ Fetching data...");
  
  const result = await fetchData(); // waits for fetchData() to finish
  
  console.log(result); // prints after 2 seconds
  console.log("🎉 Done!");
}

getData();
