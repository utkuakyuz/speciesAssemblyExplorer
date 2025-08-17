// Eelements
const speciesSelect = document.getElementById('species-select');
const speciesInfo = document.getElementById('species-info');
const speciesName = document.getElementById('species-name');
const totalLength = document.getElementById('total-length');
const chromosomesList = document.getElementById('chromosomes-list');
const loader = document.getElementById('loader');
const error = document.getElementById('error');

// DOM Utility functions
function showLoading() {
    loader.classList.remove('hidden');
}

function hideLoading() {
    loader.classList.add('hidden');
}

function showError(message) {
    error.textContent = message;
    error.classList.remove('hidden');
}

function hideError() {
    error.classList.add('hidden');
}

function showSpeciesInfo() {
    speciesInfo.classList.remove('hidden');
}

function hideSpeciesInfo() {
    speciesInfo.classList.add('hidden');
}

function formatLength(length) {
    if (length >= 1000000) {
        return (length / 1000000).toFixed(2) + ' Mb';
    } else if (length >= 1000) {
        return (length / 1000).toFixed(2) + ' Kb';
    } else {
        return length + ' bp';
    }
}

function sortChromosomes(a, b) {
    // Handle special cases for human chromosomes
    if (a === 'MT') return 1;
    if (b === 'MT') return -1;
    if (a === 'X') return 1;
    if (b === 'X') return -1;
    if (a === 'Y') return 1;
    if (b === 'Y') return -1;
    
    // Sort numeric chromosomes
    const aNum = parseInt(a);
    const bNum = parseInt(b);
    
    if (!isNaN(aNum) && !isNaN(bNum)) {
        return aNum - bNum;
    }
    
    // Fallback to string comparison
    return a.localeCompare(b);
}

// API functions
async function loadSpecies() {
    try {
        const response = await fetch('https://rest.ensembl.org/info/species?content-type=application/json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const variationSpecies = data.species.filter(species => 
            species.groups && species.groups.includes('variation')
        );

        populateSpeciesDropdown(variationSpecies);
    } catch (err) {
        throw new Error('Failed to load species: ' + err.message);
    }
}

function populateSpeciesDropdown(species) {
    // Clear existing options except the first one
    speciesSelect.innerHTML = '<option value="">Select a species...</option>';
    
    // Sort species alphabetically by display name
    const sortedSpecies = species.sort((a, b) => {
        const nameA = (a.display_name || a.name).toLowerCase();
        const nameB = (b.display_name || b.name).toLowerCase();
        return nameA.localeCompare(nameB);
    });
    
    // Add options
    sortedSpecies.forEach(speciesData => {
        const option = document.createElement('option');
        option.value = speciesData.name;
        option.textContent = speciesData.display_name || speciesData.name;
        speciesSelect.appendChild(option);
    });
}

async function loadSpeciesAssembly(speciesName) {
    try {
        showLoading();
        hideSpeciesInfo();
        
        const response = await fetch(`https://rest.ensembl.org/info/assembly/${speciesName}?content-type=application/json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        displaySpeciesAssembly(speciesName, data);
    } catch (err) {
        showError('Failed to load assembly data: ' + err.message);
    } finally {
        hideLoading();
    }
}

function displaySpeciesAssembly(speciesName, assemblyData) {
    // Display species name
    speciesName.textContent = speciesName;
    
    // Calculate total length
    const total = assemblyData.top_level_region
        .filter(region => region.coord_system === 'chromosome')
        .reduce((sum, region) => sum + region.length, 0);
    
    totalLength.textContent = `Total Length: ${total.toLocaleString()} bp`;
    
    // Get chromosomes and sort by karyotype order
    const chromosomes = assemblyData.top_level_region
        .filter(region => region.coord_system === 'chromosome')
        .sort((a, b) => sortChromosomes(a.name, b.name));
    
    // Display chromosomes
    chromosomesList.innerHTML = '';
    chromosomes.forEach(chromosome => {
        const item = document.createElement('div');
        item.className = 'chromosome-item';
        
        const length = formatLength(chromosome.length);
        item.textContent = `${chromosome.name}: ${length}`;
        
        chromosomesList.appendChild(item);
    });
    
    showSpeciesInfo();
}

// Event handlers
function handleSpeciesChange(e) {
    if (e.target.value) {
        loadSpeciesAssembly(e.target.value);
    } else {
        hideSpeciesInfo();
    }
}

// Initialize application
async function init() {
    try {
        showLoading();
        await loadSpecies();
        speciesSelect.addEventListener('change', handleSpeciesChange);
    } catch (err) {
        showError('Failed to initialize application: ' + err);
    } finally {
        hideLoading();
    }
}
document.addEventListener('DOMContentLoaded', init);
