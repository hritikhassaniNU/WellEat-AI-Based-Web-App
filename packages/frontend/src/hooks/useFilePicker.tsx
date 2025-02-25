/**
 * Custom Hook: `useFilePicker`
 *
 * Provides functionality to open a file picker dialog and select a file.
 * This hook leverages the browser's native `showOpenFilePicker` API to allow users to select a file.
 *
 * Features:
 * - Restricts file selection to image files (`.png`, `.jpg`, `.jpeg`).
 * - Returns the selected file as a `File` object.
 *
 * @returns {object} - An object containing:
 *   - `pickFile`: A function that opens the file picker and retrieves the selected file.
 */
export const useFilePicker = () => {
  const pickFile = async () => {
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: 'Images',
            accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
          },
        ],
        multiple: false,
      });
      const file = await fileHandle.getFile();
      return file;
    } catch (error) {
      console.error('Error picking file:', error);
    }
  };

  return { pickFile };
};
