// Define the HTML controls
const fileInput = document.getElementById('file_input') as HTMLInputElement;
const outputText = document.getElementById('output') as HTMLTextAreaElement;

// Read the file as a data URL and write it into the textarea
fileInput.addEventListener('change', () => {
    const file: File | undefined = fileInput.files?.[0];
    const reader: FileReader = new FileReader();
    if (file) {
        reader.readAsDataURL(file);
    } else {
        outputText.textContent = 'File not found.';
    }
    reader.addEventListener('load', () => {
        outputText.textContent = (reader.result as string);
    });
});

// Highlight text when the textelement is focused
outputText.addEventListener('focus', () => outputText.select());
