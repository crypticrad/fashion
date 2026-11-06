import type { AdminBrand, AdminProduct } from './ProductsTable';

// Fixture rows taken from the fashion_2026-11-06 DB export.
// TODO(API): replace with brands/products from the Custom API.

export const ADMIN_BRANDS: AdminBrand[] = [
  { id: 1, brand_name: 'Prada' },
  { id: 2, brand_name: 'Gucci' },
  { id: 3, brand_name: 'Zara' },
  { id: 4, brand_name: 'Nike' },
  { id: 5, brand_name: 'Adidas' },
  { id: 6, brand_name: 'H&M' },
  { id: 7, brand_name: "Levi's" },
  { id: 8, brand_name: 'Uniqlo' }
];

export const ADMIN_PRODUCTS: AdminProduct[] = [
  {
    id: 1,
    name: 'Uniqlo Supima Cotton Crew Neck Tee',
    description: 'Soft breathable Supima cotton t-shirt with a clean crew neckline for everyday wear.',
    product_image: '',
    brand_id: 8,
    gender: ['UNISEX'],
    color: ['#FFFFFF', '#000000', '#808080'],
    size: ['xs', 's', 'm', 'l', 'xl'],
    price: 14.9,
    style: 'CASUAL',
    category: 'TSHIRTS'
  },
  {
    id: 4,
    name: 'Nike Dri-FIT Training Tee',
    description: 'Sweat-wicking Dri-FIT tee built to keep you dry through tough sessions.',
    product_image: '',
    brand_id: 4,
    gender: ['UNISEX'],
    color: ['#000000', '#FF0000', '#0000FF'],
    size: ['s', 'm', 'l', 'xl'],
    price: 29.99,
    style: 'GYM',
    category: 'TSHIRTS'
  },
  {
    id: 6,
    name: 'Gucci Logo Print Cotton Tee',
    description: 'Luxury cotton t-shirt with signature logo print and premium finish.',
    product_image: '',
    brand_id: 2,
    gender: ['UNISEX'],
    color: ['#FFFFFF', '#000000', '#008000'],
    size: ['xs', 's', 'm', 'l', 'xl'],
    price: 480,
    style: 'PARTY',
    category: 'TSHIRTS'
  },
  {
    id: 12,
    name: "Levi's Cotton Chino Shorts",
    description: 'Comfortable cotton chino shorts with a mid-length cut for everyday wear.',
    product_image: '',
    brand_id: 7,
    gender: ['MALE'],
    color: ['#F5F5DC', '#000080', '#808080'],
    size: ['s', 'm', 'l', 'xl'],
    price: 44.9,
    style: 'CASUAL',
    category: 'SHORTS'
  },
  {
    id: 20,
    name: 'Uniqlo Oxford Button-Down Shirt',
    description: 'Classic oxford cotton shirt with a button-down collar for versatile wear.',
    product_image: '',
    brand_id: 8,
    gender: ['MALE'],
    color: ['#FFFFFF', '#0000FF', '#FFC0CB'],
    size: ['s', 'm', 'l', 'xl', 'xxl'],
    price: 29.9,
    style: 'CASUAL',
    category: 'SHIRTS'
  },
  {
    id: 30,
    name: 'Nike Sportswear Club Fleece Hoodie',
    description: 'Soft brushed-fleece pullover hoodie with a roomy front pocket.',
    product_image: '',
    brand_id: 4,
    gender: ['UNISEX'],
    color: ['#000000', '#808080', '#000080'],
    size: ['s', 'm', 'l', 'xl', 'xxl'],
    price: 54.99,
    style: 'CASUAL',
    category: 'HOODIE'
  },
  {
    id: 38,
    name: "Levi's 501 Original Fit Jeans",
    description: 'The iconic 501 straight-leg jeans in durable rigid denim.',
    product_image: '',
    brand_id: 7,
    gender: ['MALE'],
    color: ['#0000FF', '#000080', '#000000'],
    size: ['s', 'm', 'l', 'xl', 'xxl'],
    price: 98,
    style: 'CASUAL',
    category: 'JEANS'
  },
  {
    id: 47,
    name: 'Nike Windrunner Track Jacket',
    description: 'Iconic Windrunner jacket with a chevron design and water-repellent shell.',
    product_image: '',
    brand_id: 4,
    gender: ['UNISEX'],
    color: ['#000000', '#FF0000', '#0000FF'],
    size: ['s', 'm', 'l', 'xl'],
    price: 89.99,
    style: 'CASUAL',
    category: 'JACKETS'
  },
  {
    id: 54,
    name: 'Zara Floral Wrap Midi Dress',
    description: 'Flowing floral wrap dress with a flattering midi length.',
    product_image: '',
    brand_id: 3,
    gender: ['FEMALE'],
    color: ['#FFC0CB', '#008000', '#FFFFFF'],
    size: ['xxs', 'xs', 's', 'm', 'l'],
    price: 49.95,
    style: 'CASUAL',
    category: 'DRESSES'
  },
  {
    id: 61,
    name: 'Zara Pleated Midi Skirt',
    description: 'Elegant pleated midi skirt with a fluid movement.',
    product_image: '',
    brand_id: 3,
    gender: ['FEMALE'],
    color: ['#000000', '#F5F5DC', '#800080'],
    size: ['xxs', 'xs', 's', 'm', 'l'],
    price: 35.95,
    style: 'FORMAL',
    category: 'SKIRTS'
  },
  {
    id: 67,
    name: 'Uniqlo Smart Ankle Trousers',
    description: 'Versatile ankle-length trousers with a smart tapered fit.',
    product_image: '',
    brand_id: 8,
    gender: ['UNISEX'],
    color: ['#000000', '#000080', '#808080'],
    size: ['s', 'm', 'l', 'xl'],
    price: 39.9,
    style: 'FORMAL',
    category: 'TROUSERS'
  },
  {
    id: 75,
    name: 'Uniqlo Merino Crew Neck Sweater',
    description: 'Fine-gauge extra-fine merino wool sweater with a soft hand feel.',
    product_image: '',
    brand_id: 8,
    gender: ['UNISEX'],
    color: ['#000000', '#000080', '#800080'],
    size: ['xs', 's', 'm', 'l', 'xl'],
    price: 49.9,
    style: 'FORMAL',
    category: 'SWEATERS'
  }
];
