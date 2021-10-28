import cryptoRandomString from 'crypto-random-string';

export default class Factory {
  baseDefinition() {
    return {
      id: cryptoRandomString({ length: 10 }),
      name: this.type + cryptoRandomString({ length: 10 }),
    }
  }
}
