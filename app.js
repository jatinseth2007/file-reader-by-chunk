let $fileUploader;
const CHUNK_SIZE = 5000;

const init = () => {
  $fileUploader = document.querySelector("#file-uploader");
  $fileUploader.addEventListener("change", fileUploaderHandler);
};

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
          console.log(e);
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

init();
