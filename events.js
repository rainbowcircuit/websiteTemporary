const MASTERKEY = '$2a$10$/gwTqpnXynsOyEwQx2cU/OaSa8UV.jLFntDbhUOck/9twV8sx5hV2';

fetch('https://api.jsonbin.io/v3/b/68efc9b9ae596e708f1592ac', {
    headers: { 'X-Master-Key': MASTERKEY }
})
.then(r => r.json())
.then(data => {
    data.record.events.forEach(ev => createDateEntry(ev));
})
.catch(err => console.error('Failed to load events:', err));

function createDateEntry(data) {
    const container = document.querySelector('.event');

    const entry = document.createElement('div');
    entry.className = 'event-entry';

    const dateBlock = document.createElement('div');
    dateBlock.className = 'date-block';

    const month = document.createElement('span');
    month.className = 'month';
    month.textContent = data.eventMonth;

    const day = document.createElement('span');
    day.className = 'day';
    day.textContent = data.eventDay;

    dateBlock.appendChild(month);
    dateBlock.appendChild(day);

    const info = document.createElement('div');
    info.className = 'event-info';

    const title = document.createElement('h3');
    title.className = 'event-title';
    title.textContent = data.eventTitle;

    const content = document.createElement('p');
    content.className = 'event-content';
    content.textContent = data.eventContent;

    info.appendChild(title);
    info.appendChild(content);

    entry.appendChild(dateBlock);
    entry.appendChild(info);
    container.appendChild(entry);
}
