const MASTERKEY = '$2a$10$/gwTqpnXynsOyEwQx2cU/OaSa8UV.jLFntDbhUOck/9twV8sx5hV2';

fetch('https://api.jsonbin.io/v3/b/68efc9b9ae596e708f1592ac', {
    headers: { 'X-Master-Key': MASTERKEY }
})
.then(r => r.json())
.then(data => {
    renderEvents(data.record.events);
})
.catch(err => console.error('Failed to load events:', err));

function renderEvents(events) {
    const container = document.querySelector('.event');
    const select = document.getElementById('year-filter');

    const byYear = {};
    events.forEach(ev => {
        const year = ev.eventYear || 'Unknown';
        if (!byYear[year]) byYear[year] = [];
        byYear[year].push(ev);
    });

    const years = Object.keys(byYear).sort((a, b) => b - a);

    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        select.appendChild(option);

        const section = document.createElement('div');
        section.className = 'year-section';
        section.dataset.year = year;

        const heading = document.createElement('h2');
        heading.className = 'year-heading';
        heading.textContent = year;
        section.appendChild(heading);

        byYear[year].forEach(ev => {
            section.appendChild(createDateEntry(ev));
        });

        container.appendChild(section);
    });

    select.addEventListener('change', () => {
        const selected = select.value;
        document.querySelectorAll('.year-section').forEach(sec => {
            sec.style.display = (selected === 'all' || sec.dataset.year === selected) ? '' : 'none';
        });
    });
}

function createDateEntry(data) {
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

    return entry;
}
