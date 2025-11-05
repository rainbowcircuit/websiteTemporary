/*
This read/write is implemented using JSONBIN.io API. 
*/

const MASTERKEY = '$2a$10$/gwTqpnXynsOyEwQx2cU/OaSa8UV.jLFntDbhUOck/9twV8sx5hV2';
let req = new XMLHttpRequest();


req.open("GET", "https://api.jsonbin.io/v3/b/68efc9b9ae596e708f1592ac", true);
req.setRequestHeader("X-Master-Key", MASTERKEY);
req.send();

let editorIndex = 0;
let JSONdata;

req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        console.log(req.responseText);

        let data = req.responseText;
        let parsed = JSON.parse(data);

        JSONdata = parsed.record;
        parseFromJSON(parsed.record.events[editorIndex]);

    }
};

function parseFromJSON(data)
{
    // show value
    document.getElementById('monthTextArea').innerText = data.eventMonth;
    document.getElementById('dayTextArea').innerText = data.eventDay;
    document.getElementById('titleTextArea').innerText = data.eventTitle;
    document.getElementById('entryTextArea').innerText = data.eventContent;
}   


function showPrev()
{
    editorIndex--;
    editorIndex = editorIndex % JSONdata.events.length;
    parseFromJSON(JSONdata.events[editorIndex]);
}

function showNext()
{
    editorIndex++;
    editorIndex = editorIndex % JSONdata.events.length;
    parseFromJSON(JSONdata.events[editorIndex]);

}

function createNewEntry()
{

    let entries = document.getElementById("entries")
    let newEntry = new Option("New Entry", "option value");

    // select 
    entries.add(newEntry, 1); // 0 is no selection
    entries.value = 1
}

function saveEntry()
{
    let month = document.getElementById('monthTextArea').value;
    let day = document.getElementById('dayTextArea').value;
    let title = document.getElementById('titleTextArea').value;
    let content = document.getElementById('entryTextArea').value;
    
    // Update the specific entry in the JSONdata object
    JSONdata.events[editorIndex] = {
        eventMonth: month,
        eventDay: day,
        eventTitle: title,
        eventContent: content
    };
    
    // Send PUT request to update the entire bin
    let updateReq = new XMLHttpRequest();
    updateReq.open("PUT", "https://api.jsonbin.io/v3/b/68efc9b9ae596e708f1592ac", true);
    updateReq.setRequestHeader("Content-Type", "application/json");
    updateReq.setRequestHeader("X-Master-Key", MASTERKEY);
    
    updateReq.onreadystatechange = () => {
        if (updateReq.readyState == XMLHttpRequest.DONE) {
            if (updateReq.status == 200) {
                console.log("Successfully saved!");
                console.log(updateReq.responseText);
            } else {
                console.error("Error saving:", updateReq.status, updateReq.responseText);
            }
        }
    };
    
    // Send the entire updated JSONdata object
    updateReq.send(JSON.stringify(JSONdata));
}


function deleteEntry()
{
    /*
    is it currently on an entry?
    

    */
}


let prevButton = document.getElementById("prev");
prevButton.addEventListener("click", () => {
    showPrev();
});

let nextButton = document.getElementById("next");
nextButton.addEventListener("click", () => {
    showNext();
});

let newButton = document.getElementById("new");
newButton.addEventListener("click", () => {
    createNewEntry();
});

let deleteButton = document.getElementById("delete");
newButton.addEventListener("click", () => {

});

let saveButton = document.getElementById("save");
saveButton.addEventListener("click", () => {
    saveEntry();
});


