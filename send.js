var options = {
    type: "basic",
    title: "Veri-help",
    message: "Your code is:",
    };
    
    
chrome.notifications.create(options, callback);
    
function callback(){
    console.log('Popup done!')
}
    