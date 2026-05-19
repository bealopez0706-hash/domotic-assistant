document.addEventListener('DOMContentLoaded', () => {
    loadDeviceStates();
});

function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page + '-page').classList.add('active');
}

function toggleDevice(el, deviceName) {
    el.classList.toggle('active');
    const statusId = deviceName + '-status';
    const statusEl = document.getElementById(statusId);
    
    if (el.classList.contains('active')) {
        statusEl.textContent = deviceName === 'door' ? 'UNLOCKED' : 'ON';
        showToast(`${deviceName} turned ON`);
    } else {
        statusEl.textContent = deviceName === 'door' ? 'LOCKED' : 'OFF';
        showToast(`${deviceName} turned OFF`);
    }
    
    saveDeviceState(deviceName, el.classList.contains('active'));
}

function loadDeviceStates() {
    ['lights', 'ac', 'door', 'fan'].forEach(device => {
        if (localStorage.getItem(device) === 'true') {
            const toggle = document.querySelector(`[data-device="${device}"]`);
            if (toggle) {
                toggle.classList.add('active');
                const statusEl = document.getElementById(device + '-status');
                statusEl.textContent = device === 'door' ? 'UNLOCKED' : 'ON';
            }
        }
    });
}

function saveDeviceState(device, state) {
    localStorage.setItem(device, state);
}

function openAddDeviceModal() {
    document.getElementById('addDeviceModal').classList.add('show');
}

function closeAddDeviceModal() {
    document.getElementById('addDeviceModal').classList.remove('show');
}

function addDevice(event) {
    event.preventDefault();
    const name = document.getElementById('deviceName').value;
    showToast(`Device "${name}" added!`);
    event.target.reset();
    closeAddDeviceModal();
}

function openAddRoomModal() {
    document.getElementById('addRoomModal').classList.add('show');
}

function closeAddRoomModal() {
    document.getElementById('addRoomModal').classList.remove('show');
}

function addRoom(event) {
    event.preventDefault();
    const name = document.getElementById('roomName').value;
    showToast(`Room "${name}" added!`);
    event.target.reset();
    closeAddRoomModal();
}

function editDevice(deviceId) {
    showToast(`Editing ${deviceId}`);
}

function deleteDevice(deviceId) {
    if (confirm(`Delete ${deviceId}?`)) {
        showToast(`${deviceId} deleted`);
    }
}

function viewRoom(roomId) {
    navigateTo('devices');
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;bottom:30px;right:30px;background:#4caf50;color:white;padding:15px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);z-index:2000;';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

window.onclick = function(event) {
    const addDeviceModal = document.getElementById('addDeviceModal');
    const addRoomModal = document.getElementById('addRoomModal');
    if (event.target === addDeviceModal) addDeviceModal.classList.remove('show');
    if (event.target === addRoomModal) addRoomModal.classList.remove('show');
}
