/**
 * Custom Hook: `useWindowShare`
 *
 * Provides functionality to share content using the Web Share API.
 * This hook allows users to share the current page's URL, title, and description with supported applications.
 *
 * Features:
 * - Checks if the Web Share API is supported by the user's browser.
 * - Shares the content if the API is available.
 * - Logs errors and unsupported browser scenarios.
 *
 * @returns {object} - An object containing:
 *   - `handleShare`: A function that initiates the share process.
 */
export const useWindowShare = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Example Page',
          text: 'Check out this cool page!',
          url: window.location.href,
        });
        console.log('Content shared successfully');
      } catch (error) {
        console.error('Error sharing content:', error);
      }
    } else {
      console.log('Web Share API is not supported in this browser.');
    }
  };

  return { handleShare };
};
