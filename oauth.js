window.onload = function () {
  document.querySelector('button').addEventListener('click', function () {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      let init = {
        method: 'GET',
        async: true,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        'contentType': 'json'
      };
      fetch(
        'https://people.googleapis.com/v1/people/me?personFields=emailAddresses', init)
        .then((response) => response.json())
        .then(function (data) {
          let email = data.emailAddresses[0].value;
          fetch(`https://gmail.googleapis.com/gmail/v1/users/${email}/messages`, init)
            .then(response => response.json())
            .then(function (data) {
              let ID = data.messages[0].id;
              fetch(`https://gmail.googleapis.com/gmail/v1/users/${email}/messages/${ID}`, init)
                .then(response => response.json())
                .then(function (data) {
                  //actual body: console.log(atob(data.payload.parts[0].body.data))
                  let subject = (data.payload.headers[20].value)
                  console.log(subject)
                  chrome.notifications.create(
                    {
                      type: "basic",
                      title: "Veri-help has gotten a new message!",
                      message: subject,
                      iconUrl: "icon128.png"
                      }
                    , callback);

                  function callback() {
                    console.log('Popup done!')
                  }
                  
                })
            });
        });
    });
  });
};