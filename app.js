const output = document.getElementById('output');
const contain = document.getElementById('contain')
const inputText = document.getElementById('inputText');
const noteLabel = document.getElementById('noteLabel');
const copyButton = document.getElementById('copyButton')
const date = document.getElementById('date')
const maxHistoryItems = 50

const button = document.querySelector(".theme-toggle")
const buttonToggle = document.querySelector(".theme-toggle span")

const displayName = localStorage.getItem('displayName');
if (displayName) {
    const logBtn = document.getElementById('logBtn');
    logBtn.innerHTML = `${displayName} <span class="arrow">&#9660;</span>`;
    logBtn.onclick = function () {
        document.getElementById("dropdownContent").classList.toggle("show");
    }
    const login = document.getElementById('login')
    login.removeAttribute("href");
}

button.onclick = function () {
    buttonToggle.classList.toggle("active-btn");
    document.body.classList.toggle("active-dark");
}

function updateTime() {
    let startDate = new Date("2024/02/16");
    let time = new Date();
    let daysNum = Math.floor((time - startDate) / (1000 * 60 * 60 * 24))
    date.innerHTML = ` ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} - ${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}<br>(${daysNum} ngày)`
}
setInterval(updateTime, 1000);

function toggleNote() {
    noteLabel.style.display = noteLabel.style.display === 'none' ? 'block' : 'none';
}

const iconMap = {
    'a': '🐽',
    'b': '👀',
    'c': '🐭',
    'd': '💀',
    'đ': '🦘',
    'e': '📧',
    'ê': '📨',
    'f': '🎏',
    'g': '🐔',
    'h': '🐴',
    'i': '🦴',
    'j': '🎷',
    'k': '🎋',
    'l': '🕒',
    'm': '🐣',
    'n': '🐍',
    'o': '🐲',
    'p': '🐸',
    'q': '🍳',
    'r': '🦄',
    's': '🐞',
    't': '🕸',
    'u': '🌼',
    'v': '🌳',
    'w': '🍁',
    'x': '⚘',
    'y': '🛩️',
    'z': '⚡',
    'á': '🍍',
    'à': '🍯',
    'ả': '🍐',
    'ã': '🍑',
    'ạ': '🍋',
    'ắ': '🌅',
    'ằ': '🌄',
    'ẳ': '🌇',
    'ẵ': '🌆',
    'ặ': '🌃',
    'ă': '🧧',
    'ấ': '🌈',
    'ầ': '🌊',
    'ẩ': '🌋',
    'ẫ': '🌉',
    'ậ': '🌌',
    'â': '🎀',
    'é': '😂',
    'ẻ': '🥲',
    'ẹ': '😎',
    'ẽ': '🙂',
    'è': '😄',
    'ế': '🤔',
    'ề': '😏',
    'ể': '🤑',
    'ễ': '🤯',
    'ệ': '🤪',
    'í': '🩲',
    'ì': '🧢',
    'ỉ': '🪖',
    'ĩ': '👘',
    'ị': '🦺',
    'ó': '👖',
    'ò': '🩴',
    'ỏ': '👓',
    'õ': '💍',
    'ọ': '⛑',
    'ố': '🎹',
    'ồ': '🥁',
    'ổ': '🪘',
    'ỗ': '📞',
    'ộ': '☎️',
    'ô': '💻',
    'ơ': '💡',
    'ớ': '🤿',
    'ờ': '🃏',
    'ở': '😷',
    'ỡ': '🤡',
    'ợ': '😈',
    'ú': '🔦',
    'ù': '💰',
    'ủ': '🗞',
    'ũ': '📬',
    'ụ': '📁',
    'ứ': '📍',
    'ừ': '🛡',
    'ử': '🧲',
    'ữ': '💊',
    'ự': '🌐',
    'ư': '🛖',
    'ý': '🙈',
    'ỳ': '🙉',
    'ỷ': '🙊',
    'ỹ': '🐵',
    'ỵ': '🐮',
    '0': '🕛',
    '1': '🥇',
    '2': '🥈',
    '3': '🥉',
    '4': '🍀',
    '5': '🍟',
    '6': '🥪',
    '7': '💎',
    '8': '🍬',
    '9': '🌶️',
    '.': '♠️',
    ',': '♦️',
    '?': '🎲',
    '!': '🧨',
    '(': '🏴',
    ')': '🏳',
};

