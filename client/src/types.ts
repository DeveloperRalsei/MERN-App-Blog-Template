import { ObjectId } from 'mongoose';

export type Blog = {
  _id?: ObjectId | any,
  title: string,
  content: string,
  image?: string;
  author: string,
  tags?: string[]
};

export type envoriment = {
  dev_env: 'development' | 'serve'
}