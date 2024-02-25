import Client, { Config } from "./request";
import ProductResource from "./resources/product";

class Valantis {
  public client: Client;
  public product: ProductResource;

  constructor(config: Config) {
    this.client = new Client(config);
    this.product = new ProductResource(this.client);
  }
}

export default Valantis;
