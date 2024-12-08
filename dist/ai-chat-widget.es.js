import { marked as o } from "marked";
class r {
  constructor(e = {}) {
    this.userId = e.userId, this.apiUrl = e.apiUrl || "https://888.syaifulhuseinnn.pro/webhook/5e174ada-8250-4320-b0c2-bad652aab9b0", this.placeholder = e.placeholder || "Type your message... (Press Enter to send, Shift + Enter for new line)", this.isLoading = !1, o.setOptions({
      breaks: !0,
      gfm: !0
    }), this.createWidget(), this.setupElements(), this.setupEventListeners();
  }
  createWidget() {
    const e = `
    <div class="fixed bottom-4 left-1/2 -translate-x-1/2 w-[50vw] p-2 bg-white shadow-lg border-t border-secondary-200 rounded-lg">
        <div class="response-area mb-1 transition-all duration-300 opacity-0 h-0 overflow-hidden">
            <div class="relative bg-primary-50 p-4 rounded-lg">
                <button class="close-response absolute top-2 right-2 text-secondary-400 hover:text-secondary-600 
                             transition-colors p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                </button>
                <div class="markdown-content pr-8"></div>
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <div class="relative">
                <div class="absolute top-3 left-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-sparkles text-primary-500">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />
                        </svg>
                </div>
                <textarea 
                    class="chat-input w-full px-10 py-3 border border-secondary-200 rounded-lg resize-none 
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                           placeholder:text-secondary-400 min-h-[50px] max-h-[120px]"
                    placeholder="${this.placeholder}"
                    rows="2"
                ></textarea>
                <div class="loading-indicator hidden absolute right-3 top-3">
                    <svg class="animate-spin h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            </div>
        </div>
    </div>
`, t = document.createElement("div");
    t.innerHTML = e, document.body.appendChild(t), this.widget = t;
  }
  setupElements() {
    this.input = this.widget.querySelector(".chat-input"), this.responseArea = this.widget.querySelector(".response-area"), this.responseContent = this.widget.querySelector(
      ".response-area .markdown-content"
    ), this.loadingIndicator = this.widget.querySelector(".loading-indicator"), this.closeResponseBtn = this.widget.querySelector(".close-response"), this.setupTextareaAutoResize();
  }
  setupEventListeners() {
    this.input.addEventListener("keydown", (e) => {
      e.key === "Enter" && (e.shiftKey || (e.preventDefault(), this.isLoading || this.sendMessage()));
    }), this.closeResponseBtn.addEventListener("click", () => this.closeResponse());
  }
  closeResponse() {
    this.responseArea.style.height = "0", this.responseArea.style.opacity = "0", this.responseArea.style.marginBottom = "0", setTimeout(() => {
      this.responseContent.innerHTML = "";
    }, 300);
  }
  setupTextareaAutoResize() {
    const e = this.input;
    e.style.height = "auto", e.style.height = e.scrollHeight + "px", e.addEventListener("input", () => {
      e.style.height = "auto", e.style.height = Math.min(e.scrollHeight, 120) + "px";
    });
  }
  setLoading(e) {
    this.isLoading = e, e ? (this.loadingIndicator.classList.remove("hidden"), this.input.disabled = !0) : (this.loadingIndicator.classList.add("hidden"), this.input.disabled = !1, this.input.focus());
  }
  showResponse(e, t = !1) {
    t ? this.responseContent.innerHTML = o(e) : this.responseContent.textContent = e, this.responseArea.style.height = "auto", this.responseArea.style.opacity = "1", this.responseArea.style.marginBottom = "1rem";
  }
  async sendMessage() {
    const e = this.input.value.trim();
    if (e) {
      this.input.value = "", this.input.style.height = "auto", this.setLoading(!0);
      try {
        const t = new FormData();
        t.append("user_id", this.userId), t.append("text", e);
        const i = await fetch(this.apiUrl, {
          method: "POST",
          body: t
        });
        if (!i.ok)
          throw new Error("Network response was not ok");
        const s = await i.json();
        s.response && s.response.text && this.showResponse(s.response.text, !0);
      } catch (t) {
        console.error("Error:", t), this.showResponse("Sorry, there was an error processing your message.");
      } finally {
        this.setLoading(!1);
      }
    }
  }
}
typeof window < "u" && (window.AIChatWidget = r);
export {
  r as AIChatWidget,
  r as default
};
