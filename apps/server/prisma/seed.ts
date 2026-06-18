import { PrismaClient } from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

// Create PostgreSQL connection pool
// Prefer DIRECT_URL (bypasses PgBouncer) for seed operations,
// fall back to DATABASE_URL for local dev where there's no DIRECT_URL.
const connectionString =
  process.env.DIRECT_URL ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  'postgresql://postgres:postgres@localhost:5432/react_ecommerce';

const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });

// Create Prisma adapter
const adapter = new PrismaPg(pool);

// Initialize Prisma Client with adapter
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seeding...\n');

  // ============================================================================
  // 1. CREATE USERS
  // ============================================================================
  console.log('👤 Creating users...');
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@ecommerce.com';
  const adminPassword = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD || 'admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      isActive: true,
      emailVerified: true,
      emailVerifiedAt: new Date(),
    },
  });

  const customerEmail = process.env.SEED_CUSTOMER_EMAIL || 'customer@example.com';
  const customerPassword = await bcrypt.hash(process.env.SEED_CUSTOMER_PASSWORD || 'customer123', 10);
  const customer = await prisma.user.upsert({
    where: { email: customerEmail },
    update: {},
    create: {
      email: customerEmail,
      password: customerPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      role: 'CUSTOMER',
      isActive: true,
      emailVerified: true,
      emailVerifiedAt: new Date(),
    },
  });
  console.log('✅ Users created:', admin.email, customer.email);

  // ============================================================================
  // 2. CREATE ADDRESSES
  // ============================================================================
  console.log('\n📍 Creating addresses...');
  const shippingAddress = await prisma.address.upsert({
    where: { id: 'addr-shipping-1' },
    update: {},
    create: {
      id: 'addr-shipping-1',
      firstName: 'John',
      lastName: 'Doe',
      street1: '123 Main St',
      street2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US',
      phone: '+1234567890',
      isDefault: true,
      userId: customer.id,
    },
  });

  const billingAddress = await prisma.address.upsert({
    where: { id: 'addr-billing-1' },
    update: {},
    create: {
      id: 'addr-billing-1',
      firstName: 'John',
      lastName: 'Doe',
      company: 'Acme Corp',
      street1: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'US',
      phone: '+1234567890',
      isDefault: false,
      userId: customer.id,
    },
  });
  console.log('✅ Addresses created: 2');

  // ============================================================================
  // 3. CREATE TAGS
  // ============================================================================
  console.log('\n🏷️  Creating tags...');
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'new-arrival' },
      update: {},
      create: { name: 'New Arrival', slug: 'new-arrival' },
    }),
    prisma.tag.upsert({
      where: { slug: 'best-seller' },
      update: {},
      create: { name: 'Best Seller', slug: 'best-seller' },
    }),
    prisma.tag.upsert({
      where: { slug: 'sale' },
      update: {},
      create: { name: 'Sale', slug: 'sale' },
    }),
    prisma.tag.upsert({
      where: { slug: 'featured' },
      update: {},
      create: { name: 'Featured', slug: 'featured' },
    }),
  ]);
  console.log('✅ Tags created:', tags.length);

  // ============================================================================
  // 4. CREATE CATEGORIES
  // ============================================================================
  console.log('\n📂 Creating categories...');
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'electronics' },
      update: {},
      create: {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Electronic devices and accessories',
        isActive: true,
        sortOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'clothing' },
      update: {},
      create: {
        name: 'Clothing',
        slug: 'clothing',
        description: 'Fashion and apparel',
        isActive: true,
        sortOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'books' },
      update: {},
      create: {
        name: 'Books',
        slug: 'books',
        description: 'Books and literature',
        isActive: true,
        sortOrder: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'home-garden' },
      update: {},
      create: {
        name: 'Home & Garden',
        slug: 'home-garden',
        description: 'Home decor and garden supplies',
        isActive: true,
        sortOrder: 4,
      },
    }),
  ]);
  console.log('✅ Categories created:', categories.length);

  // ============================================================================
  // 5. CREATE PRODUCTS
  // ============================================================================
  console.log('\n📦 Creating products...');
  
  const headphones = await prisma.product.upsert({
    where: { slug: 'wireless-bluetooth-headphones' },
    update: {},
    create: {
      name: 'Wireless Bluetooth Headphones',
      slug: 'wireless-bluetooth-headphones',
      description: 'High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality.',
      shortDesc: 'Premium wireless headphones with ANC',
      price: 89.99,
      comparePrice: 129.99,
      costPrice: 45.00,
      sku: 'AUDIO-001',
      barcode: '123456789012',
      status: 'ACTIVE',
      trackInventory: true,
      stock: 50,
      lowStockAlert: 10,
      weight: 0.5,
      metaKeywords: ['headphones', 'wireless', 'bluetooth', 'audio', 'noise-cancellation'],
    },
  });

  const tshirt = await prisma.product.upsert({
    where: { slug: 'premium-cotton-tshirt' },
    update: {},
    create: {
      name: 'Premium Cotton T-Shirt',
      slug: 'premium-cotton-tshirt',
      description: 'Comfortable 100% organic cotton t-shirt. Soft, breathable, and perfect for everyday wear.',
      shortDesc: '100% organic cotton tee',
      price: 29.99,
      costPrice: 12.00,
      sku: 'CLOTH-001',
      status: 'ACTIVE',
      trackInventory: true,
      stock: 100,
      lowStockAlert: 20,
      weight: 0.2,
      metaKeywords: ['tshirt', 'cotton', 'clothing', 'casual'],
    },
  });

  const book = await prisma.product.upsert({
    where: { slug: 'the-great-gatsby' },
    update: {},
    create: {
      name: 'The Great Gatsby - F. Scott Fitzgerald',
      slug: 'the-great-gatsby',
      description: 'Classic American novel by F. Scott Fitzgerald. A timeless story of wealth, love, and the American Dream.',
      shortDesc: 'Classic American literature',
      price: 14.99,
      costPrice: 5.00,
      sku: 'BOOK-001',
      barcode: '978-0743273565',
      status: 'ACTIVE',
      trackInventory: true,
      stock: 30,
      lowStockAlert: 5,
      weight: 0.3,
      metaKeywords: ['book', 'fiction', 'classic', 'literature'],
    },
  });

  const chair = await prisma.product.upsert({
    where: { slug: 'ergonomic-office-chair' },
    update: {},
    create: {
      name: 'Ergonomic Office Chair',
      slug: 'ergonomic-office-chair',
      description: 'Professional ergonomic office chair with adjustable lumbar support, armrests, and breathable mesh back.',
      shortDesc: 'Ergonomic chair with lumbar support',
      price: 249.99,
      comparePrice: 299.99,
      costPrice: 120.00,
      sku: 'HOME-001',
      status: 'ACTIVE',
      trackInventory: true,
      stock: 15,
      lowStockAlert: 5,
      weight: 15.0,
      length: 60,
      width: 60,
      height: 110,
      metaKeywords: ['chair', 'office', 'furniture', 'ergonomic'],
    },
  });

  const phoneCase = await prisma.product.upsert({
    where: { slug: 'smartphone-case' },
    update: {},
    create: {
      name: 'Protective Smartphone Case',
      slug: 'smartphone-case',
      description: 'Durable protective case for smartphones with shock absorption and raised edges for screen protection.',
      shortDesc: 'Protective phone case',
      price: 19.99,
      costPrice: 5.00,
      sku: 'ACCS-001',
      status: 'ACTIVE',
      trackInventory: true,
      stock: 200,
      lowStockAlert: 50,
      weight: 0.1,
      metaKeywords: ['case', 'phone', 'accessories', 'protection'],
    },
  });

  const shoes = await prisma.product.upsert({
    where: { slug: 'running-shoes' },
    update: {},
    create: {
      name: 'Professional Running Shoes',
      slug: 'running-shoes',
      description: 'Lightweight running shoes designed for athletes. Features responsive cushioning and breathable mesh upper.',
      shortDesc: 'Lightweight athletic running shoes',
      price: 79.99,
      comparePrice: 99.99,
      costPrice: 35.00,
      sku: 'SHOE-001',
      status: 'ACTIVE',
      trackInventory: true,
      stock: 60,
      lowStockAlert: 15,
      weight: 0.8,
      metaKeywords: ['shoes', 'running', 'sports', 'athletic'],
    },
  });

  console.log('✅ Products created: 6');

  // ============================================================================
  // 6. CREATE PRODUCT IMAGES
  // ============================================================================
  console.log('\n🖼️  Creating product images...');
  await prisma.productImage.createMany({
    data: [
      // Headphones
      { productId: headphones.id, url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', alt: 'Wireless Headphones Front View', sortOrder: 1, isPrimary: true },
      { productId: headphones.id, url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b', alt: 'Headphones Side View', sortOrder: 2, isPrimary: false },
      // T-Shirt
      { productId: tshirt.id, url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab', alt: 'Cotton T-Shirt', sortOrder: 1, isPrimary: true },
      // Book
      { productId: book.id, url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f', alt: 'The Great Gatsby Book Cover', sortOrder: 1, isPrimary: true },
      // Chair
      { productId: chair.id, url: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8', alt: 'Office Chair Front', sortOrder: 1, isPrimary: true },
      // Phone Case
      { productId: phoneCase.id, url: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb', alt: 'Smartphone Case', sortOrder: 1, isPrimary: true },
      // Shoes
      { productId: shoes.id, url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', alt: 'Running Shoes', sortOrder: 1, isPrimary: true },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Product images created: 9');

  // ============================================================================
  // 7. LINK PRODUCTS TO CATEGORIES
  // ============================================================================
  console.log('\n🔗 Linking products to categories...');
  await prisma.productCategory.createMany({
    data: [
      { productId: headphones.id, categoryId: categories[0].id, isPrimary: true },
      { productId: tshirt.id, categoryId: categories[1].id, isPrimary: true },
      { productId: book.id, categoryId: categories[2].id, isPrimary: true },
      { productId: chair.id, categoryId: categories[3].id, isPrimary: true },
      { productId: phoneCase.id, categoryId: categories[0].id, isPrimary: true },
      { productId: shoes.id, categoryId: categories[1].id, isPrimary: true },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Product categories linked');

  // ============================================================================
  // 8. LINK PRODUCTS TO TAGS
  // ============================================================================
  console.log('\n🏷️  Linking products to tags...');
  await prisma.productTag.createMany({
    data: [
      { productId: headphones.id, tagId: tags[0].id }, // New Arrival
      { productId: headphones.id, tagId: tags[1].id }, // Best Seller
      { productId: tshirt.id, tagId: tags[2].id },     // Sale
      { productId: chair.id, tagId: tags[3].id },      // Featured
      { productId: shoes.id, tagId: tags[2].id },      // Sale
    ],
    skipDuplicates: true,
  });
  console.log('✅ Product tags linked');

  // ============================================================================
  // 9. CREATE PRODUCT VARIANTS
  // ============================================================================
  console.log('\n🎨 Creating product variants...');
  await prisma.productVariant.createMany({
    data: [
      {
        productId: tshirt.id,
        name: 'Red - Medium',
        sku: 'CLOTH-001-RED-M',
        price: 29.99,
        stock: 20,
        attributes: { color: 'Red', size: 'M' },
      },
      {
        productId: tshirt.id,
        name: 'Blue - Large',
        sku: 'CLOTH-001-BLUE-L',
        price: 29.99,
        stock: 15,
        attributes: { color: 'Blue', size: 'L' },
      },
      {
        productId: shoes.id,
        name: 'Size 9',
        sku: 'SHOE-001-9',
        stock: 10,
        attributes: { size: '9' },
      },
      {
        productId: shoes.id,
        name: 'Size 10',
        sku: 'SHOE-001-10',
        stock: 12,
        attributes: { size: '10' },
      },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Product variants created: 4');

  // ============================================================================
  // 10. CREATE DISCOUNTS
  // ============================================================================
  console.log('\n💰 Creating discounts...');
  const discount = await prisma.discount.upsert({
    where: { code: 'SAVE10' },
    update: {},
    create: {
      code: 'SAVE10',
      description: 'Get $10 off your first order',
      type: 'FIXED_AMOUNT',
      value: 10.00,
      maxUses: 100,
      usedCount: 5,
      minPurchase: 50.00,
      startsAt: new Date('2024-01-01'),
      expiresAt: new Date('2025-12-31'),
      isActive: true,
    },
  });

  await prisma.discount.upsert({
    where: { code: 'SUMMER20' },
    update: {},
    create: {
      code: 'SUMMER20',
      description: '20% off summer sale',
      type: 'PERCENTAGE',
      value: 20,
      maxUsesPerUser: 1,
      isActive: true,
    },
  });
  console.log('✅ Discounts created: 2');

  // ============================================================================
  // 11. CREATE CART & CART ITEMS
  // ============================================================================
  console.log('\n🛒 Creating cart...');
  const cart = await prisma.cart.upsert({
    where: { userId: customer.id },
    update: {},
    create: {
      userId: customer.id,
    },
  });

  // Check if cart item exists first
  const existingCartItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId: headphones.id,
      variantId: null,
    },
  });

  if (!existingCartItem) {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: headphones.id,
        quantity: 1,
      },
    });
  }
  console.log('✅ Cart created with items');

  // ============================================================================
  // 12. CREATE ORDER
  // ============================================================================
  console.log('\n📝 Creating order...');
  const order = await prisma.order.upsert({
    where: { orderNumber: 'ORD-2024-001' },
    update: {},
    create: {
      orderNumber: 'ORD-2024-001',
      userId: customer.id,
      status: 'PAID',
      subtotal: 89.99,
      discountAmount: 10.00,
      tax: 6.40,
      shippingCost: 5.00,
      total: 91.39,
      shippingAddressId: shippingAddress.id,
      billingAddressId: billingAddress.id,
      discountId: discount.id,
      customerNote: 'Please deliver between 9 AM - 5 PM',
    },
  });
  console.log('✅ Order created:', order.orderNumber);

  // ============================================================================
  // 13. CREATE ORDER ITEMS
  // ============================================================================
  console.log('\n📋 Creating order items...');
  await prisma.orderItem.upsert({
    where: { id: 'order-item-1' },
    update: {},
    create: {
      id: 'order-item-1',
      orderId: order.id,
      productId: headphones.id,
      quantity: 1,
      price: 89.99,
      total: 89.99,
    },
  });
  console.log('✅ Order items created');

  // ============================================================================
  // 14. CREATE PAYMENT
  // ============================================================================
  console.log('\n💳 Creating payment...');
  await prisma.payment.upsert({
    where: { id: 'payment-1' },
    update: {},
    create: {
      id: 'payment-1',
      orderId: order.id,
      userId: customer.id,
      amount: 91.39,
      currency: 'USD',
      status: 'COMPLETED',
      method: 'CREDIT_CARD',
      transactionId: 'TXN-' + Date.now(),
      cardLast4: '4242',
      cardBrand: 'Visa',
      paidAt: new Date(),
    },
  });
  console.log('✅ Payment created');

  // ============================================================================
  // 15. CREATE SHIPMENT
  // ============================================================================
  console.log('\n📦 Creating shipment...');
  await prisma.shipment.upsert({
    where: { id: 'shipment-1' },
    update: {},
    create: {
      id: 'shipment-1',
      orderId: order.id,
      addressId: shippingAddress.id,
      trackingNumber: '1Z999AA10123456784',
      carrier: 'UPS',
      service: 'Ground',
      status: 'SHIPPED',
      weight: 0.5,
      shippingCost: 5.00,
      shippedAt: new Date(),
    },
  });
  console.log('✅ Shipment created');

  // ============================================================================
  // 16. CREATE REVIEWS
  // ============================================================================
  console.log('\n⭐ Creating reviews...');
  await prisma.review.upsert({
    where: {
      userId_productId: {
        userId: customer.id,
        productId: headphones.id,
      },
    },
    update: {},
    create: {
      userId: customer.id,
      productId: headphones.id,
      rating: 5,
      title: 'Excellent sound quality!',
      comment: 'These headphones are amazing. The noise cancellation works great and the battery life is excellent. Highly recommended!',
      status: 'APPROVED',
      helpfulCount: 12,
    },
  });
  console.log('✅ Reviews created');

  // ============================================================================
  // 17. CREATE WISHLIST
  // ============================================================================
  console.log('\n💝 Creating wishlist...');
  const wishlist = await prisma.wishlist.upsert({
    where: { userId: customer.id },
    update: {},
    create: {
      userId: customer.id,
    },
  });

  // Connect products to wishlist
  await prisma.wishlist.update({
    where: { id: wishlist.id },
    data: {
      products: {
        connect: [
          { id: chair.id },
          { id: shoes.id },
        ],
      },
    },
  });
  console.log('✅ Wishlist created');

  // ============================================================================
  // 18. CREATE STORE SETTINGS
  // ============================================================================
  console.log('\n⚙️  Creating store settings...');
  await Promise.all([
    prisma.storeSetting.upsert({
      where: { key: 'store_name' },
      update: {},
      create: {
        key: 'store_name',
        value: { name: process.env.SEED_STORE_NAME || 'React Ecommerce Store' },
      },
    }),
    prisma.storeSetting.upsert({
      where: { key: 'store_email' },
      update: {},
      create: {
        key: 'store_email',
        value: { email: process.env.SEED_STORE_EMAIL || 'support@ecommerce.com' },
      },
    }),
    prisma.storeSetting.upsert({
      where: { key: 'currency' },
      update: {},
      create: {
        key: 'currency',
        value: { code: process.env.SEED_CURRENCY || 'USD', symbol: process.env.SEED_CURRENCY_SYMBOL || '$' },
      },
    }),
  ]);
  console.log('✅ Store settings created');

  // ============================================================================
  // SUMMARY
  // ============================================================================
  console.log('\n' + '='.repeat(60));
  console.log('🎉 Database seeding completed successfully!');
  console.log('='.repeat(60));
  console.log('\n📊 Summary:');
  console.log('  • Users: 2 (1 admin, 1 customer)');
  console.log('  • Addresses: 2');
  console.log('  • Tags: 4');
  console.log('  • Categories: 4');
  console.log('  • Products: 6');
  console.log('  • Product Images: 9');
  console.log('  • Product Variants: 4');
  console.log('  • Discounts: 2');
  console.log('  • Orders: 1');
  console.log('  • Payments: 1');
  console.log('  • Shipments: 1');
  console.log('  • Reviews: 1');
  console.log('  • Wishlists: 1');
  console.log('  • Store Settings: 3');
  console.log('\n📝 Test Credentials:');
  console.log('  Admin:    admin@ecommerce.com / admin123');
  console.log('  Customer: customer@example.com / customer123');
  console.log('\n');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error('\n❌ Error during seeding:', e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
