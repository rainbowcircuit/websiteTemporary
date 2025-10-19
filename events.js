
// this kind of works :(

const MASTERKEY = '$2a$10$/gwTqpnXynsOyEwQx2cU/OaSa8UV.jLFntDbhUOck/9twV8sx5hV2';
let req = new XMLHttpRequest();

req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        console.log(req.responseText);
    }
};

req.open("GET", "https://api.jsonbin.io/v3/b/68efc9b9ae596e708f1592ac", true);
req.setRequestHeader("X-Master-Key", MASTERKEY);
req.send();