
// this kind of works :(

const MASTERKEY = '$2a$10$/gwTqpnXynsOyEwQx2cU/OaSa8UV.jLFntDbhUOck/9twV8sx5hV2';
let req = new XMLHttpRequest();


req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        console.log(req.responseText);

        let data = req.responseText;
        let parsed = JSON.parse(data);
        createDateEntry(parsed.record.events.eventContent);
    }
};

req.open("GET", "https://api.jsonbin.io/v3/b/68efc9b9ae596e708f1592ac", true);
req.setRequestHeader("X-Master-Key", MASTERKEY);
req.send();



function createDateEntry(text)
{
    let dateDiv = document.createElement('div');
    dateDiv.id = "dateDisplay";

    let month = document.createElement('p');
    month.id = "monthDisplay";
    month.innerText = "July"

    let day = document.createElement('p');
    day.id = "dayDisplay";
    day.innerText = "2"


    let title = document.createElement('h3');
    title.innerText = "newTitle"
    title.id = "title"

    let content = document.createElement('p');
    content.innerText = text;

    dateDiv.appendChild(month);
    dateDiv.appendChild(day);

    document.getElementsByClassName('event')[0].appendChild(dateDiv);
    document.getElementsByClassName('event')[0].appendChild(title);
    document.getElementsByClassName('event')[0].appendChild(content);
}

//createDateEntry()

