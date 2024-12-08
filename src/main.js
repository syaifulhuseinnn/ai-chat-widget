// src/main.js
import "./style.css";
import { marked } from "marked";

export class AIChatWidget {
  constructor(options = {}) {
    this.userId = options.userId;
    this.apiUrl = options.apiUrl || import.meta.env.VITE_WEBHOOK_PROD;
    this.placeholder =
      options.placeholder ||
      "Type your message... (Press Enter to send, Shift + Enter for new line)";
    this.isLoading = false;

    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    this.createWidget();
    this.setupElements();
    this.setupEventListeners();
  }

  createWidget() {
    const template = `
    <div class="aic-fixed aic-bottom-0 aic-left-1/2 aic--translate-x-1/2 aic-w-[50vw] aic-p-4 aic-bg-white aic-shadow-lg aic-border-t aic-border-gray-200">
        <div class="response-area aic-mb-4 aic-transition-all aic-duration-300 aic-opacity-0 aic-h-0 aic-overflow-hidden">
            <div class="aic-relative aic-bg-gray-100 aic-p-4 aic-rounded-lg">
                <button class="close-response aic-absolute aic-top-2 aic-right-2 aic-text-gray-500 hover:aic-text-gray-700 
                             aic-transition-colors aic-p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="aic-h-5 aic-w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
                <div class="markdown-content aic-pr-8"></div>
            </div>
        </div>
        <div class="aic-flex aic-flex-col aic-gap-2">
            <div class="aic-relative">
                <div class="aic-absolute aic-top-3 aic-left-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="orange" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-sparkles">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />
                    </svg>
                </div>
                <textarea 
                    class="chat-input aic-w-full aic-px-10 aic-py-3 aic-border aic-border-gray-200 aic-rounded-lg aic-resize-none 
                           focus:aic-outline-none focus:aic-ring-2 focus:aic-ring-primary-500 focus:aic-border-transparent
                           placeholder:aic-text-gray-400 aic-min-h-[50px] aic-max-h-[120px]"
                    placeholder="${this.placeholder}"
                    rows="2"
                ></textarea>
                <div class="loading-indicator aic-hidden aic-absolute aic-right-3 aic-top-3">
                    <svg class="aic-animate-spin aic-h-5 aic-w-5 aic-text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="aic-opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="aic-opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            </div>
        </div>
    </div>
`;

    const container = document.createElement("div");
    container.innerHTML = template;
    document.body.appendChild(container);
    this.widget = container;
  }

  setupElements() {
    this.input = this.widget.querySelector(".chat-input");
    this.responseArea = this.widget.querySelector(".response-area");
    this.responseContent = this.widget.querySelector(
      ".response-area .markdown-content"
    );
    this.loadingIndicator = this.widget.querySelector(".loading-indicator");
    this.closeResponseBtn = this.widget.querySelector(".close-response");

    this.setupTextareaAutoResize();
  }

  setupEventListeners() {
    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (!e.shiftKey) {
          e.preventDefault();
          if (!this.isLoading) {
            this.sendMessage();
          }
        }
      }
    });

    this.closeResponseBtn.addEventListener("click", () => this.closeResponse());
  }

  closeResponse() {
    // Hide response area with animation
    this.responseArea.style.height = "0";
    this.responseArea.style.opacity = "0";
    this.responseArea.style.marginBottom = "0";

    // Clear content after animation
    setTimeout(() => {
      this.responseContent.innerHTML = "";
    }, 300); // Match the duration of the transition
  }

  setupTextareaAutoResize() {
    const textarea = this.input;

    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";

    textarea.addEventListener("input", () => {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
    });
  }

  setLoading(loading) {
    this.isLoading = loading;
    if (loading) {
      this.loadingIndicator.classList.remove("aic-hidden"); // Changed from "hidden" to "aic-hidden"
      this.input.disabled = true;
    } else {
      this.loadingIndicator.classList.add("aic-hidden"); // Changed from "hidden" to "aic-hidden"
      this.input.disabled = false;
      this.input.focus();
    }
  }

  showResponse(text, isMarkdown = false) {
    // Update response content
    if (isMarkdown) {
      this.responseContent.innerHTML = marked(text);
    } else {
      this.responseContent.textContent = text;
    }

    // Show response area with animation
    this.responseArea.style.height = "auto";
    this.responseArea.style.opacity = "1";
    this.responseArea.style.marginBottom = "1rem";
  }

  async sendMessage() {
    const text = this.input.value.trim();
    if (!text) return;

    // Clear input and set loading state
    this.input.value = "";
    this.input.style.height = "auto";
    this.setLoading(true);

    try {
      const formData = new FormData();
      formData.append("user_id", this.userId);
      formData.append("text", text);

      const response = await fetch(this.apiUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.response && data.response.text) {
        this.showResponse(data.response.text, true);
      }
    } catch (error) {
      console.error("Error:", error);
      this.showResponse("Sorry, there was an error processing your message.");
    } finally {
      this.setLoading(false);
    }
  }
}

if (typeof window !== "undefined") {
  window.AIChatWidget = AIChatWidget;
}

export default AIChatWidget;
