// JavaScript
const sortableA = document.getElementById('sortableA');

// Thêm đối thủ mới
function addOpponent() {
    const roundInfo = document.createElement('div');
    roundInfo.className = 'sortable roundInfo';

    const round = document.createElement('div');
    round.className = 'round panel-border clearfix panel-padding';

    const nameRound = document.createElement('span');
    nameRound.className = 'name-round';
    nameRound.textContent = 'Đối thủ mới';
    round.appendChild(nameRound);

    const match = document.createElement('div');
    match.className = 'match';
    match.setAttribute('group', 'matchgroup');

    const stt = document.createElement('span');
    stt.className = 'stt';
    stt.textContent = '#1';
    match.appendChild(stt);

    const matchInfo = document.createElement('div');
    matchInfo.className = 'matchInfo';

    const competitorA = document.createElement('div');
    competitorA.className = 'competitor-container';

    const selectA = document.createElement('select');
    selectA.className = 'team form-control competitorA';
    selectA.name = 'matchAll[A][1/1][8541918][team1]';
    selectA.id = 'matchA_8541918';

    const optionA1 = document.createElement('option');
    optionA1.value = '#1';
    optionA1.textContent = 'Người chơi #1';
    selectA.appendChild(optionA1);

    const optionA2 = document.createElement('option');
    optionA2.value = '#2';
    optionA2.selected = true;
    optionA2.textContent = 'Người chơi #2';
    selectA.appendChild(optionA2);

    competitorA.appendChild(selectA);
    matchInfo.appendChild(competitorA);

    const versus = document.createElement('div');
    versus.className = 'text-center versus';
    versus.textContent = '-';
    matchInfo.appendChild(versus);

    const competitorB = document.createElement('div');
    competitorB.className = 'competitor-container';

    const selectB = document.createElement('select');
    selectB.className = 'team form-control competitorB';
    selectB.name = 'matchAll[A][1/1][8541918][team2]';
    selectB.id = 'matchB_8541918';

    const optionB1 = document.createElement('option');
    optionB1.value = '#1';
    optionB1.selected = true;
    optionB1.textContent = 'Người chơi #1';
    selectB.appendChild(optionB1);

    const optionB2 = document.createElement('option');
    optionB2.value = '#2';
    optionB2.textContent = 'Người chơi #2';
    selectB.appendChild(optionB2);

    competitorB.appendChild(selectB);
    matchInfo.appendChild(competitorB);

    match.appendChild(matchInfo);
    round.appendChild(match);
    roundInfo.appendChild(round);
    sortableA.appendChild(roundInfo);
}

// Trộn đối thủ ngẫu nhiên
function shuffleOpponents() {
    const opponents = Array.from(sortableA.children);
    opponents.sort(() => Math.random() - 0.5);
    opponents.forEach((opponent, index) => {
        opponent.querySelector('.stt').textContent = `#${index + 1}`;
    });
}
const selectA = document.getElementById('matchA_8541918');
const selectB = document.getElementById('matchB_8541918');

// Tạo thêm 2 người chơi
const optionA3 = document.createElement('option');
optionA3.value = `#${3}`;
optionA3.textContent = `Người chơi #${3}`;
selectA.appendChild(optionA3);

const optionB3 = document.createElement('option');
optionB3.value = `#${3}`;
optionB3.textContent = `Người chơi #${3}`;
selectB.appendChild(optionB3);

const optionA4 = document.createElement('option');
optionA4.value = `#${4}`;
optionA4.textContent = `Người chơi #${4}`;
selectA.appendChild(optionA4);

const optionB4 = document.createElement('option');
optionB4.value = `#${4}`;
optionB4.textContent = `Người chơi #${4}`;
selectB.appendChild(optionB4);