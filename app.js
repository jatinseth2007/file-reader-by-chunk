let $fileUploader;
let $fileUploaderStream;
const CHUNK_SIZE = 5000;

const init = () => {
  $fileUploader = document.querySelector("#file-uploader-chunks");
  $fileUploaderStream = document.querySelector("#file-uploader-stream");
  $fileUploader.addEventListener("change", fileUploaderHandler);
  $fileUploaderStream.addEventListener("change", fileUploaderStreamHandler);
};

/**
 * Function to upload the file using chunks
 * Jatin Seth
 */
const fileUploaderHandler = async (e) => {
  const fileToUpload = e.target.files[0];
  const totalBytes = fileToUpload.size;
  const totalChunks = Math.ceil(totalBytes / CHUNK_SIZE);
  // we need to run the following as loop cuz we are going to read the data in chunk and execute it for all chunks...
  for (let chunk = 0; chunk < totalChunks; chunk++) {
    const startPos = chunk * CHUNK_SIZE;
    const endPos = startPos + CHUNK_SIZE;
    //handle the chunk...
    try {
      await chunkHandler(fileToUpload, startPos, endPos);
    } catch (error) {
      // do rejection stuff
      console.log(error);
    }
  } //EOL
};

const chunkHandler = async (fileToUpload, startPos, endPos) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsArrayBuffer(fileToUpload.slice(startPos, endPos));
      reader.onload = async (e) => {
        try {
          console.log(e.target.result, e.target.result.byteLength);
          //we can send API call here and after that resolve...
          // for example I am doing setTimeout just to prove the concept...
          setTimeout(() => {
            resolve();
          }, 1000);
        } catch (error) {
          reject(error);
        }
      };
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Function to upload the file using stream
 * Jatin Seth
 */
const fileUploaderStreamHandler = async (e) => {
  const fileToUpload = e.target.files[0];
  const readableStream = fileToUpload.stream();
  const reader = readableStream.getReader();
  while (true) {
    const { value, done } = await reader.read();
    // we can call the API here...
    await fileUploaderByStreamHandler(value);
    console.log(value);
    if (done) break;
  }
};

const fileUploaderByStreamHandler = async (value) => {
  return new Promise((resolve, reject) => {
    //we can send API call here and after that resolve...
    // for example I am doing setTimeout just to prove the concept...
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

init();
