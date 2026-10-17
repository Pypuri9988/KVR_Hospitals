const CALLBACK_EVENT = "kvr:open-callback";
const CHATBOT_EVENT = "kvr:open-chatbot";

export function openCallbackModal() {
  window.dispatchEvent(new CustomEvent(CALLBACK_EVENT));
}

export function openChatbotModal() {
  window.dispatchEvent(new CustomEvent(CHATBOT_EVENT));
}

export { CALLBACK_EVENT, CHATBOT_EVENT };
