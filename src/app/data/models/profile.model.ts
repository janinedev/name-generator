export interface IProfile {
  name: string;
  surname: string;
  gender: string;
  region: string;
  age: number;
  phone: string;
  birthday: IBirthday;
  photo: string;
}

export interface IBirthday {
  dmy: string;
  mdy: string;
  raw: number;
}
