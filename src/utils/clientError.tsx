class ClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClientError";
    Object.setPrototypeOf(this, ClientError.prototype);
  }
}

export default ClientError;
