


/*
This read/write is using JSONBIN.io API. 
*/

const JSONKEY = '$2a$10$/gwTqpnXynsOyEwQx2cU/OaSa8UV.jLFntDbhUOck/9twV8sx5hV2';



function showNext()
{

}

function loadEntryToList()
{
    // load entry into text editor
    
    let entries = document.getElementById("entries")

    for (let i = 0; i < 10; i++)
    {
        // this should come from the JSON
        let entry = new Option("option" + i, "option value");
        entries.add(entry);
    }


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
    // get values from text editor and save to json
   // let date = document.getElementById("date").value;


    console.log("save to JSON"); // meaning publish
    let testString = JSON.stringify({
        title: "title",
        date: "date",
        content: "content" 
        })
    
    console.log(testString);
    const writePath = "entry.json";
    

    /*
    fs.writePath(writePath, testString, (err) => {
        if(err) {
            console.log("Could not write file");
        } else {
            console.log("successfully written");
        }
    });
    */

}

function deleteEntry()
{
    /*
    is it currently on an entry?
    

    */
}



loadEntryToList();
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


