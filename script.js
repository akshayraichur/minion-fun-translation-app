// Capturing dom elements
const translateBtn = document.querySelector('.translate-btn');
const inputArea = document.getElementById('english-input');
const outputArea = document.querySelector('.minion-output');

// constants
const API_URL = 'https://api.funtranslations.com/translate/minion.json';

// loader component
const loaderComponent = document.createElement('div');
loaderComponent.classList.add('lds-dual-ring');

const handleTranslate = (event) => {
  let inputValue = inputArea.value.trim();
  // add loading
  outputArea.append(loaderComponent);

  handleApiCall(inputValue, API_URL);
};

const createDOMNode = (payload, typeOfNode) => {
  let newNode = document.createElement(typeOfNode);
  newNode.innerHTML = payload;
  return newNode;
};

const handleApiCall = (data, URL) => {
  let urlWithPayload = `${URL}?text=${data}`;
  fetch(urlWithPayload)
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      // outputArea.removeChild(loaderComponent);
      outputArea.innerHTML = '';
      if (res?.contents?.translated) {
        // set the response
        let result = res.contents.translated;
        let newNode = createDOMNode(result, 'p');
        outputArea.append(newNode);
      } else if (res?.error?.code) {
        // set error message
        let errorMessage = res.error.message;
        let newNode = createDOMNode(errorMessage, 'p');
        newNode.classList.add('error-message');
        outputArea.append(newNode);
      }
    });
};

function App() {
  // add event listener to btn
  translateBtn.addEventListener('click', handleTranslate);
}

App();
