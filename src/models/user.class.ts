export class User {
  firstName: string;
  lastName: string;
  birthDate: number;
  email: string;
  phone: string;
  street: string;
  houseNumber: number;
  zipCode: number;
  city: string;

  constructor(obj?: any) {
    this.firstName = obj?.firstName || '';
    this.lastName = obj?.lastName || '';
    this.birthDate = obj?.birthDate || 0;
    this.email = obj?.email || '';
    this.phone = obj?.phone || '';
    this.street = obj?.street || '';
    this.houseNumber = obj?.houseNumber || 0;
    this.zipCode = obj?.zipCode || 0;
    this.city = obj?.city || '';
  }

  public toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      email: this.email,
      phone: this.phone,
      street: this.street,
      houseNumber: this.houseNumber,
      zipCode: this.zipCode,
      city: this.city,
    };
  }
}
