import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function mapInput(data: Record<string, any>): Record<string, any> {
  const {
    title, name,
    isActive, isFeatured,
    inventory, quantity,
    brand,
    lowStockThreshold,
    dimension,
    status,
    ...rest
  } = data;

  return {
    ...rest,
    ...(name !== undefined || title !== undefined ? { name: name ?? title } : {}),
    ...(isActive !== undefined
      ? { status: isActive ? 'ACTIVE' : 'INACTIVE' }
      : status !== undefined ? { status } : {}),
    ...(inventory !== undefined || quantity !== undefined
      ? { stock: inventory ?? quantity }
      : {}),
    ...(lowStockThreshold !== undefined ? { lowStockAlert: lowStockThreshold } : {}),
  };
}

function mapOutput(product: any): any {
  if (!product) return product;
  return {
    ...product,
    title: product.name,
    isActive: product.status === 'ACTIVE',
    isFeatured: product.tags?.some((t: any) => t.tag?.slug === 'featured') ?? false,
    inventory: product.stock ?? 0,
    quantity: product.stock ?? 0,
    brand: null,
    lowStockThreshold: product.lowStockAlert,
    categories: product.categories?.map((pc: any) => pc.category ?? pc) ?? [],
    images: product.images ?? [],
    variants: product.variants ?? [],
    tags: product.tags?.map((pt: any) => pt.tag ?? pt) ?? [],
  };
}

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Record<string, any>) {
    const mapped = mapInput(data);
    const { categoryIds, tagIds, images, slug: providedSlug, name, ...productData } = mapped;

    if (!name) {
      throw new HttpException({ message: 'Product name/title is required' }, HttpStatus.BAD_REQUEST);
    }

    const slug = providedSlug || `${slugify(name)}-${Date.now()}`;

    const price = Number(productData.price ?? data.price ?? 0);

    const newProduct = await this.prisma.product.create({
      data: {
        name,
        slug,
        price,
        description: productData.description,
        shortDesc: productData.shortDesc,
        comparePrice: productData.comparePrice ? Number(productData.comparePrice) : undefined,
        costPrice: productData.costPrice ? Number(productData.costPrice) : undefined,
        sku: productData.sku,
        barcode: productData.barcode,
        status: (productData.status || 'ACTIVE') as any,
        trackInventory: true,
        stock: productData.stock != null ? Number(productData.stock) : 0,
        lowStockAlert: productData.lowStockAlert != null ? Number(productData.lowStockAlert) : 5,
        weight: productData.weight ? Number(productData.weight) : undefined,
        images: images
          ? {
              createMany: {
                data: images.map((img: any, index: number) => ({
                  url: img.url,
                  alt: img.alt,
                  sortOrder: img.sortOrder ?? index,
                  isPrimary: img.isPrimary ?? index === 0,
                })),
              },
            }
          : undefined,
        categories: categoryIds
          ? {
              createMany: {
                data: categoryIds.map((categoryId: string, index: number) => ({
                  categoryId,
                  isPrimary: index === 0,
                })),
              },
            }
          : undefined,
        tags: tagIds
          ? {
              createMany: {
                data: tagIds.map((tagId: string) => ({ tagId })),
              },
            }
          : undefined,
      },
      include: {
        images: true,
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
        variants: true,
        reviews: true,
      },
    });

    return mapOutput(newProduct);
  }

  async findAll(skip = 0, take = 200, where?: any) {
    const products = await this.prisma.product.findMany({
      where,
      skip,
      take,
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
        variants: true,
        reviews: { where: { status: 'APPROVED' } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return products.map(mapOutput);
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
        variants: true,
        reviews: {
          where: { status: 'APPROVED' },
          include: {
            user: { select: { id: true, firstName: true, lastName: true, avatar: true } },
          },
        },
      },
    });

    if (!product) {
      throw new HttpException({ message: 'Product not found' }, HttpStatus.NOT_FOUND);
    }

    return mapOutput(product);
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
        variants: true,
        reviews: {
          where: { status: 'APPROVED' },
          include: {
            user: { select: { id: true, firstName: true, lastName: true, avatar: true } },
          },
        },
      },
    });

    if (!product) {
      throw new HttpException({ message: 'Product not found' }, HttpStatus.NOT_FOUND);
    }

    return mapOutput(product);
  }

  async update(id: string, data: Record<string, any>) {
    const { categoryIds, tagIds, ...rest } = data;
    const mapped = mapInput(rest);

    // Remove undefined and non-schema fields
    const { slug, ...updateData } = mapped;
    const cleanData: Record<string, any> = {};
    const allowed = [
      'name', 'description', 'shortDesc', 'price', 'comparePrice', 'costPrice',
      'sku', 'barcode', 'status', 'stock', 'trackInventory', 'lowStockAlert',
      'weight', 'length', 'width', 'height', 'metaTitle', 'metaDescription',
    ];
    for (const key of allowed) {
      if (updateData[key] !== undefined) {
        cleanData[key] = updateData[key];
      }
    }

    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new HttpException({ message: 'Product not found' }, HttpStatus.NOT_FOUND);
    }

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: { ...cleanData, status: cleanData.status as any },
      include: {
        images: true,
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
        variants: true,
      },
    });

    if (rest.images !== undefined) {
      await this.prisma.productImage.deleteMany({ where: { productId: id } });
      if (rest.images && rest.images.length > 0) {
        await this.prisma.productImage.createMany({
          data: rest.images.map((img: any, i: number) => ({
            productId: id,
            url: img.url,
            alt: img.alt,
            sortOrder: img.sortOrder ?? i,
            isPrimary: img.isPrimary ?? i === 0,
          })),
        });
      }
    }

    if (categoryIds) {
      await this.prisma.productCategory.deleteMany({ where: { productId: id } });
      await this.prisma.productCategory.createMany({
        data: categoryIds.map((categoryId: string, index: number) => ({
          productId: id, categoryId, isPrimary: index === 0,
        })),
      });
    }

    if (tagIds) {
      await this.prisma.productTag.deleteMany({ where: { productId: id } });
      await this.prisma.productTag.createMany({
        data: tagIds.map((tagId: string) => ({ productId: id, tagId })),
      });
    }

    return mapOutput(
      await this.prisma.product.findUnique({
        where: { id },
        include: {
          images: true,
          categories: { include: { category: true } },
          tags: { include: { tag: true } },
          variants: true,
        },
      })
    );
  }

  async delete(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new HttpException({ message: 'Product not found' }, HttpStatus.NOT_FOUND);
    }
    await this.prisma.product.delete({ where: { id } });
    return true;
  }

  async search(query: string, skip = 0, take = 20) {
    const products = await this.prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { sku: { contains: query, mode: 'insensitive' } },
        ],
        status: 'ACTIVE',
      },
      skip,
      take,
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        categories: { include: { category: true } },
      },
    });

    return products.map(mapOutput);
  }
}
