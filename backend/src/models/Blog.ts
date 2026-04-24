import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: string;
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, index: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true, trim: true },
    coverImage: { type: String, default: '' },
    author: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IBlog>('Blog', BlogSchema);
