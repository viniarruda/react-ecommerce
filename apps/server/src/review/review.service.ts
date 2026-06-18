import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewStatus } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async getAllReviews(status?: ReviewStatus) {
    return this.prisma.review.findMany({
      where: status ? { status } : undefined,
      include: {
        user: { select: { id: true, firstName: true, lastName: true, avatar: true } },
        product: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getReviews(productId: string, skip = 0, take = 10, status?: ReviewStatus) {
    return this.prisma.review.findMany({
      where: {
        productId,
        ...(status ? { status } : { status: ReviewStatus.APPROVED }),
      },
      skip,
      take,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createReview(
    userId: string,
    productId: string,
    rating: number,
    title?: string,
    comment?: string,
  ) {
    // Validate rating
    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    // Check if product exists
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Check if user already reviewed this product
    const existingReview = await this.prisma.review.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existingReview) {
      throw new BadRequestException('You have already reviewed this product');
    }

    return this.prisma.review.create({
      data: {
        userId,
        productId,
        rating,
        title,
        comment,
        status: ReviewStatus.PENDING,
        helpfulCount: 0,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });
  }

  async updateReview(
    userId: string,
    reviewId: string,
    rating?: number,
    title?: string,
    comment?: string,
  ) {
    const review = await this.prisma.review.findFirst({
      where: { id: reviewId, userId },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (rating && (rating < 1 || rating > 5)) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    return this.prisma.review.update({
      where: { id: reviewId },
      data: {
        ...(rating && { rating }),
        ...(title !== undefined && { title }),
        ...(comment !== undefined && { comment }),
        status: ReviewStatus.PENDING, // Reset to pending after edit
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });
  }

  async deleteReview(userId: string, reviewId: string) {
    const review = await this.prisma.review.findFirst({
      where: { id: reviewId, userId },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    await this.prisma.review.delete({
      where: { id: reviewId },
    });

    return true;
  }

  async moderateReview(reviewId: string, status: ReviewStatus, adminResponse?: string) {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return this.prisma.review.update({
      where: { id: reviewId },
      data: {
        status,
        ...(adminResponse && {
          adminResponse,
          respondedAt: new Date(),
        }),
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });
  }

  async markReviewHelpful(reviewId: string) {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return this.prisma.review.update({
      where: { id: reviewId },
      data: {
        helpfulCount: review.helpfulCount + 1,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });
  }

  async respondToReview(reviewId: string, adminResponse: string) {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return this.prisma.review.update({
      where: { id: reviewId },
      data: {
        adminResponse,
        respondedAt: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });
  }

  async getProductAverageRating(productId: string) {
    const result = await this.prisma.review.aggregate({
      where: {
        productId,
        status: ReviewStatus.APPROVED,
      },
      _avg: {
        rating: true,
      },
      _count: true,
    });

    return {
      averageRating: result._avg.rating || 0,
      reviewCount: result._count,
    };
  }
}

