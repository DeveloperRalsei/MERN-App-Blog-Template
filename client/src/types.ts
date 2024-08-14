import { ObjectId } from 'mongoose';

export type Blog = {
  _id: ObjectId,
  title: string,
  content: string,
  image?: string;
};

export type envoriment = {
  dev_env: 'development' | 'serve'
}