import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        addresses: true,
        orders: true,
        reviews: true,
        wishlist: true,
      },
    });

    return user;
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        addresses: true,
        orders: true,
        reviews: true,
        wishlist: true,
      },
    });

    if (!user) {
      const errors = { message: 'User not found' };
      throw new HttpException({ errors }, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async create(data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) {
    const { email, password, firstName, lastName, phone } = data;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      const errors = { message: 'Email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        role: 'CUSTOMER',
        isActive: true,
        emailVerified: false,
      },
      include: {
        addresses: true,
      },
    });

    return newUser;
  }

  async update(
    id: string,
    data: {
      firstName?: string;
      lastName?: string;
      phone?: string;
      avatar?: string;
    },
  ) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      const errors = { message: 'User not found' };
      throw new HttpException({ errors }, HttpStatus.NOT_FOUND);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
      include: {
        addresses: true,
      },
    });

    return updatedUser;
  }

  async deactivate(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      const errors = { message: 'User not found' };
      throw new HttpException({ errors }, HttpStatus.NOT_FOUND);
    }

    await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });

    return user;
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      const errors = { message: 'User not found' };
      throw new HttpException({ errors }, HttpStatus.NOT_FOUND);
    }

    await this.prisma.user.delete({ where: { id } });

    return user;
  }

  async findAll(skip = 0, take = 20, role?: string) {
    const where = role ? { role: role as any } : {};

    return this.prisma.user.findMany({
      where,
      skip,
      take,
      include: {
        addresses: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getAddresses(userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async createAddress(
    userId: string,
    data: {
      firstName: string;
      lastName: string;
      company?: string;
      street1: string;
      street2?: string;
      city: string;
      state: string;
      zipCode: string;
      country?: string;
      phone?: string;
      isDefault?: boolean;
    },
  ) {
    if (data.isDefault) {
      await this.prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }

    return this.prisma.address.create({
      data: { ...data, userId, country: data.country ?? 'US' },
    });
  }
}
