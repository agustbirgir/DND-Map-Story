const worldMap = document.getElementById("world-map");
const infoPanel = document.getElementById("info-panel");


async function fetchRegionData(x, y) {
  const response = await fetch('regions.json');
  const data = await response.json();
  return data.regions.find(region => {
    return region.coordinates.x === x && region.coordinates.y === y;
  });
}

worldMap.addEventListener("click", async function (event) {
    const rect = worldMap.getBoundingClientRect();
    const x = event.clientX - rect.left; 
    const y = event.clientY - rect.top;  
    
    const region = await fetchRegionData(x, y);
    if (region) {
        infoPanel.innerHTML = `
            <h2>${region.name}</h2>
            <p>${region.description}</p>
            <p>Town Master: ${region.townMaster}</p>
            <p>Stories:</p>
            <ul>
                ${region.stories.map(story => `<li>${story}</li>`).join('')}
            </ul>
        `;
    } else {
        infoPanel.innerHTML = "No region information available.";
    }
});
