export interface newProductI {
    name: string;
    price: number;
    description : string;
    stock : number;
    photos : Array<any>;
}
  
  export interface ProductI {
    _id: string;
    name: string;
    price: number;
    description : string;
    stock : number;
    timestamp : number;
    photos : Array<string>
}
  
export interface ProductQuery {
  name?: string;
  _id? : string;
  price? : number;
  priceMin?: number;
  priceMax?: number;
  stockMin?: number;
  stockMax?: number;
}
  
  export interface ProductBaseClass {
    get(id?: string | undefined) : any;
    add(data: newProductI): Promise<ProductI>;
    update(id: string, newProductData: newProductI): Promise<ProductI>;
    delete(id: string): Promise<void>;
    query(options: ProductQuery): Promise<ProductI[]>;
}