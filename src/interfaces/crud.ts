export interface Crud {
  all();
  create(value: any, param?: any);
  show(id: any);
  update(id: any, value: any);
  delete(id: any);
}
