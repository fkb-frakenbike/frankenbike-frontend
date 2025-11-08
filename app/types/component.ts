export enum ComponentCategory {
  FRAME = 'frame',
  BRAKES = 'brakes',
  FORK_AND_DIRECTION = 'fork_and_direction',
  SEAT_PARTS = 'seat_parts',
  DRIVETRAIN = 'drivetrain',
  WHEELS = 'wheels',
  ACCESSORIES = 'accessories',
  OTHER = 'other',
}

export enum ComponentOrigin {
  HOMEMADE = 'homemade',
  BOUGHT_NEW = 'bought_new',
  BOUGHT_USED = 'bought_used',
  RECYCLED = 'recycled',
  GIFTED = 'gifted',
  TRADED = 'traded',
  RESTORED = 'restored',
  UPCYCLED = 'upcycled',
}

export type Component = {
  id: number;
  name: string;
  description: string;
  origin: ComponentOrigin;
  category: ComponentCategory;
  photoS3Key: string;
  photoMimeType: string;
  photoSize: number;
  createdAt: Date;
  updatedAt?: Date;
  likes?: number;
  comments?: number;
};