function encode() {
    const text = inputText.value.trim().toLowerCase();
    if (text === '') {
        document.getElementById('alertMessage').textContent = '*Vui lòng nhập văn bản trước khi mã hóa.';
        document.getElementById('alertMessage').style.display = 'block';
        return;
    }
    document.getElementById('alertMessage').textContent = '';
    document.getElementById('alertMessage').style.display = 'none';
    let encodedText = '';
    for (let char of text) {
        if (char in iconMap) {
            encodedText += iconMap[char];
        } else {
            encodedText += char;
        }
    }
    output.textContent = encodedText;
    document.getElementById('output').classList.add('show');
    document.getElementById('copyButton').classList.add('show');

    addToHistory(inputText.value, encodedText);
}

function decode() {
    const encodedText = inputText.value.trim();
    if (encodedText === '') {
        document.getElementById('alertMessage').textContent = '*Vui lòng nhập văn bản cần giải mã.';
        document.getElementById('alertMessage').style.display = 'block';
        return;
    }
    document.getElementById('alertMessage').textContent = '';
    document.getElementById('alertMessage').style.display = 'none';
    let decodedText = '';
    let i = 0;
    while (i < encodedText.length) {
        let found = false;
        for (let key in iconMap) {
            let icon = iconMap[key];
            if (encodedText.substring(i, i + icon.length) === icon) {
                decodedText += key;
                i += icon.length;
                found = true;
                break;
            }
        }
        if (!found) {
            decodedText += encodedText[i];
            i++;
        }
    }
    output.textContent = decodedText;
    document.getElementById('output').classList.add('show');
    document.getElementById('copyButton').classList.add('show');

    addToHistory(encodedText, decodedText);
}

function showHistory() {
    const user = firebase.auth().currentUser;
    if (user) {
        const userId = user.uid;
        const userHistoryRef = firebase.database().ref('users/' + userId + '/history');
        userHistoryRef.once('value', (snapshot) => {
            const historyData = snapshot.val();
            if (historyData) {
                let historyList = '';
                Object.keys(historyData).forEach((key, index) => {
                    const entry = historyData[key];
                    historyList += `
                        <li>
                            <button title="Xóa" id="delete-btn" onclick="deleteHistoryItem('${key}')">X</button>
                            <span id='index-list'>${index + 1}.</span>
                            <span id="input-text">${entry.original}</span><br><span id='output-text'>${entry.result}</span>
                        </li>`;
                });
                displayHistoryModal(historyList, historyData);
            } else {
                displayHistoryModal('<li>Không có dữ liệu.</li>', []);
            }
        }, (error) => {
            console.error("Lỗi khi truy xuất lịch sử từ cơ sở dữ liệu:", error);
        });
    } else {
        const historyData = JSON.parse(localStorage.getItem('history')) || [];
        let historyList = '';
        if (historyData.length > 0) {
            historyList = historyData.map((item, index) =>
                `<li>
                    <button title="Xóa" id="delete-btn" onclick="deleteHistoryItem(${index})">X</button>
                    <span id='index-list'>${index + 1}.</span>
                    ${item}
                </li>`).join('');
        } else {
            historyList = '<li>Không có dữ liệu.</li>';
        }
        displayHistoryModal(historyList, historyData);
    }
}

