class Notification {
  constructor(message, data) {
    if (!message) {
      throw new Error("Message is required");
    }
    this.message = message;
    this.data = data;
    this.timestamp = new Date();
  }

  isJSON(str) {
    try {
      return str && typeof str === "string" && JSON.parse(str);
    } catch (e) {
      throw new Error("Data must be a valid JSON string", { error: e });
    }
  }

  get() {
    return {
      message: this.message,
      data: this.isJSON(this.data) ? JSON.parse(this.data) : this.data,
      timestamp: this.timestamp,
    };
  }

  toString() {
    return JSON.stringify(this.get());
  }
}

export default Notification;
