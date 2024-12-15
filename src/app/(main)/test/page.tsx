'use client';
class Vehicle {
  type: string;
  brand: string;

  constructor(type: string, brand: string) {
    this.type = type;
    this.brand = brand;
  }

  getDetails(): string {
    return `${this.brand} ${this.type}`;
  }
}

class Car extends Vehicle {
  doors: number;

  constructor(brand: string, doors: number) {
    super('Car', brand); // Call the parent constructor
    this.doors = doors;
  }

  getCarInfo(): string {
    return `${this.getDetails()} with ${this.doors} doors`;
  }
}

class Truck extends Vehicle {
  loadCapacity: number;

  constructor(brand: string, loadCapacity: number) {
    super('Truck', brand); // Call the parent constructor
    this.loadCapacity = loadCapacity;
  }

  getTruckInfo(): string {
    return `${this.getDetails()} with ${this.loadCapacity} tons load capacity`;
  }
}

// Usage
const car = new Car('Toyota', 4);
console.log(car.getCarInfo()); // Toyota Car with 4 doors

const truck = new Truck('Ford', 10);
console.log(truck.getTruckInfo()); // Ford Truck with 10 tons load capacity

const WRpage = () => {
  return <div>hi rahat</div>;
};

export default WRpage;