function displayHistoryModal(historyList, historyData) {
    let historyCount = Object.keys(historyData).length;
    const historyModal = `
        <div class="history-modal">
            <div class="history-content">
                <span class="close" onclick="closeHistory()">&times;</span>
                <div class="modal-top">
                    <h2>Lịch sử gần đây (${historyData.length}/${maxHistoryItems})</h2>
                    <button onclick="clearHistory()">Xóa tất cả</button>
                </div>
                <ul id="modal-list">${historyList}</ul>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', historyModal);
    document.body.style.overflow = 'hidden';
}

function closeHistory() {
    const historyModal = document.querySelector('.history-modal');
    if (historyModal) {
        historyModal.remove();
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener('click', function (event) {
    const historyModal = document.querySelector('.history-modal');
    if (event.target === historyModal) {
        closeHistory();
    }
});

function addToHistory(original, result) {
    const user = firebase.auth().currentUser;
    if (user) {
        const userId = user.uid;
        const userHistoryRef = firebase.database().ref('users/' + userId + '/history');
        userHistoryRef.once('value', (snapshot) => {
            let historyData = snapshot.val() || [];
            const newEntry = {
                original: original,
                result: result
            };

            let isDuplicate = false;
            historyData.forEach(entry => {
                if (entry.original === original && entry.result === result) {
                    isDuplicate = true;
                }
            });

            if (!isDuplicate) {
                historyData.unshift(newEntry);
                if (historyData.length > maxHistoryItems) {
                }

                userHistoryRef.set(historyData)
                    .then(() => {
                        console.log("Lịch sử đã được lưu vào cơ sở dữ liệu của người dùng.");
                    })
                    .catch((error) => {
                        console.error("Lỗi khi lưu lịch sử vào cơ sở dữ liệu:", error);
                    });
            } else {
                console.log("Mục lịch sử đã tồn tại trong cơ sở dữ liệu của người dùng.");
            }
        }, (error) => {
            console.error("Lỗi khi truy xuất lịch sử từ cơ sở dữ liệu:", error);
        });
    }
    else {
        const historyData = JSON.parse(localStorage.getItem('history')) || [];
        const newEntry = `<span id="input-text">${original}</span><br><span id='output-text'>${result}</span>`;

        if (historyData.length > 0 && historyData[0] === newEntry) {
            return;
        }

        const filteredHistory = historyData.filter(entry => entry !== newEntry);

        if (filteredHistory.length >= maxHistoryItems) {
            filteredHistory.pop();
        }

        filteredHistory.unshift(newEntry);
        localStorage.setItem('history', JSON.stringify(filteredHistory));
    }
}

function deleteHistoryItem(index) {
    const user = firebase.auth().currentUser;
    if (user) {
        const userId = user.uid;
        const userHistoryRef = firebase.database().ref('users/' + userId + '/history');
        userHistoryRef.once('value', (snapshot) => {
            let historyData = snapshot.val() || [];
            historyData.splice(index, 1);
            userHistoryRef.set(historyData)
                .then(() => {
                    console.log("Mục lịch sử đã được xóa từ cơ sở dữ liệu của người dùng.");
                    showHistory();
                    closeHistory();
                })
                .catch((error) => {
                    console.error("Lỗi khi xóa mục lịch sử từ cơ sở dữ liệu:", error);
                });
        }, (error) => {
            console.error("Lỗi khi truy xuất lịch sử từ cơ sở dữ liệu:", error);
        });
    } else {
        let historyData = JSON.parse(localStorage.getItem('history')) || [];
        historyData.splice(index, 1);
        localStorage.setItem('history', JSON.stringify(historyData));
        showHistory();
        closeHistory();
    }
}

function clearHistory() {
    const user = firebase.auth().currentUser;
    if (user) {
        const userId = user.uid;
        const userHistoryRef = firebase.database().ref('users/' + userId + '/history');
        userHistoryRef.once('value', (snapshot) => {
            const historyData = snapshot.val();
            if (historyData !== null && historyData !== undefined) {
                const confirmation = confirm("Bạn có chắc chắn muốn xóa tất cả lịch sử?");
                if (confirmation) {
                    userHistoryRef.remove()
                        .then(() => {
                            console.log("Lịch sử đã được xóa khỏi cơ sở dữ liệu của người dùng.");
                            closeHistory();
                            showHistory();
                        })
                        .catch((error) => {
                            console.error("Lỗi khi xóa lịch sử từ cơ sở dữ liệu:", error);
                        });
                }
            } else {
                console.log("Không có lịch sử để xóa từ cơ sở dữ liệu.");
            }
        }, (error) => {
            console.error("Lỗi khi truy xuất lịch sử từ cơ sở dữ liệu:", error);
        });
    } else {
        const confirmation = confirm("Bạn có chắc chắn muốn xóa tất cả lịch sử?");
        if (confirmation) {
            localStorage.removeItem('history');
            closeHistory();
            showHistory();
        }
    }
}

function copyOutput() {
    output.select();
    document.execCommand('copy');
    copyButton.textContent = 'Đã copy'
}

function resetInput() {
    inputText.value = '';
    output.textContent = '';
    document.getElementById('output').classList.remove('show');
    document.getElementById('copyButton').classList.remove('show');
}
